import { NavLink } from "react-router";

const PageNotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="font-bold text-6xl">Error 404</h1>
      <h4 className="font-semibold text-2xl">Page not found</h4>
      <NavLink
        to="/"
        className="!px-3 !py-1 !mt-4 rounded-2xl text-2xl font-semibold bg-amber-300 hover:bg-amber-600 transition text-gray-600 hover:text-black"
      >
        Go back to Home
      </NavLink>
    </main>
  );
};
export default PageNotFound;
