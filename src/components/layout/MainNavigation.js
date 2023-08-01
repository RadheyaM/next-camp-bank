import Link from "next/link";
import styles from "./MainNavigation.module.css";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

const MainNavigation = (props) => {
  const [admin, setAdmin] = useState(false)
  const router = useRouter();
  const { data: session, status } = useSession();
  const siteSettingsHandler = () => {
    setAdmin(true)
  }
  useEffect(() => {
    router.replace('/admin');
  }, [admin]);
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
            Recent Transactions
          </Link>
        </ul>
        {session && (
          <div className={styles.logoutBtnDiv}>
            <Button size="small" variant="contained" onClick={logoutHandler}>
              {session.user.email} | Logout
            </Button>
            {session.user.email === "Superuser" && <Button onClick={siteSettingsHandler} size="small" variant="contained">
              Admin Dashboard
            </Button>}
          </div>
        )}
      </nav>
    </header>
  );
};

export default MainNavigation;
