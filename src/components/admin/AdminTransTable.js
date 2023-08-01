import Table from "../UI/Table";

const AdminTransTable = () => {
  return (
		<Table>
			<caption><h1>All Transactions</h1></caption>
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
				<tr>
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>4</td>
					<td>5</td>
					<td>6</td>
					<td>7</td>
					<td>8</td>
				</tr>
			</tbody>
		</Table>
	)
};

export default AdminTransTable;