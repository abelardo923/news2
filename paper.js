// MAIN APP
// require("dotenv").config();

const API_KEY = "bc5d5ddcfd2343868d705dfbf0165914";
// process.env.API_KEY;
const url = "https://newsapi.org/v2/everything?q=";

async function fetchData(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  return data;
}
fetchData("all").then((data) => renderMain(data.articles));

// Menu BTN
let mobileMenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");
let menuBtnDisplay = false;

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Render news
function renderMain(arr) {
  let mainHTML = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].urlToImage) {
      mainHTML += `<div class="card">
                   <a href=${arr[i].url}>
                   <img src="${arr[i].urlToImage}" lazy="loading"/>
                    <h4>${arr[i].title}</h4>
                    <div class="publishByDate">
                      <p>${arr[i].source.name}</p>
                      <span>•</span>
                      <p>${new Date(
                        arr[i].publishedAt
                      ).toLocaleDateString()}</p>
                    </div>
                    <div class="desc">
                    ${arr[i].description}
                    </div>
                      </a>
                  </div>`;
    }
  }
  document.querySelector("main").innerHTML = mainHTML;
}

const searchBtn = document.getElementById("searchForm");
const searchBtnMobile = document.getElementById("searchFormMobile");
const searchInputMobile = document.getElementById("searchInputMobile");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("searchInput.value");

  const data = await fetchData(searchInput.value);
  renderMain(data.articles);
});

searchBtnMobile.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = await fetchData(searchInputMobile.value);
  renderMain(data.articles);
});

async function Search(query) {
  const data = await fetchData(query);
  renderMain(data.articles);
}
