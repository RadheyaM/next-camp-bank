import Table from "../UI/Table";
import { euro } from "../../../lib/helpers";

const AdminOverviewTable = ({totals}) => {
	return (
		<Table>
			<caption><h1>Overview</h1></caption>
			<thead>
				<tr>
					<th>Category</th>
					<th>Transaction Count</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Deposit</td>
					<td>{totals.depCount}</td>
					<td>{euro.format(totals.dep)}</td>
				</tr>
				<tr>
					<td>Book Sales</td>
					<td>{totals.bookCount}</td>
					<td>{euro.format(totals.book)}</td>
				</tr>
				<tr>
					<td>Tuckshop Sales</td>
					<td>{totals.tuckCount}</td>
					<td>{euro.format(totals.tuck)}</td>
				</tr>
				<tr>
					<td>Withdrawals</td>
					<td>{totals.withCount}</td>
					<td>{euro.format(totals.with)}</td>
				</tr>
				<tr>
					<td>Staff Adjustments</td>
					<td>{totals.adjCount}</td>
					<td>{euro.format(totals.adj)}</td>
				</tr>
			</tbody>
		</Table>
	)
}

export default AdminOverviewTable;