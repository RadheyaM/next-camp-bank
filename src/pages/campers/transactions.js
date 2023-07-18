import clientPromise from "../../../lib/db";
import AllTransactionsTable from "@/components/transactions/AllTransactionsTable";

const Transactions = props => {
  return (
    <AllTransactionsTable allTrans={props.allTrans} />
  );
};

export default Transactions

export const getStaticProps = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("Campers")
    const trans = await db.collection("Transactions").find().toArray();
    return {
      props: {
        allTrans: JSON.parse(JSON.stringify(trans))
      }
    }
  } catch (e) {
    console.error(e);
  }
}