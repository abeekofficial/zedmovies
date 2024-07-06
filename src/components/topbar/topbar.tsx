import React, { useState } from "react";
import { Link } from "react-router-dom";
import Discover from "../../assets/icons/Discover";
import Settings from "../../assets/icons/Settings";
import { Film } from "lucide-react";
import Watchlist from "../../assets/icons/Watchlist";
import Container from "../../ui/container";
import Home from "../../assets/icons/Icon";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export type MenuProps = {
  name: string;
  path: string;
  icon: React.ComponentType;
};

const Topbar = () => {
  const menus: MenuProps[] = [
    { name: "Home", path: "/", icon: Home },
    { name: "TV Series", path: "/tv-series", icon: Discover },
    { name: "Movies", path: "/movies", icon: Film },
    { name: "Watchlist", path: "/watchlist", icon: Watchlist },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const [open, setOpen] = useState(true);

  return (
    <div className="hidden md:flex w-full mb-10 ">
      <Container>
        <section className="flex gap-6 w-[1280px]">
          <div
            className={`bg-secondary w-full flex flex-grow items-center rounded-lg transition-all duration-500 top-0 z-30 sticky ${
              open ? "h-16" : "h-9"
            } duration-500 text-gray-100 px-4`}
          >
            <div
              className="py-3 flex justify-end transition-all mr-20"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <IoIosArrowUp className="text-2xl cursor-pointer" />
              ) : (
                <IoIosArrowDown className="text-2xl cursor-pointer" />
              )}
            </div>
            <div className="flex flex-grow justify-between items-center w-full">
              {menus.map((menu, i) => (
                <Link
                  to={menu.path}
                  key={i}
                  className="group flex items-center text-sm gap-3.5 font-medium py-5 transition-all duration-400 px-1.5 hover:bg-mixedblue rounded-md"
                >
                  <div className={`${!open ? "hidden" : "block"}`}>
                    {React.createElement(menu.icon)}
                  </div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`duration-500 ${
                      !open &&
                      "hidden translate-x-28 overflow-hidden hover:bg-none"
                    }`}
                  >
                    {menu.name}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Topbar;
