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
    const filteredProjects = filtered.filter(r => {
      const name = r.name.toLowerCase();
      const description = (r.description || '').toLowerCase();
      return !['portfolio', 'personal-portfolio', 'portfolio-website', 'personal-portfolio-website'].includes(name)
        && !description.includes('portfolio website');
    });
    if (!filteredProjects.length) {
      grid.innerHTML = '<p style="text-align:center;color:#ccc;width:100%">Projects coming soon...</p>';
      return;
    }
    grid.innerHTML = filteredProjects.map(r => {
      let link = r.html_url;
      let title = r.name.replace(/-/g, ' ');
      let tag = 'Web Development';
      let liveLink = r.homepage || '';

      if (r.name.toLowerCase() === 'personalized-entrance-exam-coach' || r.name.toLowerCase() === 'learnflow') {
        liveLink = 'https://learnflow-i17r.onrender.com/login';
        title = 'LearnFlow';
      }
      
      if (title.toLowerCase() === 'interview mentor') {
        tag = 'App Development';
      }

      let buttonsHtml = '';
      if (liveLink) {
        buttonsHtml = `<a href="${link}" target="_blank" rel="noopener" class="project-link">GitHub</a>
                       <a href="${liveLink}" target="_blank" rel="noopener" class="project-link" style="background: var(--accent-gradient); color: #fff; border: none;"><span class="live-dot"></span>Live</a>`;
      } else {
        buttonsHtml = `<a href="${link}" target="_blank" rel="noopener" class="project-link">View Project</a>`;
      }

      return `
      <div class="box">
        <span>${tag}</span>
        <i class="fas fa-code"></i>
        <h3>${title}</h3>
        <p>${r.description || r.name.replace(/-/g, ' ')}</p>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          ${buttonsHtml}
        </div>
      </div>
    `}).join('');
    if (window.initTilt) window.initTilt();
  } catch(e) {
    grid.innerHTML = '<p style="text-align:center;color:#ccc;width:100%">Could not load projects. <a href="https://github.com/Phaneendra1228" style="color:#f9ca24">Visit GitHub</a></p>';
  }
}

// Contact form
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    e.stopPropagation();
    const btn = form.querySelector('button');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });
      
      if (response.ok) {
        const alertEl = document.getElementById('alert');
        if (alertEl) {
          alertEl.style.visibility = 'visible';
          alertEl.innerHTML = `<span class="closebtn" onclick="this.parentElement.style.visibility='hidden'">&times;</span>✅ Your message has been sent successfully!`;
        }
        form.reset();
      } else {
        alert('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      alert('There was an error sending your message. Please try again.');
    } finally {
      btn.textContent = 'Send message';
      btn.disabled = false;
    }
  });
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

// Sticky Navbar & Scroll Up Button & Scroll Progress Scroll Effect
const scrollUpBtn = document.querySelector('.scroll-up-btn');
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  // Sticky Navbar
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  // Scroll Up Button
  if (scrollUpBtn) {
    if (window.scrollY > 500) {
      scrollUpBtn.classList.add('show');
    } else {
      scrollUpBtn.classList.remove('show');
    }
  }

  // Scroll Progress Bar
  if (scrollProgress) {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
  }
});

// Scroll Up Button Click
if (scrollUpBtn) {
  scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// A helper function to initialize tilt on dynamically loaded projects
window.initTilt = function() {};

// Background Parallax Mouse Effect
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  document.body.style.setProperty('--mouse-x', x);
  document.body.style.setProperty('--mouse-y', y);
});

// Helper to crop white margins from the generated certificate thumbnail canvas
function cropCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;
  
  let top = 0, bottom = h - 1, left = 0, right = w - 1;
  
  // Find top bound (scanning for non-white pixels)
  outerLoop1: for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      // Pixel is not white (with safe threshold 240)
      if (r < 240 || g < 240 || b < 240) {
        top = y;
        break outerLoop1;
      }
    }
  }
  
  // Find bottom bound
  outerLoop2: for (let y = h - 1; y >= 0; y--) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      if (r < 240 || g < 240 || b < 240) {
        bottom = y;
        break outerLoop2;
      }
    }
  }
  
  // Find left bound
  outerLoop3: for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      if (r < 240 || g < 240 || b < 240) {
        left = x;
        break outerLoop3;
      }
    }
  }
  
  // Find right bound
  outerLoop4: for (let x = w - 1; x >= 0; x--) {
    for (let y = 0; y < h; y++) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      if (r < 240 || g < 240 || b < 240) {
        right = x;
        break outerLoop4;
      }
    }
  }
  
  // Apply a small padding so it doesn't crop exactly to the pixel edge
  const padding = 10;
  left = Math.max(0, left - padding);
  top = Math.max(0, top - padding);
  right = Math.min(w - 1, right + padding);
  bottom = Math.min(h - 1, bottom + padding);
  
  const cropWidth = right - left + 1;
  const cropHeight = bottom - top + 1;
  
  if (cropWidth <= 0 || cropHeight <= 0) return canvas;
  
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = cropWidth;
  tempCanvas.height = cropHeight;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(canvas, left, top, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
  return tempCanvas;
}

// PDF Certificate Thumbnail Rendering
window.addEventListener('load', function() {
  if (typeof pdfjsLib === 'undefined') {
    console.warn('PDF.js library not loaded');
    return;
  }
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

  document.querySelectorAll('.cert-img').forEach(async (img) => {
    const pdfUrl = img.dataset.pdf;
    if (!pdfUrl) return;
    try {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      const scale = 600 / viewport.width;
      const scaledViewport = page.getViewport({ scale });
      
      const canvas = document.createElement('canvas');
      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
      const croppedCanvas = cropCanvas(canvas);
      img.src = croppedCanvas.toDataURL('image/png');
    } catch (err) {
      console.warn('PDF render failed for:', pdfUrl, err);
      img.style.display = 'none';
      const icon = document.createElement('div');
      icon.innerHTML = '<i class="fas fa-file-pdf" style="font-size:48px;color:var(--accent-color);"></i><span style="font-size:14px;color:var(--text-muted);">Click to view</span>';
      icon.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:10px;';
      img.parentElement.insertBefore(icon, img);
    }
  });
});

// ===== PRELOADER LOGIC & CANVAS CONSTELLATION =====
(function() {
  const canvas = document.getElementById('preloader-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 35 : 65;
  let active = true;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(249, 202, 36, 0.7)';
      ctx.shadowColor = '#f9ca24';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    if (!active) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw lines
    const maxDist = 115;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(249, 202, 36, ${0.16 * (1 - dist / maxDist)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }
  animate();

  // Status text rotation
  const statuses = [
    "INITIALIZING ENVIRONMENT...",
    "LOADING INTELLIGENCE...",
    "TRAINING MODEL...",
    "OPTIMIZING INTERACTIVE CORE...",
    "LAUNCHING EXPERIENCE..."
  ];
  const statusEl = document.getElementById('preloader-status');
  let statusIdx = 0;

  const statusInterval = setInterval(() => {
    if (statusEl) {
      statusIdx = (statusIdx + 1) % statuses.length;
      statusEl.style.opacity = 0;
      setTimeout(() => {
        statusEl.textContent = statuses[statusIdx];
        statusEl.style.opacity = 0.85;
      }, 150);
    }
  }, 750);

  // Fade out preloader when page finishes loading
  let isWindowLoaded = false;
  window.addEventListener('load', () => {
    isWindowLoaded = true;
  });

  // Guarantee minimum display time of 3.2 seconds for aesthetic impact
  setTimeout(() => {
    function checkAndFade() {
      if (isWindowLoaded || document.readyState === 'complete') {
        clearInterval(statusInterval);
        const preloader = document.getElementById('preloader');
        if (preloader) {
          preloader.classList.add('fade-out');
          setTimeout(() => {
            active = false; // stop canvas animation loop
            preloader.remove();
          }, 800);
        }
      } else {
        setTimeout(checkAndFade, 200);
      }
    }
    checkAndFade();
  }, 3200);
})();
