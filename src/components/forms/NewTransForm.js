import { useState } from "react";

import styles from "./NewTransForm.module.css";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

const NewTransForm = (props) => {
  const { camper } = props;
  const camperId = camper.accountId;
  const name = camper.name;
  const [enteredDeposit, setEnteredDeposit] = useState("");
  const [enteredBook, setEnteredBook] = useState("");
  const [enteredTuckshop, setEnteredTuckshop] = useState("");
  const [enteredWithdrawal, setEnteredWithdrawal] = useState("");
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
    } else {
      setEnteredWithdrawal(event.target.value.toString());
      console.log(event.target.value);
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    let dT = {};
    let bT = {};
    let tT = {};
    let wT = {};
    if (enteredDeposit !== "" && enteredDeposit !== 0) {
      dT = {
        accountId: camperId,
        name: name,
        type: "Deposit",
        category: "Deposit",
        amount: enteredDeposit,
      };
    }
    if (enteredBook !== "" && enteredBook !== 0) {
      bT = {
        accountId: camperId,
        name: name,
        type: "Payment",
        category: "Book",
        amount: enteredBook,
      };
    }
    if (enteredTuckshop !== "" && enteredTuckshop !== 0) {
      tT = {
        accountId: camperId,
        name: name,
        type: "Payment",
        category: "Tuckshop",
        amount: enteredTuckshop,
      };
    }
    if (enteredWithdrawal !== "" && enteredWithdrawal !== 0) {
      wT = {
        accountId: camperId,
        name: name,
        type: "Payment",
        category: "withdrawal",
        amount: enteredWithdrawal,
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
    });
    setEnteredDeposit("");
    setEnteredBook("");
    setEnteredTuckshop("");
    setEnteredWithdrawal("");
  };

  return (
    <form onSubmit={submitHandler} className={styles.newTransForm}>
      <h2>Create Transactions</h2>
      <p>
        Leave fields blank where not applicable, e.g. no withdrawal, leave
        blank...
      </p>
      <p>Always enter positive transaction values.</p>
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
            label="Enter amt to deposit..."
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
            label="Enter book cost amt..."
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
            label="Enter tuckshop payment amt..."
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
            label="Enter Amt to Withdraw..."
          />
        </div>
      </div>
      <div className={styles.submitBtn}>
        <Button variant="contained" type="submit">
          Add Transaction(s)
        </Button>
      </div>
    </form>
  );
};

export default NewTransForm;
