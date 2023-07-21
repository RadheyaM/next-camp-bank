import Link from "next/link";
import styles from "./MainNavigation.module.css";
import FestivalIcon from "@mui/icons-material/Festival";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@mui/material";

const MainNavigation = () => {
  const {status, data: session} = useSession();
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
            </ul>
          {session && (
            <div className={styles.logoutBtnDiv}>
            <Button size="small" variant="contained" onClick={logoutHandler}>
                {session.user.email}  |  Logout
            </Button>
          </div>
          )}
        </nav>
    </header>
  );
};

export default MainNavigation;
