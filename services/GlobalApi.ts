import axios from 'axios';

const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.openstreetmap.ru/cgi/interpreter',
];

let currentEndpointIndex = 0;

const nearByPlace = async (
  lat: number,
  lon: number,
  category: string = 'tourism=hotel',
  radius: number = 3000,
  retryCount: number = 0,
) => {
  const [key, value] = category.split('=');

  const query = `
    [out:json][timeout:15];
    (
      node["${key}"="${value}"](around:${radius},${lat},${lon});
    );
    out body;
  `;

  const endpoint = OVERPASS_ENDPOINTS[currentEndpointIndex];

  try {
    console.log(`Trying endpoint ${currentEndpointIndex + 1}:`, endpoint);

    const response = await axios.post(endpoint, query, {
      headers: {
        'Content-Type': 'text/plain',
      },
      timeout: 15000,
    });

    return response;
  } catch (error: any) {
    console.error(
      `Endpoint ${currentEndpointIndex + 1} failed:`,
      error.message,
    );

    if (
      (error.code === 'ECONNABORTED' || error.response?.status === 504) &&
      retryCount < OVERPASS_ENDPOINTS.length - 1
    ) {
      currentEndpointIndex =
        (currentEndpointIndex + 1) % OVERPASS_ENDPOINTS.length;
      console.log('Retrying with next endpoint...');

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return nearByPlace(lat, lon, category, radius, retryCount + 1);
    }

    throw error;
  }
};

export default {
  nearByPlace,
};
