import s from './AdminOverview.module.css'
import { euro } from '../../../lib/helpers';

const AdminOverview = ({totals}) => {
	const totalMoney = totals.dep -(totals.book + totals.tuck + totals.with) + totals.adj;
	return (
		<div className={s.summaryContDiv}>
			<div className={s.summaryDiv}>
				<h2>Total Money Held: </h2>
				<p>{euro.format(totalMoney)}</p>
			</div>
			<div className={s.summaryDiv}>
				<h2>Total Campers: </h2>
				<p>{totals.camperCount}</p>
			</div>
			<div className={s.summaryDiv}>
				<h2>Total Transactions: </h2>
				<p>{totals.transCount}</p>
			</div>
		</div>
	)
}

export default AdminOverview;