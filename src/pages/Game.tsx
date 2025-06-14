import React, { useState } from "react";
import useMarker from "../hooks/useMarker";
import usePokemons from "../hooks/usePokemonOptions";
import PokemonMenu from "../components/PokemonMenu";
import Markers from "../components/Markers";
import Loading from "../components/Loading";
import Timer from "../components/Timer";
import { NavLink } from "react-router";
import useTimer from "../hooks/useTimer";

const Game = () => {
  const [isPokemonVerifying, setIsPokemonVerifying] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const { placeMarker } = useMarker();
  const { loading, error } = usePokemons();
  const { startTimer } = useTimer();

  const startGame = () => {
    setIsGameStarted(true);
    startTimer();
  };

  const imageOnClick = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (loading || isPokemonVerifying) return;

    const canvas = event.target as HTMLCanvasElement; //Gets the canvas element
    const rect = canvas.getBoundingClientRect();
    const positionX = event.clientX - rect.left;
    const positionY = event.clientY - rect.top;

    //Gets User click's position and marks it (creates a red marker there with options to choose)
    placeMarker(positionX, positionY);
  };

  // Loader
  if (loading) {
    return <Loading />;
  }

  if (!isGameStarted) {
    return (
      <>
        <main className="w-full h-screen flex flex-col items-center justify-center gap-3 !p-3">
          <button
            onClick={startGame}
            className="w-[300px] cursor-pointer text-center drop-shadow-lg drop-shadow-gray-600 !py-2 rounded-2xl text-2xl font-semibold
             bg-amber-300 hover:bg-amber-600 transition text-gray-600 hover:text-black"
          >
            Start Game
          </button>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <main className="w-full h-screen text-center flex flex-col items-center justify-center !p-4 ">
          <h2 className="font-semibold text-4xl">{error}</h2>
          <NavLink
            to="/"
            className="!px-3 !py-1 !mt-4 rounded-2xl text-2xl font-semibold bg-amber-300 hover:bg-amber-600 transition text-gray-600
            hover:text-black"
          >
            Go back to Home
          </NavLink>
        </main>
      </>
    );
  }

  return (
    <>
      <PokemonMenu />

      <Timer />

      <main className="relative overflow-auto">
        <Markers setIsPokemonVerifying={setIsPokemonVerifying} />

        {/* Pokemons image */}
        <canvas
          onClick={(e) => imageOnClick(e)}
          className="bg-[url(/images/pokemons.jpg)] relative w-[1600px] h-[2300px] cursor-pointer"
        ></canvas>
      </main>
    </>
  );
};
export default Game;
