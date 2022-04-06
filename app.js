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
  let degreeSectionSpan = document.querySelector('.degree-section span');

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

          // set DOM elements from API
          temperatureDegree.textContent = Math.floor(temp);
          temperatureDescription.textContent = description;
          locationTimezone.textContent = `${name} / ${country}`;

          // update icon
          const iconCode = data.weather[0].icon;
          icon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

          // converting to farenheit
          let farenheit = Math.floor(temp) * (9 / 5) + 32;
          degreeSection.addEventListener('click', () => {
            if (degreeSectionSpan.textContent === 'C') {
              temperatureDegree.textContent = Math.floor(farenheit);
              degreeSectionSpan.textContent = 'F';
            } else {
              degreeSectionSpan.textContent = 'C';
              temperatureDegree.textContent = Math.floor(temp);
            }
          });
        });
    });
  } else {
    h1.textContent = 'hey dis not worki worki cause u disbaled the ting';
  }
});
