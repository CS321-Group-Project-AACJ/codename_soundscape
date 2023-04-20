import React from 'react'
import "./SearchScreen.css";


export default function SearchScreen() {

 function handleSubmit(event) {
    let search = document.getElementById("search").value;
    alert(search);
 }
  return (
    <div class = "search">
      
      <h1>Search</h1>
      {/* <form> */}
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          name="search"
        />
        <button type="button" onClick={handleSubmit} class="custom-btn">Submit</button>
        {/* </form> */}
        
    </div>
    
  )
}

