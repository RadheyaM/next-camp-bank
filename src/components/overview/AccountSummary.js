import { Fragment } from "react";
import TransactionsTable from "./TransactionTable";
import styles from "./AccountSummary.module.css";

const AccountSummary = (props) => {
  const { camper, camperTrans, balance } = props;
  const formattedCurrentAccountBalance = balance.data.data.balance.toLocaleString(
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
