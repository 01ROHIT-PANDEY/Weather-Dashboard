import React, { useState } from 'react'

function Favourite(props) {
    const[favdata,setfavData]=useState([]);
   
    
return(
    <div>
      <h3>{props.keys}</h3>
    </div>
);

}
export default Favourite