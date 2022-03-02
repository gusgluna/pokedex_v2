import NavBar from "@templates/NavBar";
import Footer from "@templates/Footer";
import getPokedex from "@templates/getPokedex";
import getHash from "@utils/getHash";
import resolveRoutes from "@utils/resolveRoutes";

const router = async () => {
  const navBar = null || document.getElementById("navBar");
  navBar.innerHTML = await NavBar();
  const footer = null || document.getElementById("footer");
  footer.innerHTML = await Footer();

  let hash = getHash();
  let route = resolveRoutes(hash);
  getPokedex(route);
};

export default router;
