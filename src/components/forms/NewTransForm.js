import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField, Grid, Box, Typography, Alert, AlertTitle, Stack, Divider, Paper } from "@mui/material";
import { euro } from "../../../lib/helpers";

const NewTransForm = (props) => {
  const { camper } = props;
  const camperId = camper.accountId;
  const firstName = camper.firstName;
  const lastName = camper.lastName;
  const name = (firstName || lastName) ? `${firstName || ""} ${lastName || ""}`.trim() : `Account ${camperId}`;
  
  const roster = props.assignedCampers || [];
  
  // Compute selected accessing member purely based on the scanned code
  let selectedMember = null;
  if (props.scannedCode && roster.length > 0) {
    selectedMember = roster.find(c => (c.accountQRCode || "").toString().trim() === props.scannedCode.toString().trim());
  }
  if (!selectedMember && roster.length > 0) {
    // Default to the primary member (who does not have linkedQRCode, meaning they are the root family account)
    selectedMember = roster.find(c => !(c.linkedQRCode || "").toString().trim()) || roster[0];
  }

  // State variables for amounts
  const [enteredDeposit, setEnteredDeposit] = useState("");
  const [enteredBook, setEnteredBook] = useState("");
  const [enteredTuckshop, setEnteredTuckshop] = useState("");
  const [enteredPopcorn, setEnteredPopcorn] = useState("");
  const [enteredIcecream, setEnteredIcecream] = useState("");
  const [enteredWithdrawal, setEnteredWithdrawal] = useState("");
  const [enteredAdj, setEnteredAdj] = useState("");
  
  // State variables for notes
  const [depNote, setDepNote] = useState("");
  const [bookNote, setBookNote] = useState("");
  const [tuckNote, setTuckNote] = useState("");
  const [withNote, setWithNote] = useState("");
  const [adjNote, setAdjNote] = useState("");
  
  // State variables for warnings
  const [alert, setAlert] = useState(false);
  const [enoughCheck, setEnoughCheck] = useState("");

  const inputHandler = (identifier, event) => {
    const val = event.target.value;
    if (identifier === "deposit") {
      setEnteredDeposit(val);
    } else if (identifier === "book") {
      setEnteredBook(val);
    } else if (identifier === "tuckshop") {
      setEnteredTuckshop(val);
    } else if (identifier === "popcorn") {
      setEnteredPopcorn(val);
    } else if (identifier === "icecream") {
      setEnteredIcecream(val);
    } else if (identifier === "withdrawal") {
      setEnteredWithdrawal(val.toString());
    } else if (identifier === "adjustment") {
      setEnteredAdj(val);
    } else if (identifier === "depNote") {
      setDepNote(val);
    } else if (identifier === "bookNote") {
      setBookNote(val);
    } else if (identifier === "tuckNote") {
      setTuckNote(val);
    } else if (identifier === "adjNote") {
      setAdjNote(val);
    } else {
      setWithNote(val);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // calculate balance, return if balance negative.
    const calculatedDiff =
      Number(props.balance.data.data.data) +
      Number(enteredDeposit) -
      (Number(enteredBook) +
        Number(enteredPopcorn) +
        Number(enteredIcecream) +
        Number(enteredTuckshop) +
        Number(enteredWithdrawal) +
        Number(enteredAdj));

    if (calculatedDiff < 0) {
      setAlert(true);
      setEnoughCheck(calculatedDiff);
      return;
    }

    let dT = {};
    let bT = {};
    let tT = {};
    let pT = {};
    let iT = {};
    let wT = {};
    let aT = {};
    
    let bal = {
      balance: calculatedDiff,
    };
    let localName = {
      name: name,
    };
    
    const user = localStorage.getItem("User");
    const activeMemberName = selectedMember ? `${selectedMember.firstName || ""} ${selectedMember.lastName || ""}`.trim() : name;
    const activeMemberCode = selectedMember ? (selectedMember.accountQRCode || "").toString().trim() : camperId;

    if (enteredDeposit !== "" && Number(enteredDeposit) !== 0) {
      dT = {
        accountId: camperId,
        name: name,
        type: "Deposit",
        category: "Deposit",
        amount: enteredDeposit,
        note: depNote,
        user: user,
        accessedBy: activeMemberName,
        scannedCode: activeMemberCode,
      };
    }
    if (enteredBook !== "" && Number(enteredBook) !== 0) {
      bT = {
        accountId: camperId,
        name: name,
        type: "Payment",
        category: "Book",
        amount: enteredBook,
        note: bookNote,
        user: user,
        accessedBy: activeMemberName,
        scannedCode: activeMemberCode,
      };
    }
    if (enteredTuckshop !== "" && Number(enteredTuckshop) !== 0) {
      tT = {
        accountId: camperId,
        name: name,
        type: "Payment",
        category: "Tuckshop",
        amount: enteredTuckshop,
        note: tuckNote,
        user: user,
        accessedBy: activeMemberName,
        scannedCode: activeMemberCode,
      };
    }
    if (enteredPopcorn !== "" && Number(enteredPopcorn) !== 0) {
      pT = {
        accountId: camperId,
        name: name,
        type: "Payment",
        category: "Popcorn",
        amount: enteredPopcorn,
        note: tuckNote, // shares tuckNote
        user: user,
        accessedBy: activeMemberName,
        scannedCode: activeMemberCode,
      };
    }
    if (enteredIcecream !== "" && Number(enteredIcecream) !== 0) {
      iT = {
        accountId: camperId,
        name: name,
        type: "Payment",
        category: "Icecream",
        amount: enteredIcecream,
        note: tuckNote, // shares tuckNote
        user: user,
        accessedBy: activeMemberName,
        scannedCode: activeMemberCode,
      };
    }
    if (enteredWithdrawal !== "" && Number(enteredWithdrawal) !== 0) {
      wT = {
        accountId: camperId,
        name: name,
        type: "Payment",
        category: "Withdrawal",
        amount: enteredWithdrawal,
        note: withNote,
        user: user,
        accessedBy: activeMemberName,
        scannedCode: activeMemberCode,
      };
    }
    if (enteredAdj !== "" && Number(enteredAdj) !== 0) {
      aT = {
        accountId: camperId,
        name: name,
        type: "Adjustment",
        category: "Adjustment",
        amount: enteredAdj,
        note: adjNote,
        user: user,
        accessedBy: activeMemberName,
        scannedCode: activeMemberCode,
      };
    }

    // transfer transaction data up to parent.
    props.onAddTransactions({
      dT,
      bT,
      tT,
      pT,
      iT,
      wT,
      aT,
      bal,
    });

    // save for 'last transaction' message.
    localStorage.setItem(
      "Alert",
      JSON.stringify([dT, bT, tT, pT, iT, wT, aT, bal, localName])
    );

    // Reset amounts
    setEnteredDeposit("");
    setEnteredBook("");
    setEnteredTuckshop("");
    setEnteredPopcorn("");
    setEnteredIcecream("");
    setEnteredWithdrawal("");
    setEnteredAdj("");
    
    // Reset notes
    setDepNote("");
    setBookNote("");
    setTuckNote("");
    setWithNote("");
    setAdjNote("");
    
    setAlert(false);
  };

  return (
    <Box component="form" onSubmit={submitHandler} noValidate sx={{ width: "100%" }}>
      <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Create Transaction</h2>
      <Typography variant="body2" color="textSecondary" align="center" sx={{ fontStyle: "italic", mb: 3 }}>
        You can enter multiple transaction types at once and the account will balance out automatically.
      </Typography>

      {/* Dynamic negative balance error */}
      {alert && (
        <Alert severity="warning" onClose={() => setAlert(false)} sx={{ mb: 2 }}>
          <AlertTitle>Insufficient Funds</AlertTitle>
          Cannot proceed. Account balance will go negative: <strong>{euro.format(enoughCheck)}</strong>.
        </Alert>
      )}

      <Grid container spacing={3}>
        
        {/* Core Actions: Deposit & Withdrawal */}
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 2, backgroundColor: "#f0f4f8" }}>
            <Typography variant="subtitle2" sx={{ color: "black", fontWeight: "bold", mb: 1.5, textTransform: "uppercase" }}>
              📥 Deposit Funds
            </Typography>
            <Stack spacing={1.5}>
              <TextField
                onWheel={() => document.activeElement.blur()}
                onChange={(e) => inputHandler("deposit", e)}
                inputProps={{ step: 0.01 }}
                type="number"
                id="deposit"
                value={enteredDeposit}
                variant="outlined"
                label="Deposit €"
                fullWidth
                size="small"
              />
              <TextField
                onChange={(e) => inputHandler("depNote", e)}
                type="text"
                id="depNote"
                value={depNote}
                variant="standard"
                label="[Optional] Note"
                InputLabelProps={{ style: { fontStyle: "italic", fontSize: "0.82rem" } }}
                fullWidth
                size="small"
              />
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 2, backgroundColor: "#f0f4f8" }}>
            <Typography variant="subtitle2" sx={{ color: "black", fontWeight: "bold", mb: 1.5, textTransform: "uppercase" }}>
              📤 Cash Withdrawal
            </Typography>
            <Stack spacing={1.5}>
              <TextField
                onWheel={() => document.activeElement.blur()}
                onChange={(e) => inputHandler("withdrawal", e)}
                inputProps={{ step: 0.01 }}
                type="number"
                id="withdraw"
                value={enteredWithdrawal}
                variant="outlined"
                label="Withdraw €"
                fullWidth
                size="small"
              />
              <TextField
                onChange={(e) => inputHandler("withNote", e)}
                type="text"
                id="withNote"
                value={withNote}
                variant="standard"
                label="[Optional] Note"
                InputLabelProps={{ style: { fontStyle: "italic", fontSize: "0.82rem" } }}
                fullWidth
                size="small"
              />
            </Stack>
          </Paper>
        </Grid>

        {/* Camp Purchases: Bookshop & General Adjustments */}
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 2, backgroundColor: "#fafafa" }}>
            <Typography variant="subtitle2" sx={{ color: "black", fontWeight: "bold", mb: 1.5, textTransform: "uppercase" }}>
              📖 Bookshop Purchases
            </Typography>
            <Stack spacing={1.5}>
              <TextField
                onWheel={() => document.activeElement.blur()}
                onChange={(e) => inputHandler("book", e)}
                inputProps={{ step: 0.01 }}
                type="number"
                id="book"
                value={enteredBook}
                variant="outlined"
                label="Bookshop €"
                fullWidth
                size="small"
              />
              <TextField
                onChange={(e) => inputHandler("bookNote", e)}
                type="text"
                id="bookNote"
                value={bookNote}
                variant="standard"
                label="[Optional] Note"
                InputLabelProps={{ style: { fontStyle: "italic", fontSize: "0.82rem" } }}
                fullWidth
                size="small"
              />
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 2, backgroundColor: "#fafafa" }}>
            <Typography variant="subtitle2" sx={{ color: "black", fontWeight: "bold", mb: 1.5, textTransform: "uppercase" }}>
              ⚙️ Account Adjustments
            </Typography>
            <Typography variant="caption" color="textSecondary" display="block" sx={{ fontStyle: "italic", mb: 1.5, mt: -1 }}>
              Adjustments deduct entered amount from account.
            </Typography>
            <Stack spacing={1.5}>
              <TextField
                onWheel={() => document.activeElement.blur()}
                onChange={(e) => inputHandler("adjustment", e)}
                inputProps={{ step: 0.01 }}
                type="number"
                id="adjustment"
                value={enteredAdj}
                variant="outlined"
                label="Adjustment €"
                fullWidth
                size="small"
              />
              <TextField
                onChange={(e) => inputHandler("adjNote", e)}
                type="text"
                id="adjNote"
                value={adjNote}
                variant="standard"
                label="[Optional] Note"
                InputLabelProps={{ style: { fontStyle: "italic", fontSize: "0.82rem" } }}
                fullWidth
                size="small"
              />
            </Stack>
          </Paper>
        </Grid>

        {/* Tuckshop & Snack Ledger */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2, backgroundColor: "#fffde7" }}>
            <Typography variant="subtitle2" sx={{ color: "black", fontWeight: "bold", mb: 1.5, textTransform: "uppercase" }}>
              🍬 Tuckshop & Snacks Ledger
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 1.5 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  onWheel={() => document.activeElement.blur()}
                  onChange={(e) => inputHandler("tuckshop", e)}
                  inputProps={{ step: 0.01 }}
                  type="number"
                  id="tuckshop"
                  value={enteredTuckshop}
                  variant="outlined"
                  label="Tuckshop €"
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  onWheel={() => document.activeElement.blur()}
                  onChange={(e) => inputHandler("popcorn", e)}
                  inputProps={{ step: 0.01 }}
                  type="number"
                  id="popcorn"
                  value={enteredPopcorn}
                  variant="outlined"
                  label="Popcorn/Candy €"
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  onWheel={() => document.activeElement.blur()}
                  onChange={(e) => inputHandler("icecream", e)}
                  inputProps={{ step: 0.01 }}
                  type="number"
                  id="icecream"
                  value={enteredIcecream}
                  variant="outlined"
                  label="Ice Cream €"
                  fullWidth
                  size="small"
                />
              </Grid>
            </Grid>

            <TextField
              onChange={(e) => inputHandler("tuckNote", e)}
              type="text"
              id="tuckNote"
              value={tuckNote}
              variant="standard"
              label="[Optional] Note"
              InputLabelProps={{ style: { fontStyle: "italic", fontSize: "0.82rem" } }}
              fullWidth
              size="small"
            />
          </Paper>
        </Grid>

        {/* Submit Actions */}
        <Grid item xs={12}>
          <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.2, fontWeight: "bold" }}
            >
              Complete Transaction Slip
            </Button>
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
};

export default NewTransForm;
