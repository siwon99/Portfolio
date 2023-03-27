'use strict';

// navbar가 내려오면 배경색 생김
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if(window.scrollY > navbarHeight) {
    navbar.classList.add(`navbar--dark`);
  } else {
    navbar.classList.remove(`navbar--dark`);
  }
});
