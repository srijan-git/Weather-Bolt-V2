const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "WeatherBolt_v2"
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: "You must enter address in search text box"
        })
    }
    geocode(address, (error, { latitude, longitude, place_name }) => {
        if (error) {
            res.send({ error: "Unable to fetch data...Try again" })
        }
        forecast(latitude, longitude,place_name, (error, { temp, feelslike, description, cloud, icon, tempMin, tempMax, humidity, windSpeed, sunrise, sunset, uvi, visibility, currentTime, pressure, cityName, dayMinTemp1, main, dayMinTemp2, dayMinTemp3, dayMinTemp4, dayMinTemp5, dayMinTemp6, dayMinTemp7, dayMaxTemp1, dayMaxTemp2, dayMaxTemp3, dayMaxTemp4, dayMaxTemp5, dayMaxTemp6, dayMaxTemp7, iconDay1, iconDay2, iconDay3, iconDay4, iconDay5, iconDay6, iconDay7, dayDateDetails1, dayDateDetails2, dayDateDetails3, dayDateDetails4, dayDateDetails5, dayDateDetails6, dayDateDetails7 }) => {
            if (error) {
                res.send({ error: "Unable to fetch data...Try again" })
            }
            // console.log(temp, feelslike, main, description, cloud, icon, tempMin, tempMax, humidity, windSpeed, sunrise, currentTime, sunset, uvi, visibility, pressure, cityName, dayMinTemp1, dayMinTemp2, dayMinTemp3, dayMinTemp4, dayMinTemp5, dayMinTemp6, dayMinTemp7, dayMaxTemp1, dayMaxTemp2, dayMaxTemp3, dayMaxTemp4, dayMaxTemp5, dayMaxTemp6, dayMaxTemp7, iconDay1, iconDay2, iconDay3, iconDay4, iconDay5, iconDay6, iconDay7, dayDateDetails1, dayDateDetails2, dayDateDetails3, dayDateDetails4, dayDateDetails5, dayDateDetails6, dayDateDetails7)

            res.send({
                place_name,temp, feelslike, description, main, cloud, icon, tempMin, tempMax, humidity, sunrise, windSpeed, sunset, uvi, visibility, currentTime, pressure, cityName, dayMinTemp1, dayMinTemp2, dayMinTemp3, dayMinTemp4, dayMinTemp5, dayMinTemp6, dayMinTemp7, dayMaxTemp1, dayMaxTemp2, dayMaxTemp3, dayMaxTemp4, dayMaxTemp5, dayMaxTemp6, dayMaxTemp7, iconDay1, iconDay2, iconDay3, iconDay4, iconDay5, iconDay6, iconDay7, dayDateDetails1, dayDateDetails2, dayDateDetails3, dayDateDetails4, dayDateDetails5, dayDateDetails6, dayDateDetails7
            })
        })

    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "Page Not found"
    })
})





app.listen(port, () => {
    console.log("Server is running* " + port)
})
