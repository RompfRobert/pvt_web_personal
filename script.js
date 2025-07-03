// Enhanced smooth scrolling with snap behavior
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      // Disable scroll-snap temporarily for smooth navigation
      document.documentElement.style.scrollSnapType = "none"
      document.body.style.scrollSnapType = "none"

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Re-enable scroll-snap after animation
      setTimeout(() => {
        document.documentElement.style.scrollSnapType = "y mandatory"
        document.body.style.scrollSnapType = "y mandatory"
      }, 1000)
    }
  })
})

// Header scroll effect with snap awareness
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 50) {
    header.style.background = "rgba(26, 26, 46, 0.95)"
    header.style.backdropFilter = "blur(10px)"
  } else {
    header.style.background = "rgba(26, 26, 46, 0.8)"
    header.style.backdropFilter = "blur(5px)"
  }
})

// Enhanced active navigation link highlighting for snap sections
function updateActiveNavigation() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")
  const scrollDots = document.querySelectorAll(".scroll-dot")

  let current = ""
  const scrollPosition = window.scrollY + window.innerHeight / 2

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  // Update navigation links
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })

  // Update scroll dots
  scrollDots.forEach((dot, index) => {
    dot.classList.remove("active")
    if (dot.dataset.section === current) {
      dot.classList.add("active")
    }
  })
}

// Throttled scroll listener for better performance
let scrollTimeout
window.addEventListener("scroll", () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
  scrollTimeout = setTimeout(updateActiveNavigation, 50)
})

// Intersection Observer for animations with snap sections
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -20% 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in")

      // Trigger specific animations for different sections
      if (entry.target.classList.contains("hero")) {
        animateCodeWindow()
      }
    }
  })
}, observerOptions)

// Enhanced code window typing effect
function animateCodeWindow() {
  const codeLines = document.querySelectorAll(".code-line")

  codeLines.forEach((line, index) => {
    line.style.opacity = "0"
    line.style.transform = "translateX(-20px)"

    setTimeout(
      () => {
        line.style.transition = "all 0.5s ease"
        line.style.opacity = "1"
        line.style.transform = "translateX(0)"
      },
      (index + 1) * 300,
    )
  })
}

// Create scroll indicator dots
function createScrollIndicator() {
  const sections = ["home", "about", "experience", "skills", "contact"]
  const indicator = document.createElement("div")
  indicator.className = "scroll-indicator"

  sections.forEach((section, index) => {
    const dot = document.createElement("div")
    dot.className = "scroll-dot"
    dot.dataset.section = section
    dot.addEventListener("click", () => {
      document.getElementById(section).scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
    indicator.appendChild(dot)
  })

  document.body.appendChild(indicator)
}

// Keyboard navigation for accessibility
document.addEventListener("keydown", (e) => {
  const sections = ["home", "about", "experience", "skills", "contact"]
  const currentSection = getCurrentSection()
  const currentIndex = sections.indexOf(currentSection)

  if (e.key === "ArrowDown" && currentIndex < sections.length - 1) {
    e.preventDefault()
    document.getElementById(sections[currentIndex + 1]).scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  } else if (e.key === "ArrowUp" && currentIndex > 0) {
    e.preventDefault()
    document.getElementById(sections[currentIndex - 1]).scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
})

function getCurrentSection() {
  const sections = document.querySelectorAll("section[id]")
  const scrollPosition = window.scrollY + window.innerHeight / 2

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      return section.getAttribute("id")
    }
  }
  return "home"
}

// Touch/swipe support for mobile
let touchStartY = 0
let touchEndY = 0

document.addEventListener("touchstart", (e) => {
  touchStartY = e.changedTouches[0].screenY
})

document.addEventListener("touchend", (e) => {
  touchEndY = e.changedTouches[0].screenY
  handleSwipe()
})

function handleSwipe() {
  const swipeThreshold = 50
  const sections = ["home", "about", "experience", "skills", "contact"]
  const currentSection = getCurrentSection()
  const currentIndex = sections.indexOf(currentSection)

  if (touchStartY - touchEndY > swipeThreshold && currentIndex < sections.length - 1) {
    // Swipe up - go to next section
    document.getElementById(sections[currentIndex + 1]).scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  } else if (touchEndY - touchStartY > swipeThreshold && currentIndex > 0) {
    // Swipe down - go to previous section
    document.getElementById(sections[currentIndex - 1]).scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Create scroll indicator
  createScrollIndicator()

  // Observe sections for animations
  const sectionsToObserve = document.querySelectorAll("section, .timeline-item, .skill-category, .cert-item, .stat")
  sectionsToObserve.forEach((el) => observer.observe(el))

  // Initial navigation update
  updateActiveNavigation()

  // Animate hero section on load
  setTimeout(animateCodeWindow, 500)
})

// Handle resize events
window.addEventListener("resize", () => {
  // Recalculate positions after resize
  setTimeout(updateActiveNavigation, 100)
})

// Prevent scroll snap during user interaction for better UX
let isUserScrolling = false
let scrollTimer

window.addEventListener("wheel", () => {
  isUserScrolling = true
  clearTimeout(scrollTimer)

  scrollTimer = setTimeout(() => {
    isUserScrolling = false
  }, 150)
})

// Console easter egg for fellow developers
console.log(`
🚀 Hey there, fellow developer!
👋 Thanks for checking out the code.
💼 If you're interested in cloud infrastructure or DevOps,
📧 let's connect: https://linkedin.com/in/robertrompf
⭐ Built with vanilla HTML, CSS, and JavaScript
🎯 Now with smooth section snapping!
`)
