import { NavLink } from "react-router";

const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <main className="flex flex-col items-center justify-center w-full h-screen">
        <img
          src="/images/logo.png"
          alt="Where Is That Pokemon?"
          className="w-4/5 md:w-1/5 object-center"
        />
        <div className="flex flex-col md:flex-row gap-3">
          <NavLink
            to="/play"
            className="w-[200px] text-center !py-2 rounded-2xl text-2xl font-semibold bg-amber-300 hover:bg-amber-600 transition"
          >
            Play
          </NavLink>
          <NavLink
            to="/leaderboard"
            className="w-[200px] text-center !py-2 rounded-2xl text-2xl font-semibold bg-amber-300 hover:bg-amber-600 transition"
          >
            Leaderboard
          </NavLink>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};
export default Home;
