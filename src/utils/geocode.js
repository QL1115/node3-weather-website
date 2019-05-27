const request = require('request')

// 透過地名得到對應的經緯度
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicWlhbmxpbmNoaWFuZyIsImEiOiJjanZzMXN0dTIzMTNjM3lsNm42YWE5b2JsIn0.HplFqziHLejhBl36CyPH0g&limit=1'

    request({ url , json: true}, (error, { body }) => { // destructuring
        // error handling
        if (error) {
            // callback
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {   // // 要看他人的API怎麼定義它的錯誤信息
            // callback
            callback('Unable to find location. Please try again!', undefined)
        } else {
            // callback
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode