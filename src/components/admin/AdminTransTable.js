import Table from "../UI/Table";
import AllTransRows from "../transactions/AllTransRows";

const AdminTransTable = ({trans}) => {
  return (
		<Table>
			<caption><h1>Transactions</h1></caption>
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
				{trans.map((trans) => (
					<AllTransRows key={trans._id} trans={trans} />
				))}
			</tbody>
		</Table>
	)
};

export default AdminTransTable;