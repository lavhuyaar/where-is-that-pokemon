import { memo, useEffect, useState } from "react";
import { NavLink } from "react-router";
import Loading from "../components/Loading";
import handleAxiosError from "../utils/handleAxiosError";
import axiosInstance from "../api/axiosInstance";
import formatMilliseconds from "../utils/formatMilliseconds";

interface User {
  name: string;
  timeTook: number;
}

const Leaderboard = memo(() => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getLeaderboardData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/leaderboard");
        setData(response.data?.users);
      } catch (err) {
        handleAxiosError(
          err,
          "Error occured in loading Leaderboard data!",
          setError
        );
      } finally {
        setLoading(false);
      }
    };

    getLeaderboardData();
  }, []);

  // Loader
  if (loading) {
    return <Loading />;
  }

  // Error
  if (error) {
    return (
      <>
        <main className="w-full h-screen text-center flex flex-col items-center justify-center !p-4 ">
          <h2 className="font-semibold text-4xl">{error}</h2>
          <NavLink
            to="/"
            className="!px-3 !py-1 !mt-4 rounded-2xl text-2xl font-semibold bg-amber-300 hover:bg-amber-600 transition text-gray-600
            hover:text-black"
          >
            Go back to Home
          </NavLink>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="bg-amber-300 w-4/5 md:w-3/5 h-[80vh] rounded-xl shadow-2xl drop-shadow-lg drop-shadow-gray-600 !p-6 overflow-auto">
        <h1 className="text-3xl sm:text-5xl text-bold text-gray-600 text-center">
          Leaderboard
        </h1>
        {data.length > 0 ? (
          <div className="grid grid-cols-3 sm:text-center sm:!p-3">
            <h3 className="row-span-1 col-span-1 !mb-10 !mt-16 text-xl md:text-4xl leading-4">
              Rank
            </h3>
            <h3 className="row-span-1 col-span-1 !mb-10 !mt-16 text-xl md:text-4xl leading-4">
              Player
            </h3>
            <h3 className="row-span-1 col-span-1 !mb-10 !mt-16 text-xl md:text-4xl leading-4">
              Time took <br />
              <span className="text-sm leading-2">
                (hours: minutes: seconds: milliseconds){" "}
              </span>
            </h3>

            {data.map((d, index) => (
              <>
                <li className="col-span-1 list-none text-md md:text-2xl">
                  {index + 1}
                </li>
                <li className="col-span-1 list-none text-md md:text-2xl break-words">
                  {d.name}
                </li>
                <li className="col-span-1 list-none text-md md:text-2xl">
                  {formatMilliseconds(d.timeTook)}
                </li>
              </>
            ))}
          </div>
        ) : (
          <div className="w-full h-4/5 text-center flex items-center justify-center">
            <h2 className="text-xl md:text-4xl">No players found :(</h2>
          </div>
        )}
      </main>
    </>
  );
});
export default Leaderboard;
