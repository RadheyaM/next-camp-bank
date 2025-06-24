import Link from "next/link";
import styles from "./MainNavigation.module.css";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@mui/material";
import Paper from '@mui/material/Paper';


const MainNavigation = (props) => {
  const { data: session, status } = useSession();
  const logoutHandler = () => {
    signOut();
  };

  return (
    
      <header className={styles.header}>
        <Paper square={false} elevation={12} sx={{width: "100%", 
          paddingBottom: "2rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          backgroundColor: "#f8f8ff", 
          display: "flex", 
          flexDirection: "column",
          textAlign: "center",
          justifyContent: "center",
          gap: "1rem",
        }}>
          <div className={styles.logo}>
            <span>
              <div className={styles.logo}>
                <Link href="/">
                  <div className={styles.logoImage}>
                    {/* <FestivalIcon sx={{ fontSize: 60 }} /> */}
                    <h3 className={styles.logoSubtext}>BANKING</h3>
                  </div>
                </Link>
              </div>
            </span>
          </div>
          <nav className={styles.nav}>
            <ul className={styles.navLinkBar}>
              <Link href="/">Camper By Code</Link>
              <Link href="/campers" replace>
                Camper By Name
              </Link>
              <Link href="/campers/transactions" replace>
                Recent Transactions
              </Link>
              <Link href="/campers/summary" replace>
                Bank Summary
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
        </Paper>
    </header>
    
  );
};

export default MainNavigation;
