// Basic JavaScript for Loksewa Prep Website
// Made by Suyog Pandey - NIST College

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navLinks = document.querySelector(".nav-links")

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      mobileMenuBtn.classList.toggle("active")
      console.log("Mobile menu toggled")
    })

    // Close mobile menu when clicking on a link
    const navLinkItems = document.querySelectorAll(".nav-links a")
    navLinkItems.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active")
        mobileMenuBtn.classList.remove("active")
      })
    })
  }

  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle-checkbox")
  const body = document.body

  // Check for saved theme preference or default to 'dark' mode
  const currentTheme = localStorage.getItem("theme") || "dark"

  // Apply the current theme
  if (currentTheme === "light") {
    body.classList.add("light-mode")
    if (themeToggle) themeToggle.checked = true
  } else {
    body.classList.remove("light-mode")
    if (themeToggle) themeToggle.checked = false
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", function () {
      if (this.checked) {
        body.classList.add("light-mode")
        localStorage.setItem("theme", "light")
        console.log("Switched to light theme")
      } else {
        body.classList.remove("light-mode")
        localStorage.setItem("theme", "dark")
        console.log("Switched to dark theme")
      }
    })
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Testimonial slider functionality
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  const dots = document.querySelectorAll(".dot")
  let currentTestimonial = 0

  function showTestimonial(index) {
    // Hide all testimonials
    testimonialCards.forEach((card) => {
      card.style.display = "none"
    })

    // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Show current testimonial and activate dot
    if (testimonialCards[index]) {
      testimonialCards[index].style.display = "flex"
    }
    if (dots[index]) {
      dots[index].classList.add("active")
    }
  }

  // Initialize testimonials
  if (testimonialCards.length > 0) {
    showTestimonial(0)

    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonialCards.length
      showTestimonial(currentTestimonial)
    }, 5000)

    // Dot click handlers
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentTestimonial = index
        showTestimonial(currentTestimonial)
      })
    })
  }

  // Form validation (basic)
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const requiredFields = form.querySelectorAll("[required]")
      let isValid = true

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.style.borderColor = "#ef4444"

          // Remove error styling after user starts typing
          field.addEventListener("input", function () {
            this.style.borderColor = ""
          })
        }
      })

      if (!isValid) {
        e.preventDefault()
        alert("Please fill in all required fields.")
      }
    })
  })

  // Scroll to top functionality
  const scrollToTopBtn = document.createElement("button")
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollToTopBtn.className = "scroll-to-top"
  scrollToTopBtn.setAttribute("aria-label", "Scroll to top")
  document.body.appendChild(scrollToTopBtn)

  // Show/hide scroll to top button
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("show")
    } else {
      scrollToTopBtn.classList.remove("show")
    }
  })

  // Scroll to top when button is clicked
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Add loading animation to buttons
  const buttons = document.querySelectorAll(".btn-primary")
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.type === "submit") {
        this.classList.add("loading")
        this.disabled = true

        // Re-enable after 2 seconds (for demo purposes)
        setTimeout(() => {
          this.classList.remove("loading")
          this.disabled = false
        }, 2000)
      }
    })
  })

  // Simple scroll animation (optional and lightweight)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Only observe elements that have the fade-in-on-scroll class
  const elementsToAnimate = document.querySelectorAll(".fade-in-on-scroll")
  elementsToAnimate.forEach((element) => {
    observer.observe(element)
  })

  console.log("Loksewa Prep website loaded successfully!")
  console.log("Created by Suyog Pandey - NIST College")
})

// Utility Functions
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  // Add some basic styling
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background-color: var(--primary-color);
    color: white;
    border-radius: 8px;
    z-index: 10000;
    box-shadow: var(--card-shadow);
  `

  document.body.appendChild(notification)

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Handle page loading
window.addEventListener("load", () => {
  console.log("All resources loaded successfully!")

  // Hide any loading spinners
  const loadingElements = document.querySelectorAll(".loading")
  loadingElements.forEach((element) => {
    element.style.display = "none"
  })
})

// Handle errors gracefully
window.addEventListener("error", (e) => {
  console.error("An error occurred:", e.error)
  // You could show a user-friendly error message here
})

// Simple analytics tracking (for learning purposes)
function trackEvent(eventName, eventData) {
  console.log("Event tracked:", eventName, eventData)
  // In a real application, you would send this data to an analytics service
}

// Track button clicks
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    trackEvent("button_click", {
      button_text: e.target.textContent,
      page: window.location.pathname,
    })
  }
})

// Simple search functionality (if search input exists)
const searchInput = document.querySelector('input[type="search"], .search-input')
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase()
    console.log("Searching for:", searchTerm)
    // Add your search logic here
  })
}

// Console message for developers
console.log("%c🎓 Loksewa Prep - Created by Suyog Pandey", "color: #4f46e5; font-size: 16px; font-weight: bold;")
console.log("%c📚 NIST College Student Project", "color: #10b981; font-size: 14px;")
console.log("%c💡 Knowledge Without Limits", "color: #f59e0b; font-size: 12px;")
