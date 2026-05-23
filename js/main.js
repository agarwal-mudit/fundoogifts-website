document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactForm.reset();
      if (formSuccess) {
        formSuccess.style.display = 'block';
        setTimeout(function () {
          formSuccess.style.display = 'none';
        }, 4000);
      }
    });
  }
});
