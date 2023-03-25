const request = require('request')
const forecast = (latitude, longitude, place_name, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=b26ac2e0ffd2f24f8aa8089189528854"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect", undefined)
        } else if (body.error) {
            callback("unable", undefined)
        } else {
            callback(undefined, {

                // -----------------Current Date Details-------------//
                temp: body.current.temp,

                humidity: body.current.humidity,

                pressure: body.current.pressure,

                windSpeed: body.current.wind_speed,

                feelslike: body.current.feels_like,

                main: body.current.weather[0].main,

                description: body.current.weather[0].description,

                icon: body.current.weather[0].icon,

                visibility: body.current.visibility,

                currentTime: body.daily[0].dt,

                tempMin: body.daily[0].temp.min,

                tempMax: body.daily[0].temp.max,

                sunrise: body.daily[0].sunrise,

                sunset: body.daily[0].sunset,

                cloud: body.daily[0].clouds,

                uvi: body.current.uvi,

                cityName: body.timezone,
                
                main_city:place_name,
                // -----------------Current Date Details-------------//

                // -----------------Week  Details-------------//

                //-----Week Min temp-----//
                dayMinTemp1: body.daily[1].temp.min,

                dayMinTemp2: body.daily[2].temp.min,

                dayMinTemp3: body.daily[3].temp.min,

                dayMinTemp4: body.daily[4].temp.min,

                dayMinTemp5: body.daily[5].temp.min,

                dayMinTemp6: body.daily[6].temp.min,

                dayMinTemp7: body.daily[7].temp.min,
                //-----Week Min temp-----//
                //-----Week Max temp-----//
                dayMaxTemp1: body.daily[1].temp.max,

                dayMaxTemp2: body.daily[2].temp.max,

                dayMaxTemp3: body.daily[3].temp.max,

                dayMaxTemp4: body.daily[4].temp.max,

                dayMaxTemp5: body.daily[5].temp.max,

                dayMaxTemp6: body.daily[6].temp.max,

                dayMaxTemp7: body.daily[7].temp.max,
                //-----Week Max temp-----//
                //-----Week weatherIcon details-----//
                iconDay1: body.daily[1].weather[0].icon,

                iconDay2: body.daily[2].weather[0].icon,

                iconDay3: body.daily[3].weather[0].icon,

                iconDay4: body.daily[4].weather[0].icon,

                iconDay5: body.daily[5].weather[0].icon,

                iconDay6: body.daily[6].weather[0].icon,

                iconDay7: body.daily[7].weather[0].icon,
                //-----Week weatherIcon details-----//
                //-----Week Date details-----//
                dayDateDetails1: body.daily[1].dt,

                dayDateDetails2: body.daily[2].dt,

                dayDateDetails3: body.daily[3].dt,

                dayDateDetails4: body.daily[4].dt,

                dayDateDetails5: body.daily[5].dt,

                dayDateDetails6: body.daily[6].dt,

                dayDateDetails7: body.daily[7].dt
                //-----Week Date details-----//

                // -----------------Week  Details-------------//

            })
        }
    })
}

module.exports = forecast