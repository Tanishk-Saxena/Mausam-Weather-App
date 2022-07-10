import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useState, useEffect } from 'react';

function App() {

  const [query, setQuery] = useState({q: "berlin"});
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const formatBackground = () => {
    if(!weather){
      return "from-cyan-700 to-blue-700";
    }
    const threshold = units === "metric" ? 20: 60;
    if(weather.temp<=threshold){
      return "from-cyan-700 to-blue-700";
    }else if(weather.temp>threshold){
      return "from-yellow-700 to-orange-700";
    }
  }

  useEffect(() => {

    const fetchWeather = async () => {
      await getFormattedWeatherData({...query, units}).then((data) => {setWeather(data)});
    }

    fetchWeather();

  }, [query, units]);

  return (
    <>
    {/* <div className="App"></div> */}
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-400`}>
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} setUnits={setUnits}/>

      {weather && (
        <>
        <TimeAndLocation weather={weather}/>
        <TemperatureAndDetails weather={weather}/>
        <Forecast title="hourly forecast" forecast={weather.hourly}/>
        <Forecast title="daily forecast" forecast={weather.daily}/>
        </>
      )}
      
    </div>
    </>
  );
}

export default App;
