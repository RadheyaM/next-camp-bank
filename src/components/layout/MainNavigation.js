import Link from "next/link";

import Logo from "./Logo";

const MainNavigation = () => {
  return (
    <header>
      <Link href="/">
        <Logo />
      </Link>
      <nav class="navbar">
        <ul>
          <li><Link href="/">Enter Code</Link></li>
          <li><Link href="/campers">All Campers</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
