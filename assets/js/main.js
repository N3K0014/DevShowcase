document.addEventListener('DOMContentLoaded', function () {
  const openEmailModalButton = document.getElementById('openEmailModal');
  const emailModal = document.getElementById('emailModal');
  const emailForm = document.getElementById('emailForm');
  const backToTopButton = document.querySelector('.back-to-top');

  if (!openEmailModalButton || !emailModal || !emailForm) return;

  const bootstrapModal = new bootstrap.Modal(emailModal);

  openEmailModalButton.addEventListener('click', function () {
    bootstrapModal.show();
  });

  if (backToTopButton) {
    const toggleBackToTop = function () {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    };

    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop);
  }

  emailForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const senderEmail = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const recipient = 'memije.maverayner@gmail.com';

    if (!name || !senderEmail || !message) return;

    const subject = encodeURIComponent('Message from your website');
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${senderEmail}\n\n${message}`
    );

    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

    try {
      window.location.href = mailtoLink;
      bootstrapModal.hide();
    } catch (err) {
      console.error(err);
      alert('Unable to open your email app right now.');
    }
  });
});
