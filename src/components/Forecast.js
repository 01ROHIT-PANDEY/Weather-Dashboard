import React from 'react'
import './forecast.css'
function Forecast(props) {
    const date=new Date(props.time);
    // const formatter = new Intl.DateTimeFormat('en-US', { day:'2-digit', month: '2-digit', year: 'numeric' ,hour: '2-digit', minute: '2-digit', second: '2-digit' });
    // const formattedDate = formatter.format(date);
    const day=date.getDate();
    const month=date.getMonth()+1;
    const year=date.getFullYear();
    const newdate=day+'/'+month+'/'+year;
   
       
  return (
    <div className='card'>
     
        <img src={'https://openweathermap.org/img/wn/' +props.icon+ '@2x.png' } /><br></br>
        <span style={{fontWeight:'bold'}}>{props.description.toUpperCase()}</span>
       
        <h1>{props.temp}°C</h1>
        <label>Min: </label><span style={{fontWeight:'bold'}}>{props.mintemp}°C</span>&nbsp;&nbsp;&nbsp;
        <label>Max: </label><span style={{fontWeight:'bold'}}>{props.maxtemp}°C</span><br></br><br></br>
        <label>Feels:</label><span>{props.feels_like}°C</span><br></br>
        <label>Humidity:</label><span>{props.humidity}%</span><br></br>
        <label>Wind:</label><span>{props.wind} miles/hr</span>
        <h3>{props.city}</h3>
        <h4>{newdate}</h4>
        
    </div>
    
  )
}

export default Forecast