import { NavLink } from "react-router";

const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <main className="flex flex-col items-center justify-center w-full h-screen ">
        <img
          src="/images/logo.png"
          alt="Where Is That Pokemon?"
          className="w-4/5 md:w-1/5 object-center"
        />
        <div className="flex flex-col md:flex-row gap-3">
          <NavLink
            to="/leaderboard"
            className="w-[200px] text-center drop-shadow-lg drop-shadow-gray-600 !py-2 rounded-2xl text-2xl font-semibold bg-amber-300 hover:bg-amber-600 transition text-gray-600 hover:text-black"
          >
            Leaderboard
          </NavLink>
          <NavLink
            to="/play"
            className="w-[200px] drop-shadow-lg drop-shadow-gray-600 text-center !py-2 rounded-2xl text-2xl font-semibold bg-amber-300 hover:bg-amber-600 transition text-gray-600 hover:text-black"
          >
            Play
          </NavLink>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};
export default Home;
