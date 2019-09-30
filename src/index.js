window.onload = localStorage.clear();
const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://rickandmortyapi.com/api/character/";
// const API = "https://us-central1-escuelajs-api.cloudfunctions.net/characters";

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      localStorage.setItem("next_Fetch", response.info.next);
      const characters = response.results;
      let output = characters
        .map(character => {
          return `
          <article class="Card">
            <img src="${character.image}" />
            <h2>${character.name}<span>${character.species}</span></h2>
          </article>
    `;
        })
        .join("");
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
};

const loadData = async () => {
  try {
    const checkInfoURL = localStorage.getItem("next_Fetch");
    console.log(checkInfoURL);
    if (checkInfoURL === null) {
      return getData(API);
    } else if (checkInfoURL == "") {
      intersectionObserver.unobserve($observe);
      alert(
        "Lo sentimos, pero por el momento no hay más personajes para mostrar."
      );
    } else {
      return getData(checkInfoURL);
    }
  } catch (error) {
    console.error(error);
  }
};

const intersectionObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      loadData();
    }
  },
  {
    rootMargin: "0px 0px 100% 0px"
  }
);

intersectionObserver.observe($observe);
