const request = require('request')

// 透過經緯度得到天氣資訊
const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/6dc0b22553f47a4ade7cb6da89e5d9ec/' + latitude + ','+ longitude
    // 底下url的寫法是destructuring的
    request({url, json: true}, (error, { body }) => {   // body 是 destructuring
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {   // 要看他人的API怎麼定義的
            callback('Unable to find location!', undefined)
        } else {
            // callback(undefined, {
            //     summary: response.body.daily.data[0].summary,
            //     temperature: response.body.currently.temperature,
            //     precipProbability: response.body.currently.precipProbability
            // })
            callback(undefined, 'It\'s currently ' + body.daily.data[0].summary + ' ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% change of rain.')
        }
    })
}

module.exports = forecast