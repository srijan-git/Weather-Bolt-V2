const fetchWeather = "/weather"
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const currentTemp = document.getElementById('temp-condition')

const locationDetails = document.querySelector('.location-image p')

const weatherCondition = document.querySelector(".weather-condition-text p")

const dateElement = document.getElementById('current-date-details')

const WeatherIconMain = document.querySelector('.weather-icon')

const timeElement = document.querySelector('#timeElement')

const cloudiNess = document.querySelector('.rain-prediction-text p')

const windValue = document.querySelector('.wind-value p')

const sunriseTime = document.querySelector('.sunrise-time p')

const sunsetTime = document.querySelector('.sunset-time p')

const humidity = document.querySelector('.humidity-value p')

const humidityStatus = document.querySelector('.humidity-status p')

const visibility = document.querySelector('.visibility-value p')

const visibilityStatus = document.querySelector('.visibility-status p')

const uvIndexValue = document.querySelector('.uv-index-value p')

const tempMAX = document.querySelector('.max-temp-value p')

const tempMIN = document.querySelector('.min-temp-value p')

const weatherBigIcon = document.querySelector('.weather-icon');

//-----------Weakly data variables---------------------------//
const day1 = document.querySelector('#day1')

const day2 = document.querySelector('#day2')

const day3 = document.querySelector('#day3')

const day4 = document.querySelector('#day4')

const day5 = document.querySelector('#day5')

const day6 = document.querySelector('#day6')

const day7 = document.querySelector('#day7')



const max1 = document.querySelector('#max1')

const max2 = document.querySelector('#max2')

const max3 = document.querySelector('#max3')

const max4 = document.querySelector('#max4')

const max5 = document.querySelector('#max5')

const max6 = document.querySelector('#max6')

const max7 = document.querySelector('#max7')



const min1 = document.querySelector('#min1')

const min2 = document.querySelector('#min2')

const min3 = document.querySelector('#min3')

const min4 = document.querySelector('#min4')

const min5 = document.querySelector('#min5')

const min6 = document.querySelector('#min6')

const min7 = document.querySelector('#min7')



const iconDay1 = document.querySelector('.day-weather-icon1')

const iconDay2 = document.querySelector('.day-weather-icon2')

const iconDay3 = document.querySelector('.day-weather-icon3')

const iconDay4 = document.querySelector('.day-weather-icon4')

const iconDay5 = document.querySelector('.day-weather-icon5')

const iconDay6 = document.querySelector('.day-weather-icon6')

const iconDay7 = document.querySelector('.day-weather-icon7')
//-----------Weakly data variables---------------------------//

const PM = "PM"
const AM = "AM"
var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
]
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    // console.log(search.value)
    locationDetails.textContent = 'Loading...'
    currentTemp.textContent = ""
    weatherCondition.textContent = ""
    const locationAPI = fetchWeather + "?address=" + search.value
    fetch(locationAPI).then(res => {
        res.json().then(data => {
            // console.log(data)
            if (data.error) {

                currentTemp.textContent = " "

                locationDetails.textContent = data.error

                weatherCondition.textContent = " "

                WeatherIconMain.textContent = "Could not able to fetch icon...."

                cloudiNess.textContent = " "

                windValue.textContent = " "

                sunriseTime.textContent = " "

                sunsetTime.textContent = " "

                humidity.textContent = " "

                visibility.textContent = " "

                timeElement.textContent = " "

                uvIndexValue.textContent = " "

                // tempMesureMent.textContent = " "




            }
            else {

                // -------------Current Weather Update---------------//
                const getDesiredCurrentDate = (a) => {
                    var weekday = new Array(7);
                    weekday[0] = "Sun";
                    weekday[1] = "Mon";
                    weekday[2] = "Tue";
                    weekday[3] = "Wed";
                    weekday[4] = "Thr";
                    weekday[5] = "Fri";
                    weekday[6] = "Sat";
                    let desiredTime = new Date(a * 1000);
                    let day = weekday[desiredTime.getDay()]
                    return day
                }
                WeatherIconMain.innerHTML = `<img src='http://openweathermap.org/img/wn/${data.icon}@4x.png'>`


                dateElement.textContent = getDesiredCurrentDate(data.currentTime) + " " + new Date(data.currentTime * 1000).getDate() + ", " + months[new Date(data.currentTime * 1000).getMonth()]

                currentTemp.textContent = (data.temp - 273.15).toFixed(0) + String.fromCharCode(176) + "C"

                weatherCondition.textContent = "Feels Like: " + (data.feelslike - 273.15).toFixed(0) + String.fromCharCode(176) + "C" + " | " + data.main + " | " + data.description


                // let options = {
                //     timeZone: data.cityName,
                //     hour: 'numeric',
                //     minute: 'numeric',
                //     second: 'numeric',
                // }
                // formatter = new Intl.DateTimeFormat([], options);
                // timeElement.textContent = formatter.format(new Date());

                timeElement.textContent= new Intl.DateTimeFormat('en-US', {
                    timeZone: data.cityName,
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                  }).format(new Date())

                

                cloudiNess.textContent = "Cloudiness: " + data.cloud + " %"

                locationDetails.textContent = data.place_name

                uvIndexValue.textContent = data.uvi

                windValue.textContent = (data.windSpeed * 3.6).toFixed(2) + " km/h"

                sunriseTime.textContent = new Date(data.sunrise * 1000).toLocaleTimeString("en-US", { timeZone: data.cityName })
                // sunriseTime.textContent = new Intl.DateTimeFormat('en-US', {
                //     timeZone: data.cityName,
                //     hour: 'numeric',
                //     minute: 'numeric',
                //     second: 'numeric'
                //   }).format(new Date(data.sunrise * 1000))


                sunsetTime.textContent = new Date(data.sunset * 1000).toLocaleTimeString("en-US", { timeZone: data.cityName })

                visibility.textContent = (data.visibility / 1000).toFixed(1) + " km"
                const VisibilityMeasureMent = (data.visibility / 1000).toFixed(0)
                if (VisibilityMeasureMent < 4) {
                    visibilityStatus.textContent = "Comparatively Low"
                } else if (VisibilityMeasureMent >= 4 && VisibilityMeasureMent <= 6) {
                    visibilityStatus.textContent = "Moderate"
                } else if (VisibilityMeasureMent > 6) {
                    visibilityStatus.textContent = "Good"
                }



                // tempMesureMent.textContent = "Min: " + (data.tempMin - 273.15).toFixed(0) + String.fromCharCode(176) + "C" + " | " + "Max: " + (data.tempMax - 273.15).toFixed(0) + String.fromCharCode(176) + "C"

                tempMAX.textContent = "Max: " + (data.tempMax - 273.15).toFixed(0) + String.fromCharCode(176) + "C"

                tempMIN.textContent = "Min: " + (data.tempMin - 273.15).toFixed(0) + String.fromCharCode(176) + "C"

                humidity.textContent = data.humidity + " %"
                if (data.humidity < 40) {
                    humidityStatus.textContent = "Low"
                } else if (data.humidity >= 40 && data.humidity < 60) {
                    humidityStatus.textContent = "Normal"
                } else if (data.humidity > 60) {
                    humidityStatus.textContent = "Extreme"
                }

                // -------------Current Weather Update---------------//


                //-------------Weekly Update------------------------//
                const getDesiredDay = (a) => {
                    var weekday = new Array(7);
                    weekday[0] = "Sun";
                    weekday[1] = "Mon";
                    weekday[2] = "Tue";
                    weekday[3] = "Wed";
                    weekday[4] = "Thr";
                    weekday[5] = "Fri";
                    weekday[6] = "Sat";
                    let desiredTime = new Date(a * 1000);
                    let day = weekday[desiredTime.getDay()]
                    return day
                }

                day1.textContent = getDesiredDay(data.dayDateDetails1) + " " + new Date(data.dayDateDetails1 * 1000).getDate() + " " + months[new Date(data.dayDateDetails1 * 1000).getMonth()]

                day2.textContent = getDesiredDay(data.dayDateDetails2) + " " + new Date(data.dayDateDetails2 * 1000).getDate() + " " + months[new Date(data.dayDateDetails2 * 1000).getMonth()]

                day3.textContent = getDesiredDay(data.dayDateDetails3) + " " + new Date(data.dayDateDetails3 * 1000).getDate() + " " + months[new Date(data.dayDateDetails3 * 1000).getMonth()]

                day4.textContent = getDesiredDay(data.dayDateDetails4) + " " + new Date(data.dayDateDetails4 * 1000).getDate() + " " + months[new Date(data.dayDateDetails4 * 1000).getMonth()]

                day5.textContent = getDesiredDay(data.dayDateDetails5) + " " + new Date(data.dayDateDetails5 * 1000).getDate() + " " + months[new Date(data.dayDateDetails5 * 1000).getMonth()]

                day6.textContent = getDesiredDay(data.dayDateDetails6) + " " + new Date(data.dayDateDetails6 * 1000).getDate() + " " + months[new Date(data.dayDateDetails6 * 1000).getMonth()]

                day7.textContent = getDesiredDay(data.dayDateDetails7) + " " + new Date(data.dayDateDetails7 * 1000).getDate() + " " + months[new Date(data.dayDateDetails7 * 1000).getMonth()]




                max1.textContent = (data.dayMaxTemp1 - 273.15).toFixed(0) + String.fromCharCode(176) + "C"

                max2.textContent = (data.dayMaxTemp2 - 273.15).toFixed(0) + String.fromCharCode(176) + "C"

                max3.textContent = (data.dayMaxTemp3 - 273.15).toFixed(0) + String.fromCharCode(176) + "C"

                max4.textContent = (data.dayMaxTemp4 - 273.15).toFixed(0) + String.fromCharCode(176) + "C"

                max5.textContent = (data.dayMaxTemp5 - 273.15).toFixed(0) + String.fromCharCode(176) + "C"

                max6.textContent = (data.dayMaxTemp6 - 273.15).toFixed(0) + String.fromCharCode(176) + "C"

                max7.textContent = (data.dayMaxTemp7 - 273.15).toFixed(0) + String.fromCharCode(176) + "C"



                min1.textContent = (data.dayMinTemp1 - 273.15).toFixed(0) + String.fromCharCode(176) + "C"

                min2.textContent = (data.dayMinTemp2 - 273.15).toFixed(0) + String.fromCharCode(176) + "C"

                min3.textContent = (data.dayMinTemp3 - 273.15).toFixed(0) + String.fromCharCode(176) + "C"

                min4.textContent = (data.dayMinTemp4 - 273.15).toFixed(0) + String.fromCharCode(176) + "C"

                min5.textContent = (data.dayMinTemp5 - 273.15).toFixed(0) + String.fromCharCode(176) + "C"

                min6.textContent = (data.dayMinTemp6 - 273.15).toFixed(0) + String.fromCharCode(176) + "C"

                min7.textContent = (data.dayMinTemp7 - 273.15).toFixed(0) + String.fromCharCode(176) + "C"




                iconDay1.innerHTML = `<img src='http://openweathermap.org/img/wn/${data.iconDay1}@2x.png'>`

                iconDay2.innerHTML = `<img src='http://openweathermap.org/img/wn/${data.iconDay2}@2x.png'>`

                iconDay3.innerHTML = `<img src='http://openweathermap.org/img/wn/${data.iconDay3}@2x.png'>`

                iconDay4.innerHTML = `<img src='http://openweathermap.org/img/wn/${data.iconDay4}@2x.png'>`

                iconDay5.innerHTML = `<img src='http://openweathermap.org/img/wn/${data.iconDay5}@2x.png'>`

                iconDay6.innerHTML = `<img src='http://openweathermap.org/img/wn/${data.iconDay6}@2x.png'>`

                iconDay7.innerHTML = `<img src='http://openweathermap.org/img/wn/${data.iconDay7}@2x.png'>`


                //-------------Weekly Update------------------------//




            }

        })
    })
})