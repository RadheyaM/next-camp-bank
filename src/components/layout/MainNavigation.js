import Link from "next/link";
import styles from "./MainNavigation.module.css"
import Button from '@mui/material/Button'
import FestivalIcon from '@mui/icons-material/Festival';

const MainNavigation = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <span>
            <FestivalIcon sx={{ fontSize: 60 }}/>
            <h1>CARRY ON CAMPING</h1>
            <hr />
          </span>
        </Link>
      </div>
      <nav>
        <ul className={styles.navLinkBar}>
          <Button variant="contained" color="secondary"><Link href="/">Enter Code</Link></Button>
          <Button variant="contained" color="secondary"><Link href="/campers" replace>All Campers</Link></Button>
          <Button variant="contained" color="secondary"><Link href="/campers/transactions" replace>All Transactions</Link></Button>
          <Button variant="contained" color="secondary"><Link href="/campers/add" replace>Add New Camper</Link></Button>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
