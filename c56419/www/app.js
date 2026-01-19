const key = "ac3e0ac900850a50e23e94fe336a9adc";

const weatherDiv = document.getElementById("weather");
const forecastDiv = document.getElementById("forecast");
const btn = document.getElementById("btn");

btn.onclick = () => {
    const city = document.getElementById("city").value;

    if (!city) return;

    const urlCurrent =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=pl`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", urlCurrent);
    xhr.onload = () => {
        const data = JSON.parse(xhr.responseText);
        console.log("CURRENT:", data);

        weatherDiv.classList.remove("placeholder");

        weatherDiv.innerHTML =
            `<div>Temperatura: ${data.main.temp}°C</div>
             <div>Wilgotność: ${data.main.humidity}%</div>
             <div>Opis: ${data.weather[0].description}</div>`;
    };
    xhr.send();

    const urlForecast =
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric&lang=pl`;

    fetch(urlForecast)
        .then(r => r.json())
        .then(f => {
            console.log("FORECAST:", f);

            forecastDiv.innerHTML = "";

            f.list.slice(0, 5).forEach(item => {
                const el = document.createElement("div");
                el.className = "forecast-item";
                el.innerHTML = `
                    <div>${item.dt_txt}</div>
                    <div>${item.main.temp}°C</div>
                    <div>${item.weather[0].description}</div>
                `;
                forecastDiv.appendChild(el);
            });
        });
};