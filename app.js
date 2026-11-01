/**
 * Dr. Naureen Sarwar — Oral & Dental Surgeon, Lahore
 * World-Class UI/UX & Interactive Animation Controller
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. DYNAMIC COPYRIGHT YEAR
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. TOAST NOTIFICATION ENGINE
  const toastContainer = document.getElementById('toast');
  function showToast(message, duration = 4000) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style="color:var(--color-mint-accent); flex-shrink:0;">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto dismiss
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, duration);
  }

  // 3. STICKY GLASSMORPHIC HEADER CONTROLLER
  const siteHeader = document.getElementById('site-header');
  const handleScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 4. ACCESSIBLE SCROLLSPY
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function updateScrollspy() {
    const scrollPos = window.scrollY + 140;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateScrollspy, { passive: true });
  updateScrollspy();

  // 5. MOBILE DRAWER NAVIGATION
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  function toggleMobileMenu(isOpen) {
    if (!mobileMenu || !mobileMenuBtn) return;
    const shouldOpen = typeof isOpen === 'boolean' ? isOpen : !mobileMenu.classList.contains('open');
    if (shouldOpen) {
      mobileMenu.classList.add('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      if (hamburgerIcon) hamburgerIcon.classList.add('hidden');
      if (closeIcon) closeIcon.classList.remove('hidden');
    } else {
      mobileMenu.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      toggleMobileMenu(false);
    }
  });

  // 6. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  const revealElements = document.querySelectorAll('.reveal-fade-up');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is unsupported
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 7. FAQ ACCORDION CONTROLLER
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            const otherTrigger = otherItem.querySelector('.faq-trigger');
            const otherContent = otherItem.querySelector('.faq-content');
            if (otherTrigger && otherContent) {
              otherTrigger.setAttribute('aria-expanded', 'false');
              otherContent.style.maxHeight = '0px';
              otherContent.style.opacity = '0';
            }
          }
        });

        // Toggle clicked item
        if (isExpanded) {
          trigger.setAttribute('aria-expanded', 'false');
          content.style.maxHeight = '0px';
          content.style.opacity = '0';
        } else {
          trigger.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = (content.scrollHeight + 40) + 'px';
          content.style.opacity = '1';
        }
      });
    }
  });

  // 8. TIME SLOT SELECTION CONTROLLER
  const slotButtons = document.querySelectorAll('.time-slot-pill');
  let selectedSlot = 'Any Time (First Available)';

  slotButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      slotButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSlot = btn.getAttribute('data-slot') || 'Any Time (First Available)';
    });
  });

  // 9. WHATSAPP APPOINTMENT FORM CONTROLLER (BULLETPROOF & TESTED)
  const form = document.getElementById('appointment-form');
  const nameInput = document.getElementById('form-name');
  const phoneInput = document.getElementById('form-phone');
  const emailInput = document.getElementById('form-email');
  const topicSelect = document.getElementById('form-topic');
  const messageInput = document.getElementById('form-message');

  const errorName = document.getElementById('error-name');
  const errorPhone = document.getElementById('error-phone');
  const errorEmail = document.getElementById('error-email');
  const errorMessage = document.getElementById('error-message');

  const successBanner = document.getElementById('form-success-banner');
  const fallbackLink = document.getElementById('fallback-whatsapp-link');

  // Clear validation styling upon user typing
  [nameInput, phoneInput, emailInput, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      input.classList.remove('is-invalid');
      const err = document.getElementById(`error-${input.name}`);
      if (err) {
        err.classList.add('hidden');
        err.textContent = '';
      }
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // 1. Validate Full Name
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        isValid = false;
        if (nameInput) nameInput.classList.add('is-invalid');
        if (errorName) {
          errorName.textContent = 'Please enter your full name.';
          errorName.classList.remove('hidden');
        }
      } else {
        if (nameInput) nameInput.classList.remove('is-invalid');
        if (errorName) errorName.classList.add('hidden');
      }

      // 2. Validate Phone
      const phoneRaw = phoneInput ? phoneInput.value.trim() : '';
      const phoneDigits = phoneRaw.replace(/\D/g, '');
      if (!phoneDigits || phoneDigits.length < 9) {
        isValid = false;
        if (phoneInput) phoneInput.classList.add('is-invalid');
        if (errorPhone) {
          errorPhone.textContent = 'Please enter a valid phone number (e.g. 0300 1234567).';
          errorPhone.classList.remove('hidden');
        }
      } else {
        if (phoneInput) phoneInput.classList.remove('is-invalid');
        if (errorPhone) errorPhone.classList.add('hidden');
      }

      // 3. Validate Email (Optional)
      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailVal)) {
        isValid = false;
        if (emailInput) emailInput.classList.add('is-invalid');
        if (errorEmail) {
          errorEmail.textContent = 'Please check the email format.';
          errorEmail.classList.remove('hidden');
        }
      } else {
        if (emailInput) emailInput.classList.remove('is-invalid');
        if (errorEmail) errorEmail.classList.add('hidden');
      }

      // 4. Validate Message
      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal || messageVal.length < 5) {
        isValid = false;
        if (messageInput) messageInput.classList.add('is-invalid');
        if (errorMessage) {
          errorMessage.textContent = 'Please add a brief description of what you need.';
          errorMessage.classList.remove('hidden');
        }
      } else {
        if (messageInput) messageInput.classList.remove('is-invalid');
        if (errorMessage) errorMessage.classList.add('hidden');
      }

      if (!isValid) {
        showToast('Please check the required form fields.');
        return;
      }

      // 5. Structure Formatted WhatsApp Text
      const selectedTopic = topicSelect ? topicSelect.value : 'General enquiry';
      const messageLines = [
        `Hello Dr. Naureen Sarwar! I would like to request an appointment.`,
        ``,
        `• Name: ${nameVal}`,
        `• Phone: ${phoneRaw}`,
        emailVal ? `• Email: ${emailVal}` : null,
        `• Regarding: ${selectedTopic}`,
        `• Preferred Timing: ${selectedSlot}`,
        ``,
        `Details / Message:`,
        messageVal
      ].filter(Boolean);

      const fullMessageText = messageLines.join('\n');
      const whatsappUrl = `https://wa.me/923318141594?text=${encodeURIComponent(fullMessageText)}`;

      // 6. Update Fallback Link & Show Banner
      if (fallbackLink) {
        fallbackLink.href = whatsappUrl;
      }
      if (successBanner) {
        successBanner.classList.remove('hidden');
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // 7. Open WhatsApp in New Window/Tab
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      showToast('Opening WhatsApp with your appointment request...');
    });
  }

  // 10. PRACTICE CERTIFICATE MODAL
  const certModal = document.getElementById('cert-modal');
  const openCertBtn = document.getElementById('open-cert-btn');
  const closeCertBtn = document.getElementById('close-cert-btn');
  const closeCertSubBtn = document.getElementById('close-cert-sub-btn');

  function openModal() {
    if (certModal) certModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (certModal) certModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (openCertBtn) openCertBtn.addEventListener('click', openModal);
  if (closeCertBtn) closeCertBtn.addEventListener('click', closeModal);
  if (closeCertSubBtn) closeCertSubBtn.addEventListener('click', closeModal);

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      toggleMobileMenu(false);
    }
  });

});
