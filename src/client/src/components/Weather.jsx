import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

function Weather ({ currentPeak }) {
    const [apiKey, setApiKey] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [weeklyForecast, setWeeklyForecast] = useState(null);

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
                fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${currentPeak.latitude}&lon=${currentPeak.longitude}&appid=${apiKey}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("current weather", data);
                    setCurrentWeather(data);
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
                    setWeeklyForecast(data);
                })
                .catch((err) => {
                    console.error("Error fetching weather data:", err);
                });
            }
        }, [apiKey, currentPeak]);

        if (!currentWeather || !weeklyForecast) {
            return <div>Loading...</div>
        }

        let description = currentWeather.weather[0].description.charAt(0).toUpperCase() + currentWeather.weather[0].description.slice(1);

        const dailyForecasts = {};
        weeklyForecast.list.forEach((forecast) => {
            let forecastDateTime = new Date(forecast.dt*1000);
            let forecastDate = forecastDateTime.toISOString().split("T")[0];
            if (!dailyForecasts[forecastDate]) {
                dailyForecasts[forecastDate] = {
                    date: forecastDate,
                    pop: 0,
                    highTemp: -Infinity,
                    lowTemp: Infinity,
                    conditions: [],
                    visibility: 0
                }
            }
            let dailyForecast = dailyForecasts[forecastDate];

            dailyForecast.pop += forecast.pop;
            dailyForecast.highTemp = Math.max(dailyForecast.highTemp, forecast.main.temp_max);
            dailyForecast.lowTemp = Math.min(dailyForecast.lowTemp, forecast.main.temp_min);
            dailyForecast.conditions.push(forecast.weather[0].description);
            dailyForecast.visibility = forecast.visibility;
        });

        let dailyForecastArray = Object.values(dailyForecasts);
        // Verify that the data here is actually correct
        console.log(dailyForecastArray);

        return (
            <>
                <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Condition</th>
                        <th>Temperature</th>
                        <th>Feels Like</th>
                        <th>Wind</th>
                        <th>Visibility</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{description}</td>
                        <td>{Math.round(currentWeather.main.temp)}&#176;F</td>
                        <td>{Math.round(currentWeather.main.feels_like)}&#176;F</td>
                        <td>{Math.round(currentWeather.wind.speed)} mph</td>
                        <td>{currentWeather.visibility.toLocaleString()} m.</td>
                    </tr>
                </tbody>
                </Table>
                <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Condition</th>
                        <th>High/Low</th>
                        <th>Chance of Precipitation</th>
                        <th>Visibility</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
                </Table>
            </>
        )
}

export default Weather;