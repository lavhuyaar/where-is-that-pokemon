import React, { useState, type ReactNode } from "react";

const Game = () => {
  const [boxes, setBoxes] = useState<ReactNode[] | undefined>(undefined);
  // const [options] = useState<{ [key: string]: string }[]>([
  //   { name: "Option1" },
  //   { name: "Option2" },
  //   { name: "Option3" },
  // ]);

  const createBox = (positionX: number, positionY: number) => {
    const divBox = (
      <div
        className={`absolute size-[60px] border-4 border-red-600 z-999`}
        style={{ left: positionX - 20, top: positionY - 20 }}
      />
    );
    setBoxes((prev) => (Array.isArray(prev) ? [...prev, divBox] : [divBox]));
  };

  const canvasOnClick = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvas = event.target as HTMLCanvasElement; //Gets the canvas element
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    createBox(x, y);
    console.log("Coordinate x: " + x, "Coordinate y: " + y);
  };

  return (
    <>
      <main className="relative overflow-auto">
        {boxes && boxes.length > 0 && boxes.map((box) => <>{box}</>)}
        <canvas
          onClick={(e) => canvasOnClick(e)}
          className="bg-[url(/images/pokemons.jpg)] relative w-[1600px] h-[2300px]"
        ></canvas>
      </main>

      {/* {options && (
        <select className="">
          {options.map((opt) => (
            <option>{opt.name}</option>
          ))}
        </select>
      )} */}
    </>
  );
};
export default Game;
