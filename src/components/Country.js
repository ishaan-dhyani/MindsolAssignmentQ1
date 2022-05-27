import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Country = (props) => {
  const ISOCode = props.code;
  const defaultCountryDetails = {
    name: "",
    imageURL: "",
    phoneCode: "",
    capitalCity: "",
  };
  const [countryDetail, setCountryDetail] = useState(defaultCountryDetails);

  const makeAPICall = async () => {
    try {
      const countryDetail = await fetch(
        "https://restcountries.com/v3.1/alpha?codes=" + ISOCode
      )
        .then((response) => response.json())
        .then((data) => data);
      console.log(countryDetail[0]);
      setCountryDetail({
        name: countryDetail[0].name.official,
        imageURL: countryDetail[0].flags.png,
        phoneCode: countryDetail[0].idd.root,
        capitalCity: countryDetail[0].capital[0],
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    makeAPICall();
  }, []);

  return (
    <div>
      <div>Country Name : {countryDetail.name}</div>
      <div>Phone Code : {countryDetail.phoneCode}</div>
      <div>Capital City : {countryDetail.capitalCity}</div>
      <div>
        <p>Country flag :</p>
        <img src={countryDetail.imageURL} />
      </div>
    </div>
  );
};

export default Country;
