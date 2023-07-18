import Link from "next/link";
import styles from "./MainNavigation.module.css";
import FestivalIcon from "@mui/icons-material/Festival";
import { useSession } from "next-auth/react";

const MainNavigation = () => {
  const {data: session, status } = useSession();
  console.log(status)
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
          {!session && (
            <Link href="/campers" replace>
            Login
            </Link>
          )}
          {session && (
            <Link href="/campers" replace>
            Logout
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
