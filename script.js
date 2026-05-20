// ===== DATABASE INITIALIZATION =====
console.log("🚀 Portfolio Script Loaded: Version 37 (Global DB Active)");
window.PORTFOLIO_VERSION = 37;

// Force page scroll reset to the very top (Home section) on reload/refresh
if ('history' in window) {
  window.history.scrollRestoration = 'manual';
}

const resetScrollToTop = () => {
  if (window.location.hash) {
    try {
      history.replaceState("", document.title, window.location.pathname + window.location.search);
    } catch(e) {
      console.warn("Could not clear hash:", e);
    }
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
};

// Reset scroll instantly as script loads
resetScrollToTop();

// Reset scroll on DOM structure ready and when all assets (images, stylesheets) are loaded
document.addEventListener('DOMContentLoaded', resetScrollToTop);
window.addEventListener('load', resetScrollToTop);

// Multi-stage timed resets to catch and override browser scroll-restoration/hash-jumping delays
setTimeout(resetScrollToTop, 50);
setTimeout(resetScrollToTop, 150);
setTimeout(resetScrollToTop, 300);
setTimeout(resetScrollToTop, 600);

const defaultProfile = {
  name: "PHANEENDRA",
  fullName: "JUJJAVARAPU NAGA VENKATA PHANEENDRA",
  subtitle: "Full Stack Developer & AI/ML Engineer",
  roles: ["Full Stack Developer,\nAI & ML Engineer :)"],
  bio: "I'm Phaneendra, a passionate CSE student specializing in AI & ML. As a full-stack developer, I craft seamless digital experiences with precision and creativity. My code speaks in the language of innovation—blending logic, design, and intelligence. Beneath the surface, I dive deep into the world of machine learning, shaping ideas into smart, adaptive systems. My mission? To fuse technology and imagination, building solutions that redefine the way we interact with the digital world.",
  email: "Phanee2005@gmail.com",
  linkedin: "https://www.linkedin.com/in/jujjavarapu-naga-venkata-phaneendra-7416a232a/",
  github: "https://github.com/Phaneendra1228",
  instagram: "https://www.instagram.com/phaneendra_jnv/",
  image: "profile.jpg"
};

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
    date: "18th - 19th September 2025",
    pdf: "Certificate_Avinya.pdf",
    description: "Successfully participated in AVINYA 2K25, a 24-Hour National Level Hackathon organized by the Department of Artificial Intelligence at Anurag University. Gained hands-on experience in AI-driven innovation, teamwork, and real-time problem-solving while collaborating on impactful technology solutions in a competitive environment."
  }
];

const defaultResumeUrl = "resume.pdf";

const defaultEducation = [
  {
    institution: "Narsimha Reddy Engineering College",
    degree: "B.Tech",
    duration: "2024-2028",
    description: "Currently Studying At Narsimha Reddy Engineering College."
  },
  {
    institution: "Vignan Junior College, Hyderabad",
    degree: "Intermediate",
    duration: "2022-2024",
    description: "Completed class 12th at Vignan Junior College, Hyderabad."
  },
  {
    institution: "Bhashyam High School",
    degree: "High School",
    duration: "2022",
    description: "Completed class 10th at Bhashyam High School."
  }
];

if (!localStorage.getItem('portfolio_initialized')) {
  localStorage.setItem('custom_projects', JSON.stringify(defaultProjects));
  localStorage.setItem('custom_certificates', JSON.stringify(defaultCerts));
  localStorage.setItem('custom_education', JSON.stringify(defaultEducation));
  localStorage.setItem('custom_resume_url', defaultResumeUrl);
  localStorage.setItem('custom_profile', JSON.stringify(defaultProfile));
  localStorage.setItem('portfolio_initialized', 'true');
} else {
  // Ensure default profile exists in cache
  if (!localStorage.getItem('custom_profile')) {
    localStorage.setItem('custom_profile', JSON.stringify(defaultProfile));
  }
  // Ensure default resume link exists in cache
  if (!localStorage.getItem('custom_resume_url')) {
    localStorage.setItem('custom_resume_url', defaultResumeUrl);
  }
  // Ensure default education exists in cache
  if (!localStorage.getItem('custom_education')) {
    localStorage.setItem('custom_education', JSON.stringify(defaultEducation));
  }
  // Purge unwanted project and handle migrations
  try {
    let customProjects = JSON.parse(localStorage.getItem('custom_projects')) || [];
    // Ensure "Personalized Entrance Exam Coach" is removed permanently on old initializations
    customProjects = customProjects.filter(p => p.title !== "Personalized Entrance Exam Coach");
    localStorage.setItem('custom_projects', JSON.stringify(customProjects));

    // Migrate Avinya certificate date for existing users
    let customCerts = JSON.parse(localStorage.getItem('custom_certificates')) || [];
    let updatedCerts = false;
    customCerts = customCerts.map(c => {
      if (c.title === "Avinya Technical Event" && c.date === "2025") {
        c.date = "18th - 19th September 2025";
        updatedCerts = true;
      }
      return c;
    });
    if (updatedCerts) {
      localStorage.setItem('custom_certificates', JSON.stringify(customCerts));
    }
  } catch(e) {
    console.warn("Migration failed:", e);
  }
}

// ===== PREMIUM COLORS THEME DICTIONARY =====
const themes = {
  default: {
    '--bg-color': '#030712',
    '--card-bg': 'rgba(17, 24, 39, 0.7)',
    '--nav-bg': 'rgba(3, 7, 18, 0.8)',
    '--nav-menu-bg': 'rgba(3, 7, 18, 0.65)',
    '--border-color': 'rgba(255, 255, 255, 0.08)',
    '--text-main': '#ffffff',
    '--text-muted': '#ffffff',
    '--heading-color': '#ffffff',
    '--glass-rgb': '255, 255, 255',
    '--input-bg': 'rgba(0, 0, 0, 0.2)',
    '--accent-color': '#f9ca24',
    '--accent-gradient': 'linear-gradient(135deg, #f9ca24, #e67e22)',
    '--accent-hover': 'linear-gradient(135deg, #e67e22, #d4a017)',
    '--info-color': '#06b6d4'
  },
  emerald: {
    '--bg-color': '#022c22',
    '--card-bg': 'rgba(6, 78, 59, 0.4)',
    '--nav-bg': 'rgba(2, 44, 34, 0.8)',
    '--nav-menu-bg': 'rgba(2, 44, 34, 0.65)',
    '--border-color': 'rgba(16, 185, 129, 0.15)',
    '--text-main': '#ecfdf5',
    '--text-muted': '#a7f3d0',
    '--heading-color': '#ffffff',
    '--glass-rgb': '16, 185, 129',
    '--input-bg': 'rgba(2, 44, 34, 0.5)',
    '--accent-color': '#10b981',
    '--accent-gradient': 'linear-gradient(135deg, #10b981, #059669)',
    '--accent-hover': 'linear-gradient(135deg, #059669, #047857)',
    '--info-color': '#34d399'
  },
  cyberpunk: {
    '--bg-color': '#0f051d',
    '--card-bg': 'rgba(30, 9, 63, 0.4)',
    '--nav-bg': 'rgba(15, 5, 29, 0.8)',
    '--nav-menu-bg': 'rgba(15, 5, 29, 0.65)',
    '--border-color': 'rgba(236, 72, 153, 0.15)',
    '--text-main': '#fdf2f8',
    '--text-muted': '#f472b6',
    '--heading-color': '#ffffff',
    '--glass-rgb': '236, 72, 153',
    '--input-bg': 'rgba(15, 5, 29, 0.5)',
    '--accent-color': '#d946ef',
    '--accent-gradient': 'linear-gradient(135deg, #d946ef, #ec4899)',
    '--accent-hover': 'linear-gradient(135deg, #c084fc, #db2777)',
    '--info-color': '#a855f7'
  },
  sapphire: {
    '--bg-color': '#03071e',
    '--card-bg': 'rgba(26, 36, 86, 0.4)',
    '--nav-bg': 'rgba(3, 7, 30, 0.8)',
    '--nav-menu-bg': 'rgba(3, 7, 30, 0.65)',
    '--border-color': 'rgba(59, 130, 246, 0.15)',
    '--text-main': '#eff6ff',
    '--text-muted': '#93c5fd',
    '--heading-color': '#ffffff',
    '--glass-rgb': '59, 130, 246',
    '--input-bg': 'rgba(3, 7, 30, 0.5)',
    '--accent-color': '#3b82f6',
    '--accent-gradient': 'linear-gradient(135deg, #3b82f6, #6366f1)',
    '--accent-hover': 'linear-gradient(135deg, #2563eb, #4f46e5)',
    '--info-color': '#60a5fa'
  },
  crimson: {
    '--bg-color': '#110208',
    '--card-bg': 'rgba(67, 4, 29, 0.4)',
    '--nav-bg': 'rgba(17, 2, 8, 0.8)',
    '--nav-menu-bg': 'rgba(17, 2, 8, 0.65)',
    '--border-color': 'rgba(239, 68, 68, 0.15)',
    '--text-main': '#fef2f2',
    '--text-muted': '#fca5a5',
    '--heading-color': '#ffffff',
    '--glass-rgb': '239, 68, 68',
    '--input-bg': 'rgba(17, 2, 8, 0.5)',
    '--accent-color': '#ef4444',
    '--accent-gradient': 'linear-gradient(135deg, #ef4444, #dc2626)',
    '--accent-hover': 'linear-gradient(135deg, #dc2626, #b91c1c)',
    '--info-color': '#f87171'
  }
};

function applyTheme(themeName) {
  const root = document.documentElement;
  const theme = themes[themeName] || themes.default;
  const isLight = document.body.classList.contains('light-mode');
  
  Object.keys(theme).forEach(key => {
    if (isLight) {
      // In light mode, let standard CSS variables dictate general background/text,
      // but override accent highlights and gradients with theme values!
      if (key.includes('accent') || key.includes('info')) {
        root.style.setProperty(key, theme[key]);
      } else {
        root.style.removeProperty(key);
      }
    } else {
      // In dark mode, set all custom properties (bg, card-bg, text colors, etc.)
      root.style.setProperty(key, theme[key]);
    }
  });

  // Reapply mobile-specific overrides dynamically if viewport is mobile
  if (window.innerWidth <= 768) {
    if (isLight) {
      root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.98)', 'important');
      root.style.setProperty('--nav-bg', 'rgba(255, 255, 255, 0.98)', 'important');
      root.style.setProperty('--nav-menu-bg', 'rgba(250, 246, 238, 0.65)', 'important');
    } else {
      root.style.setProperty('--card-bg', 'rgba(17, 24, 39, 0.96)', 'important');
      root.style.setProperty('--nav-bg', 'rgba(11, 15, 30, 0.97)', 'important');
      
      // Determine theme-specific semi-transparent color for mobile menu background
      let semiTrans = 'rgba(3, 7, 18, 0.65)';
      if (themeName === 'emerald') semiTrans = 'rgba(2, 44, 34, 0.65)';
      else if (themeName === 'cyberpunk') semiTrans = 'rgba(15, 5, 29, 0.65)';
      else if (themeName === 'sapphire') semiTrans = 'rgba(3, 7, 30, 0.65)';
      else if (themeName === 'crimson') semiTrans = 'rgba(17, 2, 8, 0.65)';
      
      root.style.setProperty('--nav-menu-bg', semiTrans, 'important');
    }
  }
}

// Helper to convert Base64 Data URL to binary Blob object for safe browser in-tab preview
function base64ToBlob(base64, type = "application/pdf") {
  try {
    const parts = base64.split(',');
    const binStr = atob(parts[1] || parts[0]);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr], { type });
  } catch (err) {
    console.error("Base64 conversion failed:", err);
    return null;
  }
}

// Asynchronously load resume from KVDB with local cache fallback
async function loadResume() {
  const link = document.getElementById('resume-download-link');
  if (!link) return;
  
  // Remove any download attribute to prevent browser forcing download
  link.removeAttribute('download');
  
  // Set offline cache instantly
  const cachedData = localStorage.getItem('custom_resume_data');
  if (cachedData) {
    link.href = cachedData;
    link.textContent = "GET MY RESUME";
  } else {
    link.href = '#';
    link.textContent = "Resume Coming Soon";
  }
  
  try {
    const res = await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/resume_data", { cache: 'no-store' });
    if (res.ok) {
      const payload = await res.json();
      if (payload && payload.data) {
        localStorage.setItem('custom_resume_data', payload.data);
        localStorage.setItem('custom_resume_filename', payload.filename || 'resume.pdf');
        link.href = payload.data;
        link.textContent = "GET MY RESUME";
      } else {
        // Deleted globally or empty payload
        localStorage.removeItem('custom_resume_data');
        localStorage.removeItem('custom_resume_filename');
        link.href = '#';
        link.textContent = "Resume Coming Soon";
      }
    }
  } catch (err) {
    console.warn("Failed to load resume from global DB:", err);
  }
}

// Bind direct in-tab preview for the resume link
document.addEventListener('DOMContentLoaded', () => {
  const link = document.getElementById('resume-download-link');
  if (link) {
    link.removeAttribute('download');
    link.addEventListener('click', (e) => {
      const cachedData = localStorage.getItem('custom_resume_data');
      if (cachedData && cachedData.startsWith('data:application/pdf;base64,')) {
        e.preventDefault();
        const blob = base64ToBlob(cachedData, "application/pdf");
        if (blob) {
          const blobUrl = URL.createObjectURL(blob);
          window.open(blobUrl, '_blank');
          setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
        } else {
          window.open(cachedData, '_blank');
        }
      } else {
        if (link.getAttribute('href') === '#') {
          e.preventDefault();
        }
      }
    });
  }
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.navbar .menu');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    if (icon) {
      icon.classList.toggle('active');
    }
    
    // Lock/unlock background scrolling on mobile when menu is active
    if (menu.classList.contains('active')) {
      document.body.classList.add('menu-active');
      document.documentElement.classList.add('menu-active');
    } else {
      document.body.classList.remove('menu-active');
      document.documentElement.classList.remove('menu-active');
    }
  });
}
// Close menu on link click
document.querySelectorAll('.navbar .menu a').forEach(a => {
  a.addEventListener('click', () => {
    menu.classList.remove('active');
    const icon = menuBtn ? menuBtn.querySelector('i') : null;
    if (icon) {
      icon.classList.remove('active');
    }
    document.body.classList.remove('menu-active');
    document.documentElement.classList.remove('menu-active');
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
    
    // Re-apply theme accents for the new dark/light state
    const profile = JSON.parse(localStorage.getItem('custom_profile')) || {};
    const activeTheme = profile.theme || 'default';
    applyTheme(activeTheme);

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
let rolesList = ['Full Stack Developer,\nAI & ML Engineer :)'];
let ri = 0, ci = 0, deleting = false;
const typeEl = document.getElementById('typewriter');
function typewrite() {
  if (!typeEl) return;
  const word = rolesList[ri] || 'Developer';
  if (!deleting) {
    typeEl.innerHTML = word.substring(0, ++ci).replace(/\n/g, '<br>');
    if (ci === word.length) { deleting = true; setTimeout(typewrite, 2500); return; }
  } else {
    typeEl.innerHTML = word.substring(0, --ci).replace(/\n/g, '<br>');
    if (ci === 0) { deleting = false; ri = (ri + 1) % rolesList.length; }
  }
  setTimeout(typewrite, deleting ? 40 : 80);
}
typewrite();

// Dynamic Profile Loader
function loadProfile() {
  const profile = JSON.parse(localStorage.getItem('custom_profile')) || defaultProfile;
  
  // Apply dynamic color theme
  const activeTheme = profile.theme || 'default';
  applyTheme(activeTheme);

  // Map active theme radio button in admin panel
  const radios = document.getElementsByName('website-theme');
  radios.forEach(radio => {
    if (radio.value === activeTheme) {
      radio.checked = true;
    }
  });
  
  // 1. Navbar brand & footer brand
  const brandLink = document.querySelector('.navbar-brand');
  if (brandLink) brandLink.textContent = profile.name;
  
  const footerBrand = document.querySelector('.footer-col h3');
  if (footerBrand) footerBrand.textContent = profile.name;
  
  // 2. Hero Name
  const heroName = document.querySelector('.home-content .text-2');
  if (heroName) heroName.textContent = profile.name;
  
  // 3. Typewriter roles list update
  if (profile.roles && profile.roles.length) {
    rolesList = profile.roles;
  } else {
    rolesList = [profile.subtitle];
  }
  
  // 4. Hero Photo & About Photo
  const heroImg = document.querySelector('.hero-photo img');
  if (heroImg) {
    heroImg.src = profile.image;
    heroImg.onerror = () => { heroImg.src = 'https://avatars.githubusercontent.com/u/202120526?v=4'; };
  }
  
  const aboutImg = document.querySelector('.about-content .left img');
  if (aboutImg) {
    aboutImg.src = profile.image;
    aboutImg.onerror = () => { aboutImg.src = 'https://avatars.githubusercontent.com/u/202120526?v=4'; };
  }
  
  // 5. About Details
  const aboutTextTitle = document.querySelector('.about-content .right .text');
  if (aboutTextTitle) {
    aboutTextTitle.innerHTML = `I'm ${profile.name} and I'm <span>${profile.subtitle}.</span>`;
  }
  
  const aboutBio = document.querySelector('.about-content .right p');
  if (aboutBio) {
    aboutBio.textContent = profile.bio;
  }
  
  // 6. Contact details
  const contactName = document.querySelector('.contact .icons .row:nth-child(1) .info .sub-title');
  if (contactName) contactName.textContent = profile.fullName;
  
  const contactEmail = document.querySelector('.contact .icons .row:nth-child(3) .info .sub-title a');
  if (contactEmail) {
    contactEmail.href = `mailto:${profile.email}`;
    contactEmail.textContent = profile.email;
  }
  
  // 7. Footer Bio
  const footerBio = document.querySelector('.footer-col p');
  if (footerBio) footerBio.textContent = `${profile.subtitle} crafting seamless digital experiences and intelligent systems.`;
  
  // 8. Footer Copyright
  const footerCopyright = document.querySelector('.footer-bottom span');
  if (footerCopyright) {
    const year = new Date().getFullYear();
    footerCopyright.innerHTML = `&copy; ${year} ${profile.name}. All rights reserved.`;
  }
  
  // 9. Social links
  const socialIcons = document.querySelectorAll('.social_icon li a, .social-links a');
  socialIcons.forEach(a => {
    const icon = a.querySelector('i');
    if (icon) {
      if (icon.classList.contains('fa-envelope')) {
        a.href = `mailto:${profile.email}`;
      } else if (icon.classList.contains('fa-linkedin-in') || icon.classList.contains('fa-linkedin')) {
        a.href = profile.linkedin;
      } else if (icon.classList.contains('fa-github')) {
        a.href = profile.github;
      } else if (icon.classList.contains('fa-instagram')) {
        a.href = profile.instagram;
      }
    }
  });
}

// Asynchronously load profile from KVDB with local cache fallback
async function syncProfile() {
  // First load from local storage cache for instant render
  loadProfile();
  
  try {
    const res = await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/profile_data", { cache: 'no-store' });
    if (res.ok) {
      const payload = await res.json();
      if (payload && payload.name) {
        localStorage.setItem('custom_profile', JSON.stringify(payload));
        loadProfile(); // Update with latest database payload
      }
    }
  } catch (err) {
    console.warn("Failed to load profile from global DB, offline active:", err);
  }
}

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
  // Clear error styles on input
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('invalid-field');
      const alertEl = document.getElementById('alert');
      if (alertEl && alertEl.classList.contains('alert-error')) {
        alertEl.style.visibility = 'hidden';
      }
    });
  });

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    e.stopPropagation();

    // Clean up any previous invalid fields
    form.querySelectorAll('.invalid-field').forEach(el => el.classList.remove('invalid-field'));

    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const subjectInput = form.querySelector('input[name="subject"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    const alertEl = document.getElementById('alert');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const subject = subjectInput ? subjectInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    let errorMessage = '';
    let errorField = null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      errorMessage = 'Please enter your name.';
      errorField = nameInput;
    } else if (!email) {
      errorMessage = 'Please enter your email address.';
      errorField = emailInput;
    } else if (!emailRegex.test(email)) {
      errorMessage = 'Please enter a valid email address.';
      errorField = emailInput;
    } else if (!subject) {
      errorMessage = 'Please enter a subject.';
      errorField = subjectInput;
    } else if (!message) {
      errorMessage = 'Please enter a message.';
      errorField = messageInput;
    }

    if (errorMessage) {
      if (errorField) {
        errorField.classList.add('invalid-field');
        errorField.focus();
      }
      if (alertEl) {
        alertEl.classList.add('alert-error');
        alertEl.style.visibility = 'visible';
        alertEl.innerHTML = `<span class="closebtn" onclick="this.parentElement.style.visibility='hidden'">&times;</span>❌ ${errorMessage}`;
        alertEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        alert(errorMessage);
      }
      return;
    }

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
          const dbGet = await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/messages", { cache: 'no-store' });
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
          alertEl.classList.remove('alert-error');
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
      observer.unobserve(entry.target); // Stop observing once revealed to free up CPU/GPU
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(sec => {
  sec.classList.add('reveal');
  observer.observe(sec);
});

// Sticky Navbar & Scroll Up Button & Scroll Progress Scroll Effect (Optimized with requestAnimationFrame & DOM Cache)
const nav = document.querySelector('.navbar');
const scrollUpBtn = document.querySelector('.scroll-up-btn');
const scrollProgress = document.getElementById('scroll-progress');

let scrollTicking = false;

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      // Sticky Navbar
      if (nav) {
        if (scrollY > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }
      
      // Scroll Up Button
      if (scrollUpBtn) {
        if (scrollY > 500) {
          scrollUpBtn.classList.add('show');
        } else {
          scrollUpBtn.classList.remove('show');
        }
      }

      // Scroll Progress Bar
      if (scrollProgress) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        scrollProgress.style.width = scrolled + '%';
      }
      
      scrollTicking = false;
    });
    
    scrollTicking = true;
  }
}, { passive: true });

// Scroll Up Button Click
if (scrollUpBtn) {
  scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// A helper function to initialize tilt on dynamically loaded projects
window.initTilt = function() {};

// Background Parallax Mouse Effect (Optimized with requestAnimationFrame ticking lock & only runs on desktop)
let mouseTicking = false;
if (window.innerWidth >= 768) {
  document.addEventListener('mousemove', (e) => {
    if (!mouseTicking) {
      window.requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        document.body.style.setProperty('--mouse-x', x);
        document.body.style.setProperty('--mouse-y', y);
        mouseTicking = false;
      });
      mouseTicking = true;
    }
  }, { passive: true });
}

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
    
    // Asynchronously render a single PDF page to an image
    const renderPdfThumbnail = async (img) => {
      const pdfUrl = img.dataset.pdf;
      if (!pdfUrl) return;

      // Append a highly-responsive CSS loading spinner to preview zone
      const parent = img.parentElement;
      const loader = document.createElement('div');
      loader.className = 'cert-loader';
      loader.innerHTML = '<i class="fas fa-circle-notch fa-spin" style="font-size:24px;color:var(--accent-color);"></i>';
      loader.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(17,24,39,0.4);backdrop-filter:blur(4px);z-index:2;border-radius:12px;';
      if (parent) {
        parent.style.position = 'relative';
        parent.appendChild(loader);
      }

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
      } finally {
        if (loader && loader.parentElement) {
          loader.parentElement.removeChild(loader);
        }
      }
    };

    // Intersection Observer to lazy load and pre-render PDF thumbnails 150px before entering viewport
    const certObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          observer.unobserve(img); // Unobserve immediately to prevent duplicate renders
          renderPdfThumbnail(img);
        }
      });
    }, { rootMargin: '150px' });

    document.querySelectorAll('.cert-img').forEach(img => {
      certObserver.observe(img);
    });
  }
}

// Sync Projects globally to KVDB
async function syncProjectsToGlobalDB(projects) {
  try {
    await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/projects_data", {
      method: "POST",
      body: JSON.stringify(projects)
    });
  } catch (err) {
    console.warn("Failed to sync projects to global DB:", err);
  }
}

// Sync Certificates globally to KVDB
async function syncCertificatesToGlobalDB(certs) {
  try {
    await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/certs_data", {
      method: "POST",
      body: JSON.stringify(certs)
    });
  } catch (err) {
    console.warn("Failed to sync certificates to global DB:", err);
  }
}

// Sync Education globally to KVDB
async function syncEducationToGlobalDB(education) {
  try {
    await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/education_data", {
      method: "POST",
      body: JSON.stringify(education)
    });
  } catch (err) {
    console.warn("Failed to sync education to global DB:", err);
  }
}

// Load Education details dynamically
function loadEducation() {
  const grid = document.getElementById('educationGrid');
  if (!grid) return;
  
  const education = JSON.parse(localStorage.getItem('custom_education')) || [];
  
  if (!education.length) {
    grid.innerHTML = '<p style="text-align:center;color:#ccc;width:100%">Education details coming soon...</p>';
    return;
  }
  
  grid.innerHTML = education.map(e => {
    return `
      <div class="box">
        <i class="fas fa-graduation-cap"></i>
        <span>${e.duration}</span>
        <h3>${e.degree}</h3>
        <p>${e.description} at <strong>${e.institution}</strong></p>
      </div>
    `;
  }).join('');
}

// Asynchronously load projects from KVDB with local cache fallback
async function syncProjects() {
  loadProjects(); // Render immediately from local cache
  
  try {
    const res = await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/projects_data", { cache: 'no-store' });
    if (res.ok) {
      const payload = await res.json();
      if (payload && Array.isArray(payload)) {
        localStorage.setItem('custom_projects', JSON.stringify(payload));
        loadProjects(); // Render with latest database payload
      }
    }
  } catch (err) {
    console.warn("Failed to load projects from global DB:", err);
  }
}

// Asynchronously load certificates from KVDB with local cache fallback
async function syncCertificates() {
  loadCertificates(); // Render immediately from local cache
  
  try {
    const res = await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/certs_data", { cache: 'no-store' });
    if (res.ok) {
      const payload = await res.json();
      if (payload && Array.isArray(payload)) {
        localStorage.setItem('custom_certificates', JSON.stringify(payload));
        loadCertificates(); // Render with latest database payload
      }
    }
  } catch (err) {
    console.warn("Failed to load certificates from global DB:", err);
  }
}

// Asynchronously load education from KVDB with local cache fallback
async function syncEducation() {
  loadEducation(); // Render immediately from local cache
  
  try {
    const res = await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/education_data", { cache: 'no-store' });
    if (res.ok) {
      const payload = await res.json();
      if (payload && Array.isArray(payload)) {
        localStorage.setItem('custom_education', JSON.stringify(payload));
        loadEducation(); // Render with latest database payload
      }
    }
  } catch (err) {
    console.warn("Failed to load education from global DB:", err);
  }
}

// Initial Dynamic Load Trigger
document.addEventListener('DOMContentLoaded', () => {
  syncProjects();
  syncCertificates();
  syncEducation();
  loadResume();
  syncProfile();
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

  // Fade out preloader when page finishes loading (with race condition checks)
  let isWindowLoaded = document.readyState === 'complete' || document.readyState === 'interactive';
  window.addEventListener('load', () => {
    isWindowLoaded = true;
  });

  function dismissPreloader() {
    if (!active) return; // already dismissed
    clearInterval(statusInterval);
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        active = false; // stop canvas animation loop
        preloader.remove();
      }, 800);
    }
  }

  // Guarantee minimum display time of 3.2 seconds for aesthetic impact
  setTimeout(() => {
    function checkAndFade() {
      if (isWindowLoaded || document.readyState === 'complete' || document.readyState === 'interactive') {
        dismissPreloader();
      } else {
        setTimeout(checkAndFade, 200);
      }
    }
    checkAndFade();
  }, 3200);

  // Bulletproof fail-safe: Force hide preloader after a maximum of 5 seconds to prevent loading lock
  setTimeout(() => {
    dismissPreloader();
  }, 5000);
})();

// ===== ADMIN PANEL LOGIC =====
(function() {
  const adminFloatBtn = document.getElementById('admin-float-btn');
  const menuAdminBtn = document.getElementById('menu-admin-btn');
  const loginModal = document.getElementById('admin-login-modal');
  const dashboardModal = document.getElementById('admin-dashboard-modal');
  const projFormModal = document.getElementById('project-form-modal');
  const certFormModal = document.getElementById('cert-form-modal');
  const eduFormModal = document.getElementById('education-form-modal');
  const exportModal = document.getElementById('export-config-modal');
  
  const closeLogin = document.getElementById('close-login-modal');
  const closeDashboard = document.getElementById('close-dashboard-modal');
  const closeProjForm = document.getElementById('close-project-form');
  const closeCertForm = document.getElementById('close-cert-form');
  const closeEduForm = document.getElementById('close-education-form');
  const closeExport = document.getElementById('close-export-modal');
  
  const loginSubmit = document.getElementById('login-submit-btn');
  const adminEmailInput = document.getElementById('admin-email');
  const adminPasswordInput = document.getElementById('admin-password');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('btn-admin-logout');
  
  // Tab Switching
  const tabBtnProjects = document.getElementById('tab-btn-projects');
  const tabBtnProfile = document.getElementById('tab-btn-profile');
  const tabBtnEducation = document.getElementById('tab-btn-education');
  const tabBtnCerts = document.getElementById('tab-btn-certs');
  const tabBtnResume = document.getElementById('tab-btn-resume');
  const tabBtnMessages = document.getElementById('tab-btn-messages');
  const tabProjects = document.getElementById('tab-projects');
  const tabProfile = document.getElementById('tab-profile');
  const tabEducation = document.getElementById('tab-education');
  const tabCerts = document.getElementById('tab-certs');
  const tabResume = document.getElementById('tab-resume');
  const tabMessages = document.getElementById('tab-messages');
  
  // Dashboard lists
  const adminProjectsList = document.getElementById('admin-projects-list');
  const adminEducationList = document.getElementById('admin-education-list');
  const adminCertsList = document.getElementById('admin-certs-list');
  const adminMessagesList = document.getElementById('admin-messages-list');
  
  // Form submission and trigger buttons
  const btnAddProject = document.getElementById('btn-add-project');
  const btnAddCert = document.getElementById('btn-add-cert');
  const btnAddEducation = document.getElementById('btn-add-education');
  const btnClearMessages = document.getElementById('btn-clear-messages');
  const btnReloadMessages = document.getElementById('btn-reload-messages');
  const btnExportConfig = document.getElementById('btn-export-config');
  const projectForm = document.getElementById('project-form');
  const certForm = document.getElementById('cert-form');
  const educationForm = document.getElementById('education-form');
  const certFileInput = document.getElementById('form-cert-file');
  const certUploadText = document.getElementById('cert-upload-text');
  const certUploadInfo = document.getElementById('cert-upload-info');
  const certUploadZone = document.getElementById('cert-upload-zone');
  const resumeForm = document.getElementById('admin-resume-form');
  const resumeFileInput = document.getElementById('admin-resume-file');
  const uploadZoneText = document.getElementById('upload-zone-text');
  const uploadFileInfo = document.getElementById('upload-file-info');
  const resumeUploadZone = document.getElementById('resume-upload-zone');
  const btnDeleteResume = document.getElementById('btn-delete-resume');
  
  // Export Elements
  const exportDataJson = document.getElementById('export-data-json');
  const btnCopyExport = document.getElementById('btn-copy-export');

  // Open modals flow
  const openAdminFlow = () => {
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
    // Automatically reset mobile hamburger close icon back to active bars state
    const menuBtnIcon = document.querySelector('.menu-btn i');
    if (menuBtnIcon) menuBtnIcon.classList.remove('active');
    
    // Also close the mobile menu container and release scroll lock
    const mobileMenu = document.querySelector('.navbar .menu');
    if (mobileMenu) mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-active');
    document.documentElement.classList.remove('menu-active');
  };

  if (adminFloatBtn) {
    adminFloatBtn.addEventListener('click', openAdminFlow);
  }
  if (menuAdminBtn) {
    menuAdminBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openAdminFlow();
    });
  }
  
  // Close buttons
  const modalsList = [
    { btn: closeLogin, modal: loginModal },
    { btn: closeDashboard, modal: dashboardModal },
    { btn: closeProjForm, modal: projFormModal },
    { btn: closeCertForm, modal: certFormModal },
    { btn: closeEduForm, modal: eduFormModal },
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

  // Close modals when clicking outside the content area
  document.querySelectorAll('.admin-modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        if (modal === dashboardModal) {
          sessionStorage.removeItem('admin_logged_in');
        }
      }
    });
  });

  // Automatically logout if the user reloads the page or navigates away
  window.addEventListener('beforeunload', () => {
    sessionStorage.removeItem('admin_logged_in');
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
  const allTabs = [
    { btn: tabBtnProjects, content: tabProjects },
    { btn: tabBtnProfile, content: tabProfile },
    { btn: tabBtnEducation, content: tabEducation },
    { btn: tabBtnCerts, content: tabCerts },
    { btn: tabBtnResume, content: tabResume },
    { btn: tabBtnMessages, content: tabMessages }
  ];

  allTabs.forEach(tab => {
    if (tab.btn) {
      tab.btn.addEventListener('click', () => {
        allTabs.forEach(t => {
          if (t.btn) t.btn.classList.remove('active');
          if (t.content) t.content.classList.remove('active');
        });
        tab.btn.classList.add('active');
        if (tab.content) tab.content.classList.add('active');
      });
    }
  });
  
  // Open Dashboard Controls
  function openDashboard() {
    renderDashboardLists();
    populateProfileForm();
    
    // Display current resume file info in upload zone
    const currentName = localStorage.getItem('custom_resume_filename');
    if (uploadZoneText) {
      if (currentName) {
        uploadZoneText.textContent = `Current: ${currentName}`;
        if (uploadFileInfo) uploadFileInfo.textContent = "Upload a new PDF to replace it";
        if (resumeUploadZone) {
          resumeUploadZone.style.borderColor = "#06b6d4";
          resumeUploadZone.style.background = "rgba(6, 182, 212, 0.02)";
        }
      } else {
        uploadZoneText.textContent = "Drag & Drop or Click to Upload PDF";
        if (uploadFileInfo) uploadFileInfo.textContent = "Maximum size: 2MB";
        if (resumeUploadZone) {
          resumeUploadZone.style.borderColor = "rgba(6, 182, 212, 0.3)";
          resumeUploadZone.style.background = "rgba(var(--glass-rgb), 0.01)";
        }
      }
    }
    
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
      const res = await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/messages", { cache: 'no-store' });
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
                <h5 style="color: var(--accent-color); font-size: 14px; font-weight: 600; margin: 0;">${escapeHtml(m.name)}</h5>
                <button class="btn-del" onclick="deleteMessage(${idx})" style="background: transparent; border: none; cursor: pointer; padding: 5px; font-size: 14px; color: #ef4444;"><i class="fas fa-trash-alt"></i></button>
              </div>
              <div style="font-size: 12px; color: var(--info-color); font-weight: 500;">Email: <a href="mailto:${escapeHtml(m.email)}" style="color: var(--info-color); text-decoration: underline;">${escapeHtml(m.email)}</a></div>
              <div style="font-size: 12px; color: var(--text-muted); font-weight: 500;">Subject: ${escapeHtml(m.subject)}</div>
              <p style="font-size: 13px; color: var(--text-main); line-height: 1.5; margin: 5px 0 0; white-space: pre-wrap; width: 100%; border-top: 1px solid var(--border-color); padding-top: 8px;">${escapeHtml(m.message)}</p>
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
              <h5 style="color: var(--accent-color); font-size: 14px; font-weight: 600; margin: 0;">${escapeHtml(m.name)} (Offline)</h5>
              <button class="btn-del" onclick="deleteMessage(${idx})" style="background: transparent; border: none; cursor: pointer; padding: 5px; font-size: 14px; color: #ef4444;"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div style="font-size: 12px; color: var(--info-color); font-weight: 500;">Email: <a href="mailto:${escapeHtml(m.email)}" style="color: var(--info-color); text-decoration: underline;">${escapeHtml(m.email)}</a></div>
            <div style="font-size: 12px; color: var(--text-muted); font-weight: 500;">Subject: ${escapeHtml(m.subject)}</div>
            <p style="font-size: 13px; color: var(--text-main); line-height: 1.5; margin: 5px 0 0; white-space: pre-wrap; width: 100%; border-top: 1px solid var(--border-color); padding-top: 8px;">${escapeHtml(m.message)}</p>
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

    // Render Education list
    if (adminEducationList) {
      const education = JSON.parse(localStorage.getItem('custom_education')) || [];
      if (!education.length) {
        adminEducationList.innerHTML = '<p style="color: var(--text-muted); font-size: 13px;">No education details found.</p>';
      } else {
        adminEducationList.innerHTML = education.map((e, idx) => `
          <div class="admin-item">
            <div class="admin-item-info">
              <h5>${e.degree}</h5>
              <span>${e.institution} (${e.duration})</span>
            </div>
            <div class="admin-item-actions">
              <button class="btn-edit" onclick="editEducation(${idx})"><i class="fas fa-edit" style="color: #06b6d4;"></i></button>
              <button class="btn-del" onclick="deleteEducation(${idx})"><i class="fas fa-trash-alt" style="color: #ef4444;"></i></button>
            </div>
          </div>
        `).join('');
      }
    }

    // Trigger async global message fetch and rendering
    renderMessagesList();
  }
  
  // Expose CRUD actions globally so onclick handles work
  window.deleteProject = async function(idx) {
    if (confirm('Are you sure you want to delete this project?')) {
      const projects = JSON.parse(localStorage.getItem('custom_projects')) || [];
      projects.splice(idx, 1);
      localStorage.setItem('custom_projects', JSON.stringify(projects));
      renderDashboardLists();
      loadProjects();
      await syncProjectsToGlobalDB(projects);
    }
  };
  
  window.deleteCertificate = async function(idx) {
    if (confirm('Are you sure you want to delete this certificate?')) {
      const certs = JSON.parse(localStorage.getItem('custom_certificates')) || [];
      certs.splice(idx, 1);
      localStorage.setItem('custom_certificates', JSON.stringify(certs));
      renderDashboardLists();
      loadCertificates();
      await syncCertificatesToGlobalDB(certs);
    }
  };

  window.deleteEducation = async function(idx) {
    if (confirm('Are you sure you want to delete this education entry?')) {
      const education = JSON.parse(localStorage.getItem('custom_education')) || [];
      education.splice(idx, 1);
      localStorage.setItem('custom_education', JSON.stringify(education));
      renderDashboardLists();
      loadEducation();
      await syncEducationToGlobalDB(education);
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
        
        const dbGet = await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/messages", { cache: 'no-store' });
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

  if (btnReloadMessages) {
    btnReloadMessages.addEventListener('click', async () => {
      const originalHtml = btnReloadMessages.innerHTML;
      btnReloadMessages.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Reloading...';
      btnReloadMessages.disabled = true;
      
      try {
        await renderMessagesList();
      } catch (err) {
        console.warn("Reload messages failed:", err);
      } finally {
        btnReloadMessages.innerHTML = originalHtml;
        btnReloadMessages.disabled = false;
      }
    });
  }
  
  // Save Project Form
  if (projectForm) {
    projectForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = projectForm.querySelector('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
      btn.disabled = true;

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

      await syncProjectsToGlobalDB(projects);
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
  }
  
  // Selected certificate file cache variables
  let selectedCertBase64 = "";

  // Drag-and-drop / select event listeners for Certificate PDF file
  if (certFileInput) {
    certFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.type !== "application/pdf") {
          alert("Please upload a PDF file only!");
          certFileInput.value = "";
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          alert("File size exceeds 2MB limit!");
          certFileInput.value = "";
          return;
        }
        
        const reader = new FileReader();
        reader.onload = function(evt) {
          selectedCertBase64 = evt.target.result;
          if (certUploadText) certUploadText.textContent = file.name;
          if (certUploadInfo) certUploadInfo.textContent = `Size: ${(file.size / 1024).toFixed(1)} KB (Ready to save)`;
          if (certUploadZone) {
            certUploadZone.style.borderColor = "#10b981";
            certUploadZone.style.background = "rgba(16, 185, 129, 0.05)";
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (certUploadZone) {
    certUploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      certUploadZone.style.borderColor = "#06b6d4";
      certUploadZone.style.background = "rgba(6, 182, 212, 0.05)";
    });
    
    certUploadZone.addEventListener('dragleave', () => {
      if (selectedCertBase64) {
        certUploadZone.style.borderColor = "#10b981";
        certUploadZone.style.background = "rgba(16, 185, 129, 0.05)";
      } else {
        certUploadZone.style.borderColor = "rgba(6, 182, 212, 0.3)";
        certUploadZone.style.background = "rgba(var(--glass-rgb), 0.01)";
      }
    });
  }

  // Save Certificate Form
  if (certForm) {
    certForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!selectedCertBase64) {
        alert("Please upload a Certificate PDF file!");
        return;
      }
      
      const btn = certForm.querySelector('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
      btn.disabled = true;

      const idx = document.getElementById('cert-edit-index').value;
      const certs = JSON.parse(localStorage.getItem('custom_certificates')) || [];
      
      const newCert = {
        title: document.getElementById('form-cert-title').value,
        org: document.getElementById('form-cert-org').value,
        badge: document.getElementById('form-cert-badge-type').value,
        date: document.getElementById('form-cert-date').value,
        pdf: selectedCertBase64,
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
      
      // Clear file cache
      selectedCertBase64 = "";

      await syncCertificatesToGlobalDB(certs);
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
  }

  // Save Education Form
  if (educationForm) {
    educationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const btn = educationForm.querySelector('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
      btn.disabled = true;

      const idx = document.getElementById('education-edit-index').value;
      const education = JSON.parse(localStorage.getItem('custom_education')) || [];
      
      const newEdu = {
        degree: document.getElementById('form-edu-degree').value,
        institution: document.getElementById('form-edu-institution').value,
        duration: document.getElementById('form-edu-duration').value,
        description: document.getElementById('form-edu-desc').value
      };
      
      if (idx !== "") {
        education[parseInt(idx)] = newEdu;
      } else {
        education.push(newEdu);
      }
      
      localStorage.setItem('custom_education', JSON.stringify(education));
      eduFormModal.classList.remove('active');
      renderDashboardLists();
      loadEducation();
      
      await syncEducationToGlobalDB(education);
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
  }

  // Selected resume file cache variables
  let selectedResumeBase64 = null;
  let selectedResumeName = "";

  // Drag-and-drop / select event listeners for PDF file
  if (resumeFileInput) {
    resumeFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.type !== "application/pdf") {
          alert("Please upload a PDF file only!");
          resumeFileInput.value = "";
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          alert("File size exceeds 2MB limit!");
          resumeFileInput.value = "";
          return;
        }
        
        const reader = new FileReader();
        reader.onload = function(evt) {
          selectedResumeBase64 = evt.target.result;
          selectedResumeName = file.name;
          if (uploadZoneText) uploadZoneText.textContent = file.name;
          if (uploadFileInfo) uploadFileInfo.textContent = `Size: ${(file.size / 1024).toFixed(1)} KB (Ready to save)`;
          if (resumeUploadZone) {
            resumeUploadZone.style.borderColor = "#10b981";
            resumeUploadZone.style.background = "rgba(16, 185, 129, 0.05)";
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (resumeUploadZone) {
    resumeUploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      resumeUploadZone.style.borderColor = "#06b6d4";
      resumeUploadZone.style.background = "rgba(6, 182, 212, 0.05)";
    });
    
    resumeUploadZone.addEventListener('dragleave', () => {
      if (selectedResumeBase64) {
        resumeUploadZone.style.borderColor = "#10b981";
        resumeUploadZone.style.background = "rgba(16, 185, 129, 0.05)";
      } else {
        resumeUploadZone.style.borderColor = "rgba(6, 182, 212, 0.3)";
        resumeUploadZone.style.background = "rgba(var(--glass-rgb), 0.01)";
      }
    });
  }

  // Save Resume Form (Base64 file sync)
  if (resumeForm) {
    resumeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!selectedResumeBase64) {
        alert("Please select a PDF file first!");
        return;
      }
      
      const btn = resumeForm.querySelector('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading & Syncing...';
      btn.disabled = true;
      
      // Save locally
      localStorage.setItem('custom_resume_data', selectedResumeBase64);
      localStorage.setItem('custom_resume_filename', selectedResumeName);
      
      // Update download link
      const downloadLink = document.getElementById('resume-download-link');
      if (downloadLink) {
        downloadLink.href = selectedResumeBase64;
        downloadLink.removeAttribute('download');
      }
      
      // Save to global DB
      try {
        const res = await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/resume_data", {
          method: "POST",
          body: JSON.stringify({
            filename: selectedResumeName,
            data: selectedResumeBase64
          })
        });
        if (res.ok) {
          alert('✅ Resume uploaded and synchronized successfully on all devices!');
          if (resumeUploadZone) {
            resumeUploadZone.style.borderColor = "rgba(6, 182, 212, 0.3)";
            resumeUploadZone.style.background = "rgba(var(--glass-rgb), 0.01)";
          }
          selectedResumeBase64 = null;
          selectedResumeName = "";
          openDashboard(); // refresh filename display
        } else {
          throw new Error("Sync failed");
        }
      } catch (err) {
        console.warn("Failed to sync resume globally:", err);
        alert('⚠️ Resume saved locally on this device, but failed to sync globally (Offline).');
      } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
    });
  }

  // Delete Resume Trigger
  if (btnDeleteResume) {
    btnDeleteResume.addEventListener('click', async () => {
      if (!confirm("Are you sure you want to delete your resume? This will permanently remove it from all devices and show 'Resume Coming Soon' on the live website.")) {
        return;
      }
      
      const originalText = btnDeleteResume.innerHTML;
      btnDeleteResume.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';
      btnDeleteResume.disabled = true;
      
      // Delete locally
      localStorage.removeItem('custom_resume_data');
      localStorage.removeItem('custom_resume_filename');
      
      // Update link on live site
      const downloadLink = document.getElementById('resume-download-link');
      if (downloadLink) {
        downloadLink.href = '#';
        downloadLink.textContent = "Resume Coming Soon";
        downloadLink.removeAttribute('download');
      }
      
      // Delete from global DB
      try {
        const res = await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/resume_data", {
          method: "POST",
          body: JSON.stringify({}) // Empty object indicates deleted
        });
        if (res.ok) {
          alert('✅ Resume deleted and synchronized successfully on all devices!');
          
          // Reset file caches
          selectedResumeBase64 = null;
          selectedResumeName = "";
          
          // Clear input file element
          if (resumeFileInput) resumeFileInput.value = "";
          
          openDashboard(); // refresh filename display
        } else {
          throw new Error("Delete sync failed");
        }
      } catch (err) {
        console.warn("Failed to sync resume deletion globally:", err);
        alert('⚠️ Resume deleted locally, but failed to sync deletion globally (Offline).');
        openDashboard();
      } finally {
        btnDeleteResume.innerHTML = originalText;
        btnDeleteResume.disabled = false;
      }
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
      document.getElementById('form-cert-desc').value = "";
      
      // Reset upload zone
      selectedCertBase64 = "";
      if (certUploadText) certUploadText.textContent = "Drag & Drop or Click to Upload PDF";
      if (certUploadInfo) certUploadInfo.textContent = "Maximum size: 2MB";
      if (certUploadZone) {
        certUploadZone.style.borderColor = "rgba(6, 182, 212, 0.3)";
        certUploadZone.style.background = "rgba(var(--glass-rgb), 0.01)";
      }
      if (certFileInput) certFileInput.value = "";
      
      certFormModal.classList.add('active');
    });
  }

  // Add Education Trigger
  if (btnAddEducation) {
    btnAddEducation.addEventListener('click', () => {
      document.getElementById('education-form-title').textContent = "Add Education";
      document.getElementById('education-edit-index').value = "";
      document.getElementById('form-edu-degree').value = "";
      document.getElementById('form-edu-institution').value = "";
      document.getElementById('form-edu-duration').value = "";
      document.getElementById('form-edu-desc').value = "";
      eduFormModal.classList.add('active');
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
      document.getElementById('form-cert-desc').value = c.description;
      
      // Set existing PDF payload in cache and style the upload zone
      selectedCertBase64 = c.pdf || "";
      if (certUploadText) {
        certUploadText.textContent = c.title ? `${c.title}.pdf` : "Existing PDF Certificate Loaded";
      }
      if (certUploadInfo) certUploadInfo.textContent = "Drag & Drop a new PDF to replace it";
      if (certUploadZone) {
        certUploadZone.style.borderColor = "#06b6d4";
        certUploadZone.style.background = "rgba(6, 182, 212, 0.05)";
      }
      if (certFileInput) certFileInput.value = "";
      
      certFormModal.classList.add('active');
    }
  };

  window.editEducation = function(idx) {
    const education = JSON.parse(localStorage.getItem('custom_education')) || [];
    const e = education[idx];
    if (e) {
      document.getElementById('education-form-title').textContent = "Edit Education";
      document.getElementById('education-edit-index').value = idx;
      document.getElementById('form-edu-degree').value = e.degree;
      document.getElementById('form-edu-institution').value = e.institution;
      document.getElementById('form-edu-duration').value = e.duration;
      document.getElementById('form-edu-desc').value = e.description;
      eduFormModal.classList.add('active');
    }
  };
  
  // --- Profile Management Logic ---
  let selectedProfileImageBase64 = "";

  const profileForm = document.getElementById('admin-profile-form');
  const profileFileInput = document.getElementById('form-profile-file');
  const profileUploadText = document.getElementById('profile-upload-text');
  const profileUploadInfo = document.getElementById('profile-upload-info');
  const profileUploadZone = document.getElementById('profile-upload-zone');

  function populateProfileForm() {
    const profile = JSON.parse(localStorage.getItem('custom_profile')) || defaultProfile;
    
    const fields = {
      'form-profile-name': profile.name,
      'form-profile-fullname': profile.fullName,
      'form-profile-subtitle': profile.subtitle,
      'form-profile-bio': profile.bio,
      'form-profile-email': profile.email,
      'form-profile-github': profile.github,
      'form-profile-linkedin': profile.linkedin,
      'form-profile-instagram': profile.instagram
    };
    
    for (const [id, value] of Object.entries(fields)) {
      const el = document.getElementById(id);
      if (el) el.value = value || '';
    }
    
    const rolesEl = document.getElementById('form-profile-roles');
    if (rolesEl) {
      rolesEl.value = (profile.roles || []).join('\n');
    }
    
    // Pre-select active theme radio button
    const activeTheme = profile.theme || 'default';
    const radios = document.getElementsByName('website-theme');
    radios.forEach(radio => {
      if (radio.value === activeTheme) {
        radio.checked = true;
      }
    });

    selectedProfileImageBase64 = profile.image || 'profile.jpg';
    if (profileUploadText) {
      profileUploadText.textContent = profile.image ? (profile.image.startsWith('data:') ? 'Custom profile image active' : profile.image) : "Drag & Drop or Click to Upload Image";
    }
    if (profileUploadInfo) {
      profileUploadInfo.textContent = profile.image ? "Upload a new image to replace it" : "Recommended: Square ratio, maximum size 1MB";
    }
    if (profileUploadZone) {
      if (profile.image) {
        profileUploadZone.style.borderColor = "#06b6d4";
        profileUploadZone.style.background = "rgba(6, 182, 212, 0.02)";
      } else {
        profileUploadZone.style.borderColor = "rgba(6, 182, 212, 0.3)";
        profileUploadZone.style.background = "rgba(var(--glass-rgb), 0.01)";
      }
    }
  }

  // Bind file input change for profile photo
  if (profileFileInput) {
    profileFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 1024 * 1024) { // 1MB limit for local storage
          alert("Image file size is too large! Maximum limit is 1MB.");
          profileFileInput.value = "";
          return;
        }
        const reader = new FileReader();
        reader.onload = function(evt) {
          selectedProfileImageBase64 = evt.target.result;
          if (profileUploadText) {
            profileUploadText.textContent = `Selected: ${file.name}`;
          }
          if (profileUploadInfo) {
            profileUploadInfo.textContent = `Size: ${(file.size / 1024).toFixed(1)} KB (Ready to save)`;
          }
          if (profileUploadZone) {
            profileUploadZone.style.borderColor = "#06b6d4";
            profileUploadZone.style.background = "rgba(6, 182, 212, 0.05)";
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Submit Profile Form (Local storage + KVDB Sync)
  if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const btn = profileForm.querySelector('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving & Syncing...';
      btn.disabled = true;

      // Retrieve selected theme
      let selectedTheme = "default";
      const radios = document.getElementsByName('website-theme');
      for (const radio of radios) {
        if (radio.checked) {
          selectedTheme = radio.value;
          break;
        }
      }
      
      const updatedProfile = {
        name: document.getElementById('form-profile-name').value.trim(),
        fullName: document.getElementById('form-profile-fullname').value.trim(),
        subtitle: document.getElementById('form-profile-subtitle').value.trim(),
        roles: document.getElementById('form-profile-roles').value.split('\n').map(r => r.trim()).filter(r => r.length > 0),
        bio: document.getElementById('form-profile-bio').value.trim(),
        email: document.getElementById('form-profile-email').value.trim(),
        github: document.getElementById('form-profile-github').value.trim(),
        linkedin: document.getElementById('form-profile-linkedin').value.trim(),
        instagram: document.getElementById('form-profile-instagram').value.trim(),
        theme: selectedTheme,
        image: selectedProfileImageBase64 || "profile.jpg"
      };
      
      // Save locally
      localStorage.setItem('custom_profile', JSON.stringify(updatedProfile));
      loadProfile();
      
      // Sync to global DB
      try {
        const res = await fetch("https://kvdb.io/EK4jNKvvT4vo6nSGRy4GtW/profile_data", {
          method: "POST",
          body: JSON.stringify(updatedProfile)
        });
        if (res.ok) {
          alert('✅ Profile details updated and synchronized successfully on all devices!');
        } else {
          throw new Error("Sync failed");
        }
      } catch (err) {
        console.warn("Global database sync failed for profile, saved locally:", err);
        alert('⚠️ Profile saved locally (offline cache active). Edits will load on this browser, but global database sync failed.');
      } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
    });
  }

  // Logout Trigger
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('admin_logged_in');
      dashboardModal.classList.remove('active');
    });
  }
  
  if (btnExportConfig) {
    btnExportConfig.addEventListener('click', () => {
      const projects = localStorage.getItem('custom_projects');
      const certs = localStorage.getItem('custom_certificates');
      const education = localStorage.getItem('custom_education');
      const profile = localStorage.getItem('custom_profile') || JSON.stringify(defaultProfile);
      
      const configText = `// Copy and replace the database arrays at the beginning of script.js to make your edits permanent!

const defaultProfile = ${profile};

const defaultProjects = ${projects};

const defaultCerts = ${certs};

const defaultEducation = ${education};`;
      
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

// ===== FLOATING AI PORTFOLIO CHATBOT ASSISTANT =====
(function() {
  const bubble = document.getElementById('ai-chat-bubble');
  const windowEl = document.getElementById('ai-chat-window');
  const closeBtn = document.getElementById('close-ai-chat');
  const chatBody = document.getElementById('ai-chat-body');
  const chatHistory = document.getElementById('ai-chat-history');
  const chatInput = document.getElementById('ai-chat-input');
  const sendBtn = document.getElementById('send-ai-message');
  const suggestions = document.getElementById('chat-suggestions');
  const toggleVoiceBtn = document.getElementById('toggle-ai-voice');

  if (!bubble || !windowEl) return;

  // Speech synthesis state (default to enabled, cached in localStorage)
  let isSpeechEnabled = localStorage.getItem('ai_speech_enabled') !== 'false';
  
  // Update toggle button icon state based on isSpeechEnabled
  const updateVoiceIcon = () => {
    if (!toggleVoiceBtn) return;
    if (isSpeechEnabled) {
      toggleVoiceBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      toggleVoiceBtn.title = "Mute AI voice";
    } else {
      toggleVoiceBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
      toggleVoiceBtn.title = "Unmute AI voice";
    }
  };

  // Speak the chatbot response using Web Speech Synthesis API
  const speakResponse = (text) => {
    if (!isSpeechEnabled) return;
    if ('speechSynthesis' in window) {
      // Cancel active speaking to avoid overlap
      window.speechSynthesis.cancel();
      
      // Clean up text by stripping HTML tags and emoticons for clean TTS reading
      let cleanText = text
        .replace(/<[^>]*>/g, ' ')
        .replace(/👉|👋|🤖|💻|📧|📚|🏆|🛠️|🚀|📊|✨|🔥|💖|💔|✅|🎓/g, '')
        .replace(/\s+/g, ' ')
        .trim();
        
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voices = window.speechSynthesis.getVoices();
      
      // Filter English voices
      const engVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
      
      // Look for beautiful female English voices in order of premium preference
      let selectedVoice = engVoices.find(v => {
        const name = v.name.toLowerCase();
        return name.includes('google us english') || name.includes('samantha') || name.includes('zira') || name.includes('female') || name.includes('natural');
      });
      
      // Fallback 1: Any soft English voice with female name indicators
      if (!selectedVoice) {
        selectedVoice = engVoices.find(v => {
          const name = v.name.toLowerCase();
          return name.includes('female') || name.includes('susan') || name.includes('hazel') || name.includes('heera') || name.includes('linda') || name.includes('kathy') || name.includes('sally');
        });
      }
      
      // Fallback 2: First en-US voice
      if (!selectedVoice) {
        selectedVoice = engVoices.find(v => v.lang.toLowerCase().startsWith('en-us'));
      }
      
      // Fallback 3: First available English voice
      if (!selectedVoice) {
        selectedVoice = engVoices[0];
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      // Setup warm, human-like voice characteristics
      utterance.pitch = 1.15; // Slightly higher pitch for a very clear and soft voice
      utterance.rate = 0.98; // Very slightly slower rate for optimal clarity and premium tone
      window.speechSynthesis.speak(utterance);
    }
  };

  // Pre-load and cache voices asynchronously (specifically helpful for Chrome)
  if ('speechSynthesis' in window && window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }

  // Sync initial icon state
  updateVoiceIcon();

  // Voice toggle action
  if (toggleVoiceBtn) {
    toggleVoiceBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isSpeechEnabled = !isSpeechEnabled;
      localStorage.setItem('ai_speech_enabled', isSpeechEnabled);
      updateVoiceIcon();
      
      if (isSpeechEnabled) {
        speakResponse("Voice active");
      } else {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      }
    });
  }

  // Clear chat history and restore the initial greeting
  const resetChat = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (chatHistory) {
      chatHistory.innerHTML = `
        <!-- Welcome Message -->
        <div class="chat-message ai-message">
          <div class="msg-bubble">
            Hello! 👋 I'm Phaneendra's AI Assistant. I can tell you all about his projects, skills, education, certifications, and how to get in touch! How can I help you today?
          </div>
        </div>
      `;
    }
    if (chatInput) {
      chatInput.value = '';
    }
  };

  // Toggle chat window
  bubble.addEventListener('click', () => {
    windowEl.classList.toggle('active');
    if (windowEl.classList.contains('active')) {
      resetChat();
      setTimeout(() => chatInput.focus(), 300);
    }
  });

  closeBtn.addEventListener('click', () => {
    windowEl.classList.remove('active');
  });

  // Get dynamic content from site configuration
  const getAIContext = () => {
    const profile = JSON.parse(localStorage.getItem('custom_profile')) || {
      name: "PHANEENDRA",
      roles: "Full Stack Developer\nAI & ML Engineer",
      bio: "I'm Phaneendra, a passionate CSE student specializing in AI & ML. As a full-stack developer, I craft seamless digital experiences.",
      email: "Phanee2005@gmail.com",
      github: "https://github.com/Phaneendra1228",
      linkedin: "https://www.linkedin.com/in/jujjavarapu-naga-venkata-phaneendra-7416a232a/"
    };
    
    const projects = JSON.parse(localStorage.getItem('custom_projects')) || [];
    const certs = JSON.parse(localStorage.getItem('custom_certificates')) || [];
    
    return { profile, projects, certs };
  };

  // Add message bubble to chat
  const appendMessage = (sender, content, isHtml = false) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}-message`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'msg-bubble';
    if (isHtml) {
      bubbleDiv.innerHTML = content;
    } else {
      bubbleDiv.textContent = content;
    }
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'msg-time';
    const now = new Date();
    timeSpan.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    msgDiv.appendChild(bubbleDiv);
    msgDiv.appendChild(timeSpan);
    
    if (chatHistory) {
      chatHistory.appendChild(msgDiv);
    }
    
    // Auto scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  // Show thinking indicator
  const showThinking = () => {
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'chat-message ai-message';
    thinkingDiv.id = 'ai-thinking';
    
    const loader = document.createElement('div');
    loader.className = 'thinking-bubble';
    loader.innerHTML = '<span></span><span></span><span></span>';
    
    thinkingDiv.appendChild(loader);
    
    if (chatHistory) {
      chatHistory.appendChild(thinkingDiv);
    }
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const removeThinking = () => {
    const thinking = document.getElementById('ai-thinking');
    if (thinking) thinking.remove();
  };

  const processQuery = (rawQuery) => {
    const query = rawQuery.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"");
    const { profile, projects, certs } = getAIContext();
    
    // Greeting
    if (query === '' || ['hi', 'hello', 'hey', 'greetings', 'sup', 'yo'].some(w => query.startsWith(w)) || ['who are you', 'purpose', 'about', 'assistant'].some(w => query.includes(w))) {
      return `Hello! 👋 I'm Phaneendra's AI Assistant, built specifically to guide you through his work and tech profile. <br><br>You can ask me about his **projects**, **skills**, **certificates**, **resume**, or how to **contact** him. What are you interested in?`;
    }
    
    // Resume download / CV
    if (['resume', 'cv', 'pdf', 'biodata'].some(w => query.includes(w))) {
      return `Phaneendra's professional resume is fully loaded and ready to download! <br><br>👉 Click the **"GET MY RESUME"** button in the **About Me** section to preview and download the PDF directly in a new tab.`;
    }

    // Hobbies / Interests
    if (['hobby', 'interest', 'music', 'ride', 'game', 'motorcycle', 'coding', 'learn'].some(w => query.includes(w))) {
      return `Phaneendra has dynamic interests both inside and outside of tech! <br><br>
        💻 **Coding & Learning**: Constant focus on advanced full-stack systems and neural network architectures.<br>
        🏍️ **Riding**: Loves exploring the streets and scenic routes on motorbikes.<br>
        🎮 **Gaming**: Enjoys immersive digital environments and competitive gameplay.<br>
        🎵 **Music**: Relaxes and stays inspired by tuning into premium background beats.<br><br>
        You can see his interests highlighted with beautiful interactive cards under the **About Me** section!`;
    }

    // Location
    if (['location', 'live', 'city', 'address', 'where', 'india', 'hyderabad'].some(w => query.includes(w))) {
      return `Phaneendra lives in **Hyderabad, India**! 🇮🇳 <br><br>It's one of India's major high-tech hubs, providing a great ecosystem for tech innovation and software engineering.`;
    }

    // Hackathons
    if (['avinya', 'anurag', 'codestorm', 'techknow', 'hackathon'].some(w => query.includes(w))) {
      return `Phaneendra is highly passionate about hackathons! Here are the ones he has excelled in:<br><br>
        🏆 **AVINYA 2K25 (Anurag University)**: A national-level 24-hour hackathon where he engineered AI-driven solutions on **18th - 19th September 2025**.<br>
        🥇 **Fresher's CodeStorm 2K25 (Narsimha Reddy Engineering College)**: Secured **Second Prize** in this intense 8-hour hackathon with team CTRL FREAKS.<br>
        🚀 **Techknow 2.0 (Knowvation Learnings)**: A comprehensive 24-hour hackathon and tech summit in March 2025.`;
    }
    
    // Projects
    if (['project', 'work', 'build', 'app', 'website', 'github', 'demo', 'code'].some(w => query.includes(w))) {
      if (projects.length === 0) {
        return `Phaneendra has built several premium full-stack and AI projects! You can check his live GitHub repositories directly in the **Recent Works** section of this page.`;
      }
      const projectList = projects.slice(0, 3).map(p => `
        <li style="margin-bottom: 12px; list-style-type: none; border-left: 2px solid var(--accent-color); padding-left: 10px;">
          <strong style="color: var(--heading-color);">${p.title}</strong> <span style="font-size: 11px; background: rgba(var(--glass-rgb), 0.05); padding: 2px 6px; border-radius: 4px; color: var(--accent-color); font-weight: 600;">${p.tag || "Project"}</span><br>
          <span style="font-size: 13px; color: var(--text-muted);">${p.description || ""}</span><br>
          <a href="${p.link}" target="_blank" style="color: var(--accent-color); font-size: 12px; text-decoration: none; font-weight: 500;"><i class="fab fa-github"></i> Repository</a>
          ${p.live ? `| <a href="${p.live}" target="_blank" style="color: var(--accent-color); font-size: 12px; text-decoration: none; font-weight: 500;"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
        </li>
      `).join('');
      
      return `Phaneendra has designed and engineered several state-of-the-art applications. Here are some of his top projects:<br><br>
        <ul style="padding-left: 0;">${projectList}</ul>
        You can view all of them in detail in the **Recent Works** section!`;
    }
    
    // Skills
    if (['skill', 'stack', 'language', 'python', 'javascript', 'react', 'html', 'css', 'java', 'ml', 'ai', 'deep', 'tensor', 'fastapi'].some(w => query.includes(w))) {
      return `Phaneendra is a highly skilled full-stack developer and AI/ML enthusiast. His key technologies include:<br><br>
        💻 **Core Languages**: Python, JavaScript (ES6+), HTML5, CSS3, C++, SQL<br>
        🚀 **Web Libraries**: React.js, Next.js, Node.js, FastAPI, Express.js<br>
        🧠 **AI/ML Engine**: TensorFlow, Keras, Scikit-Learn, Pandas, NumPy<br>
        🛠️ **Platforms**: GitHub, Vercel, Supabase, Render, Git<br><br>
        He specializes in building intelligent web apps that seamlessly fuse deep learning algorithms with sleek UI designs. Try scrolling to his **Skills** section to see them react interactively!`;
    }
    
    // Certificates
    if (['cert', 'award', 'win', 'trophy', 'achieve'].some(w => query.includes(w))) {
      if (certs.length === 0) {
        return `Phaneendra holds multiple achievements and has participated in multiple developer hackathons! You can explore and download his certification documents in the **Certificates** section below.`;
      }
      const certList = certs.slice(0, 3).map(c => `
        <li style="margin-bottom: 8px; list-style-type: none; border-left: 2px solid #10b981; padding-left: 10px;">
          🏆 <strong>${c.title}</strong><br>
          <span style="font-size: 12px; color: var(--text-muted);">Organized by ${c.org} | ${c.date}</span>
        </li>
      `).join('');
      
      return `Phaneendra is highly active in tech challenges. Here are some of his notable certifications:<br><br>
        <ul style="padding-left: 0;">${certList}</ul>
        You can download and verify the official PDFs directly in the **Certificates** panel!`;
    }
    
    // Education
    if (['study', 'college', 'school', 'degree', 'edu', 'university', 'btech', 'cse'].some(w => query.includes(w))) {
      return `Phaneendra is currently pursuing his **Bachelor of Technology (B.Tech) in Computer Science and Engineering (CSE)** with a core focus on **Artificial Intelligence & Machine Learning**. <br><br>He has built a strong theoretical foundation in algorithms and neural networks, translating them directly into his full-stack coding portfolio.`;
    }
    
    // Contact / Hiring
    if (['contact', 'hire', 'email', 'phone', 'job', 'reach', 'linkedin', 'insta', 'mail'].some(w => query.includes(w))) {
      return `You can connect with Phaneendra directly! He is always open to exciting new collaborations and full-time opportunities:<br><br>
        📧 **Email**: <a href="mailto:${profile.email}" style="color: var(--accent-color); font-weight: 600; text-decoration: none;">${profile.email}</a><br>
        💼 **LinkedIn**: <a href="${profile.linkedin}" target="_blank" style="color: var(--accent-color); text-decoration: none; font-weight: 500;">J.N.V. Phaneendra</a><br>
        🐙 **GitHub**: <a href="${profile.github}" target="_blank" style="color: var(--accent-color); text-decoration: none; font-weight: 500;">@Phaneendra1228</a><br><br>
        You can also type your message in the **Contact Form** on the homepage to send an instant message straight to his dashboard!`;
    }
    
    // Jokes / Easter Egg
    if (['joke', 'funny', 'hacker', 'matrix', 'terminal'].some(w => query.includes(w))) {
      const jokes = [
        "Why do programmers wear glasses? Because they can't C#! 🤓",
        "There are 10 types of people in the world: those who understand binary, and those who don't! 💻",
        "Why did the database administrator leave his wife? She had too many one-to-many relationships! 💔",
        "An AI assistant walks into a bar... The bartender says: 'What'll it be?' The AI replies: 'I'm sorry, as a language model, I cannot consume beverages!' 🤖"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    // General fallback
    return `I'm not fully sure how to answer that specific question. 🤖<br><br>However, as Phaneendra's personal assistant, I can easily help you with:<br>
      👉 **Projects** (ask me *'what projects did he build?'*)<br>
      👉 **Tech Stack** (ask me *'what are his skills?'*)<br>
      👉 **Certifications** (ask me *'show me his achievements'*)<br>
      👉 **Resume** (ask me *'can I see his resume?'*)<br>
      👉 **Contact** (ask me *'how do I email him?'*)`;
  };

  // Scroll Viewport matching user query keywords to spotlight relevant sections
  const performInteractiveScroll = (query) => {
    const scrollMap = {
      'project': '#services',
      'work': '#services',
      'skill': '#skills',
      'stack': '#skills',
      'edu': '#education',
      'study': '#education',
      'college': '#education',
      'cert': '#certificates',
      'award': '#certificates',
      'hack': '#certificates',
      'avinya': '#certificates',
      'anurag': '#certificates',
      'codestorm': '#certificates',
      'techknow': '#certificates',
      'contact': '#contact',
      'hire': '#contact',
      'email': '#contact'
    };
    
    for (const [key, selector] of Object.entries(scrollMap)) {
      if (query.includes(key)) {
        const targetEl = document.querySelector(selector);
        if (targetEl) {
          setTimeout(() => {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 850);
          break; // scroll only to the first matched section
        }
      }
    }
  };

  // Handle message sending
  const handleUserMessage = (text) => {
    if (!text.trim()) return;
    
    // Append user message
    appendMessage('user', text);
    chatInput.value = '';
    
    // Scroll body
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Show AI typing delay
    showThinking();
    
    // Clear speechSynthesis if user submitted text manually
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    setTimeout(() => {
      removeThinking();
      const response = processQuery(text);
      appendMessage('ai', response, true);
      speakResponse(response);
      
      const queryClean = text.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"");
      performInteractiveScroll(queryClean);
      
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 600);
  };

  // Event Listeners
  sendBtn.addEventListener('click', () => {
    handleUserMessage(chatInput.value);
  });

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleUserMessage(chatInput.value);
    }
  });

  // Suggestion chips handler
  suggestions.addEventListener('click', (e) => {
    const chip = e.target.closest('.suggest-chip');
    if (!chip) return;
    
    const query = chip.getAttribute('data-query');
    let userQuery = '';
    
    if (query === 'projects') userQuery = "Show me Phaneendra's top projects!";
    if (query === 'skills') userQuery = "What is his developer tech stack?";
    if (query === 'certs') userQuery = "What certifications does he have?";
    if (query === 'resume') userQuery = "Can I download his professional resume?";
    if (query === 'contact') userQuery = "How can I contact Phaneendra?";
    
    handleUserMessage(userQuery);
  });

  // --- Speech Recognition (Voice Input Microphone Integration) ---
  const micBtn = document.getElementById('toggle-ai-mic');
  let recognition = null;
  
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        if (micBtn) {
          micBtn.classList.add('listening');
          micBtn.title = "Listening...";
        }
        if (chatInput) {
          chatInput.placeholder = "Listening...";
        }
      };
      
      recognition.onend = () => {
        if (micBtn) {
          micBtn.classList.remove('listening');
          micBtn.title = "Speak to AI";
        }
        if (chatInput) {
          chatInput.placeholder = "Type a question...";
        }
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (chatInput) {
          chatInput.value = transcript;
          handleUserMessage(transcript);
        }
      };
      
      recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        if (micBtn) {
          micBtn.classList.remove('listening');
        }
      };
    } catch (err) {
      console.warn("Speech recognition initialization failed:", err);
      recognition = null;
    }
  }
  
  if (micBtn) {
    if (recognition) {
      micBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (micBtn.classList.contains('listening')) {
          recognition.stop();
        } else {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
          }
          recognition.start();
        }
      });
    } else {
      micBtn.style.display = 'none'; // hide microphone button if browser doesn't support STT
    }
  }

  // ===== GLOBAL TOUCH STICKY HOVER MITIGATION SYSTEM =====
  // On touch devices, simulated mouse events (and the sticky :hover state) 
  // are applied after touch events. To cleanly release these sticky states:
  const touchInteractiveSelectors = 'a, button, .btn-hire, .social_icon li a, .footer .social-links a, .suggest-chip, .toggle-mic-btn, .scroll-up-btn, .theme-switch, .admin-float-btn, .project-link, .cert-card, .interest, .check-bg';
  
  // 1. Release simulated hover state immediately after tap/click completes
  document.addEventListener('click', (e) => {
    const interactiveTarget = e.target.closest(touchInteractiveSelectors);
    if (interactiveTarget) {
      // We blur after a tiny delay so the browser fully finishes processing 
      // the click and simulated mouse states before we strip the focus/hover.
      setTimeout(() => {
        interactiveTarget.blur();
      }, 100);
    }
  });

  // 2. Release on touchend/touchcancel to cover any gestures or direct taps
  document.addEventListener('touchend', (e) => {
    const interactiveTarget = e.target.closest(touchInteractiveSelectors);
    if (interactiveTarget) {
      setTimeout(() => {
        interactiveTarget.blur();
      }, 350); // Larger delay to clear simulated mouse events that trigger ~300ms later
    }
  }, { passive: true });

  document.addEventListener('touchcancel', (e) => {
    const interactiveTarget = e.target.closest(touchInteractiveSelectors);
    if (interactiveTarget) {
      interactiveTarget.blur();
    }
  }, { passive: true });

  // 3. Clear simulated states when returning to the tab (essential for target="_blank" links like Instagram)
  window.addEventListener('focus', () => {
    const activeEl = document.activeElement;
    if (activeEl && activeEl.closest(touchInteractiveSelectors)) {
      activeEl.blur();
    }
  });
  
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      const activeEl = document.activeElement;
      if (activeEl && activeEl.closest(touchInteractiveSelectors)) {
        activeEl.blur();
      }
    }
  });
})();

