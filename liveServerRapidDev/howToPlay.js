const baseUrl = window.location.href.split('/').slice(0, 3).join('/');
function redirectToPage() {
    // Replace 'example.com' with the desired URL or page you want to redirect to
    window.location.href = `${baseUrl}/Game`;
  }