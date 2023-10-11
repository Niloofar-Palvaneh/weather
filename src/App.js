import './App.css';
import { useState } from 'react';

function App() {
  const [cityName, setCityName] = useState("")
  const [cityInfos, setCityInfos] = useState([])
  const [weather, setWeather] = useState({})

  const setCityNameHandler = (e) => {
    setCityName(e.target.value)
  }

  const getCityInfos = () => {
    setCityName("")
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9779bebe4109946fbbea249fb344351a`)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          alert("not found")
        }
      })
      .then(infos => {
        setCityInfos(infos)
        setWeather(infos.weather)
      })
  }
  console.log(cityInfos)
  console.log(weather);
  return (
    <>
      <div className='w-full h-screen flex items-center justify-center '>
        <div className='bg-white rounded-xl overflow-hidden p-6 flex flex-col gap-8 w-[450px]'>
          <div className='border border-2 border-green-500 rounded px-2 py-1 flex'>
            <div className='w-full items-center flex gap-2' >
              <div className='bg-blue-200 p-2 rounded-full cursor-pointer' onClick={() => getCityInfos()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                  className="w-7 h-7 text-green-700">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <input value={cityName}
                onChange={(e) => setCityNameHandler(e)}
                type="text" className='bg-inherit border-none outline-none w-full' />
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <img src={weather.length ? `http://openweathermap.org/img/w/${weather[0].icon}.png` : `/33.gif`} alt="rain img" className='w-[200px]' />
            <div className='flex items-center flex-col justify-center'>
              <span className='text-[35px] font-bold flex items-center'>
                {cityInfos.main ? cityInfos.main.temp : (
                  <img src="/33.gif" alt=""  className='w-[40px]'/>
                )} C°
              </span>
              <p className='font-bold text-xl text-gray-600 flex items-center'>
             <span className='text-gray-400'> Temperature status:</span>
               {weather.length ? weather[0].main : (
                  <img src="/33.gif" alt=""  className='w-[40px]'/>
                )}
              </p>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <img src="/wind-speed.png" alt="wind-speed" className='w-[40px]' />
              <div className='flex flex-col items-start justify-center'>
                <span className='flex items-center'>
                  {cityInfos.wind ? cityInfos.wind.speed : (
                  <img src="/33.gif" alt=""  className='w-[40px]'/>
                  )} KM/H
                </span>
                <span>
                  Wind Speed
                </span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <img src="/dama.png" alt="wind-speed" className='w-[40px]' />
              <div className='flex flex-col items-start justify-center'>
                <span className='flex items-center'>
                  {cityInfos.main ? cityInfos.main.humidity : (
                  <img src="/33.gif" alt=""  className='w-[40px]'/>
                  )} %
                </span>
                <span>
                  humidity
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
