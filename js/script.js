const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-center a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;

    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(0,0,0,0.7)";
  } else {
    navbar.style.background = "transparent";
  }
});
const elements = document.querySelectorAll(".fade-in");

function showOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < triggerBottom) {
      el.classList.add("show");
    } else {
      el.classList.remove("show");
    }
  });
}

window.addEventListener("scroll", showOnScroll);

// run once on load
showOnScroll();

const texts = [
  "I build real systems",
  "I build web applications",
  "I build network solutions"
];

let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
  const element = document.getElementById("typing-text");

  if (!element) return;

  if (!isDeleting) {
    currentText = texts[index].substring(0, charIndex++);
  } else {
    currentText = texts[index].substring(0, charIndex--);
  }

  element.textContent = currentText;

  let speed = 100;

  if (isDeleting) speed = 50;

  if (!isDeleting && charIndex === texts[index].length) {
    isDeleting = true;
    speed = 1500;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % texts.length;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();
// initialize EmailJS
// initialize EmailJS
(function() {
  emailjs.init("tMEFzTCxkUU0PavbX");
})();

const form = document.getElementById("contact-form");
const message = document.getElementById("form-message");
const button = document.getElementById("submit-btn");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const text = document.getElementById("message").value.trim();

  // validation
  if (name === "" || email === "" || text === "") {
    message.textContent = "Please fill in all fields.";
    message.style.color = "red";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    message.textContent = "Enter a valid email address.";
    message.style.color = "red";
    return;
  }

  // disable button
  button.disabled = true;
  button.textContent = "Sending...";

  const params = {
    name: name,
    email: email,
    message: text
  };

  emailjs.send("service_wmlv4li", "template_nd6btwx", params)
    .then(function() {
      message.textContent = "Message sent successfully.";
      message.style.color = "green";
      form.reset();
    })
    .catch(function(error) {
      message.textContent = "Failed to send message.";
      message.style.color = "red";
      console.error(error);
    })
    .finally(function() {
      button.disabled = false;
      button.textContent = "Send Message";
    });
});
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});