import React from "react";
import countries from "world-countries";
const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
}));
const useCountry = () => {
  const getAll = () => formattedCountries;
  const getByValue = (value: string) => {
    return formattedCountries.find((item: any) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountry;
