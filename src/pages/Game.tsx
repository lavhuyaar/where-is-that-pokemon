import React, { useState } from "react";

// Dummy options
const options: { id: number; name: string }[] = [
  { id: 1, name: "Option1" },
  { id: 2, name: "Option2" },
  { id: 3, name: "Option3" },
];

const Game = () => {
  const [markers, setMarkers] = useState<
    { positionX: number; positionY: number; isAccurate: boolean }[]
  >([]); //This markers are placed when user clicks on canvas (image)

  //Places marker on the image
  const placeMarker = (positionX: number, positionY: number) => {
    setMarkers((prev) => {
      const updatedData = prev.filter((d) => d.isAccurate === true); //Ensures that only valid markers are remaining on image
      return [...updatedData, { positionX, positionY, isAccurate: false }]; //Adds a temporary marker to image, allowing user to choose one of the options
    });
  };

  const canvasOnClick = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvas = event.target as HTMLCanvasElement; //Gets the canvas element
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    //Gets User click's position and marks it (creates a red marker there with options to choose)
    placeMarker(x, y);
  };

  return (
    <>
      <main className="relative overflow-auto">
        {markers &&
          markers.length > 0 &&
          markers.map((marker, index) => (
            <div key={index}>
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
                  className=" flex flex-col !p-3 gap-2 absolute z-999 bg-red-600"
                  style={{
                    left: marker?.positionX + 60,
                    top: marker?.positionY - 20,
                  }}
                >
                  {options.map((o) => (
                    <li className="list-none" key={o.id}>
                      {o.name}
                    </li>
                  ))}
                </div>
              )}
            </div>
          ))}

        {/* Pokemons image */}
        <canvas
          onClick={(e) => canvasOnClick(e)}
          className="bg-[url(/images/pokemons.jpg)] relative w-[1600px] h-[2300px]"
        ></canvas>
      </main>
    </>
  );
};
export default Game;
