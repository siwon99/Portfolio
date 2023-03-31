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
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

//토글버튼
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

//contact 버튼 클릭시 넘어가기
const homebtn = document.querySelector('.home__contact');
homebtn.addEventListener('click', (event) => {
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

//arrow-up 버튼 만들기
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

arrowUp.addEventListener('click', (event) => {
  scrollIntoView('#home');
});

//프로젝트 버튼 클릭시 필터링하기
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
  //filter의 dataset값을 가져오지 못한다면 parentNode의 dataset값을 불러온다.
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if(filter == null) {
    return;
  } 

  //이전에 눌린 버튼 제외 현재 버튼에 불들어오기
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');

  projectContainer.classList.add('anim-out');
  //anim-out을 통해 투명도가 0인 프로젝트들을 0.3초후에 다시 투명도가 1로 돌아올 수 있도록 사용
  setTimeout(() => {
    //forEach = for (let project of projects) {...} / for(let i=0; )
    projects.forEach((project) => {
    //전체 혹은 dataset 타입과 같은 filter를 선택하면 '안보여지는'크래스를 삭제, 선택하지 않으면 '안보여지는'클래스 추가
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out'); //->블럭안 코드가 0.3초 이후에 호출됨
  }, 300);
});