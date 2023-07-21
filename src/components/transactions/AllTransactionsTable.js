import Table from "../UI/Table";
import AllTransRows from "./AllTransRows";
import Card from "../UI/Card";

const AllTransactionsTable = (props) => {
  const { query } = props;
  const allTrans = query.data.data.data;
  // console.log("CAMPERTRANS", allTrans)
  return (
    <Card>
      <Table>
        <caption>
          <h2>All Transactions</h2>
        </caption>
        <thead>
          <tr>
            <th>Transaction Id</th>
            <th>Account Code</th>
            <th>Name</th>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
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
