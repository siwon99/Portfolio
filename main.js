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

//타이핑 효과
const content = "Hi. I'm Siwon Kim \n 도전을 두려워하지 않고, \n 신속한 변화에 대처하며 함께 성장할 \n 프론트엔드 개발자입니다.";
const text = document.querySelector(".text");
let i = 0;
let intervalId;

function typing() {
    let txt = content[i++];
    text.innerHTML += txt === "\n" ? "<br/>" : txt;
    if (i >= content.length) {
        clearInterval(intervalId);
        setTimeout(() => {
            text.textContent = "";
            i = 0;
            intervalId = setInterval(typing, 150);
        }, 2500);
    }
}

intervalId = setInterval(typing, 150);

//contact 버튼 클릭시 넘어가기
const homebtn = document.querySelector('.home__contact');
homebtn.addEventListener('click', (event) => {
  scrollIntoView('#contact');
});

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

//스크롤시 각 섹션에 활성화되기
//1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다.
//2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
//3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

//sectionIds를 빙글빙글 돌면서(map) 각각의 id문자열을 document.querySelector을 이용하서 해당하는 요소 받아오기
const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

//scrollIntoView함수를 통해 selector자리에 해당값을 받아와서 이벤트처리
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: "smooth"});
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
}

//entries를 빙글빙글 돌면서 우리가 원하는 일들을 함
const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    //진입하지 않을 때 = 빠져나갈 때
    if(!entry.isIntersecting) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
  
      //스크롤링이 아래로 되어서 페이지가 올라옴
      if(entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else { //페이지가 내려가는 경우
        selectedNavIndex = index - 1;
      }
    }
  });
};

//관찰자를 만듦
//sections를 빙글빙글 돌면서 해당하는 section을 obsever에게 관찰해달라고 전달
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

//스크롤링 할때마다 해당하는 메뉴 선택
//'scroll'이벤트는 브라우저에서 모든 스크롤에 해당하는 이벤트가 발생할 때마다 생성되는 이벤트
//'wheel'이벤트는 사용자가 스스로 스크롤링 할 때는 휠 이벤트 발생
window.addEventListener('wheel', () => {
  if(window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});