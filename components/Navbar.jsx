"use client";

import styles from "../styles";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { ConnectBtn } from "./ConnectButton";
import ColorThemeBtn from "./ColorThemeBtn";

import SnowflakeBtn from "./SnowflakeBtn";

import useSound from "use-sound";
import AudioBtn from "./AudioBtn";

import Snowfall from "react-snowfall";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isSnowing, setIsSnowing] = useState(false);
  const [isPaused, setPaused] = useState(true);
  const { theme, setTheme } = useTheme();
  const [play, exposedData] = useSound("/17087.mp3", {
    onend: () => {
      setPaused(true);
    },
  });

  // const currentTheme = theme === "system" ? systemTheme : theme;

  const handleToggleTheme = () => {
    theme == "dark" ? setTheme("light") : setTheme("dark");
  };

  const handleAudio = () => {
    if (isPaused == false) {
      exposedData.pause();
      setPaused(true);
    } else {
      play();
      setPaused(false);
    }
  };

  const handleIsSnowing = () => {
    if (isSnowing == true) {
      setIsSnowing(false);
    } else {
      setIsSnowing(true);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <section className={`${styles.innerWidth} min-h-10 mx-auto`}>
      {/* {isSnowing && theme == "dark" && (
        <Snowfall speed={[0.1, 0.3]} snowflakeCount={35} />
      )}
      {isSnowing && theme != "dark" && (
        <Snowfall speed={[0.1, 0.3]} snowflakeCount={35} color={"#000000"} />
      )} */}

      <div className="flex justify-between gap-4">
        <div className="flex flex-row gap-2">
          <ColorThemeBtn theme={theme} onClick={handleToggleTheme} />
          {/* <AudioBtn theme={theme} isPaused={isPaused} onClick={handleAudio} />
          <SnowflakeBtn isSnowing={isSnowing} onClick={handleIsSnowing} 2 /> */}
        </div>
        <div className="flex flex-row gap-4">
          <ConnectBtn
            showBalance={false}
            chainStatus="icon"
            accountStatus="avatar"
            theme={theme}
          />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
