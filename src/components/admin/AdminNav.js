import s from './AdminNav.module.css';

const AdminNav = () => {
	return(
		<nav className={s.adminNav}>
			<ul className={s.adminList}>
				<li>Overview</li>
				<li>Data</li>
				<li>Add Single Camper</li>
				<li>Start: Add Campers</li>
				<li>End: Close Accounts</li>
			</ul>
		</nav>
	)
}

export default AdminNav;
