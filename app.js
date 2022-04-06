window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  const temperatureDegree = document.querySelector('.temperature-degree');
  const locationTimezone = document.querySelector('.location-timezone');
  let icon = document.querySelector('.location img');
  let degreeSection = document.querySelector('.degree-section');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=78b9bcc0d790234beebef0f9ab7eb14c`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          const { description } = data.weather[0];
          const { country } = data.sys;
          const { name } = data;
          const iconCode = data.weather[0].icon;

          // set DOM elements from API
          temperatureDegree.textContent = Math.floor(temp);
          temperatureDescription.textContent = description;
          locationTimezone.textContent = `${name} / ${country}`;

          // update icon
          icon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        });
    });
  } else {
    h1.textContent = 'hey dis not worki worki cause u disbaled the ting';
  }
});
