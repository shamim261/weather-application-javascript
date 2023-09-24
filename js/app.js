// Get an API key from https://openweathermap.org/
const apiKey = "PUT API KEY HERE";

const apiLink = "https://api.openweathermap.org/data/2.5/weather";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

// Get weather information of users current location

async function gotLatLong(geo) {
  let lat = geo.coords.latitude;
  let long = geo.coords.longitude;
  let response = await fetch(
    `${apiLink}?appid=${apiKey}&units=metric&lat=${lat}&lon=${long}`
  );

  let data = await response.json();
  const weatherIcon = document.getElementById("wIcon");
  const weatherCondition = data.weather[0].main;

  console.log(weatherIcon);
  console.log(weatherCondition);

  switch (weatherCondition) {
    case "Haze":
      weatherIcon.src = "../images/mist.png";
      break;
    case "Clouds":
      weatherIcon.src = "../images/clouds.png";
      break;
    case "Drizzle":
      weatherIcon.src = "../images/drizzle.png";
      break;
    case "Rain":
      weatherIcon.src = "../images/rain.png";
      break;
    case "Mist":
      weatherIcon.src = "../images/mist.png";
      break;
    case "Snow":
      weatherIcon.src = "../images/snow.png";
      break;
    case "Clear":
      weatherIcon.src = "../images/clear.png";
      break;
    case "Thunderstorm":
      weatherIcon.src = "../images/thunderstorm.png";
      break;
    default:
      weatherIcon.src = "";
  }

  document.querySelector(".error p ").style.display = "none";
  document.querySelector(".data-section").style.display = "block";

  document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
  document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;
}

function failedLatLong() {
  Toastify({
    text: "Allow location to know the weather in your current area!",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to bottom, #09203f 0%, #537895 100%);",
    },
    onClick: function () {
      closeToast();
    }, // Callback after click
  }).showToast();
}

navigator.geolocation.getCurrentPosition(gotLatLong, failedLatLong);

// Get weather information by search result

async function getWeatherData(city) {
  let response = await fetch(
    `${apiLink}?appid=${apiKey}&units=metric&q=${city}`
  );
  if (response.status === 404) {
    document.querySelector(".error p ").style.display = "block";
    document.querySelector(".data-section").style.display = "none";
  } else {
    let data = await response.json();
    const weatherIcon = document.getElementById("wIcon");
    const weatherCondition = data.weather[0].main;

    console.log(weatherIcon);
    console.log(weatherCondition);

    // if (weatherCondition === "Haze") {
    //   weatherIcon.src = "../images/rain.png";
    // }

    switch (weatherCondition) {
      case "Haze":
        weatherIcon.src = "../images/mist.png";
        break;
      case "Clouds":
        weatherIcon.src = "../images/clouds.png";
        break;
      case "Drizzle":
        weatherIcon.src = "../images/drizzle.png";
        break;
      case "Rain":
        weatherIcon.src = "../images/rain.png";
        break;
      case "Mist":
        weatherIcon.src = "../images/mist.png";
        break;
      case "Snow":
        weatherIcon.src = "../images/snow.png";
        break;
      case "Clear":
        weatherIcon.src = "../images/clear.png";
        break;
      case "Thunderstorm":
        weatherIcon.src = "../images/thunderstorm.png";
        break;
      default:
        weatherIcon.src = "";
    }

    document.querySelector(".error p ").style.display = "none";
    document.querySelector(".data-section").style.display = "block";

    document.querySelector(".temp").innerHTML = `${Math.round(
      data.main.temp
    )}°C`;
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;
  }
}
searchBtn.addEventListener("click", () => {
  getWeatherData(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.keyCode === 13)
    getWeatherData(searchBox.value);
});
