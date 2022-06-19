async function getForecast() {
    const search = document.querySelector("input[type='search']")
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${search.value}&appid=6dcb1bd02e3e18c8a7041a712632e232&units=metric`,
        { mode: 'cors' }
    )
    const weatherData = await response.json()
    console.log(weatherData)
    return weatherData
}

export default getForecast