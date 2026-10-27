
const translations = {
  fr: {
    // Navigation & Orbite
    nav_home: "Profil",
    nav_projects: "Projets",
    nav_about: "Parcours",
    nav_contact: "Contact",
    orbit_projects: "Projets",
    orbit_about: "Parcours",
    orbit_contact: "Contact",

    // Thème
    theme_light: "Clair",
    theme_dark: "Sombre",

    // Section Hero
    hero_desc: "Développeur web en formation, je crée des expériences interactives aussi harmonieuses techniquement que visuellement.",
    hero_status: "Recherche d'un stage de 8 à 10 semaines début avril 2027.",
    btn_preview: "Aperçu du CV",
    btn_download: "Télécharger le CV",

    // Modale : Onglets
    tab_profile: "01. Profil",
    tab_projects: "02. Projets",
    tab_cv: "03. CV",
    tab_parcours: "04. Parcours",
    tab_contact: "05. Contact",

    // Modale : Onglet Profil
    modal_status: "Étudiant BUT2 Informatique",
    modal_bio: "Passionné par le développement d'applications logicielles, web et l'architecture de code propre. Je conçois des projets rigoureux et ergonomiques pensés pour durer.",
    feat_arch_title: "Architecture Robuste",
    feat_arch_desc: "Code propre, orienté objet, typé et respectant les patrons de conception.",
    feat_perf_title: "Performances & BDD",
    feat_perf_desc: "Modélisation SQL rigoureuse, requêtes optimisées et gestion système Linux.",
    feat_ui_title: "UI & Micro-interactions",
    feat_ui_desc: "Interfaces fluides, transitions soignées et design centré utilisateur.",

    // Modale : Autres onglets
    projects_title: "Mes Projets",
    projects_desc: "Retrouve ici FractaLens, PacMan, AnimeBox et mes autres réalisations.",
    parcours_title: "Voici mon parcours",
    parcours_desc: "IUT de Lens — BUT Informatique (2025-2027).",
    contact_title: "Me contacter",
    contact_desc: "Une proposition de stage ou un projet ? Écris-moi !",

    // Modale : Footer
    modal_close_btn: "Fermer la vue"
  },

  en: {
    // Navigation & Orbite
    nav_home: "Profile",
    nav_projects: "Projects",
    nav_about: "About",
    nav_contact: "Contact",
    orbit_projects: "Projects",
    orbit_about: "About",
    orbit_contact: "Contact",

    // Thème
    theme_light: "Light",
    theme_dark: "Dark",

    // Section Hero
    hero_desc: "Web developer in training, crafting interactive experiences that are as technically sound as they are visually engaging.",
    hero_status: "Seeking an 8 to 10-week internship starting early April 2027.",
    btn_preview: "Preview Resume",
    btn_download: "Download Resume",

    // Modale : Onglets
    tab_profile: "01. Profile",
    tab_projects: "02. Projects",
    tab_cv: "03. Resume",
    tab_parcours: "04. Journey",
    tab_contact: "05. Contact",

    // Modale : Onglet Profil
    modal_status: "2nd-Year CS Student",
    modal_bio: "Passionate about software and web development and clean code architecture. I design rigorous, ergonomic projects built to last.",
    feat_arch_title: "Robust Architecture",
    feat_arch_desc: "Clean, object-oriented, typed code adhering to software design patterns.",
    feat_perf_title: "Performance & Database",
    feat_perf_desc: "Rigorous SQL modeling, optimized queries, and Linux system administration.",
    feat_ui_title: "UI & Micro-interactions",
    feat_ui_desc: "Fluid interfaces, polished transitions, and user-centered design.",

    // Modale : Autres onglets
    projects_title: "My Projects",
    projects_desc: "Explore FractaLens, PacMan, AnimeBox, and my other applications.",
    parcours_title: "My Journey",
    parcours_desc: "IUT de Lens — Computer Science Degree (2025-2027).",
    contact_title: "Get in touch",
    contact_desc: "Have an internship opportunity or a project? Drop me a message!",

    // Modale : Footer
    modal_close_btn: "Close view"
  }
};







const themeBtn = document.querySelector('.theme');

function updateThemeText() {
  const themeText = document.querySelector('.theme-text');
  const themeIcon = document.querySelector('.theme .icon');
  if (!themeText) return;

  const currentLang = localStorage.getItem('portfolio-lang') || 'fr';
  const isLight = document.body.classList.contains('light-theme');

  if (isLight) {
    themeText.textContent = translations[currentLang].theme_dark;
    if (themeIcon) themeIcon.textContent = '🌙';
  } else {
    themeText.textContent = translations[currentLang].theme_light;
    if (themeIcon) themeIcon.textContent = '☀️';
  }
}

// Restauration du thème sauvegardé
if (localStorage.getItem('portfolio-theme') === 'light') {
  document.body.classList.add('light-theme');
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    updateThemeText();
  });
}









const langContainer = document.querySelector('.language');
const langButtons = document.querySelectorAll('.language button');

function setLanguage(lang) {
  // Déplacement de l'indicateur liquide
  if (langContainer) {
    if (lang === 'en') {
      langContainer.classList.add('is-en');
    } else {
      langContainer.classList.remove('is-en');
    }
  }

  // Mise à jour visuelle des boutons
  langButtons.forEach((btn) => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.className = 'language-button-active';
    } else {
      btn.className = 'language-button';
    }
  });

  // Mise à jour de tous les textes balisés
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  localStorage.setItem('portfolio-lang', lang);

  // Synchronisation du texte du bouton Thème avec la nouvelle langue
  updateThemeText();
}

langButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    setLanguage(btn.getAttribute('data-lang'));
  });
});

// Initialisation au chargement de la page
const initialLang = localStorage.getItem('portfolio-lang') || 'fr';
setLanguage(initialLang);








const modalOverlay = document.getElementById('modal-overlay');
const closeBtn = document.getElementById('modal-close');
const closeTextBtn = document.getElementById('modal-close-text');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

function openModal(targetTab = 'profil') {
  tabButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === targetTab);
  });
  tabContents.forEach(content => {
    content.classList.toggle('active', content.id === `tab-${targetTab}`);
  });

  if (modalOverlay) modalOverlay.classList.add('open');
}

function closeModal() {
  if (modalOverlay) modalOverlay.classList.remove('open');
}

if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (closeTextBtn) closeTextBtn.addEventListener('click', closeModal);

if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    openModal(btn.dataset.tab);
  });
});

// Clics sur les liens de la navbar
document.querySelectorAll('.navbar .nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.dataset.tab;
    if (target) {
      openModal(target);
    } else {
      const text = link.textContent.trim().toLowerCase();
      if (text.includes('projet') || text.includes('project')) openModal('projets');
      else if (text.includes('parcour') || text.includes('about') || text.includes('cv')) openModal('cv');
      else if (text.includes('contact')) openModal('contact');
      else openModal('profil');
    }
  });
});

// Clics sur les pastilles satellites du vinyle
const vinyleProject = document.querySelector('.vinyle-project');
const vinyleParcours = document.querySelector('.vinyle-parcours');
const vinyleContact = document.querySelector('.vinyle-contact');

if (vinyleProject) vinyleProject.addEventListener('click', () => openModal('projets'));
if (vinyleParcours) vinyleParcours.addEventListener('click', () => openModal('cv'));
if (vinyleContact) vinyleContact.addEventListener('click', () => openModal('contact'));









const bgMusic = new Audio('assets/music/Beanie.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.2;

const playBtn = document.querySelector('.play-button');
const playIcon = playBtn ? playBtn.querySelector('.play-icon') : null;
const grooves = document.querySelector('.vinyle-grooves');

let isPlaying = false;

if (playBtn) {
  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      // Pause
      bgMusic.pause();
      if (grooves) grooves.classList.remove('playing');
      playBtn.classList.remove('is-playing');
      if (playIcon) playIcon.textContent = '▶';
      isPlaying = false;
    } else {
      // Reprise visuelle immédiate
      isPlaying = true;
      if (grooves) grooves.classList.add('playing');
      playBtn.classList.add('is-playing');
      if (playIcon) playIcon.textContent = '⏸';

      // Reprise audio
      bgMusic.play().catch(err => {
        console.warn("Lecture audio bloquée :", err);
      });
    }
  });
  
  // Clic sur "Aperçu du CV" : ouvre directement l'onglet CV dans la popup
const btnPreviewCv = document.getElementById('btn-preview-cv');
if (btnPreviewCv) {
  btnPreviewCv.addEventListener('click', () => {
    openModal('cv');
  });
}

}