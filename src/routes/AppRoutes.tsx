import { Route, Routes } from "react-router";

import Home from "../pages/Home";
import Game from "../pages/Game";
import PageNotFound from "../pages/PageNotFound";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Game />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
export default AppRoutes;
