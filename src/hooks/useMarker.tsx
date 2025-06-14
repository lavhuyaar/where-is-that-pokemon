import { useContext } from "react";
import MarkerContext from "../context/MarkerContext";



const useMarker = () => {
  const context = useContext(MarkerContext);

  if(!context) {
    throw new Error('Marker Context not found!');
  }

  return context;
}

export default useMarker;
