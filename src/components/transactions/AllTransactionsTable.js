import Table from "../UI/Table";
import AllTransRows from "./AllTransRows";
import Card from "../UI/Card";

const AllTransactionsTable = (props) => {
  const { allTrans } = props
  console.log("CAMPERTRANS", allTrans)
  return (
    <Card>
      <Table>
        <thead>
          <tr>
            <th>Camper Code</th>
            <th>Transaction Id</th>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {allTrans.map((trans) => (
            <AllTransRows trans={trans} />
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default AllTransactionsTable