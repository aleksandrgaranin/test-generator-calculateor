"use client";
import { useNameStore } from "@/providers/name-store-provider";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const { user } = useNameStore((state) => state);

  const nameFromLocal = localStorage.getItem("favoriteName") || "";

  const links = [
    {
      id: 1,
      link: "/",
      name: "Главная",
    },
    {
      id: 2,
      link: "calculator",
      name: "Калькулятор",
    },
    {
      id: 3,
      link: "password-generator",
      name: "Генератор пароля",
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-black fixed nav">
      <ul className="hidden md:flex">
        {links.map(({ id, link, name }) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
          >
            <Link href={link === "/" ? "/" : `/pages/${link}`}>{name}</Link>
          </li>
        ))}
      </ul>

      <div>
        <h1 className="text-3xl text-black ml-2">
          <div className="link-underline link-underline-black flex justify-center gap-2">
            <div>{user.fullName || nameFromLocal}</div>
            <div className="rounded-full flex w-[38px] h-[38px] border-black-1 bg-custom-button-color justify-center align-middle items-center mb-3">
              B
            </div>
          </div>
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
