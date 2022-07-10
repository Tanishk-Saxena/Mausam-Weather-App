import { DateTime } from "luxon";

const API_KEY = "fda8c3e7574cbf713183eeae40d340e0";
const BASE_URL = "https://api.openweathermap.org/data/2.5/"

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType)
    url.search = new URLSearchParams({...searchParams, appid: API_KEY});

    // let res = await fetch(url);
    // let info = await res.json();
    return fetch(url)
    .then((res) => res.json());
}

const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: {speed}
    } = data;

    const {main, icon} = weather[0];

    return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, main, icon, speed }
}

const formatForecastWeather = (data) => {
    let {timezone, daily, hourly} = data;
    daily=daily.slice(1, 6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, "ccc"),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    });
    hourly=hourly.slice(1, 6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
            temp: d.temp,
            icon: d.weather[0].icon
        }
    });
    return {timezone, daily, hourly};
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatCurrentWeather);

    const {lat, lon} = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData("onecall", {lat, lon, exclude: "current,minutely,alerts", units: searchParams.units}).then(formatForecastWeather);

    return {...formattedCurrentWeather, ...formattedForecastWeather};

    //...<object> means that the values of object members are being used and mixed with some other members and made under an entirely new and different object. The original names of the objects involved are discarded.
}

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => {
    //we did escaping in the ' | Local time: ' part
    return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
}

const iconUrlFromCode = (code) => {
    return `http://openweathermap.org/img/wn/${code}@2x.png`;
}

export default getFormattedWeatherData;

export {formatToLocalTime, iconUrlFromCode};