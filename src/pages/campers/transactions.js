if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import AllTransactionsTable from "@/components/transactions/AllTransactionsTable";
import { MongoClient } from "mongodb";

const Transactions = props => {
  return (
    <AllTransactionsTable allTrans={props.allTrans} />
  );
};



export default Transactions

export const getStaticProps = async (context) => {
  const mongoClient = new MongoClient(process.env.CONNECTION);

  const transactionData = await mongoClient.db().collection("Transactions").find().toArray();
  return {
    props: {
      allTrans: JSON.parse(JSON.stringify(transactionData))
    }
  }
};