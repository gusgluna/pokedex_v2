import "bootstrap";
import "./styles/main.scss";
import Template from "./templates/Template";

(async function App() {
  const main = null || document.getElementById("app");
  main.innerHTML = await Template();
})();
