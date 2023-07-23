import { useState } from "react";

import styles from "./NewTransForm.module.css";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

const NewTransForm = (props) => {
  const [negativeBalance, setNegativeBalance] = useState();
  const { camper } = props;
  const camperId = camper.accountId;
  const firstName = camper.firstName;
  const lastName = camper.lastName;
  const name = firstName + " " + lastName;
  const [enteredDeposit, setEnteredDeposit] = useState("");
  const [enteredBook, setEnteredBook] = useState("");
  const [enteredTuckshop, setEnteredTuckshop] = useState("");
  const [enteredWithdrawal, setEnteredWithdrawal] = useState("");
  const [depNote, setDepNote] = useState("")
  const [bookNote, setBookNote] = useState("")
  const [tuckNote, setTuckNote] = useState("")
  const [withNote, setWithNote] = useState("")
  const inputHandler = (identifier, event) => {
    if (identifier === "deposit") {
      setEnteredDeposit(event.target.value);
      console.log(event.target.value);
    } else if (identifier === "book") {
      setEnteredBook(event.target.value);
      console.log(event.target.value);
    } else if (identifier === "tuckshop") {
      setEnteredTuckshop(event.target.value);
      console.log(event.target.value);
    } else if (identifier === "withdrawal") {
      setEnteredWithdrawal(event.target.value.toString());
      console.log(event.target.value);
    } else if (identifier === "depNote") {
      setDepNote(event.target.value);
      console.log(event.target.value);
    } else if (identifier === "bookNote") {
      setBookNote(event.target.value);
      console.log(event.target.value);
    } else if (identifier === "tuckNote") {
      setTuckNote(event.target.value);
      console.log(event.target.value);
    } else {
      setWithNote(event.target.value);
      console.log(event.target.value);
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enoughCheck =
      Number(props.balance.data.data.data) +
      Number(enteredDeposit) -
      (Number(enteredBook) + Number(enteredTuckshop) + Number(enteredWithdrawal));
    if (enoughCheck < 0) {
      //add some input feedback
      return;
    }
    let dT = {};
    let bT = {};
    let tT = {};
    let wT = {};
    let newBal = enoughCheck
    let bal = {
      balance: enoughCheck
    };
    console.log(bal.balance)
    if (enteredDeposit !== "" && enteredDeposit !== 0) {
      dT = {
        accountId: camperId,
        name: name,
        type: "Deposit",
        category: "Deposit",
        amount: enteredDeposit,
        note: depNote,
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
      };
    }
    // console.log("deposit: ", depositTransaction);
    // console.log("book: ", bookTransaction);
    // console.log("tuck: ", tuckTransaction);
    // console.log("withdrawal: ", withdrawalTransaction);
    props.onAddTransactions({
      dT,
      bT,
      tT,
      wT,
      bal,
    });
    setEnteredDeposit("");
    setEnteredBook("");
    setEnteredTuckshop("");
    setEnteredWithdrawal("");
    setDepNote("");
    setBookNote("");
    setTuckNote("");
    setWithNote("");
  };

  return (
    <form onSubmit={submitHandler} className={styles.newTransForm}>
      <h2>Create Transactions</h2>
      {/* <h2>{props.balance.data.data.data}</h2> */}
      <p>
        Leave fields blank where not applicable, e.g. no withdrawal, leave
        blank...
      </p>
      <div className={styles.inputs}>
        <div>
          <TextField
            onChange={(event) => {
              inputHandler("deposit", event);
            }}
            type="number"
            id="deposit"
            value={enteredDeposit}
            variant="outlined"
            label="DEPOSIT AMOUNT..."
          />
        </div>
        <div>
          <TextField
            onChange={(event) => {
              inputHandler("book", event);
            }}
            type="number"
            id="book"
            value={enteredBook}
            variant="outlined"
            label="BOOK AMOUNT..."
          />
        </div>
        <div>
          <TextField
            onChange={(event) => {
              inputHandler("tuckshop", event);
            }}
            type="number"
            id="tuckshop"
            value={enteredTuckshop}
            variant="outlined"
            label="TUCKSHOP AMOUNT..."
          />
        </div>
        <div>
          <TextField
            onChange={(event) => {
              inputHandler("withdrawal", event);
            }}
            type="number"
            id="withdraw"
            value={enteredWithdrawal}
            variant="outlined"
            label="WITHDRAWAL AMOUNT..."
          />
        </div>
      </div>
      <div className={styles.submitBtn}>
        <Button variant="contained" type="submit">
          Add Transaction(s)
        </Button>
      </div>
      <div><h3>Add a short note for special transactions</h3></div>
      <div className={styles.inputs}>
        <div>
          <TextField
              onChange={(event) => {
                inputHandler("depNote", event);
              }}
              type="text"
              id="depNote"
              value={depNote}
              variant="outlined"
              label="DEPOSIT NOTE..."
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
              variant="outlined"
              label="BOOK NOTE..."
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
              variant="outlined"
              label="TUCKSHOP NOTE..."
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
              variant="outlined"
              label="WITHDRAWAL NOTE..."
              multiline
            />
        </div>
      </div>
    </form>
  );
};

export default NewTransForm;
