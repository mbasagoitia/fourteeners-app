import { useState, useEffect } from "react";

function Weather ({ currentPeak }) {
    const [apiKey, setApiKey] = useState(null);
        // Fetch the weather API key

        useEffect(() => {
            fetch("http://localhost:5000/api/weather-api-key")
            .then((res) => res.json())
            .then((data) => {
              setApiKey(data.weatherApiKey);
            })
            .catch((err) => {
              console.error("Error fetching API key:", err);
            });
          }, []);
    
        // Fetch the weather for the current peak
    
        useEffect(() => {
            if (apiKey) {
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentPeak.latitude}&lon=${currentPeak.longitude}&appid=${apiKey}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("current weather", data);
                })
                .catch((err) => {
                    console.error("Error fetching weather data:", err);
                });
            }
        }, [apiKey, currentPeak]);

        useEffect(() => {
            if (apiKey) {
                fetch(`https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${currentPeak.latitude}&lon=${currentPeak.longitude}&appid=${apiKey}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("forecast", data);
                })
                .catch((err) => {
                    console.error("Error fetching weather data:", err);
                });
            }
        }, [apiKey, currentPeak]);

        return (
            <h1 className="weather-title white-text">Current Weather</h1>
        )
}

export default Weather;