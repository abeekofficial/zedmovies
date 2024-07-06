import { useState, CSSProperties } from "react";
import { HashLoader } from "react-spinners";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loader() {
  return <HashLoader />;
}

export default Loader;
