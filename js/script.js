const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-center a");
const navbar = document.querySelector(".navbar");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const elements = document.querySelectorAll(".fade-in");
const searchForm = document.getElementById("site-search");
const searchInput = document.getElementById("search-input");
const searchMessage = document.getElementById("search-message");
const projectCards = document.querySelectorAll(".project-card");
const packageSelect = document.getElementById("package-select");
const generateVoucherButton = document.getElementById("generate-voucher");
const voucherOutput = document.getElementById("voucher-output");
const onlineCount = document.getElementById("online-count");
const voucherCount = document.getElementById("voucher-count");
const revenueTotal = document.getElementById("revenue-total");
const userSearch = document.getElementById("user-search");
const userRows = document.querySelectorAll(".user-row");

function setActiveNav() {
  let current = "home";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;

    if (window.scrollY >= sectionTop - 120) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}

function setNavbarState() {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
}

function showOnScroll() {
  const triggerBottom = window.innerHeight * 0.86;

  elements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    el.classList.toggle("show", elementTop < triggerBottom);
  });
}

window.addEventListener("scroll", () => {
  setActiveNav();
  setNavbarState();
  showOnScroll();
});

setActiveNav();
setNavbarState();
showOnScroll();

const texts = [
  "I build and fix ISP management systems",
  "I solve network problems",
  "I build and fix web apps with JavaScript",
  "I design and build network solutions"
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

  let speed = isDeleting ? 50 : 100;

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

if (typeof emailjs !== "undefined") {
  emailjs.init("tMEFzTCxkUU0PavbX");
}

const form = document.getElementById("contact-form");
const message = document.getElementById("form-message");
const button = document.getElementById("submit-btn");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const text = document.getElementById("message").value.trim();

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

  if (typeof emailjs === "undefined") {
    message.textContent = "Messaging service is not available. Please use WhatsApp or GitHub.";
    message.style.color = "red";
    return;
  }

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
      message.textContent = "Failed to send message. Please try WhatsApp instead.";
      message.style.color = "red";
      console.error(error);
    })
    .finally(function() {
      button.disabled = false;
      button.textContent = "Send Message";
    });
});

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

const buttons = document.querySelectorAll(".details-btn");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const details = button.nextElementSibling;
    const isOpen = details.classList.toggle("open");
    button.textContent = isOpen ? "Hide Details" : "View Details";
  });
});

function filterProjects(query) {
  const term = query.trim().toLowerCase();
  let matches = 0;

  projectCards.forEach(card => {
    const content = `${card.textContent} ${card.dataset.search || ""}`.toLowerCase();
    const isMatch = term === "" || content.includes(term);

    card.classList.toggle("hidden", !isMatch);
    if (isMatch) matches++;
  });

  if (!searchMessage) return;

  if (term === "") {
    searchMessage.textContent = "";
  } else if (matches === 0) {
    searchMessage.textContent = `No projects found for "${query}".`;
  } else {
    searchMessage.textContent = `${matches} project${matches === 1 ? "" : "s"} found for "${query}".`;
  }
}

if (searchForm && searchInput) {
  searchForm.addEventListener("submit", event => {
    event.preventDefault();
    filterProjects(searchInput.value);
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  });

  searchInput.addEventListener("input", () => {
    filterProjects(searchInput.value);
  });
}

let vouchersCreated = 126;
let mockRevenue = 8450;
let mockOnlineUsers = 18;

function formatCurrency(value) {
  return `KSh ${value.toLocaleString()}`;
}

function createVoucherCode(packageName) {
  const prefix = packageName.replace(/[^a-z]/gi, "").slice(0, 3).toUpperCase();
  const number = Math.floor(1000 + Math.random() * 9000);
  return `FAST-${prefix}-${number}`;
}

if (generateVoucherButton && packageSelect && voucherOutput) {
  generateVoucherButton.addEventListener("click", () => {
    const [packageName, price, validity] = packageSelect.value.split("|");
    const voucherCode = createVoucherCode(packageName);

    vouchersCreated += 1;
    mockRevenue += Number(price);
    mockOnlineUsers += Math.random() > 0.5 ? 1 : 0;

    voucherOutput.innerHTML = `
      <span class="output-label">Latest Voucher</span>
      <strong>${voucherCode}</strong>
      <p>${packageName} package, KSh ${price}, valid ${validity}</p>
    `;

    if (voucherCount) voucherCount.textContent = vouchersCreated;
    if (revenueTotal) revenueTotal.textContent = formatCurrency(mockRevenue);
    if (onlineCount) onlineCount.textContent = mockOnlineUsers;
  });
}

if (userSearch) {
  userSearch.addEventListener("input", () => {
    const term = userSearch.value.trim().toLowerCase();

    userRows.forEach(row => {
      const userData = row.dataset.user.toLowerCase();
      row.classList.toggle("hidden", term !== "" && !userData.includes(term));
    });
  });
}
