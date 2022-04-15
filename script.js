const onVisible = (element, callback) => {
    new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.intersectionRatio > 0) {
          callback(element);
          observer.disconnect();
        }
      });
    }, {
        threshold: 0.5
    }).observe(element);
}

const hero = document.getElementById("hero");
onVisible(hero, () => {
  hero.classList.add("cred-app-toggle");
});



let slideIndex = 1;
showSlides(slideIndex);

const slideShow = setInterval(() => {
  slideIndex +=1;
  slideIndex %= 5;

  showSlides(slideIndex)
}, 3000);

// For NavBAr
let heroVisible = false, landingVisible = false;


const heroObserver = new window.IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    heroVisible = true;
    return
  }
  heroVisible = false;
}, {
  root: null,
  threshold: 0.1,
})

const landing = document.getElementById('landing');
const landingObserver = new window.IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    landingVisible = true;
    return
  }
  landingVisible = false;
}, {
  root: null,
  threshold: 0.1,
})

heroObserver.observe(hero);
landingObserver.observe(landing);


function scrollEventThrottle(fn) {
  let last_known_scroll_position = 0;
  let ticking = false;
  window.addEventListener("scroll", function () {
    let previous_known_scroll_position = last_known_scroll_position;
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        fn(last_known_scroll_position, previous_known_scroll_position);
        ticking = false;
      });
      ticking = true;
    }
  });
}

const navBar = document.getElementById("landing-nav");

// ## function invocation
scrollEventThrottle((scrollPos, previousScrollPos) => {
  let curr = window.scrollY;
  if (previousScrollPos > scrollPos) {
    if (landingVisible || heroVisible) {
      navBar.classList.remove("landing-nav-height");
      setTimeout(() => {
        navBar.classList.remove("landing-nav-fixed");
      }, 300);
    } else {
      navBar.classList.add("landing-nav-fixed");
      setTimeout(() => {
        navBar.classList.add("landing-nav-height");
      }, 50);

    }
  } else {
    navBar.classList.remove("landing-nav-height");
    setTimeout(() => {
      navBar.classList.remove("landing-nav-fixed");
    }, 300)  
  }

});