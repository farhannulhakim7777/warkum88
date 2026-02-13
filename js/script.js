/* ========================================
   WARUNG KUMPUL 88 - JAVASCRIPT
   Interactive Features & Animations
   ======================================== */

// ========================================
// LOADING ANIMATION
// ========================================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader')
  setTimeout(() => {
    loader.classList.add('hidden')
  }, 1500)
})

// ========================================
// DARK MODE TOGGLE
// ========================================
const themeToggle = document.getElementById('themeToggle')
const body = document.body

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light'
if (currentTheme === 'dark') {
  body.classList.add('dark-mode')
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode')

  // Save theme preference
  const theme = body.classList.contains('dark-mode') ? 'dark' : 'light'
  localStorage.setItem('theme', theme)

  // Add rotation animation
  themeToggle.style.transform = 'rotate(360deg)'
  setTimeout(() => {
    themeToggle.style.transform = 'rotate(0deg)'
  }, 300)
})

// ========================================
// STICKY NAVBAR
// ========================================
const navbar = document.getElementById('navbar')
let lastScrollTop = 0

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  // Add scrolled class for styling
  if (scrollTop > 50) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }

  lastScrollTop = scrollTop
})

// ========================================
// MOBILE HAMBURGER MENU
// ========================================
const hamburger = document.getElementById('hamburger')
const navMenu = document.getElementById('navMenu')
const navLinks = document.querySelectorAll('.nav-link')

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active')
  navMenu.classList.toggle('active')
})

// Close menu when clicking on nav links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active')
    navMenu.classList.remove('active')
  })
})

// Close menu when clicking outside
document.addEventListener('click', e => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove('active')
    navMenu.classList.remove('active')
  }
})

// ========================================
// SMOOTH SCROLLING NAVIGATION
// ========================================
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault()

    const targetId = link.getAttribute('href')
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })

      // Update active nav link
      navLinks.forEach(l => l.classList.remove('active'))
      link.classList.add('active')
    }
  })
})

// Update active nav link on scroll
window.addEventListener('scroll', () => {
  let current = ''
  const sections = document.querySelectorAll('.section, .hero')

  sections.forEach(section => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id')
    }
  })

  navLinks.forEach(link => {
    link.classList.remove('active')
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active')
    }
  })
})

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================
const revealElements = document.querySelectorAll('.reveal')

const revealOnScroll = () => {
  const windowHeight = window.innerHeight
  const revealPoint = 100

  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('active')
    }
  })
}

// Initial check
revealOnScroll()

// Check on scroll
window.addEventListener('scroll', revealOnScroll)

// Use Intersection Observer for better performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active')
    }
  })
}, observerOptions)

revealElements.forEach(element => {
  observer.observe(element)
})

// menu filter ye
const categoryButtons = document.querySelectorAll('.category-btn')
const menuCards = document.querySelectorAll('.menu-card')

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category')

    // Update active button
    categoryButtons.forEach(btn => btn.classList.remove('active'))
    button.classList.add('active')

    // Filter menu cards with animation
    menuCards.forEach((card, index) => {
      const cardCategories = card.getAttribute('data-category')

      if (category === 'all' || cardCategories.includes(category)) {
        // Show card with stagger animation
        setTimeout(() => {
          card.classList.remove('hidden')
          card.style.animation = 'fadeInUp 0.5s ease forwards'
        }, index * 50)
      } else {
        // Hide card
        card.classList.add('hidden')
      }
    })
  })
})

// ========================================
// TESTIMONIAL SLIDER
// ========================================
const testimonialsContainer = document.getElementById('testimonialsContainer')
const testimonialCards = document.querySelectorAll('.testimonial-card')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
const sliderDots = document.getElementById('sliderDots')

let currentSlide = 0
const totalSlides = Math.ceil(testimonialCards.length / getSlidesPerView())
let autoSlideInterval

// Get number of slides per view based on screen size
function getSlidesPerView () {
  if (window.innerWidth <= 768) {
    return 1
  } else if (window.innerWidth <= 1024) {
    return 2
  } else {
    return 3
  }
}

// Create dots
function createDots () {
  sliderDots.innerHTML = ''
  const slidesPerView = getSlidesPerView()
  const dotsCount = Math.ceil(testimonialCards.length / slidesPerView)

  for (let i = 0; i < dotsCount; i++) {
    const dot = document.createElement('div')
    dot.classList.add('dot')
    if (i === 0) dot.classList.add('active')
    dot.addEventListener('click', () => goToSlide(i))
    sliderDots.appendChild(dot)
  }
}

// Update dots
function updateDots () {
  const dots = document.querySelectorAll('.dot')
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide)
  })
}

// Go to specific slide
function goToSlide (slideIndex) {
  const slidesPerView = getSlidesPerView()
  const maxSlide = Math.ceil(testimonialCards.length / slidesPerView) - 1

  currentSlide = Math.max(0, Math.min(slideIndex, maxSlide))

  // Reset all cards
  testimonialCards.forEach(card => {
    card.style.display = 'block'
  })

  updateDots()
  resetAutoSlide()
}

// Next slide
function nextSlide () {
  const slidesPerView = getSlidesPerView()
  const maxSlide = Math.ceil(testimonialCards.length / slidesPerView) - 1

  currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1
  goToSlide(currentSlide)
}

// Previous slide
function prevSlide () {
  const slidesPerView = getSlidesPerView()
  const maxSlide = Math.ceil(testimonialCards.length / slidesPerView) - 1

  currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1
  goToSlide(currentSlide)
}

// Auto slide
function startAutoSlide () {
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, 5000)
}

// Reset auto slide
function resetAutoSlide () {
  clearInterval(autoSlideInterval)
  startAutoSlide()
}

// Event listeners
if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', prevSlide)
  nextBtn.addEventListener('click', nextSlide)
}

// Initialize slider
createDots()
startAutoSlide()

// Reinitialize on resize
let resizeTimeout
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    createDots()
    goToSlide(0)
  }, 250)
})

// Pause auto-slide on hover
if (testimonialsContainer) {
  testimonialsContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval)
  })

  testimonialsContainer.addEventListener('mouseleave', () => {
    startAutoSlide()
  })
}

// ========================================
// BACK TO TOP BUTTON
// ========================================
const backToTopBtn = document.getElementById('backToTop')

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('visible')
  } else {
    backToTopBtn.classList.remove('visible')
  }
})

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

// ========================================
// WHATSAPP FLOAT BUTTON ANIMATION
// ========================================
const whatsappFloat = document.getElementById('whatsappFloat')

// Pulse animation on scroll
let pulseInterval

window.addEventListener('scroll', () => {
  clearInterval(pulseInterval)

  pulseInterval = setInterval(() => {
    whatsappFloat.style.animation = 'none'
    setTimeout(() => {
      whatsappFloat.style.animation = 'pulse 1s ease'
    }, 10)
  }, 3000)
})

// ========================================
// RIPPLE EFFECT FOR BUTTONS
// ========================================
const rippleButtons = document.querySelectorAll('.ripple')

rippleButtons.forEach(button => {
  button.addEventListener('click', function (e) {
    const ripple = document.createElement('span')
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = x + 'px'
    ripple.style.top = y + 'px'
    ripple.classList.add('ripple-effect')

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple effect styles dynamically
const rippleStyle = document.createElement('style')
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`
document.head.appendChild(rippleStyle)

// ========================================
// PARALLAX EFFECT ON HERO
// ========================================
const heroSection = document.querySelector('.hero')
const heroContent = document.querySelector('.hero-content')
const shapes = document.querySelectorAll('.shape')

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset
  const heroHeight = heroSection.offsetHeight

  if (scrolled < heroHeight) {
    // Parallax for hero content
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`
      heroContent.style.opacity = 1 - (scrolled / heroHeight) * 1.5
    }

    // Parallax for shapes
    shapes.forEach((shape, index) => {
      const speed = 0.3 + index * 0.1
      shape.style.transform = `translate(${scrolled * speed}px, ${
        scrolled * speed
      }px)`
    })
  }
})

// ========================================
// LAZY LOADING IMAGES (if any images added)
// ========================================
const lazyImages = document.querySelectorAll('img[data-src]')

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      img.classList.add('loaded')
      observer.unobserve(img)
    }
  })
})

lazyImages.forEach(img => {
  imageObserver.observe(img)
})

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for performance
function debounce (func, wait) {
  let timeout
  return function executedFunction (...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for scroll events
function throttle (func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Use throttled scroll for better performance
window.addEventListener(
  'scroll',
  throttle(() => {
    // Scroll-based animations go here if needed
  }, 100)
)

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Keyboard navigation for slider
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') {
    prevSlide()
  } else if (e.key === 'ArrowRight') {
    nextSlide()
  }
})

// Focus management for mobile menu
navLinks.forEach((link, index) => {
  link.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' && navLinks[index + 1]) {
      e.preventDefault()
      navLinks[index + 1].focus()
    } else if (e.key === 'ArrowUp' && navLinks[index - 1]) {
      e.preventDefault()
      navLinks[index - 1].focus()
    }
  })
})

// ========================================
// SMOOTH ANIMATIONS ON LOAD
// ========================================
window.addEventListener('load', () => {
  // Add loaded class to body
  document.body.classList.add('loaded')

  // Trigger initial animations
  const heroElements = document.querySelectorAll('.fade-in-up')
  heroElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`
  })
})

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log(
  '%c🍟 Warung Kumpul 88 🍟',
  'font-size: 24px; font-weight: bold; color: #0066ff; text-shadow: 2px 2px 4px rgba(0,102,255,0.3);'
)
console.log(
  '%cYuk Kumpul! Tempat nongkrong asik & makan enak di Citra Raya',
  'font-size: 14px; color: #00a8ff;'
)
console.log(
  '%cWebsite by: Creative Design Team',
  'font-size: 12px; color: #64748b;'
)

// ========================================
// END OF SCRIPT
// ========================================

// modal form

document.addEventListener("DOMContentLoaded", function () {

    const openBtn = document.getElementById("openReservation");
    const modal = document.getElementById("reservationModal");
    const closeBtn = document.getElementById("closeModal");
    const form = document.getElementById("reservationForm");

    const phoneNumber = "6281280609087"; // nomor WA tanpa 0 depan

    openBtn.addEventListener("click", function () {
        modal.classList.add("active");
    });

    closeBtn.addEventListener("click", function () {
        modal.classList.remove("active");
    });

    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nama = document.getElementById("nama").value;
        const tanggal = document.getElementById("tanggal").value;
        const jam = document.getElementById("jam").value;
        const keterangan = document.getElementById("keterangan").value;

        const message = `
Halo Warung Kumpul 88 👋

Saya ingin melakukan reservasi:

Nama: ${nama}
Tanggal: ${tanggal}
Jam: ${jam}
Keterangan: ${keterangan}

Terima kasih 🙏
        `;

        const encodedMessage = encodeURIComponent(message.trim());
        const waURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(waURL, "_blank");

        modal.classList.remove("active");
        form.reset();
    });

});
document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("reservationModal");
    const closeBtn = document.getElementById("closeModal");

    /* SELECT ALL BUTTON WA */
    const openButtons = document.querySelectorAll(".open-reservation");

    openButtons.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            modal.classList.add("active");
        });
    });

    closeBtn.addEventListener("click", function () {
        modal.classList.remove("active");
    });

    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

});
