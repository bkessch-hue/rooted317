(function () {
"use strict";

const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");
const animatedElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right"
);
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const currentYear = document.getElementById("currentYear");

// Smooth scroll with easing
function smoothScroll(target, duration = 800) {
  const targetElement = document.querySelector(target);
  if (!targetElement) return;
  
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 85;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Add smooth scroll to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      smoothScroll(href);
    }
  });
});

// Parallax effect for hero section
function handleParallax() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero && scrolled < window.innerHeight) {
    const heroContent = hero.querySelector('.hero-content');
    const heroShapeOne = hero.querySelector('.hero-shape-one');
    const heroShapeTwo = hero.querySelector('.hero-shape-two');
    
    if (heroContent) heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    if (heroShapeOne) heroShapeOne.style.transform = `rotate(${scrolled * 0.05}deg)`;
    if (heroShapeTwo) heroShapeTwo.style.transform = `translateY(${Math.sin(scrolled * 0.005) * 25}px)`;
  }
}

// Change the navigation appearance after scrolling.
function updateHeader() {
  if (!header) return;
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

// Typing effect for hero text
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Counter animation for experience card
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + '+';
    }
  }, 16);
}

// Magnetic button effect
function addMagneticEffect(buttons) {
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });
}

// Tilt effect for cards
function addTiltEffect(cards) {
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// Ripple effect for buttons
function addRippleEffect(buttons) {
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// Add ripple keyframe animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Scroll progress indicator
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--primary-dark));
    z-index: 10000;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// Reveal elements on scroll with staggered animation
const observerOptions = {
  root: null,
  threshold: 0.12,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    
    const delay = entry.target.dataset.delay || 0;
    setTimeout(() => {
      entry.target.classList.add("visible");
    }, delay);
    
    observer.unobserve(entry.target);
  });
}, observerOptions);

animatedElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 3, 2) * 100}ms`;
  revealObserver.observe(element);
});

// Add data-delay attributes for staggered animations
document.querySelectorAll('.service-card, .ministry-card, .sermon-card, .event-item, .purpose-card').forEach((el, i) => {
  el.setAttribute('data-delay', (i % 3) * 150);
});

// Form submission
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName = document.getElementById("firstName");
    const firstNameValue = firstName ? firstName.value.trim() : "";

    // Add success animation
    contactForm.style.animation = 'shake 0.5s ease';
    setTimeout(() => contactForm.style.animation = '', 500);

    if (formMessage) {
      formMessage.textContent =
        `Thank you${firstNameValue ? `, ${firstNameValue}` : ""}. ` +
        "Your message has been received.";
      formMessage.style.color = "#38745b";
    }

    contactForm.reset();
  });
}

// Add shake animation for form
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);

// Open and close the mobile navigation.
function toggleMenu() {
  const isOpen = navMenu.classList.toggle("active");
  
  menuButton.classList.toggle("active", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
  
  // Animate menu items
  if (isOpen) {
    const menuItems = navMenu.querySelectorAll('a');
    menuItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      setTimeout(() => {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }
}

if (menuButton && navMenu) {
  menuButton.addEventListener("click", toggleMenu);

  // Close the mobile menu after selecting a link.
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuButton.classList.remove("active");
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

// Custom cursor effect (pointer devices only — pointless and wasteful on touch)
function addCustomCursor() {
  if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return;
  }
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid var(--primary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease, opacity 0.3s ease;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);
  
  const cursorDot = document.createElement('div');
  cursorDot.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    background: var(--primary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.05s ease;
  `;
  document.body.appendChild(cursorDot);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursorDot.style.left = e.clientX - 3 + 'px';
    cursorDot.style.top = e.clientY - 3 + 'px';
  });
  
  // Scale cursor on hover
  document.querySelectorAll('a, button, .service-card, .ministry-card, .sermon-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.8)';
      cursor.style.opacity = '0.5';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.opacity = '1';
    });
  });
}

// Smooth reveal for images
function addImageReveal() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.8s ease';
    
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    }
  });
}

// Animate numbers in experience card
function initCounterAnimation() {
  const experienceCard = document.querySelector('.experience-card strong');
  if (experienceCard) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(experienceCard, 25, 1500);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(experienceCard);
  }
}

// Add floating particles background
function addFloatingParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  const particlesContainer = document.createElement('div');
  particlesContainer.style.cssText = `
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 1;
  `;
  hero.appendChild(particlesContainer);
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(185, 133, 69, ${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
    `;
    particlesContainer.appendChild(particle);
  }
  
  const particleStyle = document.createElement('style');
  particleStyle.textContent = `
    @keyframes float-particle {
      0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) rotate(720deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(particleStyle);
}

// Initialize all features
function init() {
  // Core functionality
  window.addEventListener("scroll", updateHeader);
  window.addEventListener("scroll", handleParallax);
  updateHeader();
  
  // Visual enhancements
  createScrollProgress();
  addFloatingParticles();
  addCustomCursor();
  addImageReveal();
  initCounterAnimation();
  
  // Interactive effects
  addMagneticEffect(document.querySelectorAll('.button, .nav-button'));
  addTiltEffect(document.querySelectorAll('.service-card, .ministry-card, .purpose-card'));
  addRippleEffect(document.querySelectorAll('.button, .nav-button, .play-button'));
  
  // Giving widget
  initializeGivingWidget();
  
  // Set current year
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
}

// Giving widget functionality
function initializeGivingWidget() {
  const givingMethods = document.querySelectorAll("[data-giving-method]");
  const givingPanels = document.querySelectorAll("[data-giving-panel]");
  const givingAmounts = document.querySelectorAll(".giving-amount");
  const givingCustom = document.getElementById("givingCustom");
  const givingCustomAmount = document.getElementById("givingCustomAmount");
  const givingFrequencies = document.querySelectorAll(".giving-frequency-option");
  const givingCardForm = document.getElementById("givingCardForm");
  const givingMessage = document.getElementById("givingMessage");

  let selectedAmount = 25;

  // Switch between payment methods
  givingMethods.forEach((method) => {
    method.addEventListener("click", () => {
      givingMethods.forEach((m) => m.classList.remove("is-active"));
      method.classList.add("is-active");

      const target = method.dataset.givingMethod;

      givingPanels.forEach((panel) => {
        panel.hidden = panel.dataset.givingPanel !== target;
      });
    });
  });

  // Select quick amount
  givingAmounts.forEach((amount) => {
    amount.addEventListener("click", () => {
      givingAmounts.forEach((a) => a.classList.remove("is-active"));
      amount.classList.add("is-active");

      if (amount.dataset.custom !== undefined) {
        if (givingCustom) givingCustom.classList.remove("hidden");
        if (givingCustomAmount) givingCustomAmount.focus();
        return;
      }

      if (givingCustom) givingCustom.classList.add("hidden");
      selectedAmount = Number(amount.dataset.amount);
    });
  });

  // Handle custom amount input
  if (givingCustomAmount) {
    givingCustomAmount.addEventListener("input", () => {
      selectedAmount = Number(givingCustomAmount.value) || 0;
    });
  }

  // Gift frequency selection
  givingFrequencies.forEach((option) => {
    option.addEventListener("click", () => {
      givingFrequencies.forEach((o) => o.classList.remove("is-active"));
      option.classList.add("is-active");
    });
  });

  // Format card number input
  const cardNumber = document.getElementById("givingCardNumber");
  if (cardNumber) {
    cardNumber.addEventListener("input", () => {
      let value = cardNumber.value.replace(/\D/g, "").slice(0, 16);
      cardNumber.value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    });
  }

  // Format expiry input
  const expiry = document.getElementById("givingExpiry");
  if (expiry) {
    expiry.addEventListener("input", () => {
      let value = expiry.value.replace(/\D/g, "").slice(0, 4);
      if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
      }
      expiry.value = value;
    });
  }

  // Limit CVC to 4 digits
  const cvc = document.getElementById("givingCvc");
  if (cvc) {
    cvc.addEventListener("input", () => {
      cvc.value = cvc.value.replace(/\D/g, "").slice(0, 4);
    });
  }

  // Handle card form submission
  if (givingCardForm) {
    givingCardForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("givingEmail");
      const name = document.getElementById("givingName");

      if (
        selectedAmount <= 0 ||
        !name.value.trim() ||
        !cardNumber.value.trim() ||
        !expiry.value.trim() ||
        !cvc.value.trim() ||
        !email.value.trim()
      ) {
        if (givingMessage) {
          givingMessage.textContent = "Please complete all required fields.";
          givingMessage.style.color = "#c0392b";
        }
        return;
      }

      const frequency = document.querySelector(".giving-frequency-option.is-active")?.dataset.frequency || "once";

      if (givingMessage) {
        const person = name.value.trim();
        givingMessage.textContent = `Thank you, ${person}! Your $${selectedAmount} ${frequency === "monthly" ? "monthly " : ""}gift has been received. A receipt will be emailed to you.`;
        givingMessage.style.color = "#38745b";
      }

      givingCardForm.reset();
      givingAmounts.forEach((a) => a.classList.remove("is-active"));
      givingFrequencies.forEach((o) => o.classList.remove("is-active"));
      givingFrequencies[0].classList.add("is-active");
      if (givingCustom) givingCustom.classList.add("hidden");
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ROOTED317 cinematic purpose experience
const purposeSection = document.querySelector(".rooted-purpose");
const purposeSlides = Array.from(
  document.querySelectorAll("[data-purpose-slide]")
);

const purposeProgress = document.getElementById("purposeProgress");
const purposePrevious = document.getElementById("purposePrevious");
const purposeNext = document.getElementById("purposeNext");
const purposeStartButton = document.getElementById(
  "purposeStartButton"
);

const purposeCurrentNumber = document.getElementById(
  "purposeCurrentNumber"
);

const purposeTotalNumber = document.getElementById(
  "purposeTotalNumber"
);

let purposeActiveIndex = 0;
let purposeIsAnimating = false;
let purposeWheelCooldown = false;
let purposeTouchStartX = 0;
let purposeTouchStartY = 0;

const purposeSlideCount = purposeSlides.length;

// Add leading zero to slide numbers.
function formatPurposeNumber(number) {
  return String(number).padStart(2, "0");
}

// Create progress buttons from the slide data.
function createPurposeProgress() {
  if (!purposeProgress) return;

  purposeSlides.forEach((slide, index) => {
    const label = slide.dataset.label || `Section ${index + 1}`;

    const button = document.createElement("button");

    button.type = "button";
    button.className = "rooted-purpose__progress-button";
    button.setAttribute(
      "aria-label",
      `View ${label}: section ${index + 1} of ${purposeSlideCount}`
    );

    button.innerHTML = `
      <span class="rooted-purpose__progress-label">
        ${label}
      </span>

      <span
        class="rooted-purpose__progress-dot"
        aria-hidden="true"
      ></span>
    `;

    button.addEventListener("click", () => {
      showPurposeSlide(index);
    });

    purposeProgress.appendChild(button);
  });
}

// Display a selected purpose slide.
function showPurposeSlide(newIndex) {
  if (
    purposeIsAnimating ||
    newIndex === purposeActiveIndex ||
    newIndex < 0 ||
    newIndex >= purposeSlideCount
  ) {
    return;
  }

  purposeIsAnimating = true;

  purposeSlides.forEach((slide, index) => {
    const isActive = index === newIndex;

    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  purposeActiveIndex = newIndex;

  updatePurposeInterface();

  window.setTimeout(() => {
    purposeIsAnimating = false;
  }, 950);
}

// Update the counter, progress buttons, and controls.
function updatePurposeInterface() {
  const progressButtons = document.querySelectorAll(
    ".rooted-purpose__progress-button"
  );

  progressButtons.forEach((button, index) => {
    const isActive = index === purposeActiveIndex;

    button.classList.toggle("is-active", isActive);

    if (isActive) {
      button.setAttribute("aria-current", "step");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  if (purposeCurrentNumber) {
    purposeCurrentNumber.textContent = formatPurposeNumber(
      purposeActiveIndex + 1
    );
  }

  if (purposeTotalNumber) {
    purposeTotalNumber.textContent =
      formatPurposeNumber(purposeSlideCount);
  }

  if (purposePrevious) {
    purposePrevious.disabled = purposeActiveIndex === 0;
  }

  if (purposeNext) {
    purposeNext.disabled =
      purposeActiveIndex === purposeSlideCount - 1;
  }
}

// Move forward one slide.
function showNextPurpose() {
  if (purposeActiveIndex < purposeSlideCount - 1) {
    showPurposeSlide(purposeActiveIndex + 1);
  }
}

// Move backward one slide.
function showPreviousPurpose() {
  if (purposeActiveIndex > 0) {
    showPurposeSlide(purposeActiveIndex - 1);
  }
}

// Check whether the purpose section is mostly visible.
function isPurposeSectionVisible() {
  if (!purposeSection) return false;

  const rectangle = purposeSection.getBoundingClientRect();

  return (
    rectangle.top < window.innerHeight * 0.4 &&
    rectangle.bottom > window.innerHeight * 0.6
  );
}

// Control slides with the mouse wheel.
function handlePurposeWheel(event) {
  if (!isPurposeSectionVisible() || purposeWheelCooldown) return;

  const movingDown = event.deltaY > 20;
  const movingUp = event.deltaY < -20;

  const isFirstSlide = purposeActiveIndex === 0;
  const isLastSlide =
    purposeActiveIndex === purposeSlideCount - 1;

  if (
    (movingUp && isFirstSlide) ||
    (movingDown && isLastSlide)
  ) {
    return;
  }

  if (!movingDown && !movingUp) return;

  event.preventDefault();

  purposeWheelCooldown = true;

  if (movingDown) {
    showNextPurpose();
  } else {
    showPreviousPurpose();
  }

  window.setTimeout(() => {
    purposeWheelCooldown = false;
  }, 1050);
}

// Control slides with the keyboard.
function handlePurposeKeyboard(event) {
  if (!isPurposeSectionVisible()) return;

  const nextKeys = ["ArrowDown", "ArrowRight", "PageDown"];
  const previousKeys = ["ArrowUp", "ArrowLeft", "PageUp"];

  if (nextKeys.includes(event.key)) {
    if (purposeActiveIndex < purposeSlideCount - 1) {
      event.preventDefault();
      showNextPurpose();
    }
  }

  if (previousKeys.includes(event.key)) {
    if (purposeActiveIndex > 0) {
      event.preventDefault();
      showPreviousPurpose();
    }
  }

  if (event.key === "Home") {
    event.preventDefault();
    showPurposeSlide(0);
  }

  if (event.key === "End") {
    event.preventDefault();
    showPurposeSlide(purposeSlideCount - 1);
  }
}

// Record the beginning of a mobile swipe.
function handlePurposeTouchStart(event) {
  const touch = event.changedTouches[0];

  purposeTouchStartX = touch.clientX;
  purposeTouchStartY = touch.clientY;
}

// Respond to mobile swipe gestures.
function handlePurposeTouchEnd(event) {
  const touch = event.changedTouches[0];

  const horizontalDistance =
    touch.clientX - purposeTouchStartX;

  const verticalDistance =
    touch.clientY - purposeTouchStartY;

  const minimumSwipeDistance = 55;

  if (
    Math.abs(horizontalDistance) <
      Math.abs(verticalDistance) ||
    Math.abs(horizontalDistance) < minimumSwipeDistance
  ) {
    return;
  }

  if (horizontalDistance < 0) {
    showNextPurpose();
  } else {
    showPreviousPurpose();
  }
}

// Pause the video when the section is not visible.
function managePurposeVideo() {
  const video = purposeSection?.querySelector(
    ".rooted-purpose__video"
  );

  if (!video || !("IntersectionObserver" in window)) return;

  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    {
      threshold: 0.25
    }
  );

  videoObserver.observe(purposeSection);
}

// Initialize the interactive purpose experience.
function initializePurposeExperience() {
  if (!purposeSection || purposeSlides.length === 0) return;

  createPurposeProgress();
  updatePurposeInterface();
  managePurposeVideo();

  purposeNext?.addEventListener("click", showNextPurpose);
  purposePrevious?.addEventListener("click", showPreviousPurpose);
  purposeStartButton?.addEventListener("click", showNextPurpose);

  purposeSection.addEventListener("wheel", handlePurposeWheel, {
    passive: false
  });

  purposeSection.addEventListener(
    "touchstart",
    handlePurposeTouchStart,
    {
      passive: true
    }
  );

  purposeSection.addEventListener(
    "touchend",
    handlePurposeTouchEnd,
    {
      passive: true
    }
  );

  document.addEventListener("keydown", handlePurposeKeyboard);
}

initializePurposeExperience();

})();
