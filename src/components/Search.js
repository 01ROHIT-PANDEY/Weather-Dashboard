import React, { useEffect, useState } from 'react'
import './search.css'
import Forecast from './Forecast';
import Favourite from './Favourite';
function Search() {
 const [inputlocation,setinputLocation]=useState();
const [cityList,setcityList]=useState([]);
const[weatherData,setWeatherData]=useState([]);
const[dataLoad,setdataLoad]=useState(false);
const [long,setLong]=useState();
const [lati,setLat]=useState();
const[currentCity,setcurrentCity]=useState();
const[cityerror,setCityErr]=useState(false);
const[metric,setMetric]=useState("celsius");
const[favlist,setFavlist]=useState(false);
const[loaded,setdataLoaded]=useState(false);

const[favouriteloc,setFavouriteLoc]=useState([]);
var arr=[];
useEffect(()=>{
    const getData=async()=>{
        await fetch('http://localhost:8000/city')
        .then(response=>response.json())
        .then(data=>setFavouriteLoc(data));
    }
    getData();
    getfavlocationlist();
},[favlist])

const valueintitial={
   
}
const[favweatherData,setFavWeatherData]=useState(valueintitial);

const FavCityWeather=async(item)=>{
   
   if(item.latitude && item.longitude)
       {
           
           await fetch("https://api.openweathermap.org/data/2.5/forecast?"+new URLSearchParams({
               
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




const getfavlocationlist=async()=>{
   const  getlocdata=async()=>{
   
               if(favouriteloc.length>0)
                {
                    favouriteloc.map((item,index)=>{
                        
                              FavCityWeather(item);
                          
                      })
                    //   console.log(favweatherData);
                      
                      
                }
                else{
                    console.log('Loading Favourite City');
                   
                   
                }
             
        
        }
       
    
     await getlocdata();
    }

/**Set Current City To Favourite */
const handleFavourite=()=>{
   
    var addFavouriteData={ }
  
    const setFavCity=async()=>{
        
        await fetch('http://localhost:8000/city', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(addFavouriteData),
          })
          .then(response => response.json())
          .then(user => console.log(user));
        
       
        window.alert("Added Successfully");   
    }

          if(lati!==undefined&&long!=undefined)
        {
          addFavouriteData={
            'cityName':currentCity,
            'latitude':lati,
            'longitude':long
          }
            
            
           setFavCity();
            
        }
        else{
            window.alert("Sorry! Not Added");
        }
    }
    
    

const getCityData=()=>{
   const location=inputlocation;
   const getCityFetch=async(e)=>{
      await fetch("http://api.openweathermap.org/geo/1.0/direct?"+new URLSearchParams({
        q:e,
        limit:5,
        appid:'8d629db10495c47d8908c307532c333e',
    }))
    
    .then(response=>response.json())
    .then(data=>setcityList(data));
   }
   if(inputlocation == "")
    {
        
        setCityErr(true);
        window.alert("Empty Search");
    }
    else{
        getCityFetch(location);
      
        if(cityList.length<=0 && cityerror==false)
            {
               console.log(cityList);
               setcityList([]);
                setCityErr(true);
            }
            else{
                setCityErr(false);
            }
    }
   
  
  
//     else{
//         setCityErr(false);
//     }
    
  
   
  
        

 };

const SetCoordinate=(e)=>{
         
    // setinputLocation(cityList[0].name);
    setLong(cityList[e].lon);
    setLat(cityList[e].lat);
    

    const getweatherData=async(e)=>{
       
        await fetch("https://api.openweathermap.org/data/2.5/forecast?"+new URLSearchParams({
                    
            lat:cityList[e].lon,
            lon:cityList[e].lat,
            appid:'8d629db10495c47d8908c307532c333e',
            }))
            
            .then(response=>response.json())
            .then(data=>setWeatherData(data.list));
          
            // setLat("");
            // setLong("");
            const loc=cityList[0].name;
            setcurrentCity(loc);/**set city name after selecting from list */
            // setinputLocation("");
            setcityList([]);

    }
    getweatherData(e);
   
    

}

const extractdata=()=>{
    var temp=[];
    Object.entries(favweatherData).forEach(([keys, value]) => {
     Object.entries(value).forEach(([index,ind])=>{
  //   console.log(ind.main.temp);
          var obj={city:keys,...value};
          temp.push(obj);
              })
      
  })
  console.log(temp);
  arr=temp;
  return true;
}


  return (
    
    <div  className='search' >
     <h3 id="heading">Weather Dashboard</h3>

     <div className='input-search'>
        <input type='text' placeholder='Enter Location Name'  name="text-name" onChange={(e)=>{setinputLocation(e.target.value);}}></input>
        <button onClick={()=>{getCityData();
        }}>Find</button><br></br>

        {
            (cityList.length>0)?<div className='grp1-list'>
            {cityList.map((element,index)=>{
                return(
                 <div  key={index} onClick={()=>SetCoordinate(index)} className='list' >
       
                    <span>{element.name},{element.state}</span>
                    
               </div>
                )
                
            })  }</div>
            :(cityerror==true)?
            
            <div className='grp-list'>
            <span style={{color:"red",padding:"2%",width:"80%",backgroundColor:"white"}}>No Data! Enter right City</span>
            </div>:<></>
        }
       


         {/* *My City Open */}

         <div style={{marginTop:"5%",fontSize:"8px"}}>
        <button style={{backgroundColor:"skyblue",border:"white",color:"black",padding:"1%",
        fontWeight:"bold"}} onClick={()=>{setFavlist(!favlist);
        if(favlist===true){}}}>
        {(favlist)?<h4>Close Saved City</h4>:<h4>Open Saved City</h4>}</button><br></br>
    
        <a href="#favlist"><button style={{padding:"2%",margin:"2%",color:"black",backgroundColor:"skyblue",}} >Go to Saved Weather</button></a>
        <a href="#weathlist"> <button style={{padding:"2%",color:"black",margin:"2%",backgroundColor:"skyblue",}}>Go to Current Weather</button></a>
    
        </div>

        </div>
{/* Display fetched Weather Data */}
     <div className='details'>
         {
            (favlist==false && weatherData.length<=0)?<div className='bg-msg'>Hey! What are  you waiting For?<br></br>Check Your City Weather<br></br><br></br>
            <h1>NOW...</h1></div>:<></>
         }
        <div>

    {
        
        (favlist===true&& extractdata())?
        
        <div id='favlist' style={{backgroundColor:"grey",margin:"2%"}}>
            <div style={{backgroundColor:"black",color:"white",padding:"2%",margin:"2%"}}>
        <input type="radio" id="celsius" name="celsius" value="celsius" checked={metric==="celsius"}onChange={()=>setMetric("celsius")}/><label htmlFor="celsius">Celsius</label>   
        <input type="radio" id="fahren" name="fahren" value="fahren"  checked={metric==="fahren"} onChange={()=>setMetric("fahren")}/><label htmlFor="fahren">Fahrenheit</label>
        <h3>Favourite Cities</h3>
            </div>
              {  
             
         arr.map((ind,index)=>{
            
             console.log(arr.size);
            //  console.log(ind[index]);
             if(ind[index]!==undefined)
                 {
                     return(   <div className='favforecast-list' key={ind[index].dt_txt}>
                         <Favourite metric={metric} city={ind.city} time={(ind[index].dt_txt)} icon={(ind[index].weather[0].icon)} description={(ind[index].weather[0].description)} temp={(ind[index].main.temp/10).toPrecision(4)}  mintemp={(ind[index].main.temp_min/10).toPrecision(4)} maxtemp={(ind[index].main.temp_max/10).toPrecision(4)} 
                         feels_like={(ind[index].main.feels_like/10).toPrecision(4)} humidity={(ind[index].main.humidity)} wind={(ind[index].wind.speed*2.237).toPrecision(4)}/>
                         </div>
                         );
                 }
          
         })
         
     }
   
           
        </div>
      
        :<></>
        
        }

        </div>
       
       {
        ( cityList.length>0 && weatherData.length>0 && cityerror==true)?
            setCityErr(false)
        :<></>
       }
     
        {
         (weatherData.length>0)?
          
          <div id='weathlist' style={{backgroundColor:"grey",margin:"2%"}}>
            <div style={{backgroundColor:"black",color:"white",padding:"2%",margin:"2%"}}>
                <h4>Searched City<br></br></h4>
                    <h2>{currentCity}</h2>
                        <input type="radio" id="celsius" name="celsius" value="celsius" checked={metric==="celsius"}onChange={()=>setMetric("celsius")}/><label htmlFor="celsius">Celsius</label>   
                        <input type="radio" id="fahren" name="fahren" value="fahren"  checked={metric==="fahren"} onChange={()=>setMetric("fahren")}/><label htmlFor="fahren">Fahrenheit</label>
        
            </div>
            <button onClick={handleFavourite}><h5>Add {currentCity} To Favourite</h5></button><br></br>
      
        {weatherData.map((item)=>{
          
            return(
            
            <div className='forecast-list' key={item.dt_txt}>
                
                <Forecast  metric={metric} city={(currentCity).toUpperCase()} icon={item.weather[0].icon} time={item.dt_txt} description={item.weather[0].description} temp={(item.main.temp/10).toPrecision(4)}
                mintemp={(item.main.temp_min/10).toPrecision(4)} maxtemp={(item.main.temp_max/10).toPrecision(4)} 
                feels_like={(item.main.feels_like/10).toPrecision(4)} humidity={(item.main.humidity)} wind={(item.wind.speed*2.237).toPrecision(4)}
                />
             
               
            </div>
             )
            })
        }</div>
            :<></>
           
        }
        


        
    </div>
    
    
</div>
  )
}

export default Search;