import s from './AdminOverview.module.css'

const AdminOverview = () => {
	return (
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
	)
}

export default AdminOverview;