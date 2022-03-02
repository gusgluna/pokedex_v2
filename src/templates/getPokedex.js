import getData from "@utils/getData.js";

const pokemonList = async (url) => {
  const res = await getData(url);
  let pokemonList = [];

  if (url.includes("generation")) {
    pokemonList = res.pokemon_species;
  } else if (url.includes("pokedex")) {
    pokemonList = res.pokemon_entries;
  } else if (url.includes("type")) {
    pokemonList = res.pokemon;
  }

  if (url.includes("generation")) {
    let pokemonInfo = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const infoEspcies = await getData(pokemon.url.substring(26));
        const pokemonInfoDetails = await getData(
          infoEspcies.varieties[0].pokemon.url.substring(26)
        );
        return pokemonInfoDetails;
      })
    );
    return pokemonInfo;
  } else if (url.includes("pokedex")) {
    let pokemonInfo = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const infoEspcies = await getData(
          pokemon.pokemon_species.url.substring(26)
        );
        const pokemonInfoDetails = await getData(
          infoEspcies.varieties[0].pokemon.url.substring(26)
        );
        return pokemonInfoDetails;
      })
    );
    return pokemonInfo;
  } else if (url.includes("type")) {
    let pokemonInfo = await Promise.all(
      pokemonList.map(async (pokemon) => {
        // const infoEspcies = await getData(
        //   pokemon.pokemon_species.url.substring(26)
        // );
        const pokemonInfoDetails = await getData(
          pokemon.pokemon.url.substring(26)
        );
        return pokemonInfoDetails;
      })
    );
    return pokemonInfo;
  }
};

const getPokedex = async (id) => {
  document.getElementById("pokedexContainer").innerHTML = `
  <div class="container">
    <div class="row>
      <div class="col">
        <div class="d-flex justify-content-center align-items-center vh-80">
        <div class="spinner-border text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        </div>
      </div>
    </div>
  </div>
      `;
  let pokeList = await pokemonList(id);
  let cards = "";
  pokeList.forEach((pokemon) => {
    cards += `
      <div class="my-2 col-md-3 col-lg-2 col-5" style="order:${pokemon.id}">
        <div class="card ${pokemon.types[0].type.name}">
          <!--Card Header-->
          <div class="card-header text-capitalize text-center">
            ${pokemon.name}
          </div>
          <!--Sprite-->
          <img
            loading="lazy"
            src="${pokemon.sprites.front_default}"
            class="card-img-top sprite mx-auto"
            alt="${pokemon.name}"
          >
          <!--Card Body-->
          <div class="card-body">
            <!-- Button trigger modal -->
            <div class="row justify-content-center">
              <span
                type="button"
                class="badge bg-secondary mx-auto col-3"
                data-bs-toggle="modal"
                data-bs-target="#modal${pokemon.id}"
              >
                ...
              </span>
            </div>
            <!-- Modal -->
            <div
              class="modal fade"
              id="modal${pokemon.id}"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content bg-dark text-light">
                  <div class="modal-header">
                    <h5
                      class="modal-title mx-auto text-capitalize"
                      id="modal${pokemon.id}Label"
                    >
                      ${pokemon.name}
                    </h5>
                  </div>
                    <div class="modal-body">
                      <img
                      loading="lazy"
                      src="${
                          pokemon.sprites.other["official-artwork"]
                            .front_default
                        }"
                        class="rounded mx-auto d-block artwork"
                        alt="${pokemon.name}"
                      >
                      <p class="text-center">No. ${pokemon.id}</p>
                      <p class="text-center text-capitalize">
                        Types: ${
                          typeof pokemon.types[1] == "undefined"
                            ? `<span class="badge text-dark ${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</span>`
                            : `<span class="badge text-dark ${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</span>
                          <span class="badge text-dark ${pokemon.types[1].type.name}">${pokemon.types[1].type.name}</span>`
                        }
                      </p>
                      <p class="text-center">Height: ${
                        pokemon.height / 10
                      } m.</p>
                      <p class="text-center">Weight: ${
                        pokemon.weight / 10
                      } kg.</p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-danger mx-auto d-block" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>`;
  });

  document.getElementById("pokedexContainer").innerHTML = `
  <div class="container mt-5 mb-5">
    <div class="row justify-content-evenly pt-2 pb-2">
        ${cards}
    </div>
  </div>
  `;
};

export default getPokedex;
