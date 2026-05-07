import Link from "next/link";
import NavItems from "./NavItems";
import UserDropdown from "./UserDropdown";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { Button } from "./ui/button";

export async function Header({ user }: { user: User | null }) {
  const isLoggedIn = !!user;
  const initialStocks = isLoggedIn ? await searchStocks() : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-gray-900/80 backdrop-blur-xl">
      <div className="container relative flex h-16 items-center justify-between">
        <div className="flex items-center shrink-0">
          <Link href={ "/"} className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-600 drop-shadow-[0_0_10px_rgba(232,186,64,0.2)]">
              SignalOne
            </span>
          </Link>
        </div>

        {/* Center: Nav Items (Dashboard, Search, Watchlist) */}
        {isLoggedIn && (
          <nav className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <NavItems initialStocks={initialStocks} />
          </nav>
        )}

        {/* Right: User / Auth */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {isLoggedIn ? (
            <UserDropdown user={user} initialStocks={initialStocks} />
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/sign-in">
                <Button variant="ghost" className="text-gray-400 hover:text-white px-3 sm:px-4">
                  Login
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="yellow-btn px-4 sm:px-6 h-10">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;