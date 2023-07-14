import Link from "next/link";
import styles from "./MainNavigation.module.css";
import Button from "@mui/material/Button";
import FestivalIcon from "@mui/icons-material/Festival";

const MainNavigation = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span>
          <Link href="/">
            <FestivalIcon sx={{ fontSize: 60 }} />
            <h1>CARRY ON CAMPING</h1>
          </Link>
        </span>
      </div>
      <nav>
        <ul className={styles.navLinkBar}>
          <Link href="/">Enter Code</Link>
          <Link href="/campers" replace>
            All Campers
          </Link>
          <Link href="/campers/transactions" replace>
            All Transactions
          </Link>
          <Link href="/campers/add" replace>
            Add New Camper
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
