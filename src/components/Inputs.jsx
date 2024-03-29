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
      setCity("");
      document.getElementById("search").value="";
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
        <div className="flex flex-row w-3/4 items-center justify-start space-x-1 md:space-x-4">
            <form onSubmit = {(e) => {e.preventDefault();handleSearchClick();}}>
            <input type="text" id="search" val={city} onChange={handleOnChange} className="text-xs md:text-xl font-light p-2 focus:outline-none w-full shadow-xl capitalize placeholder:lowercase" placeholder="Search for city..." />
            <input type="submit" style={{display: "none"}}></input>
            </form>
            <UilSearch color="white" size={23} className="cursor-pointer transition ease-out hover:scale-125" onClick={handleSearchClick}/>
            <UilLocationPoint color="white" size={23} className="cursor-pointer transition ease-out hover:scale-125" onClick={handleLocationClick}/>

        </div>

        <div className="flex flex-row w-1/4 items-center justify-end">

            <button name="metric" className={`text-sm md:text-xl text-white ${metricMode} hover:scale-125 transition ease-out`} onClick={changeUnitToMetric}>°C</button>
            <p className="text-sm md:text-xl text-white mx-1">|</p>
            <button name="imperial" className={`text-sm md:text-xl text-white ${imperialMode} hover:scale-125 transition ease-out`} onClick={changeUnitToImperial}>°F</button>

        </div>
    </div>
  )
}

export default Inputs