import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import searchIcon from "../../assets/icons/Search....svg";
import Button from "../../ui/Button";

const Search = () => {
  const [showInput, setShowInput] = useState<boolean>(false);

  return (
    <form className="relative flex items-center gap-5">
      <div className={`md:flex ${showInput ? "flex" : "hidden"}`}>
        <img
          src={searchIcon}
          alt="search"
          width={30}
          className="absolute left-0 flex top-3 items-center pointer-events-none pl-3"
        />
        <div className="xl:w-[450px] w-[80%] h-11 flex items-center rounded-2xl bg-secondary focus:border-2 border-mixedblue">
          <input
            className="w-full h-full outline-none border-none rounded-md text-white pl-10 pr-3 bg-secondary placeholder-gray-400 focus:border-mixedblue focus:border-2"
            type="search"
            onChange={(e) => console.log(e.target.value)}
            placeholder="Search"
          />
        </div>
        <Button>Search</Button>
      </div>
      <div className="flex items-center">
        {showInput && (
          <Button onClick={() => setShowInput(false)}>
            <FaArrowLeftLong />
          </Button>
        )}

        <div className={`flex ${showInput ? "flex" : "hidden"}`}>
          <img
            src={searchIcon}
            alt="search"
            width={30}
            className="absolute left-0 flex top-3 items-center pointer-events-none pl-3"
          />
          <div className="w-[450px] h-11 flex items-center rounded-2xl bg-secondary focus:border-2 border-mixedblue">
            <input
              className="w-full h-full outline-none border-none rounded-md text-white pl-10 pr-3 bg-secondary placeholder-gray-400 focus:border-mixedblue focus:border-2"
              type="search"
              onChange={(e) => console.log(e.target.value)}
              placeholder="Search"
            />
          </div>
          <Button>Search</Button>
        </div>
      </div>
      {!showInput && (
        <img
          src={searchIcon}
          alt="search"
          width={23}
          className="flex md:hidden"
          onClick={() => setShowInput(true)}
        />
      )}
    </form>
  );
};

export default Search;
