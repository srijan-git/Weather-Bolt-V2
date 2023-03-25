const request = require('request')
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic3JpamFua2hhbiIsImEiOiJja3JpcmRoNTQwbG55MndwdmJqOWd4ZzNjIn0.o9bsJYX-RiEP4HyId5snEA"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect", undefined)
        } else if (body.features.length === 0) {
            callback("unable", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place_name:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode