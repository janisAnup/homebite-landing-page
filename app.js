'use strict';

document.addEventListener('DOMContentLoaded', () => {
  /* ========================================
     DOM References
     The HTML form remains the entry point for
     the user, and this file becomes the client
     controller for the login flow.
  ======================================== */
  const loginForm = document.getElementById('login-form');
  const loginSubmitButton = document.getElementById('login-submit-btn');
  const statusBanner = document.getElementById('login-status');

  if (!loginForm || !loginSubmitButton || !statusBanner) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const status = params.get('status');
  const message = params.get('message');

  /* ========================================
     UI Helpers
     These keep the login page readable while
     showing server-side or client-side status.
  ======================================== */
  function showStatus(statusType, statusMessage) {
    statusBanner.textContent = statusMessage;
    statusBanner.classList.remove('hidden');
    statusBanner.setAttribute('role', statusType === 'error' ? 'alert' : 'status');

    if (statusType === 'error') {
      statusBanner.className = 'mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700';
      return;
    }

    statusBanner.className = 'mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700';
  }

  function resetSubmitButton() {
    loginSubmitButton.disabled = false;
    loginSubmitButton.setAttribute('aria-busy', 'false');
    loginSubmitButton.textContent = 'Login to Dashboard';
  }

  function setSubmitButtonLoading() {
    loginSubmitButton.disabled = true;
    loginSubmitButton.setAttribute('aria-busy', 'true');
    loginSubmitButton.textContent = 'Logging in...';
  }

  function getStatusMessageFromRedirect(targetUrl) {
    const redirectUrl = new URL(targetUrl, window.location.origin);
    return redirectUrl.searchParams.get('message') || 'Login failed. Please try again.';
  }

  /* ========================================
     Initial State
     If the server redirected back with query
     parameters, surface that message on load.
  ======================================== */
  if (!status || !message) {
    statusBanner.classList.add('hidden');
  } else {
    showStatus(status, message);
  }

  /* ========================================
     Login Flow
     HTML -> app.js -> server.js -> JSON ->
     app.js -> dashboard / status message
  ======================================== */
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Let the browser handle required-field validation first.
    if (!loginForm.reportValidity()) {
      return;
    }

    setSubmitButtonLoading();

    try {
      // Collect form values from the HTML form and send them to Express.
      const formData = new FormData(loginForm);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      // The Express server responds with JSON containing success state
      // plus the next URL to open.
      const data = await response.json();

      if (!data.ok) {
        showStatus('error', data.message || (data.redirectTo ? getStatusMessageFromRedirect(data.redirectTo) : 'Login failed. Please try again.'));
        resetSubmitButton();
        return;
      }

      if (!data.redirectTo) {
        throw new Error('Missing redirect target.');
      }

      // On successful login, move the user to the role-specific dashboard.
      window.location.href = data.redirectTo;
    } catch (error) {
      showStatus('error', 'Unable to reach the login service. Start the Express server and try again.');
      resetSubmitButton();
    }
  });
});
