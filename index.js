const temperatureElem = document.querySelector('.weather1');
const cityElem = document.querySelector('.weather2 p');
const dateElem = document.querySelector('.weather2 span');
const emojiElem = document.querySelector('.weather3 img');
const weatherElem = document.querySelector('.weather3 img');
const searchField = document.querySelector('#location');
const form = document.querySelector('form');


// event to handle location input
form.addEventListener('submit', (e)=> {
  e.preventDefault();

  target = searchField.value;
  fetchData(target);
});


// Function to fetch Data from Weather API
const fetchData = async(target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=787084b36fb94615b1d202903231009&q=${target}&aqi=no`; 

  const response = await fetch(url);
  const data = await response.json();

  const {
    current: {
      temp_c,
      condition: {
        icon,
        text,
      },
    },
    location : {
      name,
      localtime,
    },
  } = data;

  updateConditions(temp_c, name, localtime, icon, text);

  } catch (error) {
    alert("Location not found. Please try again!");
  }

};


// Calling for Weather data for Delhi as default
fetchData("Delhi");


// Function to update the weather data in the webpage
const updateConditions = (temp, city, date, emoji, weather) => {

  const exactDate = date.split(" ")[0];
  const exactDay = new Date(exactDate).getDay();

  temperatureElem.innerText = temp;
  temperatureElem.append("\u00B0");
  cityElem.innerText = city;
  dateElem.innerText = `${findDayName(exactDay)} ${exactDate}`;
  emojiElem.setAttribute('src', emoji);
  weatherElem.setAttribute('title', weather);
  
};


// Function to map daynumber to full name of the day
function findDayName(value) {

  switch(value) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return "Couldn't fetch day";
  }
}