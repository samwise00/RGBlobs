"use client";

import styles from "../styles";

import { useState, useEffect } from "react";

import Image from "next/image";

import { ConnectBtn } from "./ConnectButton";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <section
      className={`${styles.innerWidth} ${styles.yPaddings} min-h-10 mx-auto`}
    >
      <div className="flex justify-between gap-4 items-center">
        <div className="flex flex-row gap-2">
          <Image src="/logo.png" width="180" height="100" alt="logo" />
        </div>

        <div className="flex flex-row gap-4">
          <ConnectBtn
            showBalance={false}
            chainStatus="icon"
            accountStatus="avatar"
          />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
