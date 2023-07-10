if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import AllTransactionsTable from "@/components/transactions/AllTransactionsTable";
import { getAllTransactions } from "../api/campers";

const Transactions = props => {
  return (
    <AllTransactionsTable allTrans={props.allTrans} />
  );
};



export default Transactions

export const getStaticProps = async (context) => {
  const transactionData = await getAllTransactions()
  return {
    props: {
      allTrans: transactionData
    }
  }
};