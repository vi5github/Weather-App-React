import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Temperature from './components/Temperature'
import Highlights from './components/Highlights'

function App() {
  const [city, setcity] = useState("New Delhi")
  const [weatherData, setweatherData] = useState(null)


  const apiURL = `https://api.weatherapi.com/v1/current.json?key=f6f99450382a4bfa84390735242304&q=${city}&aqi=no`

  useEffect(() => {
    const fetchWeatherData = async () => {
      try{
        const response = await fetch(apiURL);
        if(!response.ok){
          throw new Error("Error")
        }
        const data = await response.json();
        console.log(data);
        setweatherData(data);
      }catch(e){
        console.log(e);
      }
    };

    fetchWeatherData();
  }, [city])
  

  return (
    <div className='bg-[#1F213A] h-screen flex justify-center align-top'>
         <div className="mt-40 w-1/5 h-1/3">
        {weatherData && (
          <Temperature
            setcity={setcity}
            stats={{
              temp: weatherData.current.temp_c,
              condition: weatherData.current.condition.text,
              isDay: weatherData.current.is_day,
              location: weatherData.location.name,
              time: weatherData.location.localtime
            }}
          />
        )}
      </div>
        <div className="mt-40 w-1/3 h-1/3 p-10 grid grid-cols-2 gap-6">
            <h2 className='text-slate-200 text-2xl col-span-2'>Today's Highlights</h2>
            
            {
              weatherData &&
              (
                <>
                  <Highlights
                    stats = {{
                      title: "Wind Status",
                      value: weatherData.current.wind_mph,
                      unit:"mph",
                      direction:weatherData.current.wind_dir
                    }}
                  />
                  <Highlights stats = {{
                      title: "Humidity",
                      value: weatherData.current.humidity,
                      unit:"%",
                      // direction:weatherData.current.wind_dir
                    }}/>
                  <Highlights stats = {{
                      title: "Visibility",
                      value: weatherData.current.vis_miles,
                      unit:"miles",
                      // direction:weatherData.current.wind_dir
                    }}/>
                  <Highlights stats = {{
                      title: "Air Pressure",
                      value: weatherData.current.pressure_mb,
                      unit:"mb",
                      // direction:weatherData.current.wind_dir
                    }}/>
                </>
              )
            }

        </div>
    </div>
  )
}

export default App
 