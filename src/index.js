import("./style.css");

const apiKey = "62FA7CLW5U28ZKRN3TZ2PTAFX";

const getWeatherButton = document.querySelector(".js-button");
const placeInput = document.querySelector(".js-input");
const weatherCard = document.querySelector(".js-card");

getWeatherButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const placeName = placeInput.value.toUpperCase();

    if (placeName) {
        try {
            const data = await getWeatherData(placeName);
            console.log(data);
            displayWeather(data);
        } catch (error) {
            displayError(error);
        }
    } else {
        displayError("Please enter a location");
    }
});

async function getWeatherData(placeName) {
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${placeName}?unitGroup=metric&key=${apiKey}&contentType=json`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Can not fetch weather data");
    }

    return await response.json();
}

function displayWeather(data) {
    const {
        resolvedAddress: name,
        currentConditions: { conditions, humidity, temp, icon },
    } = data;

    const nameBlock = document.createElement("h1");
    const tempBlock = document.createElement("h2");
    const humidityBlock = document.createElement("p");
    const stateBlock = document.createElement("p");
    const emojiBlock = document.createElement("p");

    humidityBlock.classList.add("humidity");
    stateBlock.classList.add("state");
    emojiBlock.classList.add("emoji");

    nameBlock.textContent = name;
    tempBlock.textContent = temp + "℃";
    humidityBlock.textContent = "Humidity: " + humidity + "%";
    stateBlock.textContent = conditions;

    emojiBlock.textContent = displayEmoji(icon);

    weatherCard.textContent = "";

    weatherCard.append(nameBlock);
    weatherCard.append(tempBlock);
    weatherCard.append(humidityBlock);
    weatherCard.append(stateBlock);
    weatherCard.append(emojiBlock);

    weatherCard.style.display = "flex";
}

function displayEmoji(icon) {
    switch (icon) {
        case "snow":
            return "🌨️";
        case "rain":
            return "🌧️";
        case "fog":
            return "🌫️";
        case "wind":
            return "🍃";
        case "cloudy":
            return "☁️";
        case "partly-cloudy-day":
            return "🌥️";
        case "partly-cloudy-night":
            return "🌥";
        case "clear-day":
            return "☀️";
        case "clear-night":
            return "🌣";
        default:
            return "❓";
    }
}

function displayError(error) {
    weatherCard.textContent = "";
    weatherCard.style.display = "flex";
    const errorBlock = document.createElement("p");
    errorBlock.textContent = error;

    weatherCard.append(errorBlock);
}
