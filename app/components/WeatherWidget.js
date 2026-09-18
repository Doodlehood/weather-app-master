'use client';
import { useState } from 'react';
import { getWeatherInfo, themes } from '../lib/weatherCodes';

export default function WeatherWidget() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'City not found');
        return;
      }

      setWeather(data);
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  const info = weather ? getWeatherInfo(weather.weatherCode) : null;
  const theme = themes[info?.theme || 'sunny'];

  return (
    <main
      className={`min-h-screen bg-linear-to-br ${theme.bg} flex items-center justify-center p-6 transition-colors duration-700`}
    >
      <div className="w-full max-w-sm mx-auto">
        {!weather && !error && (
          <div className="text-center mb-10">
            <div className="text-5xl mb-4 drop-shadow-lg">🌤️</div>
            <h1 className="text-2xl font-semibold text-white drop-shadow mb-1">
              Check the weather
            </h1>
            <p className="text-sm text-white/80 drop-shadow">
              Search any city to see current conditions
            </p>
          </div>
        )}

        <form onSubmit={handleSearch} className="relative mb-8">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city"
            className={`w-full bg-white/95 border-2 border-transparent ${theme.ring} outline-none py-3 px-4 pr-11 text-base text-slate-900 placeholder-slate-400 rounded-full shadow-lg transition-colors`}
          />
          <button
            type="submit"
            disabled={loading}
            className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:${theme.accent} disabled:opacity-40 transition-colors`}
            aria-label="Search"
          >
            {loading ? (
              <span className="text-sm">···</span>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            )}
          </button>
        </form>

        {error && (
          <p className="text-center text-sm text-white bg-black/20 rounded-lg py-2 px-4">{error}</p>
        )}

        {weather && (
          <div className={`${theme.card} backdrop-blur rounded-3xl shadow-2xl ${theme.shadow} p-8 text-center animate-[fadeIn_0.4s_ease]`}>
            <p className={`text-sm tracking-wide ${theme.accent} font-semibold uppercase mb-2`}>
              {weather.name}, {weather.country}
            </p>
            <div className="text-6xl mb-2">{info.icon}</div>
            <p className="text-7xl font-light text-slate-800 tabular-nums tracking-tight">
              {Math.round(weather.temp)}°
            </p>
            <p className="text-slate-500 mt-1 mb-8">{info.label}</p>

            <div className="flex justify-center gap-10 text-sm border-t border-slate-100 pt-6">
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Humidity</p>
                <p className="text-slate-700 font-semibold">{weather.humidity}%</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Wind</p>
                <p className="text-slate-700 font-semibold">{weather.windSpeed} km/h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}