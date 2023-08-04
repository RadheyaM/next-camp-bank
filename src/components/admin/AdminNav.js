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
          <Link href="/admin/edit-user-accounts">Edit Users</Link>
        </li>
        <li>
          <Link href="/admin/edit-camper-accounts">Edit Campers</Link>
        </li>
        <li>
          <Link href="/admin/withdrawals">End of Camp Withdrawals</Link>
        </li>
        <li>
          <Link href="/admin/shutdown">Clear All Data</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
