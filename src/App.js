import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query, setQuery] = useState({q: "Berlin"});
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const formatBackground = () => {

    if(!weather){
      return "from-black to-black";
    }
    if(weather.main === "Clouds"){
      if(weather.description === "few clouds"){
        return "from-blue-400 to-gray-400";
      }else if(weather.description === "scattered clouds"){
        return "from-gray-600 to-gray-300";
      }else if(weather.description === "broken clouds"){
        return "from-gray-800 to-blue-300";
      }
    }else if(weather.main === "Rain"){
      if(weather.description === "shower rain"){
        return "from-gray-800 to-gray-400";
      }else{
        return "from-gray-900 to-gray-500";
      }
    }else if(weather.main === "Thunderstorm"){
      return "from-gray-700 to-yellow-400";
    }else if(weather.main === "Snow"){
      return "from-blue-300 to-cyan-300";
    }else if(weather.main === "Mist"){
      return "from-blue-300 to-gray-500";
    }else{
      const threshold = units === "metric" ? 20: 60;
      if(weather.temp<=threshold){
          return "from-cyan-700 to-blue-700";
      }else if(weather.temp>threshold){
        return "from-yellow-700 to-orange-700";
      }
    }

  }

  useEffect(() => {

    const fetchWeather = async () => {
      
      const message = query.q?query.q:"current location";
      toast.info(`Fetching weather for ${message}.`);

      await getFormattedWeatherData({...query, units}).then((data) => {
        toast.success(`Successfully fetched data for ${data.name}, ${data.country}.`);
        setWeather(data)
      });
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

    <ToastContainer autoClose={1500} newestOnTop={true} theme={"colored"}/>
    </>
  );
}

export default App;
