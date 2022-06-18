import getData from "./data"
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
    //createContent(container)
    //createFooter(container)
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
    if(weatherInfo){
        weatherInfo.remove()
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

export default createContainer