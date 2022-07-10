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
