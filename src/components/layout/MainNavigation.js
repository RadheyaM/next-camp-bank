import Link from "next/link";

import Logo from "./Logo";

const MainNavigation = () => {
  return (
    <header>
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul>
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
