import getData from "./data"
const body = document.querySelector('body')

const form = document.createElement('form')
form.setAttribute('novalidate', true)
const search = document.createElement('input')
search.type = 'search'
const searchBtn = document.createElement('button')
searchBtn.textContent='search'

function createForm(){
    form.appendChild(search)
    form.appendChild(searchBtn)
    body.appendChild(form)
}
form.addEventListener('submit', (event) => {
    event.preventDefault()
    getData()

})

export default createForm