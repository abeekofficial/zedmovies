import React from "react";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
};

const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-mixedblue px-4 py-2 rounded-lg text-white font-semibold transition-all hover:bg-inherit hover:text-mixedblue border-mixedblue border"
    >
      {children}
    </button>
  );
};

export default Button;
