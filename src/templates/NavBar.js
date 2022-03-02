import getData from "@utils/getData";

const dropMenu = (title, objItems) => {
  let listElementes = "";

  objItems.forEach((item) => {
    listElementes += `
    <li>
      <a class="dropdown-item" href="#${item.url.substring(26)}">
        ${item.name}
      </a>
    </li>
    `;
  });

  return `<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown"
      role="button" data-bs-toggle="dropdown" aria-expanded="false">
      ${title}
    </a>
    <ul class="dropdown-menu text-capitalize" aria-labelledby="navbarDropdown">
      ${listElementes}
    </ul>
  </li>`;
};

const NavBar = async () => {
  const gen = await getData("generation");
  const genResults = await gen.results;

  const dex1 = await getData("pokedex");
  const dex2 = await getData("pokedex?offset=20&limit=8");
  const dexResults = await dex1.results.concat(dex2.results);

  const types = await getData("type");
  let typesResults = await types.results;
  typesResults = typesResults.slice(0, typesResults.length - 2);

  const view = `
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Pokedex</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        ${dropMenu("Generations", genResults)}
        ${dropMenu("Pokedexes", dexResults)}
        ${dropMenu("Types", typesResults)}
      </ul>
    </div>
  </div>
</nav>
    `;

  return view;
};

export default NavBar;
