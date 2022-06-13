const body = document.querySelector('body')

async function getData() {
    const search = document.querySelector("input[type='search']")
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=6dcb1bd02e3e18c8a7041a712632e232&units=metric`,
        { mode: 'cors' }
    )
    const weatherData = await response.json()
    console.log(weatherData)
    const temp = document.createElement('p')
    temp.textContent=weatherData.main.temp
    body.appendChild(temp)
}

// form.addEventListener('submit', (event) => {
//     event.preventDefault()
//     getData()

// })

export default getData;