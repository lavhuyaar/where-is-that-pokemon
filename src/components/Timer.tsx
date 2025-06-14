import useTimer from "../hooks/useTimer";

const Timer = () => {
  const { formattedTime } = useTimer();

  return (
    <>
      <div className="bg-red-600 fixed !p-3 font-semibold z-9999 top-[5%] right-[10%]">
        {formattedTime}
      </div>
    </>
  );
};
export default Timer;
