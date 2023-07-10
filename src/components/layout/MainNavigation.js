import Link from "next/link";
import styles from "./MainNavigation.module.css"

const MainNavigation = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <h1>Carry On Camping!</h1>
      </Link>
      <nav>
        <ul className={styles.navLinkBar}>
          <li><Link href="/">Enter Code</Link></li>
          <li><Link href="/campers" replace>All Campers</Link></li>
          <li><Link href="/campers/transactions" replace>All Transactions</Link></li>
          <li><Link href="/campers/add" replace>Add New Camper</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
