import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";
import axiosInstance from "../api/axiosInstance";
import handleAxiosError from "../utils/handleAxiosError";

interface Pokemon {
  id: string;
  name: string;
  image: string;
}

interface PokemonOption extends Pokemon {
  isCorrectlyMarked: boolean;
}

interface PokemonOptionsContextvalues {
  options: PokemonOption[];
  setOptions: React.Dispatch<SetStateAction<PokemonOption[]>>;
  loading: boolean;
  error: string | undefined;
}

const PokemonOptionsContext = createContext<PokemonOptionsContextvalues | null>(
  null
);

export const PokemonOptionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
  const [options, setOptions] = useState<PokemonOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getPokemons = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/pokemons");
        setPokemons(response.data?.pokemons);
      } catch (err) {
        handleAxiosError(
          err,
          "An error occured in fetching Pokemons!",
          setError,
          true
        );
      } finally {
        setLoading(false);
      }
    };

    getPokemons();
  }, []);

  // Sets the options based on the pokemons data
  useEffect(() => {
    if (!pokemons) return;

    setOptions(() => {
      return pokemons.map((pokemon) => ({
        id: pokemon?.id,
        name: pokemon?.name,
        image: pokemon?.image,
        isCorrectlyMarked: false,
      }));
    });
  }, [pokemons]);

  return (
    <PokemonOptionsContext.Provider
      value={{ options, setOptions, loading, error }}
    >
      {children}
    </PokemonOptionsContext.Provider>
  );
};

export default PokemonOptionsContext;
