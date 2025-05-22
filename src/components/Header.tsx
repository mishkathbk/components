"use client";

import React from "react";
import Logo from "../asset/svg/logo.svg";
import SmallLogo from "@/asset/svg/smallLogo.svg";
type Props = {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (value: boolean) => void;
};
const Header = ({ sidebarOpen, setSidebarOpen }: Props) => {
  return (
    <header className="sticky top-0 z-[999] bg-white flex w-full border-b  ">
      <div className="flex flex-grow items-center justify-between px-4 py-5 shadow-2 md:px-5 2xl:px-10">
        <button
          aria-controls="sidebar"
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(!sidebarOpen);
          }}
          className=" block rounded-sm  bg-white p-1.5  lg:hidden absolute left-2 "
        ></button>
        <div className="flex justify-center w-full lg:hidden">
          <a
            className=" flex-shrink-0 lg:hidden flex justify-center"
            href="/customer"
          >
            <img
              src={SmallLogo}
              alt="logo-svg"
              className="~size-[3.2rem]/[3rem]"
            />
          </a>
        </div>

        <div className="hidden xl:flex w-full justify-center">
          <img className=" py-[1.2rem]" src={Logo} alt="Logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
