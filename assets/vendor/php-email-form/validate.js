/**
* Contact Form Validation for BESTOW IT SERVICES
* Web3Forms-compatible submission handler
*/
(function () {
  "use strict";

  const forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const action = form.getAttribute('action');
      if (!action) {
        displayError(form, 'The form action property is not set.');
        return;
      }

      const loading = form.querySelector('.loading');
      const errorBox = form.querySelector('.error-message');
      const sentBox = form.querySelector('.sent-message');

      loading.classList.add('d-block');
      errorBox.classList.remove('d-block');
      sentBox.classList.remove('d-block');
      errorBox.textContent = '';

      const formData = new FormData(form);

      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(async function (response) {
        let data = {};
        const text = await response.text();

        try {
          data = text ? JSON.parse(text) : {};
        } catch (e) {
          data = { success: false, message: text };
        }

        loading.classList.remove('d-block');

        // Web3Forms returns success:true with a JSON response.
        // Treat that as a successful submission even when the message
        // contains additional response data.
        if (response.ok && data.success === true) {
          sentBox.textContent = data.message || 'Your enquiry has been sent successfully. Thank you!';
          sentBox.classList.add('d-block');
          form.reset();
          return;
        }

        throw new Error(data.message || text || 'Form submission failed. Please try again.');
      })
      .catch(function (error) {
        displayError(form, error.message || error);
      });
    });
  });

  function displayError(form, error) {
    const loading = form.querySelector('.loading');
    const errorBox = form.querySelector('.error-message');
    loading.classList.remove('d-block');
    errorBox.textContent = error;
    errorBox.classList.add('d-block');
  }
})();
