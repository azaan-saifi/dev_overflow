"use server";

import { connectToDatabase } from "../mongoose";

export async function getUserLocation() {
  try {
    connectToDatabase();
    let userLocation: any = await fetch("http://ip-api.com/json/");
    userLocation = await userLocation.json();
    return `Nextjs Developer in ${userLocation.country}`;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface Props {
  searchQuery?: string;
  page?: number;
  pageSize?: number;
  location?: string;
}
export async function getJobs(params: Props) {
  try {
    connectToDatabase();

    const { page = 1, location } = params;
    let { searchQuery } = params;

    if (!searchQuery) {
      const query = await getUserLocation();
      const updatedQuery = location ? `Nextjs Developer in ${location}` : query;
      let response: any = await fetch(
        `https://jsearch.p.rapidapi.com/search?query=${updatedQuery}&page=${page}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "jsearch.p.rapidapi.com",
            "x-rapidapi-key":
              "e72fb4d2bbmshda09e5898511cd0p15b051jsn042d1ccefd6b",
          },
        }
      );
      response = await response.json();
      return { response };
    } else {
      searchQuery = location ? searchQuery + `in ${location}` : searchQuery;
      let response: any = await fetch(
        `https://jsearch.p.rapidapi.com/search?query=${searchQuery}&page=${page}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "jsearch.p.rapidapi.com",
            "x-rapidapi-key":
              "e72fb4d2bbmshda09e5898511cd0p15b051jsn042d1ccefd6b",
          },
        }
      );
      response = await response.json();
      const isNext = response?.data?.length >= 10;
      return { response, isNext };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCountryNames() {
  let response: any = await fetch("https://restcountries.com/v3.1/all");
  response = await response.json();
  const countries = response.map((country: any) => ({
    value: country.name.common,
    name: country.name.common,
  }));
  return countries;
}
