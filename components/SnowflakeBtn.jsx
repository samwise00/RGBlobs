"use client";

const SnowflakeBtn = ({ isSnowing, onClick }) => {
  return (
    <div className="pt-[6px]">
      {isSnowing == false ? (
        <button onClick={onClick}>
          <div className="h-[24px] w-[24px] border-black dark:border-white border-[1px] rounded-[4px]">
            <img
              src="/snowflake.png"
              className="h-[24px] w-[24px] p-[3px] pb-[5px] dark:invert-[100%]"
            />
          </div>
        </button>
      ) : (
        <button onClick={onClick}>
          <div className="h-[24px] w-[24px] bg-black dark:bg-white border-[1px] rounded-[4px]">
            <img
              src="/snowflake.png"
              className="h-[24px] w-[24px] p-[3px] pb-[5px] invert-[100%] dark:invert-[0%]"
            />
          </div>
        </button>
      )}
    </div>
  );
};

export default SnowflakeBtn;
