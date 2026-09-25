exports.getWeather = async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.json({
        city,
        temp: 24,
        condition: 'Partly Cloudy',
        humidity: 60,
        windSpeed: '12 km/h',
        fallback: true,
        note: 'Fallback mode active (No OpenWeather key specified)'
      });
    }

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
    if (!response.ok) throw new Error('Weather data fetch failed');
    const data = await response.json();

    res.json({
      city: data.name,
      temp: data.main.temp,
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: `${data.wind.speed} m/s`,
      fallback: false
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};