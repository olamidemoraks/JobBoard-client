import axios from "axios";

export const getFeatureJob = async () => {
  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params: {
      query: "tech",
      page: "1",
      num_pages: "1",
    },
    headers: {
      "X-RapidAPI-Key": "10e74a9744mshf381ce85deb1caep16094djsnaaf24ad8ca40",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
