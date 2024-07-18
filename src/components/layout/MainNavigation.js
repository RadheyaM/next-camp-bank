import Link from "next/link";
import styles from "./MainNavigation.module.css";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@mui/material";

const MainNavigation = (props) => {
  const { data: session, status } = useSession();
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
                <h3 className={styles.logoSubtext}>banking intense...</h3>
              </div>
            </Link>
          </div>
        </span>
      </div>
      <nav>
        <ul className={styles.navLinkBar}>
          <Link href="/">Camper By Code</Link>
          <Link href="/campers" replace>
            Camper By Name
          </Link>
          <Link href="/campers/transactions" replace>
            Recent Transactions
          </Link>
        </ul>
        {session && (
          <div className={styles.logoutBtnDiv}>
            <Button size="small" variant="contained" onClick={logoutHandler}>
              {session.user.email} | Logout
            </Button>
            {session.user.email === "Rodeo" && <Button onClick={() => {}} size="small" variant="contained">
              Site Settings
            </Button>}
          </div>
        )}
      </nav>
    </header>
  );
};

export default MainNavigation;
