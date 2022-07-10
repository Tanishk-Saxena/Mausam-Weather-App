import React, { useState } from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'

function Inputs({setUnits, setQuery}) {

  const [city, setCity] = useState("");
  const [metricMode, setMetricMode] = useState("font-bold");
  const [imperialMode, setImperialMode] = useState("font-light");

  const handleOnChange = (e) => {
    setCity(e.target.value);
  }

  const changeUnitToMetric = () => {
    setUnits("metric");
    setMetricMode("font-bold");
    setImperialMode("font-light");
  }

  const changeUnitToImperial = () => {
    setUnits("imperial");
    setMetricMode("font-light");
    setImperialMode("font-bold");
  }

  const handleSearchClick = () => {
    if(city !== "") {
      setQuery({q: city});
    }
  }

  const handleLocationClick = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((data) => {
        let lat = data.coords.latitude;
        let lon = data.coords.longitude;

        setQuery({lat, lon});
      });
    }
  }

  return (
    <div className="flex flex-row justify-center my-6">
        <div className="flex flex-row w-3/4 items-center justify-center space-x-4">

            <input type="text" val={city} onChange={handleOnChange} className="text-xl font-light p-2 focus:outline-none w-full shadow-xl capitalize placeholder:lowercase" placeholder="Search for city..." />
            <UilSearch color="white" size={25} className="cursor-pointer transition ease-out hover:scale-125" onClick={handleSearchClick}/>
            <UilLocationPoint color="white" size={25} className="cursor-pointer transition ease-out hover:scale-125" onClick={handleLocationClick}/>

        </div>

        <div className="flex flex-row w-1/4 items-center justify-center">

            <button name="metric" className={`text-xl text-white ${metricMode} hover:scale-125 transition ease-out`} onClick={changeUnitToMetric}>°C</button>
            <p className="text-xl text-white mx-1">|</p>
            <button name="imperial" className={`text-xl text-white ${imperialMode} hover:scale-125 transition ease-out`} onClick={changeUnitToImperial}>°F</button>

        </div>
    </div>
  )
}

export default Inputs