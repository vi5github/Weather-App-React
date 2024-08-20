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
    fetch(apiURL)
    .then((response) => {
      if(!response.ok){
        throw new Error("Error");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setweatherData(data);
    })
    .catch((e) => {
      console.log(e);
    })
  }, [city])
  

  return (
    <div className='bg-[#1F213A] h-screen flex justify-center align-top'>
        <div className="mt-40 w-1/5 h-1/3">
           <Temperature
            setcity = {setcity}
           />

        </div>
        <div className="mt-40 w-1/3 h-1/3 p-10 grid grid-cols-2 gap-6">
            <h2 className='text-slate-200 text-2xl col-span-2'>Today's Highlights</h2>
            <Highlights/>
            <Highlights/>
            <Highlights/>
            <Highlights/>
        </div>
    </div>
  )
}

export default App
 