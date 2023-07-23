import Table from "../UI/Table";
import AllTransRows from "./AllTransRows";
import Card from "../UI/Card";
import styles from "./AllTransactionsTable.module.css";

const AllTransactionsTable = (props) => {
  const { query } = props;
  const allTrans = query.data.data.data;
  // console.log("CAMPERTRANS", allTrans)
  return (
    <Card>
      <h2>All Transactions</h2>
      {/* <div className={styles.totalsContainer}>
        <div>Total Deposits: </div>
        <div>Total Books: </div>
        <div>Total Tuckshop: </div>
        <div>Total Withdrawn: </div>
      </div> */}
      <Table>
        <thead>
          <tr>
            <th>Added By</th>
            <th>Account Code</th>
            <th>Name</th>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {allTrans.map((trans) => (
            <AllTransRows key={trans._id} trans={trans} />
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default AllTransactionsTable;
