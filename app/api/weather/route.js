import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ error: 'City is required' }, { status: 400 });
  }

  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
    );
    const weatherData = await weatherRes.json();

    return NextResponse.json({
      name,
      country,
      temp: weatherData.current.temperature_2m,
      humidity: weatherData.current.relative_humidity_2m,
      windSpeed: weatherData.current.wind_speed_10m,
      weatherCode: weatherData.current.weather_code,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}