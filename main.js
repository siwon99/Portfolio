'use strict';

// navbar가 내려오면 배경색 생김
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  console.log(`window.scrollY= ${window.scrollY}` );
  console.log(window.scrollX);
  if(window.scrollY > navbarHeight) {
    navbar.classList.add(`navbar--dark`);
  } else {
    navbar.classList.remove(`navbar--dark`);
  }
});

//메뉴버튼 클릭시 해당파트로 넘어가기
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  } 
  scrollIntoView(link);
});

//contact 버튼 클릭시 넘어가기
const btn = document.querySelector('.home__contact');
btn.addEventListener('click', (event) => {
  scrollIntoView('#contact');
});

//scrollIntoView함수를 통해 selector자리에 해당값을 받아와서 이벤트처리
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: "smooth"});
}