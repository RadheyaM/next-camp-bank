import { Fragment } from "react";
import s from "./index.module.css";
import Table from "@/components/UI/Table";

const dashboard = () => {
  return (
    <Fragment>
      <section className={s.adminSection}>
        <h1>Admin Dashboard...</h1>
        <nav className={s.adminNav}>
          <ul className={s.adminList}>
            <li>Overview</li>
            <li>Data</li>
            <li>Add Single Camper</li>
						<li>Start: Add Campers</li>
						<li>End: Close Accounts</li>
          </ul>
        </nav>
        <div className={s.summaryContDiv}>
          <div className={s.summaryDiv}>
            <h2>Total Money Held: </h2>
						<p>€2560</p>
          </div>
          <div className={s.summaryDiv}>
            <h2>Total Campers: </h2>
						<p>2560</p>
          </div>
          <div className={s.summaryDiv}>
            <h2>Total Transactions: </h2>
						<p>1073</p>
          </div>
        </div>
				<div className={s.summaryContDiv}>
					<Table>
						<thead>
							<th>Category</th>
							<th>Transaction Count</th>
							<th>Total €</th>
							<th>Balance</th>
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
        </div>
      </section>
    </Fragment>
  );
};

export default dashboard;
