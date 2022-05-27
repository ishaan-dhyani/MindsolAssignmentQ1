import React from "react";
import { useState, useEffect } from "react";
import Country from "./Country";

/*
https://restcountries.com/#api-endpoints-v3-all
We will use this API to fetch data of country 
*/

export default function Main() {
  const [input, setInput] = useState("");
  const [codes, setCodes] = useState(() => {
    const savedCodes = localStorage.getItem("codes");
    if (savedCodes) {
      console.log(savedCodes.split(","));
      return savedCodes.split(",");
    } else {
      return [];
    }
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (codes.includes(input)) {
      alert("Country alreadt displayed");
    } else if (input.length === 0) alert("Enter a valid ISO Code");
    else {
      setCodes((prevState) => [...prevState, input]);
    }
    setInput("");
  };

  const handleRemove = (code) => {
    let array = codes;
    const index = array.indexOf(code);
    console.log(index);
    if (index > -1) {
      array.splice(index, 1);
    }
    setCodes(array);
    localStorage.setItem("codes", codes);
  };

  return (
    <div>
      <h1>Country Details</h1>
      <p>
        Description - To get the details of the country kindly input country ISO
        code below. For example USA has ISO code US , India has IN etc. For more
        info on ISO codes click
        <a href="http://www.geognos.com/geo/en/countries-list/Country-Codes-ISO-3166-ISO-Numeric-ISO3-FIPS-ccTLD.html">
          click me!
        </a>
      </p>
      <form>
        <label>
          ISO Code:
          <input
            type="text"
            name="name"
            value={input}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" onClick={handleClick} />
        {codes.map((code) => (
          <div>
            <Country code={code} />
            <button onClick={() => handleRemove(code)}>Delete</button>
          </div>
        ))}
      </form>
    </div>
  );
}
