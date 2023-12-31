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

        function metersToMiles (meters) {
            const miles = meters / 1609.34;
            return miles.toFixed(1);
        }
      
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
            if (forecast.pop >= dailyForecast.pop) {
                dailyForecast.pop = forecast.pop;
            }
            dailyForecast.highTemp = Math.max(dailyForecast.highTemp, forecast.main.temp_max);
            dailyForecast.lowTemp = Math.min(dailyForecast.lowTemp, forecast.main.temp_min);
            dailyForecast.conditions.push(forecast.weather[0].description);
            dailyForecast.visibility = forecast.visibility;
        });

        let dailyForecastArray = Object.values(dailyForecasts);

        dailyForecastArray.forEach((dailyForecast) => {
            let noon = new Date(dailyForecast.date + "T12:00:00");
            let closestCondition = null;
            let closestTimeDiff = Infinity;

            weeklyForecast.list.forEach((forecast) => {
                let forecastDateTime = new Date(forecast.dt*1000);
                let timeDiff = Math.abs(forecastDateTime - noon);
                if (timeDiff < closestTimeDiff) {
                    closestCondition = forecast.weather[0].description;
                    closestTimeDiff = timeDiff;
                }
            })
            dailyForecast.conditionNoon = closestCondition;
        })

        function formatDate(dateStr) {
            const dateObj = new Date(dateStr);
            const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
            const day = (dateObj.getDate() + 1).toString().padStart(2, "0");
            const formattedDate = `${month}/${day}`;
            return formattedDate;
        }

        const degreeSymbol = "\u00B0";

        return (
            <>
                <h2 className="white-text weather-title">Current Weather</h2>
                <Table id="current-weather-table" striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Conditions</th>
                        <th>Temp.</th>
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
                        <td>{metersToMiles(currentWeather.visibility)} mi.</td>
                    </tr>
                </tbody>
                </Table>
                <h2 className="white-text forecast-title">5-Day Forecast</h2>
                <Table id="forecast-table" striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Conditions (12pm)</th>
                        <th>{`High/Low (${degreeSymbol}F)`}</th>
                        <th>Chance of<br></br>Precip.</th>
                        <th>Visibility</th>
                    </tr>
                </thead>
                <tbody>
                    {dailyForecastArray.map((forecast) => {
                        return (
                        <tr key={forecast.date}>
                            <td>{formatDate(forecast.date)}</td>
                            <td>{forecast.conditionNoon.charAt(0).toUpperCase() + forecast.conditionNoon.slice(1)}</td>
                            <td>{`${Math.round(forecast.highTemp)}${degreeSymbol}/${Math.round(forecast.lowTemp)}${degreeSymbol}`}</td>
                            <td>{Math.round(forecast.pop*100)}%</td>
                            <td>{metersToMiles(forecast.visibility)} mi.</td>
                        </tr>
                        )
                    })}
                </tbody>
                </Table>
            </>
        )
}

export default Weather;