const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector("[.weather-container]");
const grantAccessContainer = document.querySelector(
  "[.grant-access-container]"
);
const searchForm = document.querySelector("[data-searchForm]");

const loadingScreen = document.querySelector("[.loading-container]");
const userInfoContainer = document.querySelector("[.user-info-container]");



//initially vairables need????

let oldTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-tab");
getfromSessionStorage();

