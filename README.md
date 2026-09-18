# Weather App

A weather lookup app built with Next.js. Search any city to see current conditions — temperature, humidity, wind speed — with the page's background and color theme changing dynamically based on the weather (sunny, cloudy, rainy, snowy, stormy).

## How it works

1. User searches a city name
2. A Next.js API route (`/api/weather`) geocodes the city via [Open-Meteo's Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
3. The resolved coordinates are used to fetch live conditions from [Open-Meteo's Forecast API](https://open-meteo.com/en/docs/)
4. Weather codes are mapped to labels, icons, and a color theme client-side
5. The UI re-renders with the matching theme and displays temperature, humidity, and wind speed

## Tech stack

- **Next.js** (App Router) — frontend + API route
- **React** — client-side widget with search, loading, and error states
- **Open-Meteo API** — free, no API key required, for both geocoding and forecast data
- **Tailwind CSS** — styling and dynamic theming

## Getting started

\`\`\`
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) and search for a city.