import "antd/dist/antd.css";
import React, { useState } from "react";
import { Input, Radio, Button } from "antd";
import PropTypes from "prop-types";
import "./styles.css";

export default function SearchCountry({ apiPath, apiResponse }) {
  const [path] = useState(apiPath);
  const [searchType, setSearchType] = useState("contains");
  const [shouldDisableButton, setShouldDisableButton] = useState(true);
  const [termToSearch, setTermToSearch] = useState("");
  return (
    <>
      <div className="search-section">
        <Input
        className="search-input"
          placeholder="Enter a Country"
          size="large"
          onChange={handleOnKeyPress}
          onKeyDown={handleOnKeyDown}
        />
        <Button
        className="search-button"
          onClick={handleOnSearch}
          type="primary"
          disabled={shouldDisableButton}
        >
          Search
        </Button>
      </div>
      <Radio.Group
        className="radio-section"
        defaultValue="contains"
        onChange={onRadioChange}
      >
        <Radio value="contains">Contains</Radio>
        <Radio value="exist">Exact match</Radio>
      </Radio.Group>
    </>
  );

  //handle the on radio button change event
  function onRadioChange(e) {
    setSearchType(e.target.value);
  }

  //handle the on key press event
  function handleOnKeyPress(e) {
    e.target.value !== ""
      ? setShouldDisableButton(false)
      : setShouldDisableButton(true);
    setTermToSearch(e.target.value);
  }

  //handle the on key down event
  function handleOnKeyDown(e){
    if (e.key === 'Enter' && termToSearch) {
        handleOnSearch();
      }
  }

  //handle the searchButton event
  function handleOnSearch() {
    const fullApiPath =
      searchType === "contains"
        ? buildAPIPath(path, termToSearch)
        : buildAPIPath(path, termToSearch, "?fullText=true");
  getDataForCountry(fullApiPath);
   ;

   
  }

  //get data for country by name
  function getDataForCountry(path) {
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        apiResponse(data);
      });

  }

  //build the path for the API
  function buildAPIPath(path, ...params) {
    return path + params.map((p) => p).join("");
  }
}

SearchCountry.propTypes = {
  apiPath: PropTypes.string.isRequired,
  apiResponse: PropTypes.func.isRequired,
};
