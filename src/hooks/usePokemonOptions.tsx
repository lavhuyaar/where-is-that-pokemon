import { useContext } from "react";
import PokemonOptionsContext from "../context/PokemonOptionsContext";

const usePokemonOptions = () => {
  const context = useContext(PokemonOptionsContext);

  if (!context) {
    throw new Error("Pokemon options Context not found!");
  }

  return context;
};
export default usePokemonOptions;
