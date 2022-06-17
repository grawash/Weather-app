import getData from "./data"
import svg from "./img/weather-svgrepo-com.svg"
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
    const temperature = document.createElement('p')
    const city = document.createElement('h1')
    getData().then((obj) =>{
        city.textContent=obj.name
        temperature.textContent=parseInt(obj.main.temp)+"°"
    })
    weatherInfo.appendChild(city)
    weatherInfo.appendChild(temperature)
    container.appendChild(weatherInfo)
}
function removeContent(container){
    const weatherInfo = document.querySelector('.weatherInfo')
    if(weatherInfo){
        weatherInfo.remove()
    }
}

export default createContainer