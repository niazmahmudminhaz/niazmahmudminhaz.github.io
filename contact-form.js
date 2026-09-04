(() => {
  const form = document.getElementById('seoContactForm');
  if (!form) return;

  const status = document.getElementById('formStatus');
  const submitButton = form.querySelector('button[type="submit"]');

  const setStatus = (message) => {
    if (status) status.textContent = message;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const captcha = form.querySelector('textarea[name="h-captcha-response"]');
    if (!captcha || !captcha.value) {
      setStatus('Please complete the human verification before submitting.');
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.setAttribute('aria-busy', 'true');
    }
    setStatus('Sending your SEO audit request…');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'The form could not be submitted.');
      }

      form.reset();
      if (window.hcaptcha && typeof window.hcaptcha.reset === 'function') {
        window.hcaptcha.reset();
      }
      setStatus('Your SEO audit request was sent successfully.');
    } catch (error) {
      setStatus(error?.message || 'Something went wrong while sending your request. Please try again.');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.removeAttribute('aria-busy');
      }
    }
  });
})();
