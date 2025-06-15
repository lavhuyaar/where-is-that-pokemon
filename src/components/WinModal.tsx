import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useTimer from "../hooks/useTimer";
import axiosInstance from "../api/axiosInstance";

const WinModal = ({ resetGame }: { resetGame: VoidFunction }) => {
  const [name, setName] = useState<string>("");
  const [nameValidation, setNameValidation] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { formattedTime, time } = useTimer();
  const navigate = useNavigate();

  const nameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  useEffect(() => {
    const validateName = () => {
      const validName: boolean = name.trim().length > 1;
      const upperLimitExceeded: boolean = name.trim().length > 30;

      if (!validName) {
        setNameValidation("Please enter your name (must be atleast 2 letters)");
      } else if (upperLimitExceeded) {
        setNameValidation("Name cannot be more than 30 letters");
      } else {
        setNameValidation("");
      }
    };

    validateName();
  }, [name]);

  const handleOnSumbit = async () => {
    if (nameValidation || !name) return;

    toast.loading("Submitting score...");
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/leaderboard", {
        name,
        timeTook: time * 10,
      });
      toast.dismiss();
      toast.success(response?.data?.message, { autoClose: 3000 });
      resetGame();
      navigate("/leaderboard", { replace: true });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center z-99999 bg-gray-700/70 fixed top-0">
        <div className="bg-fuchsia-100 w-[300px] sm:w-[600px] rounded-xl !p-6 text-center text-gray-600 flex flex-col justify-center items-center">
          <h2 className="text-4xl leading-8">
            Congratulations! You found all the Pokemons!
          </h2>
          <p className="text-2xl !mt-2">Time took:</p>
          <h2 className="text-5xl !mb-2 text-black">{formattedTime}</h2>

          <div className="justify-self-left flex flex-col items-center gap-2 w-3/5 !mt-3">
            <div className="flex flex-col sm:flex-row items-center gap-3 ">
              <input
                type="text"
                value={name}
                onChange={nameOnChange}
                placeholder="Enter your name"
                className="bg-gray-400 justify-self-left rounded-lg !px-4 !py-0.5 outline-none focus:outline-none text-xl drop-shadow-lg drop-shadow-gray-600"
                onKeyDown={(e) => e.key === "Enter" && handleOnSumbit()}
              />
              <button
                disabled={isSubmitting}
                onClick={handleOnSumbit}
                className="w-full sm:w-[100px] text-center drop-shadow-lg drop-shadow-gray-600 !py-0.5 rounded-lg text-xl font-semibold bg-amber-300 hover:bg-amber-600 transition text-gray-600 hover:text-black cursor-pointer"
              >
                Submit
              </button>
            </div>
            {nameValidation && (
              <div className="text-red-600 text-md sm:text-lg leading-4 w-full">
                {nameValidation}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default WinModal;
