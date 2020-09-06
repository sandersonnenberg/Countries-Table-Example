import React, { useState } from "react";
import SearchCountry from "../../sharedComponents/SearchCountry";
import ContentTable from "../../sharedComponents/ContentTable";
import "./styles.css";

export default function CountriesPage() {
  const apiPath = "https://restcountries.eu/rest/v2/name/";
  const [countryFound, setCountryFound] = useState(null);
  const [data, setData] = useState();
  
  return (
    <div className="pageContainer">
      
      <h1>Countries Information Page</h1>
      <SearchCountry apiPath={apiPath} apiResponse={handleApiResponse} />
      {countryFound===false && <div>No data found for given country</div>}

      {countryFound && <ContentTable data={data}></ContentTable>}
    </div>
  );

  //page handler for the response from the API
  function handleApiResponse(response) {
    if (response.length) {
      setData({
        response,
      });
      setCountryFound(true);
    } else if (response.status === 404) setCountryFound(false);
  }
}
