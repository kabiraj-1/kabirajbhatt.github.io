/*=========================================
  KABIRAJ BHATT PORTFOLIO
  main.js
=========================================*/

"use strict";

/*=========================================
  DOM ELEMENTS
=========================================*/

const body = document.body;
const header = document.querySelector(".header");
const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");
const themeToggle = document.getElementById("theme-toggle");
const backToTop = document.getElementById("backToTop");


/*=========================================
  MOBILE MENU
=========================================*/

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("active");

        menuBtn.textContent =
            navbar.classList.contains("active")
            ? "✕"
            : "☰";

    });

    document.querySelectorAll(".navbar a").forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

            menuBtn.textContent = "☰";

        });

    });

}


/*=========================================
  DARK MODE
=========================================*/

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    body.classList.add("dark-mode");

    if(themeToggle){
        themeToggle.textContent = "☀️";
    }

}

if (themeToggle) {

themeToggle.addEventListener("click", () => {

body.classList.toggle("dark-mode");

const dark = body.classList.contains("dark-mode");

themeToggle.textContent = dark ? "☀️" : "🌙";

localStorage.setItem(

"theme",

dark ? "dark" : "light"

);

});

}


/*=========================================
  STICKY HEADER
=========================================*/

window.addEventListener("scroll", () => {

if(window.scrollY > 80){

header.style.boxShadow =
"0 10px 30px rgba(0,0,0,.10)";

}else{

header.style.boxShadow =
"0 3px 20px rgba(0,0,0,.05)";

}

});


/*=========================================
  BACK TO TOP
=========================================*/

window.addEventListener("scroll", () => {

if(window.scrollY > 500){

backToTop.classList.add("show");

}else{

backToTop.classList.remove("show");

}

});


if(backToTop){

backToTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}
/*=========================================
  SMOOTH SCROLL
=========================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/*=========================================
  ACTIVE NAVIGATION
=========================================*/

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop &&
            scrollY < sectionTop + sectionHeight) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/*=========================================
  SCROLL REVEAL ANIMATION
=========================================*/

const revealElements = document.querySelectorAll(

".hero,.about,.skills,.projects,.services,.contact,.footer,.project-card,.skill-card,.service-card"

);

const revealOnScroll = () => {

    const trigger = window.innerHeight * 0.85;

    revealElements.forEach(el => {

        const top = el.getBoundingClientRect().top;

        if (top < trigger) {

            el.classList.add("fade-up");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/*=========================================
  CONTACT FORM VALIDATION
=========================================*/

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const inputs = contactForm.querySelectorAll(
            "input[required], textarea"
        );

        let valid = true;

        inputs.forEach(input => {

            if (input.value.trim() === "") {

                input.style.borderColor = "red";

                valid = false;

            } else {

                input.style.borderColor = "";

            }

        });

        if (!valid) {

            alert("Please fill in all required fields.");

            return;

        }

        alert("Thank you! Your message has been submitted.");

        contactForm.reset();

    });

}


/*=========================================
  PERFORMANCE
=========================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/*=========================================
  PREVENT IMAGE DRAG
=========================================*/

document.querySelectorAll("img").forEach(img => {

    img.setAttribute("draggable", "false");

});


/*=========================================
  LAZY LOADING IMAGES
=========================================*/

document.querySelectorAll("img").forEach(img => {

    if (!img.hasAttribute("loading")) {

        img.setAttribute("loading", "lazy");

    }

});


/*=========================================
  COPYRIGHT YEAR
=========================================*/

const yearElement = document.querySelector("#year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/*=========================================
  CONSOLE MESSAGE
=========================================*/

console.log("%cWelcome to Kabiraj Bhatt Portfolio",
"color:#2563eb;font-size:18px;font-weight:bold;");

console.log("Website Developed with HTML, CSS & JavaScript");


/*=========================================
  END OF FILE
=========================================*/
