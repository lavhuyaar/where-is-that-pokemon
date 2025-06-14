import React, { useState } from "react";
import useMarker from "../hooks/useMarker";
import usePokemons from "../hooks/usePokemonOptions";
import PokemonMenu from "../components/PokemonMenu";
import Markers from "../components/Markers";
import Loading from "../components/Loading";

const Game = () => {
  const [isPokemonVerifying, setIsPokemonVerifying] = useState<boolean>(false);

  const { placeMarker } = useMarker();
  const { loading } = usePokemons();

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

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <PokemonMenu />

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
