import axios from 'axios';

const BASE_URL = 'https://overpass-api.de/api/interpreter';

const nearByPlace = async (lat: number, lon: number) => {
  const query = `
    [out:json];
    node
      [amenity=restaurant]
      (around:1500,${lat},${lon});
    out;
  `;

  return axios.post(BASE_URL, query, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};

export default {
  nearByPlace,
};
