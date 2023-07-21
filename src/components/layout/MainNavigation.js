import Link from "next/link";
import styles from "./MainNavigation.module.css";
import FestivalIcon from "@mui/icons-material/Festival";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@mui/material";
import logo from '../../../public/intents_logo.png'

const MainNavigation = () => {
  const {data: session} = useSession();
  const logoutHandler = () => {
    signOut();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span>
          <div>
          <Link href="/">
            <div className={styles.logoImage}>
                {/* <FestivalIcon sx={{ fontSize: 60 }} /> */}
                <h3 className={styles.logoSubtext}>...intense banking</h3>
            </div>
          </Link>
          </div>
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
