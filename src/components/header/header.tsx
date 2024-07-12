import { ArrowLeft, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../ui/container";
import Navbar from "./navbar";
import TabletMenu from "./tablet-menu/tabletMenu";
import { Avatar, Button } from "@mui/material";

const Header = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [top, setTop] = useState<boolean>(true);

  const navigate = useNavigate();
  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    if (value) {
      navigate(`/search/${value}`);
      setValue("");
    }
  };

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);
  return (
    <header
      className={`${
        !top && "shadow-mixedblue shadow-md"
      } sticky top-0 z-50 bg-primary`}
    >
      <Container>
        <nav
          className={`flex items-center gap-10 py-7 justify-between lg:gap-20 mb-10 px-3 xl:px-0`}
        >
          <div
            className={`flex items-center gap-4 flex-shrink-0 ${
              showInput ? "hidden" : "flex"
            }`}
          >
            <a href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-rose-600">
                ZED<span className="text-mixedblue">MOVIES</span>
              </h1>
            </a>
          </div>
          <div className="lg:flex hidden">
            <Navbar />
          </div>
          <div className="lg:hidden hidden xl:hidden md:flex">
            <TabletMenu />
          </div>
          <form
            onSubmit={handleChange}
            className={`flex-shrink-0 gap-4 justify-center flex-grow ${
              showInput ? "flex" : "hidden md:flex"
            }`}
          >
            {showInput && (
              <div className="flex md:hidden">
                <Button
                  variant="contained"
                  onClick={() => setShowInput(false)}
                  sx={{ backgroundColor: "#00b9ae" }}
                >
                  <ArrowLeft />
                </Button>
              </div>
            )}
            <div className="max-w-[350px] flex flex-grow items-center">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="search"
                placeholder="Search"
                className="border text-white border-gray-400  rounded-l-full shadow-inner bg-secondary shadow-secondary w-full py-1 pt-1 h-10 pl-5 text-sm focus:border-mixedblue focus:border-r-0s outline-none"
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#00b9ae",
                  height: "40px",
                  borderRadius: "0px 10px 10px 0px",
                }}
              >
                <Search />
              </Button>
            </div>
          </form>
          <div
            className={`flex-shrink-0 md:gap-2 ${
              showInput ? "hidden" : "flex"
            }`}
          >
            <div className="flex md:hidden">
              <Button
                onClick={() => setShowInput(true)}
                variant="contained"
                sx={{ backgroundColor: "#00b9ae" }}
              >
                <Search />
              </Button>
            </div>
            <div className="hidden md:flex">
              <Avatar sx={{ backgeroundColor: "#00b9ae" }} />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
