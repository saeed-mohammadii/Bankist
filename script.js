'use strict';

///////////////////////////////////////
// Modal window


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const header = document.querySelector('.header');


const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => {
    btn.addEventListener('click', openModal);
})
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);


document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

////////////////////////////////////
// Implementing cookie

// creating elements
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookies to add for improve functionality' +
    ' and analytics. <button class="btn btn-close-cookie">Got it!</button>';

header.append(message);


//  deleting cookie
document.querySelector('.btn-close-cookie').addEventListener('click', function () {
    message.remove();
});

// styling cookie
message.style.backgroundColor = '#37383d';
message.style.width = '98.9vw';


// calculated cookie style
message.style.height = parseInt(getComputedStyle(message).height) + 30 + 'px';

////////////////////////////////
//  slow scroll for learn more button

// Selecting elements
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

btnScrollTo.addEventListener('click', (e) => {
    section1.scrollIntoView({behavior: 'smooth'});
})

///////////////////////
// slow scroll for nav links

const navLinks = document.querySelector('.nav__links');
navLinks.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.className === 'nav__link') {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    }
})

/////////////////
// tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const contentOperations = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', (e) => {
    const clicked = e.target.closest('.operations__tab');

    if (!clicked) return; // guard clause

    console.log(clicked);

    // Active tab
    tabs.forEach((tab) => {
        tab.classList.remove('operations__tab--active');
    })

    clicked.classList.add('operations__tab--active');

    // Active content
    contentOperations.forEach(operation => {
        operation.classList.remove('operations__content--active');
    })


    document.querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');

})

/////////////////////
// menu fade animation
const nav = document.querySelector('.nav');
const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach((el) => {
            if (el !== link) {
                el.style.opacity = this;
            }
        })
        logo.style.opacity = this;
    }
}
nav.addEventListener('mouseover', handleHover.bind(0.6));
nav.addEventListener('mouseout', handleHover.bind(1));



// sticky nav Intersection observer API
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
const navStickyCallBack = (entries, observer) => {
    const entry = entries[0];
    if (!entry.isIntersecting) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
};
const navStickyOptions = {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
}
const headerObserver = new IntersectionObserver(navStickyCallBack, navStickyOptions);
headerObserver.observe(header);

////////////////////////////////////////////
// Lazy scrolling
const sections = document.querySelectorAll('.section');

const lazyLoadingCallBack = (entries, observer) => {
    console.log(entries)
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target);
    })
    // console.log(entries)
    // const entry = entries[0];
    // if(!entry.isIntersecting) return
    // entry.target.classList.remove('section--hidden');
    // observer.unobserve(entry.target);

};
const lazyLoadingOptions = {
    root: null,
    threshold: 0.15,
}
const sectionLoading = new IntersectionObserver(lazyLoadingCallBack, lazyLoadingOptions);
// sectionLoading.observe(header);
sections.forEach(section => {
    sectionLoading.observe(section);
    section.classList.add('section--hidden');
})

/////////////////////////////
// lazy loading images
const lazyImages = document.querySelectorAll('.features__img');

const imageCallBack = (entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.src = entry.target.dataset.src;
        entry.target.addEventListener('load', () => {
            entry.target.classList.remove('lazy-img');
        })
        observer.unobserve(entry.target);
    })
};
const imageOptions = {
    root: null,
    threshold: 0.15,
}

const imageLoading = new IntersectionObserver(imageCallBack, imageOptions);

lazyImages.forEach(image => {
    imageLoading.observe(image);
})
////////////////////////////////////////////////////////////
// Slider bar
const sliders = document.querySelectorAll('.slide');

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

// selecting and creating dots
const dotsContainer = document.querySelector('.dots');
const createDots = () =>{
    sliders.forEach((_, i) => {
        dotsContainer.insertAdjacentHTML('beforeend', `
        <button class="dots__dot" data-slide="${i}"></button>`)
    })
}
createDots();
const dots = document.querySelectorAll('.dots__dot');


// const sliderContainer = document.querySelector('.slider');

// placing sliders
sliders.forEach((slider, i) => {
    slider.style.transform = `translateX(${100 * i}%)`;
})

// Next and Previous slide
let currentSlide = 0;
const maxSlide = sliders.length;

const goToSlide = (slide) => {
    sliders.forEach((slider, i) => {
       slider.style.transform = `translateX(${100 * (i - slide)}%)`;
    })
};

const goToCurrentDot = (slide) => {
    dots.forEach((dot, i) => {
        dot.classList.remove('dots__dot--active');
    })
    dots[slide].classList.add('dots__dot--active');
}
goToCurrentDot(currentSlide);


const nextSlide = () => {
    if (currentSlide === maxSlide - 1){
        currentSlide = 0;
    }else{
        currentSlide++
    }

    goToSlide(currentSlide);

    goToCurrentDot(currentSlide);
}
const previousSlide = () => {
    if (currentSlide === 0){
        currentSlide = maxSlide - 1;
    }else{
        currentSlide--;
    }
    goToSlide(currentSlide);

    goToCurrentDot(currentSlide);
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') previousSlide();
});

// auto slider
let slideInterval;

const startAutoSlide = () => {
    slideInterval = setInterval(nextSlide, 3000);
};

const stopAutoSlide = () => {
    clearInterval(slideInterval);
};
sliders.forEach((slider, i) => {
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
})

startAutoSlide();

// Slider dots
dotsContainer.addEventListener('click', (e) => {
    const clicked = e.target.closest('.dots__dot');
    if (!clicked) return;
    sliders.forEach((slider, i) => {
        slider.style.transform = `translateX(${100 * (i - clicked.dataset.slide)}%)`;
    })
    dots.forEach((dot) => dot.classList.remove('dots__dot--active'));
    clicked.classList.add('dots__dot--active');
});


