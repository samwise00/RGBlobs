"use client";

import styles from "../styles";
import moment from "moment";

const AudioBtn = ({ address, message, timestamp }) => {
  const truncateStr = (fullStr, strLen) => {
    if (fullStr.length <= strLen) return fullStr;

    const separator = "...";
    const seperatorLength = separator.length;
    const charsToShow = strLen - seperatorLength;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);
    return (
      fullStr.substring(0, frontChars) +
      separator +
      fullStr.substring(fullStr.length - backChars)
    );
  };

  let date = moment(timestamp);
  let dateComponent = date.utc().format("YYYY-MM-DD");
  let timeComponent = date.utc().format("HH:mm:ss");

  return (
    <div className="py-1">
      <p className={`${styles.commentText}`}>{message}</p>
      <div className="flex flex-row gap-2 justify-start">
        <p className={`${styles.disclaimerText}`}>
          {truncateStr(address || "", 15)}
        </p>
        <p className={`${styles.disclaimerText}`}>
          {dateComponent}&nbsp;
          {timeComponent}
        </p>
      </div>
    </div>
  );
};

export default AudioBtn;
