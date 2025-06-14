import useTimer from "../hooks/useTimer";

const Timer = () => {
  const { formattedTime } = useTimer();

  return (
    <>
      <div className="text-2xl md:text-4xl drop-shadow-lg drop-shadow-black bg-amber-600 border-1 text-black fixed !p-3 font-semibold z-9999 top-[5%] right-[10%]">
        {formattedTime}
      </div>
    </>
  );
};
export default Timer;
