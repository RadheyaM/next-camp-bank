import { Fragment } from "react";
import styles from "./AccountSummary.module.css";


const AccountSummary = (props) => {
  const { camper, trans } = props;
  const camperId = camper.accountId;

  const calcBalance = (trans) => {
    const depLst = [];
    const payLst = [];
    let depTotal = 0;
    let payTotal = 0;
    trans.map((tran) => {
      if (tran.type === "Payment") {
        payLst.push(Number(tran.amount));
        console.log("pay", tran.amount);
      } else {
        depLst.push(Number(tran.amount))
        console.log("dep", tran.amount);
      }
    });
    for (let i = 0; i < depLst.length; i++) {
      depTotal += depLst[i];
    }
  
    for (let i = 0; i < payLst.length; i++) {
      payTotal += payLst[i];
    }
    console.log("depLst, payLst", depLst, payLst);
    return depTotal - payTotal
  }
  const balance = calcBalance(trans);
  console.log("balance: ", balance)
  const formattedCurrentAccountBalance = balance.toLocaleString(
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
        <h3>{camper.accountId}&nbsp;|&nbsp;</h3>
        <h3>{camper.firstName + " " + camper.lastName}&nbsp;|&nbsp;</h3>
        <h3>{formattedCurrentAccountBalance}</h3>
      </div>
    </Fragment>
  );
};

export default AccountSummary;
