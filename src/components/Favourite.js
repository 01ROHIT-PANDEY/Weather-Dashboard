import React, { useState } from 'react'
import './favourite.css'
function Favourite(props) {
  const date=new Date(props.time);
  const formatter = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit'});
  const formattedtime = formatter.format(date);
  const day=date.getDate();
  const month=date.getMonth()+1;
  const year=date.getFullYear();
const newdate=day+'/ '+month+'/'+year;
 
     
return (
  <div className='card'>
   
      <img src={'https://openweathermap.org/img/wn/' +props.icon+ '@2x.png' } /><br></br>
      <span style={{fontWeight:'bold',fontFamily:"verdana"}}>{props.description.toUpperCase()}</span>
      
      <h1 style={{color:"black"}}>{(props.metric=='celsius')?<>{props.temp}°C</>:<>{((9/5)*(props.temp) + 32).toPrecision(4)}°F</>}</h1>
      <h4 style={{fontWeight:'bold'}}>{newdate}&nbsp;&nbsp;&nbsp;&nbsp;{formattedtime}</h4>
      <label style={{fontWeight:'bold'}}>Min: </label><span style={{fontWeight:'bold'}}>{(props.metric=='celsius')?<>{props.mintemp}°C</>:<>{((9/5)*(props.mintemp) + 32).toPrecision(4)}°F</>}</span><br></br><br></br>
      <label style={{fontWeight:'bold'}}>Max: </label><span style={{fontWeight:'bold'}}>{(props.metric=='celsius')?<>{props.maxtemp}°C</>:<>{((9/5)*(props.maxtemp) + 32).toPrecision(4)}°F</>}</span><br></br><br></br>
      <label>Feels:</label><span>{(props.metric=='celsius')?<>{props.feels_like}°C</>:<>{((9/5)*(props.feels_like) + 32).toPrecision(4)}°F</>}</span><br></br>
      <label>Humidity:</label><span>{props.humidity}%</span><br></br>
      <label>Wind:</label><span>{props.wind} miles/hr</span>
      <h3>{props.city}</h3>
      
      
      
  </div>
  
)

}
export default Favourite