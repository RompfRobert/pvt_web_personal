// Theme Management with Enhanced UX
class ThemeManager {
  constructor() {
    this.currentTheme = this.getInitialTheme()
    this.themeToggle = document.getElementById("themeToggle")
    this.init()
  }

  getInitialTheme() {
    // Check localStorage first
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) return savedTheme

    // Check system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light"
    }

    return "dark"
  }

  init() {
    this.setTheme(this.currentTheme)
    this.themeToggle.addEventListener("click", () => this.toggleTheme())

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          this.setTheme(e.matches ? "dark" : "light")
        }
      })
    }

    this.updateToggleButton()
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
    this.currentTheme = theme
    this.updateToggleButton()

    // Add smooth transition
    document.body.style.transition = "background-color 0.3s ease, color 0.3s ease"

    // Announce theme change for screen readers
    this.announceThemeChange(theme)
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "dark" ? "light" : "dark"
    this.setTheme(newTheme)

    // Add a subtle animation to the toggle button
    this.themeToggle.style.transform = "scale(0.95)"
    setTimeout(() => {
      this.themeToggle.style.transform = ""
    }, 150)
  }

  updateToggleButton() {
    const icon = this.themeToggle.querySelector(".theme-icon")
    const newIcon = this.currentTheme === "dark" ? "☀️" : "🌙"
    const newLabel = `Switch to ${this.currentTheme === "dark" ? "light" : "dark"} mode`

    icon.textContent = newIcon
    this.themeToggle.setAttribute("aria-label", newLabel)
    this.themeToggle.setAttribute("data-tooltip", newLabel)
  }

  announceThemeChange(theme) {
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", "polite")
    announcement.setAttribute("aria-atomic", "true")
    announcement.className = "sr-only"
    announcement.textContent = `Switched to ${theme} mode`
    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }
}

// Enhanced Interactive Effects
class EffectsManager {
  constructor() {
    this.init()
  }

  init() {
    this.setupScrollAnimations()
    this.setupTerminalEffects()
    this.setupHoverEffects()
    this.setupKonamiCode()
    this.setupTooltips()
  }

  setupScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    }, observerOptions)

    // Observe all sections
    document.querySelectorAll(".section").forEach((section) => {
      section.style.opacity = "0"
      section.style.transform = "translateY(20px)"
      section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(section)
    })
  }

  setupTerminalEffects() {
    const terminalCommands = document.querySelectorAll(".terminal-command")

    terminalCommands.forEach((cmd) => {
      const originalText = cmd.textContent
      let isTyping = false

      cmd.addEventListener("mouseenter", () => {
        if (isTyping) return

        isTyping = true
        cmd.textContent = ""
        let i = 0

        const typeInterval = setInterval(() => {
          if (i < originalText.length) {
            cmd.textContent += originalText.charAt(i)
            i++
          } else {
            clearInterval(typeInterval)
            isTyping = false
          }
        }, 30)
      })

      // Reset on mouse leave
      cmd.addEventListener("mouseleave", () => {
        if (!isTyping) {
          cmd.textContent = originalText
        }
      })
    })
  }

  setupHoverEffects() {
    // Add subtle hover effects to cards
    const cards = document.querySelectorAll(".work-card, .project-card")

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transition = "all 0.2s ease"
      })

      card.addEventListener("mouseleave", () => {
        card.style.transition = "all 0.3s ease"
      })
    })
  }

  setupKonamiCode() {
    let konamiCode = []
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65] // ↑↑↓↓←→←→BA

    document.addEventListener("keydown", (e) => {
      konamiCode.push(e.keyCode)
      if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift()
      }

      if (
        konamiCode.length === konamiSequence.length &&
        konamiCode.every((code, index) => code === konamiSequence[index])
      ) {
        this.activateKonamiCode()
        konamiCode = []
      }
    })
  }

  activateKonamiCode() {
    // Create a fun animation
    const body = document.body
    const originalFilter = body.style.filter

    body.style.filter = "hue-rotate(180deg) saturate(2)"
    body.style.transition = "filter 0.5s ease"

    // Show a fun message
    this.showNotification("🎮 Konami Code activated! You found the secret! 🎉", "success")

    setTimeout(() => {
      body.style.filter = originalFilter
    }, 3000)
  }

  setupTooltips() {
    // Enhanced tooltip positioning for mobile
    const tooltipElements = document.querySelectorAll("[data-tooltip]")

    tooltipElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        // Add a small delay for better UX
        setTimeout(() => {
          element.classList.add("tooltip-active")
        }, 200)
      })

      element.addEventListener("mouseleave", () => {
        element.classList.remove("tooltip-active")
      })
    })
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--accent-primary);
      color: var(--bg-primary);
      padding: 16px 24px;
      border-radius: var(--border-radius-sm);
      font-weight: 600;
      z-index: 1000;
      box-shadow: 6px 6px 0 var(--shadow-color);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Remove after delay
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }, 4000)
  }
}

// Utility Functions
function downloadResume() {
  // Show a more engaging message
  const effectsManager = new EffectsManager()
  effectsManager.showNotification("📄 Resume download would start here! This is just a demo for now.", "info")

  // In production, replace with:
  // window.open('/path/to/robert-rompf-resume.pdf', '_blank')
}

// Performance and Analytics
class PerformanceMonitor {
  constructor() {
    this.init()
  }

  init() {
    this.logPageLoad()
    this.setupErrorHandling()
  }

  logPageLoad() {
    window.addEventListener("load", () => {
      const loadTime = performance.now()
      console.log(`🚀 Portfolio loaded in ${Math.round(loadTime)}ms`)

      // Log Core Web Vitals if available
      if ("web-vital" in window) {
        this.logWebVitals()
      }
    })
  }

  setupErrorHandling() {
    window.addEventListener("error", (e) => {
      console.error("Portfolio Error:", e.error)
    })
  }

  logWebVitals() {
    // This would integrate with real analytics in production
    console.log("📊 Core Web Vitals tracking initialized")
  }
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  // Initialize core managers
  const themeManager = new ThemeManager()
  const effectsManager = new EffectsManager()
  const performanceMonitor = new PerformanceMonitor()

  // Add loading animation
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)

  // Log initialization
  console.log("🎯 Robert's Portfolio initialized successfully!")
  console.log("💡 Try the Konami code: ↑↑↓↓←→←→BA")
  console.log("🎨 Theme system ready with system preference detection")
})

// Export for potential module use
if (typeof module !== "undefined" && module.exports) {
  module.exports = { ThemeManager, EffectsManager, PerformanceMonitor }
}
