// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle-checkbox")
const body = document.body

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark") {
  body.classList.add("dark-mode")
  themeToggle.checked = true
} else if (savedTheme === "light") {
  body.classList.remove("dark-mode")
  themeToggle.checked = false
} else {
  // Use preferred color scheme if no saved preference
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    body.classList.add("dark-mode")
    themeToggle.checked = true
  }
}

// Toggle theme when checkbox is clicked
themeToggle.addEventListener("change", function () {
  if (this.checked) {
    body.classList.add("dark-mode")
    localStorage.setItem("theme", "dark")
  } else {
    body.classList.remove("dark-mode")
    localStorage.setItem("theme", "light")
  }
})

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const navLinks = document.querySelector(".nav-links")

mobileMenuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("active")
  this.classList.toggle("active")
})

// Close mobile menu when clicking outside
document.addEventListener("click", (event) => {
  if (!event.target.closest("nav") && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active")
    mobileMenuBtn.classList.remove("active")
  }
})

// Testimonial Slider
const dots = document.querySelectorAll(".dot")
const testimonialCards = document.querySelectorAll(".testimonial-card")
let currentSlide = 0

// Hide all testimonials except the first one
for (let i = 1; i < testimonialCards.length; i++) {
  testimonialCards[i].style.display = "none"
}

// Function to change slide
function changeSlide(index) {
  // Hide all testimonials
  for (let i = 0; i < testimonialCards.length; i++) {
    testimonialCards[i].style.display = "none"
    dots[i].classList.remove("active")
  }

  // Show the selected testimonial
  testimonialCards[index].style.display = "flex"
  dots[index].classList.add("active")
  currentSlide = index
}

// Add click event to dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    changeSlide(index)
  })
})

// Auto slide change every 5 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % testimonialCards.length
  changeSlide(currentSlide)
}, 5000)

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      })

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")
        mobileMenuBtn.classList.remove("active")
      }
    }
  })
})

// Add animation on scroll
const animateElements = document.querySelectorAll(".feature-card, .category-card, .update-card, .testimonial-card")

function checkScroll() {
  animateElements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    const screenPosition = window.innerHeight / 1.3

    if (elementPosition < screenPosition) {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }
  })
}

// Set initial state for animation
animateElements.forEach((element) => {
  element.style.opacity = "0"
  element.style.transform = "translateY(20px)"
  element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
})

// Check elements on load
window.addEventListener("load", checkScroll)

// Check elements on scroll
window.addEventListener("scroll", checkScroll)
