import getData from "../utils/getData.js";

const Template = async () => {
  const generations = await getData("generation");
  let generationsList = "";
  generations.results.forEach((element) => {
    generationsList += `<li><a class="dropdown-item" href="#">${element.name}</a></li>`;
  });

  const pokedexes = await getData("pokedex");
  const pokedexes2 = await getData("pokedex?offset=20&limit=8");
  let pokdexesList = "";
  pokedexes.results.forEach((dex) => {
    pokdexesList += `<li><a class="dropdown-item" href="#">${dex.name}</a></li>`;
  });
  pokedexes2.results.forEach((dex) => {
    pokdexesList += `<li><a class="dropdown-item" href="#">${dex.name}</a></li>`;
  });

  const types = await getData("type");
  let typesList = "";
  types.results.forEach((type) => {
    typesList += `<li><a class="dropdown-item" href="#">${type.name}</a></li>`;
  });

  const navBar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Pokedex</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Generations
          </a>
          <ul class="dropdown-menu text-uppercase" aria-labelledby="navbarDropdown">
          ${generationsList}
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Pokedex
          </a>
          <ul class="dropdown-menu text-capitalize" aria-labelledby="navbarDropdown">
          ${pokdexesList}
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Types
          </a>
          <ul class="dropdown-menu text-capitalize" aria-labelledby="navbarDropdown">
          ${typesList}
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
  `;

  const pokemonList = await getData("generation/1");
  console.log(pokemonList);

  const mainContainer = `
    <div class="container">
    </div>
  `;

  const view = `
    ${navBar}
    ${mainContainer}
`;
  return view;
};

export default Template;
