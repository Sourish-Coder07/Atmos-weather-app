function getWeather(location = "London", auto = false) {
  const apiKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxx';

  const isCoordinate = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(location.trim());
  const queryParam = isCoordinate
    ? location.trim().replace(/\s+/g, '')
    : encodeURIComponent(location);

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${queryParam}&aqi=yes`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Invalid location or server error');
      return response.json();
    })
    .then(data => {
      const temp = data.current.temp_c;
      const condition = data.current.condition.text;
      const city = data.location.name;
      const country = data.location.country;
      const isDay = data.current.is_day;

      document.getElementById('weatherInfo').innerHTML =
        `🌍 Location: ${city}, ${country}<br>
         🌡 Temperature: ${temp}°C<br>
         🌥 Condition: ${condition}`;

      document.body.classList.remove('day-theme', 'night-theme');
      document.body.classList.add(isDay ? 'day-theme' : 'night-theme');

      if (auto) {
        document.getElementById('locationInput').value = `${city}`;
      }
    })
    .catch(error => {
      document.getElementById('weatherInfo').innerHTML =
        '❌ Could not retrieve weather. Please check the location.';
      console.error('Fetch error:', error);
    });
}

// Typing animation for your name
function typeSignature() {
  const nameText = "Made by SOURISH 😎";
  const typedSpan = document.getElementById("typedName");
  let index = 0;

  const typeWriter = () => {
    if (index < nameText.length) {
      typedSpan.innerHTML += nameText.charAt(index);
      index++;
      setTimeout(typeWriter, 100);
    }
  };
  typeWriter();
}

// Load weather using geolocation or default
window.onload = () => {
  typeSignature();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const coords = `${lat},${lon}`;
      getWeather(coords, true);
    }, () => {
      getWeather("London");
    });
  } else {
    getWeather("London");
  }
};

// Button click handler
function handleSearch() {
  const location = document.getElementById('locationInput').value;
  getWeather(location);
}
