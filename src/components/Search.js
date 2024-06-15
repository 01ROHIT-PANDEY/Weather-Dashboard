import React, { useEffect, useState } from 'react'
import './search.css'
import Forecast from './Forecast';
import Favourite from './Favourite';
function Search() {
 const [inputlocation,setinputLocation]=useState();
const [cityList,setcityList]=useState([]);
const[weatherData,setWeatherData]=useState([]);
const [long,setLong]=useState();
const [lati,setLat]=useState();
const[currentCity,setcurrentCity]=useState();
const[cityerror,setCityErr]=useState(false);
const addFavouriteData={
    cityName:'',
    longitude:'',
    latitude:'',
}
const[favData,setFavData]=useState(addFavouriteData);
const handleFavourite=()=>{
    setFavData(favData=>({
        ...favData,cityName:currentCity,latitude:lati.lat,longitude:long
    }))
    console.log(favData);
    if(favData)
        {
            window.alert("added favourite");
        }
        setFavData(addFavouriteData);
    // fetch('http://localhost:3000/city', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(favData),
    //   })
    //   .then(response => response.json())
    //   .then(user => console.log(user));
    // console.log(favData);
}

// const getWeatherData=()=>{
   
//   fetch("https://api.openweathermap.org/data/2.5/forecast?"+new URLSearchParams({
                
//         lat:lati,
//         lon:long,
//         appid:'8d629db10495c47d8908c307532c333e',
//         }))
        
//         .then(response=>response.json())
//         .then(data=>setWeatherData(data.list));
      
//         // setLat("");
//         // setLong("");
//         const loc=inputlocation;
//         setcurrentCity(loc);/**set city name after selecting from list */
//         setinputLocation("");
  
// }
const reset=()=>{
    setLat("");
    setLong("");
}
const getCityData=()=>{
   
   
   try{
  fetch("http://api.openweathermap.org/geo/1.0/direct?"+new URLSearchParams({
        q:inputlocation,
        limit:5,
        appid:'8d629db10495c47d8908c307532c333e',
    }))
    .then(response=>response.json())
    .then(data=>setcityList(data))
    setCityErr(false);
}
    catch(error)
    {
        setCityErr(true);
    }
    // .then(data=>console.log(data));
    
 };
const SetCoordinate=(e)=>{

    setinputLocation(cityList[0].name);
    setLong(cityList[e].lon);
    setLat(cityList[e].lat);
    setcityList("");
    fetch("https://api.openweathermap.org/data/2.5/forecast?"+new URLSearchParams({
                
        lat:lati,
        lon:long,
        appid:'8d629db10495c47d8908c307532c333e',
        }))
        
        .then(response=>response.json())
        .then(data=>setWeatherData(data.list));
      
        // setLat("");
        // setLong("");
        const loc=inputlocation;
        setcurrentCity(loc);/**set city name after selecting from list */
        // setinputLocation("");
    

}
  return (
    <div className='search'>
        {/* <div><Favourite/></div> */}
        <div className='input-search'>
        <input type='text' placeholder='Enter Location Name'  name="text-name" onChange={(e)=>{setinputLocation(e.target.value);}}></input>
        <button onClick={getCityData}>Find</button>
        {/* {(lati&& long)?
            
            <button onClick={getWeatherData}>See</button>
            : <><button onClick={getCityData}>Find</button><br/></>
        } */}
    
        </div>
       
     
       <div className='grp-list'>{
            (cityList.length>0)?
            cityList.map((element,index)=>{
                return(
                 <div  key={index} onClick={()=>SetCoordinate(index)} className='list' >
       
                    <span>{element.name},{element.state}</span>
                    
               </div>
                )
                
            })
            :(cityerror)?<span style={{color:"red"}}>No Data! Enter right City</span>:<></>
        }
        </div> 
        <div>{(weatherData)?<button onClick={handleFavourite}>Add To Favourite</button>:<></>}</div>
        <div>
        
        {
         (weatherData)?
         
         weatherData.map((item)=>{

            return(
            <div className='forecast-list'>
                <Forecast  city={currentCity} icon={item.weather[0].icon} time={item.dt_txt} description={item.weather[0].description} temp={(item.main.temp/10).toPrecision(4)}
                mintemp={(item.main.temp_min/10).toPrecision(4)} maxtemp={(item.main.temp_max/10).toPrecision(4)} 
                feels_like={(item.main.feels_like/10).toPrecision(4)} humidity={(item.main.humidity)} wind={(item.wind.speed*2.237).toPrecision(4)}
                />
                {/* <ul>
                <li>{item.dt_txt}</li>
                <li>{item.weather[0].description}</li>
                <li>{(item.main.temp/10).toPrecision(4)}°C</li>
                <li>{(item.main.temp_min/10).toPrecision(4)}°C</li>
                <li>{(item.main.temp_max/10).toPrecision(4)}°C</li>
                <li>{(item.main.feels_like/10).toPrecision(4)}°C</li>
                <li>{(item.main.humidity)}%</li>
                
                </ul> */}
               
            </div>
             )
            })
            :<></>
           
        }
        </div>
    </div>
  )
}

export default Search;