// express 是一個函數
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()   //
const port = process.env.PORT || 3000

// Define handlebars engine and views
const publicDirPath = path.join(__dirname, '../public')
const viewDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

/////// app.set方法: 可用來設置express //////
app.set('views', viewDirPath)           // 設置模板所放的資料夾。handlebars預設使用的是views
app.set('view engine', 'hbs')           // 使用hbs(handlebars)模板引擎
hbs.registerPartials(partialsDirPath)   // 將partials所在的路徑告訴hbs

/////// app.use方法: 客製化server   ///////
// Setup static directory
app.use(express.static(publicDirPath))  // static中介路由: 為每一個要出傳送的靜態檔案建立路由，這個靜態檔案可以轉譯檔案並且將它回傳給用戶端

// get方法的參數： 1.路徑 2.method(req, resp)
app.get('', (req, res) => {
    res.render('index', {               // 使用模板引擎頁面, 不需要 file extension
        title: 'Weather App',
        name: 'Jane'
    }) 
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jane'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'There some useful words.',
        name: 'Jane'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    // 使用真實的天氣數據
    geocode(req.query.address, (err, {longitude, latitude, location} = {}) => { // 注意 destructing object 的預設值
        console.log(err)
        if (err) {
            return res.send({
                error: err
            })
        }
        forecast(longitude, latitude, (err, forecastData) => {
            if (err) {
                return res.send({
                    error: err
                })
            }
            res.send({
                forecast: forecastData,
                location: location
            })
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'New York',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.status(404)
    res.render('404',{
        title: '404',
        errorMsg: 'Help article not found.',
        name: 'Jane'
    })
})

// 要記得放在後面，前面的匹配不成功才會在這裡被匹配到
app.get('*', (req, res) => {
    res.status(404)
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found.',
        name: 'Jane'
    })
})
// 
// app.use((req, res, next) => {
//     res.status(404)
//     res.render('404', {
//         title: '404',
//         errorMsg: 'Page not found.',
//         name: 'Jane'
//     })
// })

//
app.listen(port, () => {
    console.log('Server is up on port ' + port + '...')
})
