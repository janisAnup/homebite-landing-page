document.getElementById('register-form').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const button = document.getElementById('submit');
  const status = document.getElementById('status');
  button.disabled = true;
  button.textContent = 'Creating account...';
  try {
    const response = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify(Object.fromEntries(new FormData(form))) });
    const data = await response.json();
    if (!response.ok || !data.ok) throw new Error(data.message || 'Unable to create your account.');
    location.href = data.redirectTo;
  } catch (error) {
    status.textContent = error.message;
    status.className = 'mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700';
    button.disabled = false;
    button.textContent = 'Create account';
  }
});
