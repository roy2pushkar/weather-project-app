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

function switchTab(newTab) {
  if (newTab != oldTab) {
    oldTab.classList.remove("current-tab");
    oldTab = newTab;
    oldTab.classList.add("current-tab");
  }

  if (!searchForm.classList.contains("active")) {
    //kya search form wala container is invisible, if yes then make it visible
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    searchForm.classList.add("active");
  } else {
    //main pehle search wale tab pr tha, ab your weather tab visible karna h
    searchForm.classList.remove("active");
    userInfoContainer.classList.remove("active");
    //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
    //for coordinates, if we haved saved them there.
    getfromSessionStorage();
  }
}
//Add event Listeners to users tab
userTab.addEventListener("click", () => {
  //pass clicked tab as input paramter
  switchTab(userTab);
});

//Add event Listeners to search tab
searchTab.addEventListener("click", () => {
  //pass clicked tab as input paramter
  switchTab(userTab);
});

//check , if co-oridinates are already present in session storage
function getfromSessionStorage() {
  const localCoordinates = sessionStorage.getItem("user-coordinates");

  if (!localCoordinates) {
    //agar local cooridinates are not present in session storages
    grantAccessContainer.classList.add("active");
  } else {
    const coordinates = JSON.parse(localCoordinates);
    fetchUserWeatherInfo(coordinates);
  }
}

async function fetchUserWeatherInfo(coordinates) {
  const { lat, lon } = coordinates;

  //make grantAccess container invisible
  grantAccessContainer.classList.remove("active");
  //make loading screen visible
  loadingScreen.classList.add("active");

  //API call to get weather information

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const data = await response.JSON();

    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data);
  } catch (err) {
    loadingScreen.classList.remove("active");
    //HW
  }
}
