class TypeWriter {
  constructor(el, words) {
    this.el = el;
    this.words = words;
    this.wordIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    const current = this.words[this.wordIndex];
    this.el.textContent = this.isDeleting
      ? current.substring(0, this.charIndex--)
      : current.substring(0, this.charIndex++);

    if (!this.isDeleting && this.charIndex === current.length) {
      this.isDeleting = true;
      setTimeout(() => this.type(), 1200);
      return;
    }
    if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
    }

    setTimeout(() => this.type(), this.isDeleting ? 50 : 100);
  }
}

// Mobile Menu Toggle
class MobileMenu {
  constructor() {
    this.hamburger = document.querySelector('.hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    
    this.init();
  }

  init() {
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMenu());
    }
    
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
  }

  toggleMenu() {
    this.navMenu.classList.toggle('active');
    this.hamburger.classList.toggle('active');
  }

  closeMenu() {
    this.navMenu.classList.remove('active');
    this.hamburger.classList.remove('active');
  }
}

// Smooth Scrolling
class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.init();
  }

  init() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => this.handleClick(e));
    });
  }

  handleClick(e) {
    const href = e.currentTarget.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80; // Navbar height
      const targetPosition = target.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
}

// Navbar scroll effect
class NavbarScroll {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.lastScroll = 0;
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      this.navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      this.navbar.style.boxShadow = 'var(--shadow-sm)';
    }
    
    this.lastScroll = currentScroll;
  }
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  // TypeWriter
  new TypeWriter(document.querySelector(".typing-text"), [
    "Full Stack Developer",
    "MERN & PHP Developer",
    "Problem Solver",
    "Team Leader"
  ]);

  // Mobile Menu
  new MobileMenu();
  
  // Smooth Scrolling
  new SmoothScroll();
  
  // Navbar Scroll Effect
  new NavbarScroll();

  // Add animation classes on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.story-card, .skill-category, .project-card, .timeline-content, .patent-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});