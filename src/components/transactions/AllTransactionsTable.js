import Table from "../UI/Table";
import AllTransRows from "./AllTransRows";
import Card from "../UI/Card";
import sortBy from 'array-sort-by';
import Paper from '@mui/material/Paper';

const AllTransactionsTable = (props) => {
  const { query } = props;
  const allTrans = query.data.data.data;
  const sortByDate = sortBy(allTrans, tran => -new Date(tran.timeStamp))
  return (
    <Paper elevation={6} sx={{width: "95%", display: "flex", padding: "5rem", backgroundColor: "#f8f8ff"}}>
      <Card>
        <h1>Recent Transactions</h1>
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
            {sortByDate.map((trans) => (
              <AllTransRows key={trans._id} trans={trans} />
            ))}
          </tbody>
        </Table>
      </Card>
    </Paper>
  );
};

export default AllTransactionsTable;
