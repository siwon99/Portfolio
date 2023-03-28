'use strict';

// navbar가 내려오면 배경색 생김
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  // console.log(`window.scrollY= ${window.scrollY}`);
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

//home파트 스크롤을 내릴 때 배경빼고 점점 투명하게 만들기
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  //스크롤 높이가 home높이를 나눈 값을 1에서 뺐을 때 1 = 800(불투명), 0.5 = 400(반투명), 0 = 0(투명)
  home.style.opacity = 1 - window.scrollY / homeHeight;
});