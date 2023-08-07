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
				{trans && trans.map((tran) => (
					<AllTransRows key={tran._id} trans={tran} />
				))}
				{!trans && 
					<tr id="unique">
						<td colSpan={8} id="unique2"><strong>Select Filters to display data...</strong></td>
					</tr>
				}
			</tbody>
		</Table>
	)
};

export default AdminTransTable;