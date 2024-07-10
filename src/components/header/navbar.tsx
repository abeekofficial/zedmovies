import React from "react";
import { Link } from "react-router-dom";
import Discover from "../../assets/icons/Discover";
import { Film } from "lucide-react";
import Watchlist from "../../assets/icons/Watchlist";
import Home from "../../assets/icons/Icon";

export type MenuProps = {
  name: string;
  path: string;
  icon: React.ComponentType;
  id: number;
};
export default function Navbar() {
  const menus: MenuProps[] = [
    { id: 1, name: "Home", path: "/", icon: Home },
    { id: 2, name: "TV Series", path: "/tv-series", icon: Discover },
    { id: 3, name: "Movies", path: "/movies", icon: Film },
    { id: 4, name: "Watchlist", path: "/watchlist", icon: Watchlist },
  ];
  return (
    <div className="flex items-center gap-14">
      {menus.map((menu) => (
        <Link
          to={menu.path}
          key={menu.id}
          className={`flex items-center gap-2 pb-2 transform border-transparent transition-all hover:border-b-mixedblue border-b-[3px] ${
            menu.path === "/" && "border-b-mixedblue"
          }`}
        >
          {React.createElement(menu.icon)}
          <p className="text-sm font-medium">{menu.name}</p>
        </Link>
      ))}
    </div>
  );
}
