import { MenuProps } from "../topbar/topbar";
import { Link } from "react-router-dom";
//icons
import home from "../../assets/icons/Icon";
import discover from "../../assets/icons/Discover";
import watchlist from "../../assets/icons/Watchlist";
import user from "../../assets/icons/user";
import React from "react";
import { Film } from "lucide-react";

const MobileBar = () => {
  const menus: MenuProps[] = [
    { name: "Home", path: "/", icon: home },
    { name: "TV Series", path: "/tv-series", icon: discover },
    { name: "Movies", path: "/movies", icon: Film },
    { name: "Watchlist", path: "/watchlist", icon: watchlist },
    { name: "Account", path: "/", icon: user },
  ];
  return (
    <div className="sticky bottom-0 z-50 py-5 bg-primary px-3">
      <section className="items-center justify-between h-15 sticky top-0 md:hidden flex">
        {menus.map((menu, i) => (
          <Link key={i} to={menu.path} className="flex flex-col items-center">
            <div className="text-white">{React.createElement(menu.icon)}</div>
            <p className="text-white font-medium">{menu.name}</p>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default MobileBar;
