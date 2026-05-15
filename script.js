// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.navbar .menu');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    icon.classList.toggle('active');
  });
}
// Close menu on link click
document.querySelectorAll('.navbar .menu a').forEach(a => {
  a.addEventListener('click', () => {
    menu.classList.remove('active');
  });
});

// Theme Toggle Logic
const themeSwitch = document.getElementById('theme-switch');
const themeIcon = themeSwitch ? themeSwitch.querySelector('i') : null;

// Check for saved user preference, if any, on load of the website
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  if(themeIcon) { themeIcon.classList.remove('fa-sun'); themeIcon.classList.add('fa-moon'); }
}

if (themeSwitch && themeIcon) {
  themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('theme', 'light');
    } else {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('theme', 'dark');
    }
  });
}

// Typed.js style typing effect
const roles = ['Full Stack Developer,\nAI & ML Engineer :)'];
let ri = 0, ci = 0, deleting = false;
const typeEl = document.getElementById('typewriter');
function typewrite() {
  const word = roles[ri];
  if (!deleting) {
    typeEl.innerHTML = word.substring(0, ++ci).replace(/\n/g, '<br>');
    if (ci === word.length) { deleting = true; setTimeout(typewrite, 2500); return; }
  } else {
    typeEl.innerHTML = word.substring(0, --ci).replace(/\n/g, '<br>');
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typewrite, deleting ? 40 : 80);
}
typewrite();

// Fetch GitHub projects
async function loadProjects() {
  const grid = document.getElementById('projectsGrid');
  try {
    const res = await fetch('https://api.github.com/users/Phaneendra1228/repos?sort=pushed&per_page=30');
    const repos = await res.json();
    const filtered = repos.filter(r => !r.fork && !r.archived);
    if (!filtered.length) {
      grid.innerHTML = '<p style="text-align:center;color:#ccc;width:100%">Projects coming soon...</p>';
      return;
    }
    grid.innerHTML = filtered.map(r => {
      let link = r.html_url;
      if (r.name.toLowerCase() === 'personalized-entrance-exam-coach') {
        link = 'https://personalized-entrance-exam-coach-gi7e.onrender.com/';
      }
      return `
      <div class="box">
        <span>Web Development</span>
        <i class="fas fa-code"></i>
        <h3>Web Projects</h3>
        <p>${r.description || r.name.replace(/-/g, ' ')}</p>
        <a href="${link}" target="_blank" rel="noopener" class="project-link">View Project</a>
      </div>
    `}).join('');
    if (window.initTilt) window.initTilt();
  } catch(e) {
    grid.innerHTML = '<p style="text-align:center;color:#ccc;width:100%">Could not load projects. <a href="https://github.com/Phaneendra1228" style="color:#f9ca24">Visit GitHub</a></p>';
  }
}

loadProjects();

// Scroll Reveal Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // observer.unobserve(entry.target); // Optional: stop observing once revealed
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(sec => {
  sec.classList.add('reveal');
  observer.observe(sec);
});

// Sticky Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Initialize 3D Tilt Effect on Elements
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll(".hero-photo"), {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.2
  });
  VanillaTilt.init(document.querySelectorAll(".check-bg"), {
    max: 15,
    speed: 400,
    scale: 1.05
  });
  
  // A helper function to initialize tilt on dynamically loaded projects
  window.initTilt = function() {
    VanillaTilt.init(document.querySelectorAll(".services .box"), {
      max: 8,
      speed: 400,
      glare: true,
      "max-glare": 0.1
    });
  };
}

// Background Parallax Mouse Effect
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  document.body.style.setProperty('--mouse-x', x);
  document.body.style.setProperty('--mouse-y', y);
});
