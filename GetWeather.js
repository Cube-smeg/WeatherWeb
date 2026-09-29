async function getWeather() {
    const url =
        "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,apparent_temperature_max,rain_sum,weather_code&timezone=auto";

    const res = await fetch(url);
    const data = await res.json();

    console.log(data);
    console.log("WEATHER CODES:", data.daily.weather_code);

    const weatherCards = document.querySelectorAll("[data-day-card]");
    console.log("Cards found:", weatherCards.length);

    weatherCards.forEach((card, index) => {
        const temperature = card.querySelector(".temperature");
        const feelslike = card.querySelector(".feels-like");
        const conditions = card.querySelector(".conditions");

        const weatherCode = data.daily.weather_code[index];

        console.log("Loop running:", index);
        console.log("Weather code:", weatherCode);

        temperature.textContent =
            `${data.daily.temperature_2m_max[index]}°C`;

        feelslike.textContent =
            `${data.daily.apparent_temperature_max[index]}°C`;

        conditions.textContent =
            `${data.daily.rain_sum[index]}mm Rain`;

        if (weatherCode <= 1) {
            card.classList.add("sunny");

        } else if (
            weatherCode === 2 ||
            weatherCode === 3 ||
            weatherCode === 45 ||
            weatherCode === 48
        ) {
            card.classList.add("cloudy");

        } else if (weatherCode >= 51 && weatherCode <= 67) {
            card.classList.add("light-rain");

        } else if (weatherCode >= 80 && weatherCode <= 82) {
            card.classList.add("heavy-rain");

        } else if (weatherCode >= 95) {
            card.classList.add("stormy");
        }
    });
}

const weatherButtons = document.querySelectorAll(".weather-card-button");

const weatherModal = document.querySelector("#weatherModal");
const weatherModalContent = document.querySelector("#weatherModalContent");
const weatherModalClose = document.querySelector("#weatherModalClose");


weatherButtons.forEach(button => {
    button.addEventListener("click", () => {

        const weatherCard = button.closest(".weather-card");

        const weatherDetails =
            weatherCard.querySelector(".weather-card-details");

        weatherModalContent.innerHTML = weatherDetails.innerHTML;

        weatherModal.classList.add("active");
    });
});


weatherModalClose.addEventListener("click", () => {
    weatherModal.classList.remove("active");
});


weatherModal.addEventListener("click", (event) => {
    if (event.target === weatherModal) {
        weatherModal.classList.remove("active");
    }
});


getWeather();