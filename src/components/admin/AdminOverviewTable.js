import Table from "../UI/Table";

const AdminOverviewTable = () => {
	return (
		<Table>
			<caption><h1>Overview</h1></caption>
			<thead>
				<tr>
					<th>Category</th>
					<th>Transaction Count</th>
					<th>Total €</th>
					<th>Balance</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Deposit</td>
					<td>Count</td>
					<td>Total</td>
					<td>Balance</td>
				</tr>
				<tr>
					<td>Book Sales</td>
					<td>Count</td>
					<td>Total</td>
					<td>Balance</td>
				</tr>
				<tr>
					<td>Tuckshop Sales</td>
					<td>Count</td>
					<td>Total</td>
					<td>Balance</td>
				</tr>
				<tr>
					<td>Withdrawals</td>
					<td>Count</td>
					<td>Total</td>
					<td>Balance</td>
				</tr>
				<tr>
					<td>Staff Adjustments</td>
					<td>Count</td>
					<td>Total</td>
					<td>Balance</td>
				</tr>
			</tbody>
		</Table>
	)
}

export default AdminOverviewTable;