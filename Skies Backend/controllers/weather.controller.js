

exports.getWeatherByCity = async (req, res) => {
    const { lat, lon, city } = req.query;
    
    console.log(lat,lon)
    let queryParam = '';
    if (lat && lon) {
      queryParam = `${lat},${lon}`;
    } else if (city) {
      queryParam = city;
    } else {
      return res.status(400).json({ error: 'No location provided' });
    }
  
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=0810cf71e5f245f1ac053929252704&q=${queryParam}&days=5`
      );
      const data = await response.json();
      console.log("Weather Data is: ",data)
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  }
;


  