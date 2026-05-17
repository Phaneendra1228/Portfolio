// ===== DATABASE INITIALIZATION =====
const defaultProjects = [
  {
    title: "LearnFlow",
    tag: "Web Development",
    description: "A comprehensive learning management system focused on interactive training, seamless collaboration, and academic growth.",
    link: "https://github.com/Phaneendra1228/personalized-entrance-exam-coach",
    live: "https://learnflow-i17r.onrender.com/login"
  },
  {
    title: "Interview Mentor",
    tag: "App Development",
    description: "A desktop-based simulation and coaching platform to help students master coding interviews and behavioral rounds.",
    link: "https://github.com/Phaneendra1228/Interview-Mentor",
    live: ""
  },
  {
    title: "Personalized Entrance Exam Coach",
    tag: "Web Development",
    description: "An intelligent tutoring system that tailors mock exams, revision schedules, and practice questions to student performance.",
    link: "https://github.com/Phaneendra1228/personalized-entrance-exam-coach",
    live: "https://learnflow-i17r.onrender.com/login"
  }
];

const defaultCerts = [
  {
    title: "Tech Summit, Techknow 2.0",
    org: "Knowvation Learnings Pvt. Ltd.",
    badge: "green",
    date: "7th, 8th, 9th March 2025",
    pdf: "Knowation Learning Hackathon.pdf",
    description: "Participated in Techknow 2.0, a 24-Hour Hackathon & Tech Summit organized by Knowvation Learnings Pvt. Ltd.. Collaborated on innovative technology solutions, enhanced problem-solving abilities, and gained valuable experience in teamwork, creativity, and real-time project development in a competitive environment."
  },
  {
    title: "Fresher's CodeStorm 2K25",
    org: "Narsimha Reddy Engineering College",
    badge: "yellow",
    date: "25 April 2025",
    pdf: "Hackathon Certificate.pdf",
    description: "Secured Second Prize at CODESTORM 2K25, an 8-hour hackathon conducted by Narsimha Reddy Engineering College. Collaborated with team CTRL FREAKS (CS163) to solve real-time challenges through innovation, teamwork, and quick problem-solving under pressure."
  },
  {
    title: "Avinya Technical Event",
    org: "Anurag University",
    badge: "cyan",
    date: "2025",
    pdf: "Certificate_Avinya.pdf",
    description: "Successfully participated in AVINYA 2K25, a 24-Hour National Level Hackathon organized by the Department of Artificial Intelligence at Anurag University. Gained hands-on experience in AI-driven innovation, teamwork, and real-time problem-solving while collaborating on impactful technology solutions in a competitive environment."
  }
];

if (!localStorage.getItem('portfolio_initialized')) {
  localStorage.setItem('custom_projects', JSON.stringify(defaultProjects));
  localStorage.setItem('custom_certificates', JSON.stringify(defaultCerts));
  localStorage.setItem('portfolio_initialized', 'true');
} else {
  // Backward compatibility migration for new dual-link schema
  const customProjectsRaw = localStorage.getItem('custom_projects');
  if (customProjectsRaw) {
    try {
      const parsed = JSON.parse(customProjectsRaw);
      if (parsed.length > 0 && typeof parsed[0].live === 'undefined') {
        localStorage.setItem('custom_projects', JSON.stringify(defaultProjects));
      }
    } catch(e) {}
  }
}

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

// Load Projects from Database
function loadProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  
  const projects = JSON.parse(localStorage.getItem('custom_projects')) || [];
  
  if (!projects.length) {
    grid.innerHTML = '<p style="text-align:center;color:#ccc;width:100%">Projects coming soon...</p>';
    return;
  }
  
  grid.innerHTML = projects.map(p => {
    let buttonsHtml = '';
    if (p.live) {
      buttonsHtml = `
        <a href="${p.link}" target="_blank" rel="noopener" class="project-link">GitHub</a>
        <a href="${p.live}" target="_blank" rel="noopener" class="project-link" style="background: var(--accent-gradient); color: #fff; border: none;"><span class="live-dot"></span>Live</a>
      `;
    } else {
      buttonsHtml = `<a href="${p.link}" target="_blank" rel="noopener" class="project-link">View Project</a>`;
    }
    
    return `
      <div class="box">
        <span>${p.tag}</span>
        <i class="fas fa-code"></i>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          ${buttonsHtml}
        </div>
      </div>
    `;
  }).join('');
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
        const newMessage = {
          name: object.name || 'Anonymous',
          email: object.email || 'N/A',
          subject: object.subject || 'No Subject',
          message: object.message || '',
          date: new Date().toLocaleString()
        };

        // Save globally to database
        try {
          const dbGet = await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/messages");
          const currentMsgs = dbGet.ok ? (await dbGet.json()) : [];
          currentMsgs.push(newMessage);
          await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/messages", {
            method: "POST",
            body: JSON.stringify(currentMsgs)
          });
        } catch (dbErr) {
          console.warn("Failed to save message globally:", dbErr);
        }

        // Backup locally
        try {
          const messages = JSON.parse(localStorage.getItem('contact_messages')) || [];
          messages.push(newMessage);
          localStorage.setItem('contact_messages', JSON.stringify(messages));
        } catch (storageErr) {
          console.warn("Failed to store message locally:", storageErr);
        }

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

// Load Certificates from Database
function loadCertificates() {
  const grid = document.getElementById('certificatesGrid');
  if (!grid) return;
  
  const certs = JSON.parse(localStorage.getItem('custom_certificates')) || [];
  
  if (!certs.length) {
    grid.innerHTML = '<p style="text-align:center;color:#ccc;width:100%">Certificates coming soon...</p>';
    return;
  }
  
  grid.innerHTML = certs.map(c => {
    return `
      <a href="${c.pdf}" target="_blank" rel="noopener noreferrer" class="cert-card">
        <div class="cert-preview">
          <img class="cert-img" src="" alt="${c.title} Certificate" data-pdf="${c.pdf}">
        </div>
        <div class="cert-body">
          <div class="cert-title-row">
            <h3>${c.title}</h3>
            <span class="cert-badge cert-badge--${c.badge}">${c.badge === 'cyan' ? 'Certificate of Participation' : c.badge === 'yellow' ? 'Certificate of Merit' : 'Certificate of Participation'}</span>
          </div>
          <p class="cert-org"><i class="fas fa-university"></i> ${c.org}</p>
          <p class="cert-date"><i class="far fa-calendar-alt"></i> ${c.date}</p>
          <p class="cert-desc">${c.description}</p>
        </div>
      </a>
    `;
  }).join('');
  
  if (typeof pdfjsLib !== 'undefined') {
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
  }
}

// Initial Dynamic Load Trigger
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  loadCertificates();
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

// ===== ADMIN PANEL LOGIC =====
(function() {
  const adminFloatBtn = document.getElementById('admin-float-btn');
  const loginModal = document.getElementById('admin-login-modal');
  const dashboardModal = document.getElementById('admin-dashboard-modal');
  const projFormModal = document.getElementById('project-form-modal');
  const certFormModal = document.getElementById('cert-form-modal');
  const exportModal = document.getElementById('export-config-modal');
  
  const closeLogin = document.getElementById('close-login-modal');
  const closeDashboard = document.getElementById('close-dashboard-modal');
  const closeProjForm = document.getElementById('close-project-form');
  const closeCertForm = document.getElementById('close-cert-form');
  const closeExport = document.getElementById('close-export-modal');
  
  const loginSubmit = document.getElementById('login-submit-btn');
  const adminEmailInput = document.getElementById('admin-email');
  const adminPasswordInput = document.getElementById('admin-password');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('btn-admin-logout');
  
  // Tab Switching
  const tabBtnProjects = document.getElementById('tab-btn-projects');
  const tabBtnCerts = document.getElementById('tab-btn-certs');
  const tabBtnMessages = document.getElementById('tab-btn-messages');
  const tabProjects = document.getElementById('tab-projects');
  const tabCerts = document.getElementById('tab-certs');
  const tabMessages = document.getElementById('tab-messages');
  
  // Dashboard lists
  const adminProjectsList = document.getElementById('admin-projects-list');
  const adminCertsList = document.getElementById('admin-certs-list');
  const adminMessagesList = document.getElementById('admin-messages-list');
  
  // Form submission and trigger buttons
  const btnAddProject = document.getElementById('btn-add-project');
  const btnAddCert = document.getElementById('btn-add-cert');
  const btnClearMessages = document.getElementById('btn-clear-messages');
  const btnExportConfig = document.getElementById('btn-export-config');
  const projectForm = document.getElementById('project-form');
  const certForm = document.getElementById('cert-form');
  
  // Export Elements
  const exportDataJson = document.getElementById('export-data-json');
  const btnCopyExport = document.getElementById('btn-copy-export');

  // Open modals
  if (adminFloatBtn) {
    adminFloatBtn.addEventListener('click', () => {
      if (sessionStorage.getItem('admin_logged_in') === 'true') {
        openDashboard();
      } else {
        loginModal.classList.add('active');
        if (adminEmailInput) {
          adminEmailInput.value = '';
          adminEmailInput.focus();
        }
        if (adminPasswordInput) {
          adminPasswordInput.value = '';
        }
        loginError.style.display = 'none';
      }
    });
  }
  
  // Close buttons
  const modalsList = [
    { btn: closeLogin, modal: loginModal },
    { btn: closeDashboard, modal: dashboardModal },
    { btn: closeProjForm, modal: projFormModal },
    { btn: closeCertForm, modal: certFormModal },
    { btn: closeExport, modal: exportModal }
  ];
  
  modalsList.forEach(m => {
    if (m.btn) {
      m.btn.addEventListener('click', () => {
        m.modal.classList.remove('active');
        if (m.modal === dashboardModal) {
          sessionStorage.removeItem('admin_logged_in');
        }
      });
    }
  });

  // Handle Login
  if (loginSubmit) {
    loginSubmit.addEventListener('click', performLogin);
  }
  if (adminEmailInput) {
    adminEmailInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performLogin();
    });
  }
  if (adminPasswordInput) {
    adminPasswordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performLogin();
    });
  }
  
  function performLogin() {
    const emailVal = adminEmailInput ? adminEmailInput.value.trim().toLowerCase() : '';
    const passVal = adminPasswordInput ? adminPasswordInput.value : '';
    
    if (emailVal === 'phanee2005@gmail.com' && passVal === 'phani@1228') {
      sessionStorage.setItem('admin_logged_in', 'true');
      loginModal.classList.remove('active');
      openDashboard();
    } else {
      loginError.style.display = 'block';
    }
  }
  
  // Tabs management
  if (tabBtnProjects && tabBtnCerts && tabBtnMessages) {
    tabBtnProjects.addEventListener('click', () => {
      tabBtnProjects.classList.add('active');
      tabBtnCerts.classList.remove('active');
      tabBtnMessages.classList.remove('active');
      tabProjects.classList.add('active');
      tabCerts.classList.remove('active');
      tabMessages.classList.remove('active');
    });
    tabBtnCerts.addEventListener('click', () => {
      tabBtnCerts.classList.add('active');
      tabBtnProjects.classList.remove('active');
      tabBtnMessages.classList.remove('active');
      tabCerts.classList.add('active');
      tabProjects.classList.remove('active');
      tabMessages.classList.remove('active');
    });
    tabBtnMessages.addEventListener('click', () => {
      tabBtnMessages.classList.add('active');
      tabBtnProjects.classList.remove('active');
      tabBtnCerts.classList.remove('active');
      tabMessages.classList.add('active');
      tabProjects.classList.remove('active');
      tabCerts.classList.remove('active');
    });
  }
  
  // Open Dashboard Controls
  function openDashboard() {
    renderDashboardLists();
    dashboardModal.classList.add('active');
  }
  
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  // Asynchronously render messages from global database with local fallback
  async function renderMessagesList() {
    if (!adminMessagesList) return;
    
    // Show spinner loader
    adminMessagesList.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px; gap: 15px; color: var(--text-muted); text-align: center;">
        <i class="fas fa-spinner fa-spin" style="font-size: 26px; color: #f9ca24;"></i>
        <span style="font-size: 13px; font-family: 'Outfit', sans-serif; letter-spacing: 2px; font-weight: 600; text-transform: uppercase;">Syncing with global database...</span>
      </div>
    `;
    
    try {
      const res = await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/messages");
      if (res.ok) {
        const messages = await res.json();
        
        // Cache backup locally
        try {
          localStorage.setItem('contact_messages', JSON.stringify(messages));
        } catch (e) {}
        
        if (!messages.length) {
          adminMessagesList.innerHTML = '<p style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 20px 0;">No messages received yet.</p>';
        } else {
          adminMessagesList.innerHTML = messages.map((m, idx) => `
            <div class="admin-item" style="flex-direction: column; align-items: flex-start; gap: 8px; padding: 15px; margin-bottom: 5px;">
              <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                <h5 style="color: #f9ca24; font-size: 14px; font-weight: 600; margin: 0;">${escapeHtml(m.name)}</h5>
                <button class="btn-del" onclick="deleteMessage(${idx})" style="background: transparent; border: none; cursor: pointer; padding: 5px; font-size: 14px; color: #ef4444;"><i class="fas fa-trash-alt"></i></button>
              </div>
              <div style="font-size: 12px; color: #06b6d4; font-weight: 500;">Email: <a href="mailto:${escapeHtml(m.email)}" style="color: #06b6d4; text-decoration: underline;">${escapeHtml(m.email)}</a></div>
              <div style="font-size: 12px; color: var(--text-muted); font-weight: 500;">Subject: ${escapeHtml(m.subject)}</div>
              <p style="font-size: 13px; color: #fff; line-height: 1.5; margin: 5px 0 0; white-space: pre-wrap; width: 100%; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 8px;">${escapeHtml(m.message)}</p>
              <div style="font-size: 11px; color: var(--text-muted); width: 100%; text-align: right; margin-top: 5px;">${escapeHtml(m.date)}</div>
            </div>
          `).reverse().join('');
        }
      } else {
        throw new Error("Bad status");
      }
    } catch (err) {
      console.warn("Global database sync failed, using offline cache:", err);
      const messages = JSON.parse(localStorage.getItem('contact_messages')) || [];
      if (!messages.length) {
        adminMessagesList.innerHTML = '<p style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 20px 0;">No messages received (Offline).</p>';
      } else {
        adminMessagesList.innerHTML = messages.map((m, idx) => `
          <div class="admin-item" style="flex-direction: column; align-items: flex-start; gap: 8px; padding: 15px; margin-bottom: 5px;">
            <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
              <h5 style="color: #f9ca24; font-size: 14px; font-weight: 600; margin: 0;">${escapeHtml(m.name)} (Offline)</h5>
              <button class="btn-del" onclick="deleteMessage(${idx})" style="background: transparent; border: none; cursor: pointer; padding: 5px; font-size: 14px; color: #ef4444;"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div style="font-size: 12px; color: #06b6d4; font-weight: 500;">Email: <a href="mailto:${escapeHtml(m.email)}" style="color: #06b6d4; text-decoration: underline;">${escapeHtml(m.email)}</a></div>
            <div style="font-size: 12px; color: var(--text-muted); font-weight: 500;">Subject: ${escapeHtml(m.subject)}</div>
            <p style="font-size: 13px; color: #fff; line-height: 1.5; margin: 5px 0 0; white-space: pre-wrap; width: 100%; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 8px;">${escapeHtml(m.message)}</p>
            <div style="font-size: 11px; color: var(--text-muted); width: 100%; text-align: right; margin-top: 5px;">${escapeHtml(m.date)}</div>
          </div>
        `).reverse().join('');
      }
    }
  }

  // Render Project/Cert/Message lists inside dashboard
  function renderDashboardLists() {
    const projects = JSON.parse(localStorage.getItem('custom_projects')) || [];
    const certs = JSON.parse(localStorage.getItem('custom_certificates')) || [];
    
    // Render Projects list
    if (adminProjectsList) {
      if (!projects.length) {
        adminProjectsList.innerHTML = '<p style="color: var(--text-muted); font-size: 13px;">No projects found.</p>';
      } else {
        adminProjectsList.innerHTML = projects.map((p, idx) => `
          <div class="admin-item">
            <div class="admin-item-info">
              <h5>${p.title}</h5>
              <span>${p.tag}</span>
            </div>
            <div class="admin-item-actions">
              <button class="btn-edit" onclick="editProject(${idx})"><i class="fas fa-edit" style="color: #06b6d4;"></i></button>
              <button class="btn-del" onclick="deleteProject(${idx})"><i class="fas fa-trash-alt" style="color: #ef4444;"></i></button>
            </div>
          </div>
        `).join('');
      }
    }
    
    // Render Certificates list
    if (adminCertsList) {
      if (!certs.length) {
        adminCertsList.innerHTML = '<p style="color: var(--text-muted); font-size: 13px;">No certificates found.</p>';
      } else {
        adminCertsList.innerHTML = certs.map((c, idx) => `
          <div class="admin-item">
            <div class="admin-item-info">
              <h5>${c.title}</h5>
              <span>${c.org}</span>
            </div>
            <div class="admin-item-actions">
              <button class="btn-edit" onclick="editCertificate(${idx})"><i class="fas fa-edit" style="color: #06b6d4;"></i></button>
              <button class="btn-del" onclick="deleteCertificate(${idx})"><i class="fas fa-trash-alt" style="color: #ef4444;"></i></button>
            </div>
          </div>
        `).join('');
      }
    }

    // Trigger async global message fetch and rendering
    renderMessagesList();
  }
  
  // Expose CRUD actions globally so onclick handles work
  window.deleteProject = function(idx) {
    if (confirm('Are you sure you want to delete this project?')) {
      const projects = JSON.parse(localStorage.getItem('custom_projects')) || [];
      projects.splice(idx, 1);
      localStorage.setItem('custom_projects', JSON.stringify(projects));
      renderDashboardLists();
      loadProjects();
    }
  };
  
  window.deleteCertificate = function(idx) {
    if (confirm('Are you sure you want to delete this certificate?')) {
      const certs = JSON.parse(localStorage.getItem('custom_certificates')) || [];
      certs.splice(idx, 1);
      localStorage.setItem('custom_certificates', JSON.stringify(certs));
      renderDashboardLists();
      loadCertificates();
    }
  };

  window.deleteMessage = async function(idx) {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        adminMessagesList.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: center; padding: 40px 0; color: var(--text-muted); gap: 10px;">
            <i class="fas fa-spinner fa-spin" style="font-size: 20px; color: #ef4444;"></i>
            <span>Deleting message from database...</span>
          </div>
        `;
        
        const dbGet = await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/messages");
        const messages = dbGet.ok ? (await dbGet.json()) : (JSON.parse(localStorage.getItem('contact_messages')) || []);
        
        const actualIdx = messages.length - 1 - idx;
        if (actualIdx >= 0 && actualIdx < messages.length) {
          messages.splice(actualIdx, 1);
          await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/messages", {
            method: "POST",
            body: JSON.stringify(messages)
          });
          localStorage.setItem('contact_messages', JSON.stringify(messages));
        }
      } catch (err) {
        console.warn("Delete message failed globally:", err);
      } finally {
        renderMessagesList();
      }
    }
  };

  if (btnClearMessages) {
    btnClearMessages.addEventListener('click', async () => {
      if (confirm('Are you sure you want to delete ALL received messages? This cannot be undone.')) {
        try {
          adminMessagesList.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; padding: 40px 0; color: var(--text-muted); gap: 10px;">
              <i class="fas fa-spinner fa-spin" style="font-size: 20px; color: #ef4444;"></i>
              <span>Clearing all messages...</span>
            </div>
          `;
          
          await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/messages", {
            method: "POST",
            body: JSON.stringify([])
          });
          localStorage.setItem('contact_messages', JSON.stringify([]));
        } catch (err) {
          console.warn("Clear messages failed globally:", err);
        } finally {
          renderMessagesList();
        }
      }
    });
  }
  
  // Save Project Form
  if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const idx = document.getElementById('project-edit-index').value;
      const projects = JSON.parse(localStorage.getItem('custom_projects')) || [];
      
      const newProj = {
        title: document.getElementById('form-proj-title').value,
        tag: document.getElementById('form-proj-category').value,
        link: document.getElementById('form-proj-link').value,
        live: document.getElementById('form-proj-live').value,
        description: document.getElementById('form-proj-desc').value
      };
      
      if (idx !== "") {
        projects[parseInt(idx)] = newProj;
      } else {
        projects.push(newProj);
      }
      
      localStorage.setItem('custom_projects', JSON.stringify(projects));
      projFormModal.classList.remove('active');
      renderDashboardLists();
      loadProjects();
    });
  }
  
  // Save Certificate Form
  if (certForm) {
    certForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const idx = document.getElementById('cert-edit-index').value;
      const certs = JSON.parse(localStorage.getItem('custom_certificates')) || [];
      
      const newCert = {
        title: document.getElementById('form-cert-title').value,
        org: document.getElementById('form-cert-org').value,
        badge: document.getElementById('form-cert-badge-type').value,
        date: document.getElementById('form-cert-date').value,
        pdf: document.getElementById('form-cert-pdf').value,
        description: document.getElementById('form-cert-desc').value
      };
      
      if (idx !== "") {
        certs[parseInt(idx)] = newCert;
      } else {
        certs.push(newCert);
      }
      
      localStorage.setItem('custom_certificates', JSON.stringify(certs));
      certFormModal.classList.remove('active');
      renderDashboardLists();
      loadCertificates();
    });
  }
  
  // Add Project Trigger
  if (btnAddProject) {
    btnAddProject.addEventListener('click', () => {
      document.getElementById('project-form-title').textContent = "Add Project";
      document.getElementById('project-edit-index').value = "";
      document.getElementById('form-proj-title').value = "";
      document.getElementById('form-proj-category').value = "";
      document.getElementById('form-proj-link').value = "";
      document.getElementById('form-proj-live').value = "";
      document.getElementById('form-proj-desc').value = "";
      projFormModal.classList.add('active');
    });
  }
  
  // Add Cert Trigger
  if (btnAddCert) {
    btnAddCert.addEventListener('click', () => {
      document.getElementById('cert-form-title').textContent = "Add Certificate";
      document.getElementById('cert-edit-index').value = "";
      document.getElementById('form-cert-title').value = "";
      document.getElementById('form-cert-org').value = "";
      document.getElementById('form-cert-badge-type').value = "cyan";
      document.getElementById('form-cert-date').value = "";
      document.getElementById('form-cert-pdf').value = "";
      document.getElementById('form-cert-desc').value = "";
      certFormModal.classList.add('active');
    });
  }
  
  // Edit handlers
  window.editProject = function(idx) {
    const projects = JSON.parse(localStorage.getItem('custom_projects')) || [];
    const p = projects[idx];
    if (p) {
      document.getElementById('project-form-title').textContent = "Edit Project";
      document.getElementById('project-edit-index').value = idx;
      document.getElementById('form-proj-title').value = p.title;
      document.getElementById('form-proj-category').value = p.tag;
      document.getElementById('form-proj-link').value = p.link;
      document.getElementById('form-proj-live').value = p.live || "";
      document.getElementById('form-proj-desc').value = p.description;
      projFormModal.classList.add('active');
    }
  };
  
  window.editCertificate = function(idx) {
    const certs = JSON.parse(localStorage.getItem('custom_certificates')) || [];
    const c = certs[idx];
    if (c) {
      document.getElementById('cert-form-title').textContent = "Edit Certificate";
      document.getElementById('cert-edit-index').value = idx;
      document.getElementById('form-cert-title').value = c.title;
      document.getElementById('form-cert-org').value = c.org;
      document.getElementById('form-cert-badge-type').value = c.badge;
      document.getElementById('form-cert-date').value = c.date;
      document.getElementById('form-cert-pdf').value = c.pdf;
      document.getElementById('form-cert-desc').value = c.description;
      certFormModal.classList.add('active');
    }
  };
  
  // Logout Trigger
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('admin_logged_in');
      dashboardModal.classList.remove('active');
    });
  }
  
  // Export Config Trigger
  if (btnExportConfig) {
    btnExportConfig.addEventListener('click', () => {
      const projects = localStorage.getItem('custom_projects');
      const certs = localStorage.getItem('custom_certificates');
      
      const configText = `// Copy and replace the database arrays at the beginning of script.js to make your edits permanent!

const defaultProjects = ${projects};

const defaultCerts = ${certs};`;
      
      exportDataJson.value = configText;
      exportModal.classList.add('active');
    });
  }
  
  // Copy to clipboard
  if (btnCopyExport && exportDataJson) {
    btnCopyExport.addEventListener('click', () => {
      exportDataJson.select();
      document.execCommand('copy');
      btnCopyExport.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(() => {
        btnCopyExport.innerHTML = '<i class="far fa-copy"></i> Copy Configuration Code';
      }, 2000);
    });
  }
})();
