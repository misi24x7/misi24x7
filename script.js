(function(){
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // mobile nav
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks){
    navToggle.addEventListener('click', () => {
      const open = navLinks.style.display === 'flex';
      navLinks.style.display = open ? 'none' : 'flex';
      navToggle.setAttribute('aria-expanded', (!open).toString());
    });
  }

  // theme toggle (persist in localStorage)
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const setLight = () => {
    root.style.setProperty('--bg', '#f7fbfb');
    root.style.setProperty('--txt', '#0b0f14');
    root.style.setProperty('--muted', '#4b5a57');
    root.style.setProperty('--glass', 'rgba(0,0,0,0.04)');
    root.style.setProperty('--border', '1px solid rgba(0,0,0,0.12)');
  };
  const stored = localStorage.getItem('theme') || 'dark';
  if (stored === 'light') setLight();
  if (themeToggle){
    themeToggle.addEventListener('click', () => {
      const now = (localStorage.getItem('theme') || 'dark') === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', now);
      if (now === 'light') setLight(); else location.reload();
    });
  }
})();
