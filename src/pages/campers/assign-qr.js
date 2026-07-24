import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Router from "next/router";
import {
  Paper,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Autocomplete,
  Alert,
  CircularProgress,
  Divider,
  Stack,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";

const AssignQRCodes = () => {
  const { status } = useSession();

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      Router.replace("/auth");
    }
  }, [status]);

  // Component state
  const [campers, setCampers] = useState([]);
  const [selectedCamper, setSelectedCamper] = useState(null);
  const [accountQR, setAccountQR] = useState("");
  const [linkedQR, setLinkedQR] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: '' }

  // Allow Unassignment Security Setting State
  const [unassignmentEnabled, setUnassignmentEnabled] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [targetToggleVal, setTargetToggleVal] = useState(false);

  // Fetch unassignment setting from DB on mount
  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const response = await fetch("/api/settings/unassignment");
        if (response.ok) {
          const result = await response.json();
          setUnassignmentEnabled(result.enabled);
        }
      } catch (err) {
        console.error("Error loading unassignment setting:", err);
      }
    };
    if (status === "authenticated") {
      fetchSetting();
    }
  }, [status]);

  // Editing is locked if unassignment is disabled AND the selected camper already has assigned fields
  const isEditingLocked = !unassignmentEnabled && selectedCamper && (selectedCamper.accountQRCode || selectedCamper.linkedQRCode);

  // Refs for scanner focus flow
  const accountQRRef = useRef(null);
  const linkedQRRef = useRef(null);

  // Fetch all camper details on mount
  useEffect(() => {
    const fetchCamperDetails = async () => {
      try {
        const response = await fetch("/api/campers/get-details");
        if (response.ok) {
          const result = await response.json();
          setCampers(result.data || []);
        } else {
          showNotification("error", "Failed to fetch camper details from database.");
        }
      } catch (err) {
        console.error("Error fetching camper details:", err);
        showNotification("error", "An error occurred while loading camper list.");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchCamperDetails();
    }
  }, [status]);

  // When a camper is selected, populate their existing codes
  useEffect(() => {
    if (selectedCamper) {
      setAccountQR(selectedCamper.accountQRCode || "");
      setLinkedQR(selectedCamper.linkedQRCode || "");
      setNotification(null);
      // Automatically focus on Primary Account QR field for immediate scan
      setTimeout(() => {
        if (accountQRRef.current) {
          accountQRRef.current.focus();
        }
      }, 100);
    } else {
      setAccountQR("");
      setLinkedQR("");
    }
  }, [selectedCamper]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  // Safe range checks
  const isCodeInRange = (code) => {
    if (!code) return true; // empty is valid (blanking a code)
    const num = parseInt(code, 10);
    return !isNaN(num) && num >= 10001 && num <= 10375 && num.toString() === code.trim();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!selectedCamper) {
      showNotification("error", "Please select a camper first.");
      return;
    }
    if (isEditingLocked) {
      showNotification("error", "Editing is locked for this camper profile. Turn on Allow Unassignment first.");
      return;
    }

    const cleanAccountQR = accountQR.trim();
    const cleanLinkedQR = linkedQR.trim();

    // Validations
    if (cleanAccountQR !== "" && !isCodeInRange(cleanAccountQR)) {
      showNotification("error", "Primary Account QR Code must be an integer between 10001 and 10375.");
      return;
    }

    if (cleanLinkedQR !== "" && !isCodeInRange(cleanLinkedQR)) {
      showNotification("error", "Linked Account QR Code must be an integer between 10001 and 10375.");
      return;
    }

    if (cleanLinkedQR !== "") {
      const targetCamper = campers.find(
        (c) => c.accountQRCode === cleanLinkedQR && c._id !== selectedCamper._id
      );

      if (!targetCamper) {
        showNotification(
          "error",
          `Linked Account QR Code ${cleanLinkedQR} is not assigned as a primary account for any camper.`
        );
        return;
      }

      if (targetCamper.linkedQRCode && targetCamper.linkedQRCode.trim() !== "") {
        showNotification(
          "error",
          `Linked Account QR Code ${cleanLinkedQR} is a secondary account. You can only link to a primary account.`
        );
        return;
      }
    }

    if (cleanAccountQR !== "" && cleanAccountQR === cleanLinkedQR) {
      showNotification("error", "Primary Account QR and Linked Account QR cannot be the exact same code.");
      return;
    }

    setSubmitting(true);
    setNotification(null);

    try {
      const response = await fetch("/api/campers/assign-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          camperId: selectedCamper._id,
          accountQRCode: cleanAccountQR,
          linkedQRCode: cleanLinkedQR
        })
      });

      const result = await response.json();

      if (response.ok) {
        showNotification("success", result.message || "Successfully assigned QR codes!");
        
        // Update local camper state with new QR codes
        setCampers((prevCampers) =>
          prevCampers.map((c) =>
            c._id === selectedCamper._id
              ? { ...c, accountQRCode: cleanAccountQR, linkedQRCode: cleanLinkedQR }
              : c
          )
        );

        // Optional: clear form/dropdown for next scan
        setSelectedCamper(null);
        setAccountQR("");
        setLinkedQR("");
      } else {
        showNotification("error", result.message || "Failed to assign QR codes.");
      }
    } catch (err) {
      console.error("Error submitting QR codes:", err);
      showNotification("error", "A network error occurred while assigning QR codes.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleClick = (e) => {
    e.preventDefault();
    const nextVal = !unassignmentEnabled;
    setTargetToggleVal(nextVal);
    setPasswordInput("");
    setErrorMsg("");
    setDialogOpen(true);
  };

  const handlePasswordSubmit = async () => {
    setErrorMsg("");
    try {
      const response = await fetch("/api/settings/unassignment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: passwordInput,
          enabled: targetToggleVal
        })
      });

      if (response.ok) {
        setUnassignmentEnabled(targetToggleVal);
        setDialogOpen(false);
        showNotification("success", `Unassignment protection has been ${targetToggleVal ? "Disabled (Unlocked)" : "Enabled (Locked)"}.`);
      } else {
        const data = await response.json();
        setErrorMsg(data.message || "Authentication failed.");
      }
    } catch (err) {
      console.error("Error updating unassignment setting:", err);
      setErrorMsg("An error occurred during verification.");
    }
  };

  if (status !== "authenticated") {
    return null;
  }

  return (
    <Paper
      elevation={12}
      sx={{
        width: "95%",
        maxWidth: "800px",
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        padding: { xs: "2rem", md: "4rem" },
        backgroundColor: "#f8f8ff",
        borderRadius: "8px"
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: "bold", mb: 1 }}>
        Assign QR Codes
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={unassignmentEnabled}
              onChange={handleToggleClick}
              color="warning"
            />
          }
          label={
            <Typography sx={{ fontWeight: "medium", fontSize: "0.95rem" }}>
              🔓 Allow Unassignment (Edit Assigned Codes)
            </Typography>
          }
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" my={5}>
          <CircularProgress size={50} />
          <Typography sx={{ ml: 2 }}>Loading camper details roster...</Typography>
        </Box>
      ) : (
        <Box component="form" onSubmit={submitHandler} noValidate>
          <Grid container spacing={3}>
            
            {/* Editing Lock Alert */}
            {isEditingLocked && (
              <Grid item xs={12}>
                <Alert severity="warning" variant="outlined" sx={{ fontWeight: "medium" }}>
                  🔒 QR code editing is locked for this camper because they are already assigned. Toggle "Allow Unassignment" below the title and authenticate to edit.
                </Alert>
              </Grid>
            )}

            {/* Searchable Dropdown */}
            <Grid item xs={12}>
              <Autocomplete
                id="camper-select"
                options={campers}
                getOptionLabel={(option) => {
                  const hasQR = option.accountQRCode ? "✓ Assigned" : "No QR";
                  return `${option.firstName} ${option.lastName} (${option.group || "No Group"}) - [${hasQR}]`;
                }}
                value={selectedCamper}
                onChange={(event, newValue) => setSelectedCamper(newValue)}
                isOptionEqualToValue={(option, value) => option._id === value._id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search and Select Camper"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>

            {/* Selected Camper Details Box */}
            {selectedCamper && (
              <Grid item xs={12}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    backgroundColor: "#f0f4f8",
                    borderColor: "#b0c4de",
                    borderRadius: "4px"
                  }}
                >
                  <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: "bold" }}>
                    Camper Profile
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="textSecondary">First Name:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: "medium" }}>{selectedCamper.firstName || "-"}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="textSecondary">Last Name:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: "medium" }}>{selectedCamper.lastName || "-"}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="textSecondary">Camp:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: "medium" }}>{selectedCamper.camp || "-"}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="textSecondary">Role / Level:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: "medium" }}>{selectedCamper.camperLeader === "L" ? "Leader" : "Camper"}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">Group / Team:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: "medium" }}>{selectedCamper.group || "-"}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">Room:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: "medium" }}>{selectedCamper.room || "(Not assigned yet)"}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )}

            {/* Inputs & Scanning Area */}

            {/* Primary Account QR Input */}
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={accountQRRef}
                id="account-qr"
                label="Account QR Code (Primary)"
                value={accountQR}
                onChange={(e) => setAccountQR(e.target.value)}
                onKeyDown={(e) => {
                  // Scanner auto-enter key listener to jump focus
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (linkedQRRef.current) linkedQRRef.current.focus();
                  }
                }}
                disabled={!selectedCamper || isEditingLocked}
                placeholder="Scan or enter code (10001 - 10375)"
                fullWidth
                variant="outlined"
                error={accountQR !== "" && !isCodeInRange(accountQR)}
                helperText={
                  accountQR !== "" && !isCodeInRange(accountQR)
                    ? "Invalid. Must be integer between 10001 and 10375."
                    : "Primary banking account for this camper."
                }
              />
            </Grid>

            {/* Linked QR Input */}
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={linkedQRRef}
                id="linked-qr"
                label="Linked QR Code (Optional)"
                value={linkedQR}
                onChange={(e) => setLinkedQR(e.target.value)}
                disabled={!selectedCamper || isEditingLocked}
                placeholder="Scan or enter code (10001 - 10375)"
                fullWidth
                variant="outlined"
                error={linkedQR !== "" && !isCodeInRange(linkedQR)}
                helperText={
                  linkedQR !== "" && !isCodeInRange(linkedQR)
                    ? "Invalid. Must be integer between 10001 and 10375."
                    : "For sharing an account with a family member."
                }
              />
            </Grid>

            {/* Notification area */}
            {notification && (
              <Grid item xs={12}>
                <Alert
                  severity={notification.type}
                  onClose={() => setNotification(null)}
                  variant="filled"
                >
                  {notification.message}
                </Alert>
              </Grid>
            )}

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSelectedCamper(null);
                    setAccountQR("");
                    setLinkedQR("");
                    setNotification(null);
                  }}
                  disabled={submitting}
                >
                  Reset Form
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={submitting || !selectedCamper || isEditingLocked}
                >
                  {submitting ? <CircularProgress size={24} /> : "Save QR Codes"}
                </Button>
              </Stack>
            </Grid>

          </Grid>
        </Box>
      )}

      {/* Verification Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle sx={{ fontWeight: "bold" }}>🔒 Authenticate Operator</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            To change the "Allow Unassignment" security setting, please enter user <strong>Dylan's</strong> account password:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlePasswordSubmit();
              }
            }}
          />
          {errorMsg && (
            <Typography color="error" variant="body2" sx={{ mt: 1, fontWeight: "medium" }}>
              ⚠️ {errorMsg}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} variant="outlined">Cancel</Button>
          <Button onClick={handlePasswordSubmit} variant="contained" color="warning">Verify & Toggle</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AssignQRCodes;
