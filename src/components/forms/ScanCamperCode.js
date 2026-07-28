import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./ScanCamperCode.module.css";
import Card from "../UI/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "@tanstack/react-query";
import Table from "../UI/Table";
import { euro } from "../../../lib/helpers";

const ScanCamperCode = () => {
  const router = useRouter();
  const [enteredCode, setEnteredCode] = useState("");
  const [alert, setAlert] = useState(false);
  const [isResolving, setIsResolving] = useState(false);

  const codeInputHandler = (event) => {
    setEnteredCode(event.target.value);
  };

  const { data: transQuery, isLoading } = useQuery(
    ["allTransactions"],
    async () => {
      const res = await fetch("/api/campers/get-all-trans");
      if (!res.ok) throw new Error("Failed to fetch transactions");
      return res.json();
    },
    {
      refetchInterval: 3000, // Poll every 3 seconds for live updates!
    }
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!enteredCode.trim() || isResolving) return;
    setIsResolving(true);
    try {
      const response = await fetch(`/api/campers/resolve-code?code=${enteredCode.trim()}`);
      if (response.ok) {
        const result = await response.json();
        await router.push(`/campers/${result.targetCode}?scannedCode=${enteredCode.trim()}`);
      } else {
        await router.push(`/campers/${enteredCode.trim()}?scannedCode=${enteredCode.trim()}`);
      }
    } catch (err) {
      console.error("Error resolving scan code:", err);
      await router.push(`/campers/${enteredCode.trim()}?scannedCode=${enteredCode.trim()}`);
    } finally {
      setIsResolving(false);
    }
    setAlert(false);
  };

  const transactions = transQuery?.data || [];
  // Sort descending by date and slice top 25
  const sortedRecent = [...transactions]
    .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))
    .slice(0, 25);

  const successParam = router.query.success;
  const errorParam = router.query.error;
  const errorMsg = router.query.msg;

  const handleCloseBanner = () => {
    router.replace("/", undefined, { shallow: true });
  };



  return (
    <Paper elevation={6} sx={{
      width: "95%", 
      minHeight: "100vh", 
      height: "auto", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center",
      padding: { xs: "2rem 1rem", md: "4rem 2rem" }, 
      backgroundColor: "#f8f8ff",
      margin: "0 auto",
      gap: "2rem"
    }}>
      <Snackbar
        open={!!successParam}
        autoHideDuration={2000}
        onClose={handleCloseBanner}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" onClose={handleCloseBanner} sx={{ width: "100%" }}>
          The transaction was processed and the account balance updated successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorParam}
        onClose={handleCloseBanner}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error" onClose={handleCloseBanner} sx={{ width: "100%" }}>
          <strong>Transaction Failed:</strong> {errorMsg || "An error occurred while processing the transaction."}
        </Alert>
      </Snackbar>

      <Card sx={{ width: "100%", maxWidth: "800px", padding: "2rem" }}>
        <form onSubmit={submitHandler} className={styles.enterCodeForm}>
          <div className={styles.inputWrapper}>
            <TextField
              onChange={codeInputHandler}
              id="code-input"
              label="Scan or Enter ID manually..."
              variant="standard"
              autoFocus={true}
              fullWidth
              disabled={isResolving}
            />
          </div>
          <div className={styles.findBtnDiv} style={{ marginTop: "1rem" }}>
            <Button size="large" variant="contained" type="submit" disabled={isResolving}>
              {isResolving ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Find"}
            </Button>
          </div>
        </form>
      </Card>

      {/* Divider */}
      <Divider sx={{ width: "100%", maxWidth: "800px", my: 1 }} />

      {/* Recent Transactions List (25 Rows) */}
      <Box sx={{ width: "100%", maxWidth: "800px", textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#1976d2", textTransform: "uppercase", fontSize: "1.1rem" }}>
          📊 Bank Live Transactions Feed (Last 25)
        </Typography>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 3 }}>
            <CircularProgress size={30} />
            <Typography sx={{ ml: 2, fontSize: "0.9rem" }}>Loading transactions feed...</Typography>
          </Box>
        ) : sortedRecent.length > 0 ? (
          <div style={{ overflowX: "auto", width: "100%" }}>
            <Table style={{ width: "100%", minWidth: "750px", borderCollapse: "collapse", fontSize: "0.8rem", backgroundColor: "#fff" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #1976d2", color: "#1976d2" }}>
                  <th style={{ padding: "8px 6px", fontWeight: "bold" }}>Acc ID</th>
                  <th style={{ padding: "8px 6px", fontWeight: "bold" }}>Name</th>
                  <th style={{ padding: "8px 6px", fontWeight: "bold" }}>Accessed By</th>
                  <th style={{ padding: "8px 6px", fontWeight: "bold" }}>Date</th>
                  <th style={{ padding: "8px 6px", fontWeight: "bold" }}>Category</th>
                  <th style={{ padding: "8px 6px", fontWeight: "bold" }}>Amount</th>
                  <th style={{ padding: "8px 6px", fontWeight: "bold" }}>By</th>
                </tr>
              </thead>
              <tbody>
                {sortedRecent.map((t) => {
                  const linkPath = `/campers/${t.accountId}`;
                  const time = new Date(t.timeStamp).toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' });
                  const date = new Date(t.timeStamp).toLocaleDateString("en-GB");
                  return (
                    <tr key={t._id} style={{ borderBottom: "1px solid #e0e0e0" }}>
                      <td style={{ padding: "8px 6px", fontWeight: "bold" }}>
                        <Link href={linkPath} style={{ textDecoration: "none", color: "#1976d2" }}>
                          {t.accountId}
                        </Link>
                      </td>
                      <td style={{ padding: "8px 6px" }}>{t.name}</td>
                      <td style={{ padding: "8px 6px", fontStyle: "italic", color: "#555" }}>
                        {t.accessedBy || t.name}
                      </td>
                      <td style={{ padding: "8px 6px" }}>{date} {time}</td>
                      <td style={{ padding: "8px 6px" }}>{t.category}</td>
                      <td style={{ padding: "8px 6px", fontWeight: "bold", color: t.type === "Deposit" ? "green" : "red" }}>
                        {t.type === "Deposit" ? "+" : "-"}{euro.format(Number(t.amount))}
                      </td>
                      <td style={{ padding: "8px 6px", color: "#666" }}>{t.user}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : (
          <Typography variant="body2" sx={{ color: "#666", fontStyle: "italic", py: 3 }}>
            No transaction data found in database.
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default ScanCamperCode;
