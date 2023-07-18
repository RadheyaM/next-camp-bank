import Link from "next/link";
import styles from "./MainNavigation.module.css";
import FestivalIcon from "@mui/icons-material/Festival";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@mui/material";

const MainNavigation = () => {
  const {data: session, status } = useSession();
  console.log(status)
  const logoutHandler = () => {
    signOut();
  };
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
          <Link href="/">Find Camper</Link>
          <Link href="/campers" replace>
            All Campers
          </Link>
          <Link href="/campers/transactions" replace>
            All Transactions
          </Link>
          <Link href="/campers/add" replace>
            Add New Camper
          </Link>
          {session && (
            <Link href="/campers" replace>
            User Profile
            </Link>
          )}
          {session && (
            <Button size="large" variant="contained" onClick={logoutHandler}>
            Logout
            </Button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
