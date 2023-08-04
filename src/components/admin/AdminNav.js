import s from "./AdminNav.module.css";
import Link from "next/link";

const AdminNav = () => {
  return (
    <nav className={s.adminNav}>
      <ul className={s.adminList}>
        <li>
          <Link href="/admin/">
            Overview
          </Link>
        </li>
        <li>
          <Link href="/admin/transactions">Transactions</Link>
        </li>
        <li>
          <Link href="/admin/edit-user-accounts">Manage Users</Link>
        </li>
        <li>
          <Link href="/admin/edit-camper-accounts">Add Camper</Link>
        </li>
        <li>
          <Link href="/admin/withdrawals">Process Camp-end Withdrawals</Link>
        </li>
        <li>
          <Link href="/admin/shutdown">Clear All Data</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
