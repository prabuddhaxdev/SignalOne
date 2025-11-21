import Image from "next/image";
import Link from "next/link";
import { NavItems } from "./NavItems";
import { UserDropDown } from "./UserDropdown";

export function Header() {
  return (
    <div className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="SignalOne logo"
            width={800}
            height={800}
            className="h-8 w-auto cursor-pointer"
          />
        </Link>

        <nav className="hidden sm:block">
          <NavItems />
        </nav>

        <UserDropDown />
      </div>
    </div>
  );
}

export default Header;