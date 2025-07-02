// This is a script to update all contact information across the site
// You would need to run this on all HTML files to update the footer contact information

document.addEventListener("DOMContentLoaded", () => {
  // Update location and phone number in footer
  const locationElements = document.querySelectorAll(".footer-contact li:first-child")
  const phoneElements = document.querySelectorAll(".footer-contact li:nth-child(2)")

  locationElements.forEach((element) => {
    element.innerHTML = '<i class="fas fa-map-marker-alt"></i> NIST College, Lainchaur, Kathmandu'
  })

  phoneElements.forEach((element) => {
    element.innerHTML = '<i class="fas fa-phone"></i> +977 9866299930'
  })
})
