import { useState } from "react";
import styles from "./NewTransForm.module.css";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Badge from '@mui/material/Badge';
import Stack from "@mui/material/Stack";
import { euro } from "../../../lib/helpers";

const NewTransForm = (props) => {
  const { camper } = props;
  const camperId = camper.accountId;
  const firstName = camper.firstName;
  const lastName = camper.lastName;
  const name = firstName + " " + lastName;
  const [enteredDeposit, setEnteredDeposit] = useState("");
  const [enteredBook, setEnteredBook] = useState("");
  const [enteredTuckshop, setEnteredTuckshop] = useState("");
  const [enteredPopcorn, setEnteredPopcorn] = useState("");
  const [enteredCandyfloss, setEnteredCandyfloss] = useState("");
  const [enteredIcecream, setEnteredIcecream] = useState("");
  const [enteredWithdrawal, setEnteredWithdrawal] = useState("");
  const [enteredAdj, setEnteredAdj] = useState("");
  const [depNote, setDepNote] = useState("");
  const [bookNote, setBookNote] = useState("");
  const [tuckNote, setTuckNote] = useState("");
  const [withNote, setWithNote] = useState("");
  const [adjNote, setAdjNote] = useState("");
  const [alert, setAlert] = useState(false);
  const [enoughCheck, setEnoughCheck] = useState("");
  const inputHandler = (identifier, event) => {
    if (identifier === "deposit") {
      setEnteredDeposit(event.target.value);
    } else if (identifier === "book") {
      setEnteredBook(event.target.value);
    } else if (identifier === "tuckshop") {
      setEnteredTuckshop(event.target.value);
    } else if (identifier === "popcorn") {
      setEnteredPopcorn(event.target.value);
    } else if (identifier === "candyfloss") {
      setEnteredCandyfloss(event.target.value)
    } else if (identifier === "icecream") {
      setEnteredIcecream(event.target.value)
    } else if (identifier === "withdrawal") {
      setEnteredWithdrawal(event.target.value.toString());
    } else if (identifier === "adjustment") {
      setEnteredAdj(event.target.value);
    } else if (identifier === "depNote") {
      setDepNote(event.target.value);
    } else if (identifier === "bookNote") {
      setBookNote(event.target.value);
    } else if (identifier === "tuckNote") {
      setTuckNote(event.target.value);
    } else if (identifier === "adjNote") {
      setAdjNote(event.target.value);
    } else {
      setWithNote(event.target.value);
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    // calc balance, return if balance negative.
    const enoughCheck =
      Number(props.balance.data.data.data) +
      Number(enteredDeposit) -
      (Number(enteredBook) +
        Number(enteredPopcorn) +
        Number(enteredCandyfloss) +
        Number(enteredIcecream) +
        Number(enteredTuckshop) +
        Number(enteredWithdrawal) +
        Number(enteredAdj));
    if (enoughCheck < 0) {
      setAlert(true);
      setEnoughCheck(enoughCheck);
      return;
    }
    let dT = {};
    let bT = {};
    let tT = {};
    let cT = {};
    let pT = {};
    let iT = {};
    let wT = {};
    let aT = {};
    let bal = {
      balance: enoughCheck,
    };
    let localName = {
      name: name,
    };
    const user = localStorage.getItem("User");
    if (enteredDeposit !== "" && enteredDeposit !== 0) {
      dT = {
        accountId: camperId,
        name: name,
        type: "Deposit",
        category: "Deposit",
        amount: enteredDeposit,
        note: depNote,
        user: user,
      };
    }
    if (enteredBook !== "" && enteredBook !== 0) {
      bT = {
        accountId: camperId,
        name: name,
        type: "Payment",
        category: "Book",
        amount: enteredBook,
        note: bookNote,
        user: user,
      };
    }
    if (enteredTuckshop !== "" && enteredTuckshop !== 0) {
      tT = {
        accountId: camperId,
        name: name,
        type: "Payment",
        category: "Tuckshop",
        amount: enteredTuckshop,
        note: tuckNote,
        user: user,
      };
    }
    if (enteredPopcorn !== "" && enteredPopcorn !== 0) {
      pT = {
        accountId: camperId,
        name: name,
        type: "Payment",
        category: "Popcorn",
        amount: enteredPopcorn,
        note: tuckNote,
        user: user,
      };
    }
    if (enteredIcecream !== "" && enteredIcecream !== 0) {
      iT = {
        accountId: camperId,
        name: name,
        type: "Payment",
        category: "Icecream",
        amount: enteredIcecream,
        note: tuckNote,
        user: user,
      };
    }
    if (enteredWithdrawal !== "" && enteredWithdrawal !== 0) {
      wT = {
        accountId: camperId,
        name: name,
        type: "Payment",
        category: "Withdrawal",
        amount: enteredWithdrawal,
        note: withNote,
        user: user,
      };
    };
    if (enteredAdj !== "" && enteredAdj !== 0) {
      aT = {
        accountId: camperId,
        name: name,
        type: "Adjustment",
        category: "Adjustment",
        amount: enteredAdj,
        note: adjNote,
        user: user,
      };
    };
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
    //save for 'last transaction' message.
    localStorage.setItem(
      "Alert",
      JSON.stringify([dT, bT, tT, pT, iT, wT, aT, bal, localName])
    );
    setEnteredDeposit("");
    setEnteredBook("");
    setEnteredTuckshop("");
    setEnteredPopcorn("");
    setEnteredIcecream("");
    setEnteredWithdrawal("");
    setDepNote("");
    setBookNote("");
    setTuckNote("");
    setWithNote("");
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.newTransForm}>
        <h2>Create Transactions</h2>
        {/* <h2>{props.balance.data.data.data}</h2> */}
        <Alert severity="info" variant="outlined">
            You can process multiple transactions at the same time as long as there is enough money in the account.
        </Alert>
        <p></p>
        <Alert severity="info" variant="outlined">
            Leave fields blank where not applicable, e.g. no withdrawal, leave
            blank.
        </Alert>
        <h3 className={styles.subheader}>Deposit & Withdraw</h3>
        <div className={styles.inputsCenter}>
          <div>
            <TextField
              onWheel={() => document.activeElement.blur()}
              onChange={(event) => {
                inputHandler("deposit", event);
              }}
              inputProps={{
                step: 0.01,
              }}
              type="number"
              id="deposit"
              value={enteredDeposit}
              variant="outlined"
              label="Deposit €"
            />
          </div>
          <div>
            <TextField
              onWheel={() => document.activeElement.blur()}
              onChange={(event) => {
                inputHandler("withdrawal", event);
              }}
              inputProps={{
                step: 0.01,
              }}
              type="number"
              id="withdraw"
              value={enteredWithdrawal}
              variant="outlined"
              label="Withdraw €"
            />
          </div>
        </div>
        <h3>Bookshop</h3>
        <div className={styles.inputsCenter}>
          <div>
            <TextField
              onWheel={() => document.activeElement.blur()}
              onChange={(event) => {
                inputHandler("book", event);
              }}
              inputProps={{
                step: 0.01,
              }}
              type="number"
              id="book"
              value={enteredBook}
              variant="outlined"
              label="Book €"
            />
          </div>
        </div>
        <h3>Tuckshop</h3>
        <div className={styles.inputs}>
          <div>
            <TextField
              onWheel={() => document.activeElement.blur()}
              onChange={(event) => {
                inputHandler("tuckshop", event);
              }}
              inputProps={{
                step: 0.01,
              }}
              type="number"
              id="tuckshop"
              value={enteredTuckshop}
              variant="outlined"
              label="Tuckshop €"
            />
          </div>
          <div>
            <TextField
              onWheel={() => document.activeElement.blur()}
              onChange={(event) => {
                inputHandler("popcorn", event);
              }}
              inputProps={{
                step: 0.01,
              }}
              type="number"
              id="popcorn"
              value={enteredPopcorn}
              variant="outlined"
              label="Pop/Candy €"
            />
          </div>
          <div>
            <TextField
              onWheel={() => document.activeElement.blur()}
              onChange={(event) => {
                inputHandler("icecream", event);
              }}
              inputProps={{
                step: 0.01,
              }}
              type="number"
              id="icecream"
              value={enteredIcecream}
              variant="outlined"
              label="Ice Cream €"
            />
          </div> 
        </div>
        <h2 className={styles.btnHeader}>Check Out</h2>
        <div className={styles.submitBtn}>
          <Button size="large" variant="contained" type="submit">
            Complete Transaction(s)
          </Button>
        </div>
        {alert && (
          <Stack sx={{ width: "25%" }} spacing={2}>
            <Alert
              severity="warning"
              onClose={() => {
                setAlert(false);
              }}
            >
              <AlertTitle>Warning</AlertTitle>
              Cannot proceed: Balance will be negative:
              {euro.format(enoughCheck)}.
            </Alert>
          </Stack>
        )}
        <h3>Add a short note for special transactions</h3>
        <div className={styles.inputs}>
          <div>
            <TextField
              onChange={(event) => {
                inputHandler("depNote", event);
              }}
              type="text"
              id="depNote"
              value={depNote}
              variant="standard"
              label="Deposit Note"
              multiline
            />
          </div>
          <div>
            <TextField
              onChange={(event) => {
                inputHandler("bookNote", event);
              }}
              type="text"
              id="bookNote"
              value={bookNote}
              variant="standard"
              label="Book Note"
              multiline
            />
          </div>
          <div>
            <TextField
              onChange={(event) => {
                inputHandler("tuckNote", event);
              }}
              type="text"
              id="tuckNote"
              value={tuckNote}
              variant="standard"
              label="Tuckshop Note"
              multiline
            />
          </div>
          <div>
            <TextField
              onChange={(event) => {
                inputHandler("withNote", event);
              }}
              type="text"
              id="withNote"
              value={withNote}
              variant="standard"
              label="Withdraw Note"
              multiline
            />
          </div>
        </div>
      </form>
    </>
    
  );
};

export default NewTransForm;