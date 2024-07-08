import React, { useEffect, useState } from 'react'
import './search.css'
import Forecast from './Forecast';
import Favourite from './Favourite';
import icon from '../weather-icon.gif';
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
const apiKey=process.env.WEATHER_API_KEY
const[favouriteloc,setFavouriteLoc]=useState([]);
var arr=[];
var dataRecent=[];
useEffect(()=>{
    const getData=async()=>{
        await fetch('http://localhost:8000/city')
        .then(response=>response.json())
        .then(data=>setFavouriteLoc(data));
    }
    getData();
    getfavlocationlist();
    
},[favlist])
useEffect(()=>{
    dataRecent=localStorage.getItem("city");
    console.log(dataRecent)
},[])

const storeRecent=(value)=>{
     const items=localStorage.getItem("city");
     var dataValue=[];
     dataValue.push(items);
     dataValue.push(value.toUpperCase());
         localStorage.setItem("city",dataValue);
}

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
               units:"metric"
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

const FavCityRemove=(item)=>{


        const RemoveFavCity=async(item)=>{
           
            await fetch('http://localhost:8000/city/'+item,{
                method: 'DELETE',
                headers:{
                    'Content-Type':'application/json'
                }
              })
              .then(response => response.json())
              .then(user => console.log({cityName:item}));
            
           
            window.alert("Removed Successfully");   
            window.location.reload();
            
        }
        RemoveFavCity(item);
        setFavlist(false);

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
      await fetch("https://api.openweathermap.org/geo/1.0/direct?"+new URLSearchParams({
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
        storeRecent(location);
        getCityFetch(location);
      
        if(cityList.length<=0 && cityerror==false)
            {
            //    console.log(cityList);
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
    setCityErr(false);

    const getweatherData=async(e)=>{
        
        const v1=cityList[e].lon;
        const v2=cityList[e].lat;
        // console.log(v1+" "+v2);
        await fetch("https://api.openweathermap.org/data/2.5/forecast?"+new URLSearchParams({
                    
            lat:v2,
            lon:v1,
            appid:'8d629db10495c47d8908c307532c333e',
            units:"metric",
            
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
    const getDataFav=async()=>{
        Object.entries(favweatherData).forEach(([keys, value]) => {
            Object.entries(value).forEach(([index,element])=>{

                 var obj={city:keys,...element};
                 temp.push(obj);
                 
                     })
         })
        
    }
   getDataFav();
   
if(temp.length==(favouriteloc.length*40))
    {
        arr=temp;
        // console.log(arr);
        return true;
    }
    else{
        return false;
    }
}


  return (
    
    <div  className='search' >
        <div id="heading">
        <img src={icon} width='50px' height='45px' style={{borderRadius:'50%',marginLeft:'2%',marginRight:'2%'}}></img>
        <h3 onClick={()=>{window.location.reload()}}> Weather Dashboard</h3>
        </div>
     

     <div className='input-search'>
        <input type='text' placeholder='Enter Location Name'  name="text-name" onChange={(e)=>{setinputLocation(e.target.value);}}></input>
        <button onClick={()=>{getCityData();
        }}>Find</button><br></br>
        {
            (inputlocation && dataRecent.size>0)?
              
                <div className='recent-list'>
                   
                    <h4>Recent Search</h4>
                   { 
                   
                   dataRecent.forEach((item)=>{
                        <div className='list1'>
                    <span>{item}</span>
                    </div>
                    })
                    
                }
                </div>
                
               
            
            :<></>
        }
      

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

        <button type="radio" style={{marginTop:"5%",fontSize:"10px",border:"white",color:"white",padding:"1%"}} onClick={()=>{setFavlist(!favlist);}}>
        {(favlist)?<h4>Close Saved City</h4>:<h4>Open Saved City</h4>}</button><br></br>
    
        {(favlist==true  && weatherData.length>0)?<a href="#favlist"><button style={{padding:"2%",margin:"2%",color:"white",fontSize:"10px",backgroundColor:"rgb(5, 81, 128)"}} >Go to Saved Weather</button></a>:<></>}
        {(weatherData.length>0)?<a href="#weathlist"> <button style={{padding:"2%",color:"white",margin:"2%",backgroundColor:" rgb(5, 81, 128)",fontSize:"10px"}}>Go to Current Weather</button></a>:<></>}
    

        </div>
{/* Displaying the Data */}
     <div className='details'>
         {
            (favlist==false && weatherData.length<=0)?<div className='bg-msg'>Hey! What are  you waiting For?<br></br>Check Your City Weather<br></br><br></br>
            <h1>Right NOW...</h1></div>:<></>
         }


         {/* Display the data of Stored favourite City List */}
       

            {
                
                (favlist===true && extractdata()==true)?
               
                <div id='favlist' style={{backgroundColor:"#c7edff",margin:"2%",marginBottom:"15%"}}>
                    <div style={{backgroundColor:"black",color:"white",padding:"1%",margin:"1%"}}>
                <input type="radio" id="celsius" name="celsius" value="celsius" checked={metric==="celsius"} onChange={()=>setMetric("celsius")}/><label htmlFor="celsius">Celsius</label>   
                <input type="radio" id="fahren" name="fahren" value="fahren"  checked={metric==="fahren"} onChange={()=>setMetric("fahren")}/><label htmlFor="fahren">Fahrenheit</label>
                <h2 style={{fontStyle:"italic"}}>Favourite Cities</h2>
                        <div style={{backgroundColor:" #c7edff",display:"flex",color:'black',flexWrap:'wrap',textAlign:"center"}}>
                        {
                            favouriteloc.map((item)=>{
                                return <>
                                <div style={{margin:'2%'}}>
                                <h2 style={{margin:"2%"}}>{item.cityName}</h2>
                                <button alt="Remove City"style={{backgroundColor:'black',padding:'0',border:'none',color:'white',padding:'10%',borderRadius:'10%',fontWeight:'bold',fontSize:'10px'}}onClick={()=>FavCityRemove(item.id)}>Remove</button>
                                </div>
                                </>
                            })
                        }
                        
                        </div>
              
                    </div>
                    {
                    (arr.length>0)?
                    
                
                        arr.map((element,index)=>{
                            // console.log(ind.city);
                            // console.log(ind.dt_txt);
                                    return(   <div  className='favforecast-list' key={index}>
                                        <Favourite metric={metric} city={element.city} time={(element.dt_txt)} icon={(element.weather[0].icon)} description={(element.weather[0].description)} temp={(element.main.temp).toPrecision(4)}  mintemp={(element.main.temp_min).toPrecision(4)} maxtemp={(element.main.temp_max).toPrecision(4)} 
                                        feels_like={(element.main.feels_like).toPrecision(4)} humidity={(element.main.humidity)} wind={(element.wind.speed*2.237).toPrecision(4)}/>
                                        
                                        </div>
                                        );
                            })
                        
                    
                
                    
                    :<div  style={{color:'red',padding:'2%',fontWeight:'bold',fontFamily:'cursive',fontStyle:'italic'}}>No Favourite City is Added</div>
                }
                    </div>
            
            :<></>
                
            }
        

          
       
       {
        ( cityList.length>0 && weatherData.length>0 && cityerror==true)?
            setCityErr(false)
        :<></>
       }
     
        {
         (weatherData.length>0)?
         
          <div id='weathlist' style={{backgroundColor:"#c7edff",margin:"2%"}}>
            <div style={{backgroundColor:"black",color:"white",padding:"1%",marginTop:"5%"}}>
                
                
                    <h3>Current City</h3>
                    <h2 style={{textAlign:'center'}}>{currentCity}</h2>
                      <div style={{textAlign:'center'}} >
                        <input type="radio" id="celsius" name="celsius" value="celsius" checked={metric==="celsius"}onChange={()=>setMetric("celsius")}/><label htmlFor="celsius">Celsius</label>   
                        <input type="radio" id="fahren" name="fahren" value="fahren"  checked={metric==="fahren"} onChange={()=>setMetric("fahren")}/><label htmlFor="fahren">Fahrenheit</label>
                    </div>
                    <button style={{border:'1px solid rgba(9, 148, 240, 0.87)',marginRight:'0',marginLeft:'80%',backgroundColor:'rgba(9, 148, 240, 0.87)',color:'white'}}onClick={handleFavourite}><h5>Add To Favourite</h5></button>
            </div>
            
      
        {weatherData.map((item)=>{
           console.log(weatherData);
            return(
            
            <div className='forecast-list' key={item.dt_txt}>
                
                <Forecast  metric={metric} city={(currentCity).toUpperCase()} icon={item.weather[0].icon} time={item.dt_txt} description={item.weather[0].description} temp={(item.main.temp).toPrecision(4)}
                mintemp={(item.main.temp_min).toPrecision(4)} maxtemp={(item.main.temp_max).toPrecision(4)} 
                feels_like={(item.main.feels_like).toPrecision(4)} humidity={(item.main.humidity)} wind={(item.wind.speed*2.237).toPrecision(4)}
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