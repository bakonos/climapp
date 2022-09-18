import { FormEvent, useEffect, useState } from "react"
import { getWeatherByCoords, getWeatherBySearch } from "./api/fetchWeather";
import { SearchBox } from "./components/SearchBox";
import { WeatherContainer } from "./components/WeatherContainer"


function App() {
  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition( async (position) => {
      const LAT = position.coords.latitude;
      const LOT = position.coords.longitude;

      try {
        const data = await getWeatherByCoords(LAT, LOT);
        setFetchedData(data);

      } catch (err) {
        setError("Por favor revise su conexión a Internet")
        
      }
    } )

  }, [])

  const handleSearch = async (e: FormEvent<HTMLFormElement>, CITY: string) => {
    e.preventDefault();
    setError("");

    try {
      const data = await getWeatherBySearch(CITY);

      if(data === "404"){
        setError("No se encontró la ciudad")
      }else if (data === "400"){
        setError("Por favor Ingresa una ciudad")
      }else {
        setFetchedData(data);
      }
    } catch (err) {
      setError("Por favor revise su conexión a Internet")
    }
  }
  


  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <SearchBox handleSearch={handleSearch} />
      <WeatherContainer fetchedData={fetchedData} error={error} />
    </div>
  )
}

export default App
