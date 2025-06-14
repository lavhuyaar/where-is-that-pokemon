import useTimer from "../hooks/useTimer";

const Timer = () => {
  const { formattedTime } = useTimer();

  return (
    <>
      <div className="text-2xl text-center min-w-[100px] sm:min-w-[150px] md:text-4xl drop-shadow-lg drop-shadow-gray-600 bg-amber-600 border-2 border-gray-600 text-black fixed !p-3 font-semibold z-9999 top-[5%] right-[10%]">
        {formattedTime}
      </div>
    </>
  );
};
export default Timer;
