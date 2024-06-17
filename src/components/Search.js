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
const[metric,setMetric]=useState("celsius");
const[favlist,setFavlist]=useState(false);
const[loaded,setLoaded]=useState(false);
const addFavouriteData={
    cityName:'',
    longitude:'',
    latitude:'',
}
const[favData,setFavData]=useState(addFavouriteData);
const[favouriteloc,setFavouriteLoc]=useState([]);


const getfavlocationlist=()=>{
    if(favlist)
        {
            fetch('http://localhost:8000/city')
            .then(response=>response.json())
            .then(data=>setFavouriteLoc(data));
               if(favouriteloc.length>0)
                {
                    favouriteloc.map((item,index)=>{
                        
                              FavCityWeather(item);
                              
                              
                          
                      })
                     
                      
                      
                }
                console.log(favweatherData);
        
        }
    }

/**Set Current City To Favourite */
const handleFavourite=()=>{
    setFavData(favData=>({
        ...favData,cityName:currentCity,latitude:lati,longitude:long
    }))
   
    if(favData)
        {
            window.alert("added favourite");
        }
        
    fetch('http://localhost:8000/city', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favData),
      })
      .then(response => response.json())
      .then(user => console.log(user));
    console.log(favData);
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

const getCityData=()=>{
   const getCityFetch=async()=>{
      await fetch("http://api.openweathermap.org/geo/1.0/direct?"+new URLSearchParams({
        q:inputlocation,
        limit:5,
        appid:'8d629db10495c47d8908c307532c333e',
    }))
    
    .then(response=>response.json())
    .then(data=>setcityList(data))
    
   }
   getCityFetch();
   
   if(cityList.length<=0)
    {
        setCityErr(false);
    }
    else{
        setCityErr(true);
    }
        

 };
 const valueintitial={
   
 }
 const[favweatherData,setFavWeatherData]=useState(valueintitial);
 const FavCityWeather=(item)=>{
    
    if(item.latitude && item.longitude)
        {
            
            fetch("https://api.openweathermap.org/data/2.5/forecast?"+new URLSearchParams({
                
                lat:item.latitude,
                lon:item.longitude,
                appid:'8d629db10495c47d8908c307532c333e',
                }))
                
                .then(response=>response.json())
              
                .then((data)=> setFavWeatherData(favweatherData=>({...favweatherData,[item.cityName]:data.list})));
              
                
              
        }
      
      
        // setLat("");
        // setLong("");
        // const loc=inputlocation;
        // setcurrentCity(loc);
 }
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
        <button onClick={getCityData}>Find</button><br></br>
        <button style={{backgroundColor:"lightgreen",border:"white",color:"black",padding:"0% 0.5% 0% 0.5%",fontWeight:"bold"}} onClick={()=>{setFavlist(!favlist);getfavlocationlist();}}>{(favlist)?<h4>^<br></br>My cIty Close</h4>:<h4>v<br></br>My City Open</h4>}</button>
    
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
        <div>
        <input type="radio" id="celsius" name="celsius" value="celsius" checked={metric==="celsius"}onChange={()=>setMetric("celsius")}/><label htmlFor="celsius">Celsius</label>   
        <input type="radio" id="fahren" name="fahren" value="fahren"  checked={metric==="fahren"} onChange={()=>setMetric("fahren")}/><label htmlFor="fahren">Fahrenheit</label>
        </div>
           


        <div>

    {
        (favlist&&favweatherData.length>0)?
        <div>
              <h3>Favourite Cities</h3>
        {  
              
                    Object.entries(favweatherData).forEach(([keys, value]) => {
                       Object.entries(value).map(([index,ind])=>{
                      
                                 return(<>
                                      <div className='favforecast-list' key={ind.id}>
                                              
                                                <Forecast metric={metric} city={keys} time={ind.dt_txt} icon={ind.weather[0].icon} description={ind.weather[0].description} temp={(ind.main.temp/10).toPrecision(4)}  mintemp={(ind.main.temp_min/10).toPrecision(4)} maxtemp={(ind.main.temp_max/10).toPrecision(4)} 
                                                feels_like={(ind.main.feels_like/10).toPrecision(4)} humidity={(ind.main.humidity)} wind={(ind.wind.speed*2.237).toPrecision(4)}/>
                                           </div>
                                           </>
                                 );
                            
                        })
                        
                    })
                     
            
              
            
        }</div>
      
        :<div>No Fav Data</div>
       }

        </div>

       
  
        {/* <div className='fav-list'>
        <h1>Favourite Cities</h1>
        
        {  
                (favweatherData.length>0)?
                favweatherData.map((ind)=>{
                   console.log(ind);
                   
                       
                       return(
                           <div className='favforecast-list' key={ind.dt_txt}>
                            
                             
                               <Forecast metric={metric} city="chennai" time={ind.dt_txt} icon={ind.weather[0].icon} description={ind.weather[0].description} temp={(ind.main.temp/10).toPrecision(4)}  mintemp={(ind.main.temp_min/10).toPrecision(4)} maxtemp={(ind.main.temp_max/10).toPrecision(4)} 
                               feels_like={(ind.main.feels_like/10).toPrecision(4)} humidity={(ind.main.humidity)} wind={(ind.wind.speed*2.237).toPrecision(4)}/>
                          </div>
                       ) 
                }):<div>No Fav Data</div>
              
             
       }
       </div> */}
       <div>
       <button onClick={handleFavourite}><h5>Add {currentCity} To Favourite</h5></button><br></br>
        {
         (weatherData)?
         
         weatherData.map((item)=>{
          
            return(
            
            <div className='forecast-list' key={item.dt_txt}>
                
                <Forecast  metric={metric} city={(currentCity).toUpperCase()} icon={item.weather[0].icon} time={item.dt_txt} description={item.weather[0].description} temp={(item.main.temp/10).toPrecision(4)}
                mintemp={(item.main.temp_min/10).toPrecision(4)} maxtemp={(item.main.temp_max/10).toPrecision(4)} 
                feels_like={(item.main.feels_like/10).toPrecision(4)} humidity={(item.main.humidity)} wind={(item.wind.speed*2.237).toPrecision(4)}
                />
             
               
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