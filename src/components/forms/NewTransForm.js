import { useState } from "react";

import styles from "./NewTransForm.module.css";

const NewTransForm = (props) => {
  const [enteredDeposit, setEnteredDeposit] = useState("");
  const [enteredBook, setEnteredBook] = useState("");
  const [enteredTuckshop, setEnteredTuckshop] = useState("");
  const [enteredWithdrawal, setEnteredWithdrawal] = useState("");
  const inputHandler = (identifier, event) => {
    if (identifier === "deposit") {
      setEnteredDeposit(event.target.value);
      console.log(event.target.value)
    } else if (identifier === "book") {
      setEnteredBook(event.target.value);
      console.log(event.target.value)
    } else if (identifier === "tuckshop") {
      setEnteredTuckshop(event.target.value);
      console.log(event.target.value)
    } else {
      setEnteredWithdrawal(event.target.value.toString());
      console.log(event.target.value)
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    let depositTransaction = {};
    let bookTransaction = {};
    let tuckTransaction = {};
    let withdrawalTransaction = {};
    if (enteredDeposit !== "" && enteredDeposit !== 0) {
      depositTransaction = {
        accountId: "This will be taken from url",
        dateTimeStamp: new Date(),
        type: "deposit",
        category: "n/a",
        amount: enteredDeposit.toString()
      }
    }
    if (enteredBook !== "" && enteredBook !== 0) {
      bookTransaction = {
        accountId: "This will be taken from url",
        dateTimeStamp: new Date(),
        type: "payment",
        category: "book",
        amount: enteredBook.toString()
      }
    }
    if (enteredTuckshop !== "" && enteredTuckshop !== 0) {
      tuckTransaction = {
        accountId: "This will be taken from url",
        dateTimeStamp: new Date(),
        type: "payment",
        category: "tuck",
        amount: enteredTuckshop.toString()
      }
    }
    if (enteredWithdrawal !== "" && enteredWithdrawal !== 0) {
      withdrawalTransaction = {
        accountId: "This will be taken from url",
        dateTimeStamp: new Date(),
        type: "payment",
        category: "tuck",
        amount: enteredTuckshop.toString()
      }
    }
    console.log("deposit: ", depositTransaction);
    console.log("book: ", bookTransaction);
    console.log("tuck: ", tuckTransaction);
    console.log("withdrawal: ", withdrawalTransaction);
    setEnteredDeposit("")
    setEnteredBook("")
    setEnteredTuckshop("")
    setEnteredWithdrawal("")
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
          <label htmlFor="deposit">Deposit</label>
          <input
            onChange={(event) => {
              inputHandler("deposit", event);
            }}
            type="number"
            id="deposit"
            value={enteredDeposit}
          />
        </div>
        <div>
          <label htmlFor="book">Book</label>
          <input
            onChange={(event) => {
              inputHandler("book", event);
            }}
            type="number"
            id="book"
            value={enteredBook}
          />
        </div>
        <div>
          <label htmlFor="tuckshop">Tuckshop</label>
          <input
            onChange={(event) => {
              inputHandler("tuckshop", event);
            }}
            type="number"
            id="tuckshop"
            value={enteredTuckshop}
          />
        </div>
        <div>
          <label htmlFor="withdraw">Withdraw</label>
          <input
            onChange={(event) => {
              inputHandler("withdrawal", event);
            }}
            type="number"
            id="withdraw"
            value={enteredWithdrawal}
          />
        </div>
      </div>
      <div className={styles.submitBtn}>
        <button type="submit">Add Transaction(s)</button>
      </div>
    </form>
  );
};

export default NewTransForm;
