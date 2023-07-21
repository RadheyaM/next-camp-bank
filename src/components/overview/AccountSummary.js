import { Fragment } from "react";
import styles from "./AccountSummary.module.css";
import { euro } from "../../../lib/helpers";


const AccountSummary = (props) => {
  const { camper, query } = props;
  const transData = query.data.data.data;
  const camperId = camper.accountId;
  let balance = 0;

  const calcBalance = (transData) => {
    const depLst = [];
    const payLst = [];
    let depTotal = 0;
    let payTotal = 0;
    transData.map((tran) => {
      if (tran.type === "Payment") {
        payLst.push(Number(tran.amount));
        // console.log("pay", tran.amount);
      } else {
        depLst.push(Number(tran.amount))
        // console.log("dep", tran.amount);
      }
    });
    for (let i = 0; i < depLst.length; i++) {
      depTotal += depLst[i];
    }
  
    for (let i = 0; i < payLst.length; i++) {
      payTotal += payLst[i];
    }
    // console.log("depLst, payLst", depLst, payLst);
    return depTotal - payTotal
  }

  try {
    balance = props.balance.data.data.data
  } catch (err) {
    balance = 0;
  }
  // console.log("balance: ", balance)
  return (
    <Fragment>
      <h2>Account Details</h2>
      <div className={styles.accountDetails}>
        <h3>{camper.accountId}&nbsp;|&nbsp;</h3>
        <h3>{camper.firstName + " " + camper.lastName}&nbsp;|&nbsp;</h3>
        <h3>{euro.format(Number(balance))}</h3>
      </div>
    </Fragment>
  );
};

export default AccountSummary;
