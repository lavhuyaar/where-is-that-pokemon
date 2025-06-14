import type { SetStateAction } from "react";
import { toast } from "react-toastify";
import useMarker from "../hooks/useMarker";
import usePokemonOptions from "../hooks/usePokemonOptions";
import axiosInstance from "../api/axiosInstance";
import handleAxiosError from "../utils/handleAxiosError";

interface MarkerProps {
  setIsPokemonVerifying: React.Dispatch<SetStateAction<boolean>>;
}

const Markers = ({ setIsPokemonVerifying }: MarkerProps) => {
  const { markers, setMarkers } = useMarker();
  const { options, setOptions } = usePokemonOptions();

  const optionOnClick = async (
    id: string,
    positionX: number,
    positionY: number
  ) => {
    // Prevents User from choosing the pokemon he has accurately marked before
    if (
      options.find((pokemon) => pokemon?.id === id)?.isCorrectlyMarked === true
    ) {
      return;
    }

    setIsPokemonVerifying(true);
    toast.loading("Checking position...");
    try {
      const response = await axiosInstance.post(`/pokemon/verify/${id}`, {
        positionX,
        positionY,
      });
      /* Since there can only be one red marker at a time, if it is accurate, we just make sure 
       that all the markers are changed to green */
      setMarkers((prev) => prev.map((m) => ({ ...m, isAccurate: true })));
      setOptions((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, isCorrectlyMarked: true } : { ...p }
        )
      );
      toast.dismiss();
      toast.success(response?.data?.message, { autoClose: 2000 });
    } catch (err) {
      handleAxiosError(err, "Inaccurate position of Pokemon!");
      //API call with inaccurate positions removes the red marker
      setMarkers((prev) => prev.filter((m) => m.isAccurate === true));
    } finally {
      setIsPokemonVerifying(false);
    }
  };

  return (
    <>
      {markers.length > 0 &&
        markers.map((marker) => (
          <div key={marker?.id}>
            <div
              className={`absolute size-[60px] z-999 border-6  ${
                marker?.isAccurate === true
                  ? "border-green-600 bg-green-300/50"
                  : "border-red-600"
              }`}
              style={{
                left: marker?.positionX - 20,
                top: marker?.positionY - 20,
              }}
            />
            {/* List of clickable options only appear after trying to mark a pokemon */}
            {!marker.isAccurate && (
              <div
                className=" flex flex-col flex-wrap min-w-[150px] rounded-xl bg-amber-300 !p-3 gap-2 absolute z-999"
                style={{
                  left: marker?.positionX + 60,
                  top: marker?.positionY - 20,
                }}
              >
                {options.length > 0 &&
                  options.map((option) => (
                    <li
                      onClick={() =>
                        optionOnClick(
                          option?.id,
                          marker?.positionX - 20,
                          marker?.positionY - 20
                        )
                      }
                      className={`list-none flex gap-2 items-center ${
                        option?.isCorrectlyMarked
                          ? "grayscale"
                          : "cursor-pointer"
                      }`}
                      key={option?.id}
                    >
                      <img
                        src={option?.image}
                        alt=""
                        className=" size-[40px] rounded-lg object-center object-cover"
                      />
                      <h5 className="text-lg">{option?.name}</h5>
                    </li>
                  ))}
              </div>
            )}
          </div>
        ))}
    </>
  );
};
export default Markers;
