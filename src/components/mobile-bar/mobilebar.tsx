import { Link, useLocation } from "react-router-dom";
//icons
import home from "../../assets/icons/Icon";
import discover from "../../assets/icons/Discover";
import watchlist from "../../assets/icons/Watchlist";
import user from "../../assets/icons/user";
import React from "react";
import { Film } from "lucide-react";

type MenuProps = {
  name: string;
  path: string;
  icon: React.ComponentType;
};

export const menus: MenuProps[] = [
  { name: "Home", path: "/", icon: home },
  { name: "Series", path: "/tv-series", icon: discover },
  { name: "Movies", path: "/movies", icon: Film },
  { name: "Watchlist", path: "/watchlist", icon: watchlist },
  { name: "Account", path: "/", icon: user },
];
const MobileBar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div className="flex md:hidden">
      <div className="fixed bottom-0 left-0 z-50 w-full bg-primary h-16 border-t border-gray-200">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          {menus.map((menu, i) => (
            <Link
              key={i}
              to={menu.path}
              type="button"
              className={` ${
                menu.path === pathname && "bg-gray-800 font-semibold"
              } inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group`}
            >
              <div>{React.createElement(menu.icon)}</div>
              <span
                className={`text-sm text-gray-500 transition-all duration-500 dark:text-gray-400 `}
              >
                {menu.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileBar;
