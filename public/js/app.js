/* 這份js檔案是在client端執行的JS代碼 */



// 選取 element
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

// event listener
weatherForm.addEventListener('submit', (event) => { // 注意event參數
    // 在這裡是防止表單提交直接刷新頁面的行為
    event.preventDefault()
    const location = search.value
    // loading message
    msgOne.textContent = 'loading...'
    msgTwo.textContent = ''
    
    // fetch the weather
    // fetch api: browser based API
    fetch('/weather?address=' + location).then((response) => {
        // response.json().then(...) : 等到response回應之後，解析json
        response.json().then((data) => {
            if (data.error) {   //
                console.log(data.error)
                msgOne.textContent = data.error
                msgTwo.textContent = ''
            } else {
                console.log(data.location)
                console.log(data.forecast)
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
            }
        })
    })
})

