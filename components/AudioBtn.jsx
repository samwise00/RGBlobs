"use client";

const AudioBtn = ({ isPaused, onClick }) => {
  return (
    <div className="pt-[6px]">
      {isPaused == false ? (
        <button onClick={onClick}>
          <div className="h-[24px] w-[24px] pl-[1px] border-black dark:border-white border-[1px] rounded-[4px]">
            <img src="/pause.png" className="h-[22px] p-1 dark:invert-[100%]" />
          </div>
        </button>
      ) : (
        <button onClick={onClick}>
          <div className="h-[24px] w-[24px] border-black dark:border-white border-[1px] rounded-[4px]">
            <img
              src="/play.png"
              className="h-[22px] p-1 pl-[5px] dark:invert-[100%]"
            />
          </div>
        </button>
      )}
    </div>
  );
};

export default AudioBtn;
