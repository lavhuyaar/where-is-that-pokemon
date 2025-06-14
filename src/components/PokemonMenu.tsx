import { useState } from "react";
import { MdOutlineCloseFullscreen, MdOutlineOpenInFull } from "react-icons/md";
import usePokemonOptions from "../hooks/usePokemonOptions";

const PokemonMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { options } = usePokemonOptions();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      {options.length > 0 && (
        <div
          className="fixed z-9999 top-[5%] left-[10%] bg-red-500 !p-3 flex flex-col gap-3"
          onClick={toggleMenu}
        >
          <h4 className="font-bold flex gap-2 items-center cursor-pointer">
            Find Us!{" "}
            {isMenuOpen ? (
              <MdOutlineCloseFullscreen />
            ) : (
              <MdOutlineOpenInFull />
            )}
          </h4>
          {options.map((option) => (
            <li
              key={option?.id}
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } flex-col items-center font-bold list-none ${
                option?.isCorrectlyMarked === true ? "grayscale" : ""
              }`}
            >
              {" "}
              <img
                src={option?.image}
                alt=""
                className={`size-[40px] object-center object-cover`}
              />
              {option?.name}
            </li>
          ))}
        </div>
      )}
    </>
  );
};
export default PokemonMenu;
