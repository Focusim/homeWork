const burger = document.querySelector('.burger_icon');

burger.addEventListener('click', function () {
    burger.classList.toggle('_active')

    if(!burger.classList.contains('_active')) {

        burger.classList.toggle('_not-active')
    } else {
        burger.classList.remove('_not-active')
    }

});

alert("324234234")
console.log('23423423432423')
