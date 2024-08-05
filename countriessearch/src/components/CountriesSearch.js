import React, { useState, useEffect } from "react";


const CountriesApp = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const resData = await response.json();
      setCountries(resData);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <input
        type="text"
        id="searchBar"
        placeholder="Search for countries..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div id="countryContainer" className="country-container">
        {filteredCountries.map((country) => (
          <div className="countryCard" key={country.cca3}>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountriesApp;
