export function getWeatherInfo(code) {
  const map = {
    0: { label: 'Clear sky', icon: '☀️', theme: 'sunny' },
    1: { label: 'Mostly clear', icon: '🌤️', theme: 'sunny' },
    2: { label: 'Partly cloudy', icon: '⛅', theme: 'cloudy' },
    3: { label: 'Overcast', icon: '☁️', theme: 'cloudy' },
    45: { label: 'Foggy', icon: '🌫️', theme: 'cloudy' },
    48: { label: 'Foggy', icon: '🌫️', theme: 'cloudy' },
    51: { label: 'Light drizzle', icon: '🌦️', theme: 'rainy' },
    61: { label: 'Light rain', icon: '🌧️', theme: 'rainy' },
    63: { label: 'Rain', icon: '🌧️', theme: 'rainy' },
    65: { label: 'Heavy rain', icon: '🌧️', theme: 'rainy' },
    71: { label: 'Light snow', icon: '🌨️', theme: 'snowy' },
    73: { label: 'Snow', icon: '🌨️', theme: 'snowy' },
    75: { label: 'Heavy snow', icon: '❄️', theme: 'snowy' },
    80: { label: 'Rain showers', icon: '🌦️', theme: 'rainy' },
    95: { label: 'Thunderstorm', icon: '⛈️', theme: 'stormy' },
  };
  return map[code] || { label: 'Unknown', icon: '🌡️', theme: 'sunny' };
}

export const themes = {
  sunny: {
    bg: 'from-orange-400 via-amber-400 to-yellow-300',
    card: 'bg-white/90',
    accent: 'text-orange-600',
    ring: 'focus:border-orange-400',
    shadow: 'shadow-orange-900/20',
  },
  cloudy: {
    bg: 'from-slate-400 via-slate-300 to-blue-200',
    card: 'bg-white/90',
    accent: 'text-slate-600',
    ring: 'focus:border-slate-400',
    shadow: 'shadow-slate-900/20',
  },
  rainy: {
    bg: 'from-blue-600 via-blue-500 to-cyan-400',
    card: 'bg-white/90',
    accent: 'text-blue-600',
    ring: 'focus:border-blue-400',
    shadow: 'shadow-blue-900/25',
  },
  snowy: {
    bg: 'from-sky-200 via-blue-100 to-indigo-100',
    card: 'bg-white/90',
    accent: 'text-sky-600',
    ring: 'focus:border-sky-400',
    shadow: 'shadow-sky-900/15',
  },
  stormy: {
    bg: 'from-slate-700 via-purple-600 to-indigo-600',
    card: 'bg-white/90',
    accent: 'text-purple-700',
    ring: 'focus:border-purple-400',
    shadow: 'shadow-purple-900/30',
  },
};