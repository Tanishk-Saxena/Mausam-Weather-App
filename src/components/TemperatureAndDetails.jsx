import React from 'react';
import {UilArrowUp, UilArrowDown, UilTemperature, UilTear, UilWind, UilSun, UilSunset} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService';

function TemperatureAndDetails({weather: {
    main,
    icon,
    temp,
    feels_like,
    humidity,
    speed,
    timezone,
    sunrise,
    sunset,
    temp_max,
    temp_min
}}) {
  return (
    <div>
        <div className="flex items-center justify-center py-6 text-2xl text-white">
            <p>{main}</p>
        </div>

        <div className="flex flex-row items-center justify-between py-3 text-white">
            <img src={iconUrlFromCode(icon)} alt="pictorial depiction of weather" className="w-20"/>
            <p className="text-5xl">{`${Math.round(temp)}°`}</p>
            <div className="flex flex-col space-y-2 text-sm">
                <div className="flex items-center justify-center font-light">
                    <UilTemperature size={18} className="mr-1"/>
                    Real feel:
                    <span className="font-medium ml-1">{`${Math.round(feels_like)}°`}</span>
                </div>
                <div className="flex items-center justify-center font-light">
                    <UilTear size={18} className="mr-1"/>
                    Humidity:
                    <span className="font-medium ml-1">{`${humidity}%`}</span>
                </div>
                <div className="flex items-center justify-center font-light">
                    <UilWind size={18} className="mr-1"/>
                    Wind:
                    <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>
                </div>
            </div>
        </div>

        {/* toFixed() is same as Math.round(); */}

        <div className="flex flex-row items-center justify-center space-x-2 py-3 text-white text-xs md:text-sm">
            <UilSun/>
            <p className="font-light">
                Rise: <p className="font-medium">{formatToLocalTime(sunrise, timezone, "hh:mm a")}</p>
            </p>
            <p className="font-light">|</p>
            <UilSunset/>
            <p className="font-light">
                Set: <p className="font-medium">{formatToLocalTime(sunset, timezone, "hh:mm a")}</p>
            </p>
            <p className="font-light">|</p>
            <UilArrowUp/>
            <p className="font-light">
                High: <p className="font-medium">{`${Math.round(temp_max)}°`}</p>
            </p>
            <p className="font-light">|</p>
            <UilArrowDown/>
            <p className="font-light">
                Low: <p className="font-medium ml-1">{`${Math.round(temp_min)}°`}</p>
            </p>
        </div>
    </div>
  )
}

export default TemperatureAndDetails