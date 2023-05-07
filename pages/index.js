import { Hero } from "../sections";
import { Featured } from "../sections";
import GuestBook from "../sections/Guestbook";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const Page = () => {
  //const currentTheme = theme === "system" ? currentTheme : theme;

  return (
    <div className="overflow-hidden">
      <Hero className="z-10" />
      <Featured className="z-10" />
      <GuestBook />
    </div>
  );
};

export default Page;
