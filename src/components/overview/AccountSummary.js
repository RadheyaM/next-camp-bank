import { Fragment } from "react";
import TransactionsTable from "./TransactionTable";
import styles from "./AccountSummary.module.css";

const AccountSummary = (props) => {
  const { camper, camperTrans } = props;
  // console.log("accountSummary: ", camperTrans);
  const startingBalance = Number(camper.startingBalance);
  const deposits = camperTrans.map((trans) => {
    if (trans.type === "deposit") {
      return parseFloat(trans.amount);
    } else {
      return 0;
    }
  });
  const payments = camperTrans.map((trans) => {
    if (trans.type === "payment") {
      return parseFloat(trans.amount);
    } else {
      return 0;
    }
  });
  const transactionBalance = (depArray, payArray) => {
    let sum1 = 0;
    let sum2 = 0;

    for (let i = 0; i < depArray.length; i++) {
      sum1 += depArray[i];
    }

    for (let i = 0; i < payArray.length; i++) {
      sum2 += payArray[i];
    }
    return sum1 - sum2;
  };

  const currentAccountBalance =
    startingBalance + transactionBalance(deposits, payments);
  const formattedCurrentAccountBalance = currentAccountBalance.toLocaleString(
    "en-US",
    {
      style: "currency",
      currency: "EUR",
    }
  );
  return (
    <Fragment>
      <h2>Account Details</h2>
      <div className={styles.accountDetails}>
        <h3>{camper.accountId}</h3>
        <h3>{camper.name}</h3>
        <h3>{formattedCurrentAccountBalance}</h3>
      </div>
    </Fragment>
  );
};

export default AccountSummary;
