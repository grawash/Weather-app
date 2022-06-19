import getData from "./data"
import getForecast from "./forecast"
import svg from "./img/weather-svgrepo-com.svg"
import clouds from "./img/pexels-magda-ehlers-2114014.jpg"
import rain from "./img/pexels-veeterzy-39811.jpg"
import clear from "./img/pexels-francesco-ungaro-281260.jpg"
import mist from "./img/pexels-lumn-167699.jpg"

const body = document.querySelector('body')
function createContainer(){
    const container = document.createElement('div');
    container.classList.add('container')
    body.appendChild(container)
    createHeader(container)
    createFooter(container)
}

function createForm(header){
    const form = document.createElement('form')
    form.setAttribute('novalidate', true)
    const search = document.createElement('input')
    search.type = 'search'
    const searchBtn = document.createElement('button')
    searchBtn.textContent='search'
    form.appendChild(search)
    form.appendChild(searchBtn)
    form.classList.add('form')
    header.appendChild(form)
    form.addEventListener('submit', (event) => {
        const container = document.querySelector('.container')
        event.preventDefault()
        removeContent(container)
        displayWeather(container)
        displayForecast(container)
    })
}
function createHeader(container){
    const header = document.createElement('div')
    header.classList.add('header')
    container.appendChild(header)
    createLogo(header)
    createForm(header)
    
}
function createLogo(header){
    const logo = document.createElement('div')
    logo.classList.add('logo')
    const weatherImg = document.createElement('img')
    weatherImg.src=svg
    const logoHeader=document.createElement('h1')
    logoHeader.textContent="Weather App"
    logoHeader.classList.add('logoHeader')
    logo.appendChild(weatherImg)
    logo.appendChild(logoHeader)
    header.appendChild(logo)
}
function createContent(container){
    displayWeather(container)
    displayForecast(container)
}
function displayWeather(container){
    const weatherInfo = document.createElement('div')
    weatherInfo.classList.add('weatherInfo')
    const weatherIcon = document.createElement('img')
    const description = document.createElement('p')
    const temperature = document.createElement('p')
    const feelsLike = document.createElement('p')
    const city = document.createElement('h1')
    getData().then((obj) =>{
        city.textContent=obj.name
        description.textContent=obj.weather[0].description
        temperature.textContent='temp: '+parseInt(obj.main.temp)+"°"
        feelsLike.textContent='feels like: '+parseInt(obj.main.feels_like)+"°"
        chooseBackground(obj.weather[0].main,weatherInfo) 
        weatherIcon.src=`https://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`
    })
    weatherInfo.appendChild(weatherIcon)
    weatherInfo.appendChild(city)
    weatherInfo.appendChild(description)
    weatherInfo.appendChild(temperature)
    weatherInfo.appendChild(feelsLike)
    container.appendChild(weatherInfo)
}
function removeContent(container){
    const weatherInfo = document.querySelector('.weatherInfo')
    const forecast = document.querySelector('.forecast')
    if(weatherInfo){
        weatherInfo.remove()
        forecast.remove()
    }
}
function chooseBackground(weatherType,weatherInfo){
    if (weatherType==="Rain"){
        body.style.background=`url(${rain})`
    }else if (weatherType==="Clouds"){
        body.style.background=`url(${clouds})`
    }else if(weatherType==="Clear"){
        body.style.background=`url(${clear})`
    }else if(weatherType==="Misty"){
        body.style.background=`url(${mist})`
    }
    body.style.backgroundSize="cover"
}

function displayForecast(container){
    const forecast = document.createElement('div')
    forecast.classList.add('forecast')
    const forecastText = document.createElement('h1')
    forecastText.textContent='Daily forecast:'
    const forecastList = document.createElement('div')
    forecastList.classList.add('forecastList')
    getForecast().then((obj) =>{
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let currentDay = new Date(obj.list[0].dt * 1000)
        obj.list.forEach(ls => {
            let day = new Date(ls.dt * 1000)
            if (day.getDay() != currentDay.getDay()){
                const forecastCard = document.createElement('div')
                const forecastIcon = document.createElement('img')
                const dayOfWeek = document.createElement('p')
                const forecastWeather = document.createElement('p')
                const forecastTemp = document.createElement('p')
                forecastCard.classList.add('forecastCard')
                forecastIcon.src=`https://openweathermap.org/img/wn/${ls.weather[0].icon}@2x.png`
                dayOfWeek.textContent = weekday[day.getDay()]
                forecastWeather.textContent= ls.weather[0].description
                forecastTemp.textContent= parseInt(ls.main.temp)+"°"
                forecastList.appendChild(forecastCard)
                forecastCard.appendChild(forecastIcon)
                forecastCard.appendChild(forecastWeather)
                forecastCard.appendChild(dayOfWeek)
                forecastCard.appendChild(forecastTemp)
                console.log(ls.dt_txt)
                currentDay=day
            }
        })
    })
    forecast.appendChild(forecastText)
    forecast.appendChild(forecastList)
    container.appendChild(forecast)
}
function createFooter(container){
    const footer = document.createElement('div')
    const footerText = document.createElement('p')
    footerText.textContent='created by @grawash'
    footer.classList.add('footer')
    footer.appendChild(footerText)
    container.appendChild(footer)
}

export default createContainer