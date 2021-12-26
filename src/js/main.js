const urlValue = Number(document.URL.replace(/\D/g,''))

const urlNext = urlValue + 1
const urlBack = urlValue - 1

const next = document.querySelector("#next")
const back = document.querySelector("#back")

next.setAttribute('href', `page${urlNext}.php`)
back.setAttribute('href', `page${urlBack}.php`)

urlBack === 0 ? back.setAttribute('href', `/`) : false;

let xhr = new XMLHttpRequest()
xhr.open("GET", `page${urlNext}.php`)
xhr.send()
xhr.onload = function() {

    xhr.status !== 200 ? next.removeAttribute('href') : false;
};