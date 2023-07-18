import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./AccountSummary.module.css";
import axios from "axios";

const AccountSummary = (props) => {
  const { camper } = props;
  const camperId = camper.accountId;
  const balanceApiPath = `/api/campers/${camperId}/getBalance`;
  const balanceQuery = useQuery(
    ["balance"],
    () => {
      return axios({
        method: "get",
        url: balanceApiPath,
        data: {camperId: camperId}
      });
    },
    {
      initialData: {
        data: {
          balance: 0,
        },
      },
      refetchInterval: 1000 * 100,
    }
  );
  console.log("balance", balanceQuery.data)
  // const formattedCurrentAccountBalance = balance.data.data.balance.toLocaleString(
  //   "en-US",
  //   {
  //     style: "currency",
  //     currency: "EUR",
  //   }
  // );
  return (
    <Fragment>
      <h2>Account Details</h2>
      <div className={styles.accountDetails}>
        <h3>{camper.accountId}&nbsp;|&nbsp;</h3>
        <h3>{camper.firstName + " " + camper.lastName}&nbsp;|&nbsp;</h3>
      </div>
    </Fragment>
  );
};

export default AccountSummary;
