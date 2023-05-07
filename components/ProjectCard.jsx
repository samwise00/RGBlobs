"use client";

import styles from "../styles";

const ProjectCard = ({
  id,
  imgUrl,
  title,
  description,
  index,
  active,
  handleClick,
  url,
}) => {
  return (
    <div
      className={`relative ${
        active === id ? "md:flex-[3.5] flex-[10]" : "lg:flex-[0.5] flex-[2]"
      } flex items-center justify-center min-w-[80px] h-[200px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
      onClick={() => handleClick(id)}
    >
      {active !== id ? (
        <div className="absolute h-full w-full rounded-2xl bg-gradient-to-r from-gray-700/70 to-gray-800 p-1">
          <div className="flex flex-col justify-center items-center h-full w-full rounded-2xl bg-[#0F0F0F] mx-auto"></div>
        </div>
      ) : (
        <div className="absolute h-full w-full rounded-2xl bg-gradient-to-r from-pink-500/50 via-red-500/50 to-yellow-500/50 p-1">
          <a target="_blank" rel="noopener noreferrer" href={url}>
            <img
              src={imgUrl}
              className="flex flex-col justify-center items-center h-full w-full rounded-2xl bg-[#0F0F0F] mx-auto opacity-90 aspect-auto"
            ></img>
          </a>
        </div>
      )}

      {active !== id ? (
        <h3 className="font-semibold text-md text-white absolute z-0 md:rotate-[-90deg] md:origin-[0,0]">
          {title}
        </h3>
      ) : (
        <div className="absolute bottom-0 p-3 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.7)] rounded-2xl">
          <a target="_blank" rel="noopener noreferrer" href={url}>
            <h2 className="font-semibold text-xl text-white">
              {title}{" "}
              <span className={`${styles.paragraphText}`}>- {description}</span>
            </h2>
          </a>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
