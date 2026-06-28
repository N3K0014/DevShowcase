/**
 * assets/js/main.js
 *
 * This script controls the interactive behavior on the DevShowcase page:
 * - Initializes the Bootstrap modal for the email contact form.
 * - Handles opening and closing the modal dialog.
 * - Shows or hides the back-to-top button based on scroll position.
 * - Captures form data, constructs a mailto URL, and opens the visitor's email client.
 */

document.addEventListener('DOMContentLoaded', function () {
  // Resolve DOM references once the document has loaded.
  const openEmailModalButton = document.getElementById('openEmailModal');
  const emailModal = document.getElementById('emailModal');
  const emailForm = document.getElementById('emailForm');
  const backToTopButton = document.querySelector('.back-to-top');
  const themeToggleButton = document.querySelector('.theme-toggle');
  const toggleIcon = themeToggleButton?.querySelector('i');
  const toggleLabel = themeToggleButton?.querySelector('.theme-label');

  const applyTheme = function (theme) {
    document.body.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('devshowcase-theme', theme);

    if (themeToggleButton) {
      themeToggleButton.setAttribute('aria-pressed', String(theme === 'dark'));
      if (toggleIcon) {
        toggleIcon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
      }
      if (toggleLabel) {
        toggleLabel.textContent = theme === 'dark' ? 'Light' : 'Dark';
      }
    }
  };

  const storedTheme = localStorage.getItem('devshowcase-theme');
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(storedTheme || preferredTheme);

  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', function () {
      const isDark = document.body.getAttribute('data-theme') === 'dark';
      applyTheme(isDark ? 'light' : 'dark');
    });
  }

  // Bootstrap Modal instance provides built-in show/hide methods.
  if (openEmailModalButton && emailModal && emailForm) {
    const bootstrapModal = new bootstrap.Modal(emailModal);

    // Show the email modal dialog when the email button is clicked.
    openEmailModalButton.addEventListener('click', function () {
      bootstrapModal.show();
    });

    // Handle the email form submit event by building a mailto link.
    emailForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Read and trim values from the form inputs.
      const name = document.getElementById('name').value.trim();
      const senderEmail = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const recipient = 'memije.maverayner@gmail.com';

      // If any field is missing, do nothing and keep the modal open.
      if (!name || !senderEmail || !message) return;

      // Encode values for safe inclusion in a mailto URL.
      const subject = encodeURIComponent('Message from your website');
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${senderEmail}\n\n${message}`
      );

      const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

      try {
        // Open the visitor's default email client using the mailto URL.
        window.location.href = mailtoLink;
        bootstrapModal.hide();
      } catch (err) {
        // Fallback if the email client cannot be launched from the browser.
        console.error(err);
        alert('Unable to open your email app right now.');
      }
    });
  }

  // Toggle visibility of the floating back-to-top button during scrolling.
  if (backToTopButton) {
    const toggleBackToTop = function () {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    };

    // Run once on load to account for initial scroll position.
    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop);
  }
});
