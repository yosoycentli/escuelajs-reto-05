const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://rickandmortyapi.com/api/character/";
// const API = "https://us-central1-escuelajs-api.cloudfunctions.net/characters";

const CheckInfoURL = characters => {
  const infoURL = localStorage.getItem("next_fetch");
  if (infoURL == "") return characters;
  else return infoURL;
};

const getData = api => {
  localStorage.clear();
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      localStorage.setItem("nextFetch", response.info.next);
      CheckInfoURL();
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

const loadData = () => {
  return new Promise(res => {
    res(getData(API));
  });
};

const intersectionObserver = new IntersectionObserver(
  async entries => {
    if (entries[0].isIntersecting) {
      await loadData();
    }
  },
  {
    rootMargin: "0px 0px 100% 0px"
  }
);

intersectionObserver.observe($observe);
