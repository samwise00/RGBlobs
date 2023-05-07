"use client";

import styles from "../styles";

import { motion } from "framer-motion";

import networkMapping from "../constants/networkMapping.json";
import guestbookAbi from "../constants/Guestbook.json";

import React from "react";
import { useAccount, useNetwork } from "wagmi";
import { useState, useEffect } from "react";

import NftModal from "../components/Modal";

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { address, isConnected, connector: activeConnector } = useAccount();
  const { chain } = useNetwork();

  const handleIsModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <section className={`${styles.innerWidth} mx-auto`}>
      {isConnected && address && (
        <NftModal
          isOpen={isModalOpen}
          onClose={handleIsModalOpen}
          address={address}
        />
      )}

      <div className="flex flex-col justify-start">
        <div className="w-36 h-36 md:hidden">
          {isConnected && chain.id == 137 && (
            <button className="w-36 absolute left-2 top-24 p-1 pointer-events-none focus:pointer-events-auto">
              <motion.img
                animate={{
                  rotate: 360,
                }}
                transition={{ repeat: Infinity, duration: 4 }}
                src="/blurs.png"
              ></motion.img>
            </button>
          )}

          <div className="hover:cursor-pointer" onClick={handleIsModalOpen}>
            <img
              src="/profilepic.jpeg"
              className="flex items-center justify-center w-28 pt-1 absolute rounded-full select-none"
            />
          </div>
        </div>
        <div className="flex flex-row justify-between py-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col py-4">
              <p className={`${styles.heading}`}>Sam Sandoval</p>
              <p className={`${styles.headingSubtext}`}>
                Blockchain/Web3 Developer
              </p>
            </div>
            <p className={`${styles.paragraphText} pr-12`}>
              On an incredible journey building what's next. Contributing to
              web3, blockchain, and the decentralized future.
            </p>
          </div>

          <div className="w-44 h-44 hidden md:block pr-32 select-none">
            {isConnected && chain.id == 137 ? (
              <div>
                <div className="w-44 absolute dark:p-1 pointer-events-none focus:pointer-events-auto">
                  <motion.img
                    className="block"
                    onClick={() => setIsActive(!isActive)}
                    animate={{
                      rotate: true ? 360 : 0,
                    }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    src="/blurs.png"
                  ></motion.img>
                </div>
                <div
                  className="p-4 hover:cursor-pointer"
                  onClick={setIsModalOpen}
                >
                  <img
                    src="/profilepic.jpeg"
                    className="flex items-center justify-center w-36 absolute rounded-full select-none pointer-events-auto"
                  />
                </div>
              </div>
            ) : (
              <div className="p-4">
                <img
                  src="/profilepic.jpeg"
                  className="flex items-center justify-center w-36 absolute rounded-full pointer-events-none cursor-move:select-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
