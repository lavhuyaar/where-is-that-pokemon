import {
  createContext,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";

interface Marker {
  id: string;
  positionX: number;
  positionY: number;
  isAccurate: boolean;
}

interface MarkerContextValues {
  markers: Marker[];
  setMarkers: React.Dispatch<SetStateAction<Marker[]>>;
  placeMarker: (positionX: number, positionY: number) => void;
  resetMarkers: VoidFunction;
}

const MarkerContext = createContext<MarkerContextValues | null>(null);

export const MarkerProvider = ({ children }: { children: ReactNode }) => {
  const [markers, setMarkers] = useState<Marker[]>([]); //These markers are placed when user clicks on image

  //Places marker on the image
  const placeMarker = (positionX: number, positionY: number) => {
    setMarkers((prev) => {
      //Ensures that only valid markers are remaining on the image
      const accurateMarkers = prev.filter((d) => d.isAccurate === true);
      //Adds a temporary marker to image, allowing user to choose one of the options
      return [
        ...accurateMarkers,
        { id: crypto.randomUUID(), positionX, positionY, isAccurate: false },
      ];
    });
  };

  const resetMarkers = () => setMarkers([]);

  return (
    <MarkerContext.Provider
      value={{ markers, setMarkers, placeMarker, resetMarkers }}
    >
      {children}
    </MarkerContext.Provider>
  );
};

export default MarkerContext;
