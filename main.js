/* ==========================================================================
   Ancilin P G - Portfolio Main JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTypedText();
  initNavbarScroll();
  initMobileMenu();
  initProjectFilters();
  initModalHandler();
  initContactForm();
  initActiveNavHighlight();
});

/* 1. Typing Animation Effect */
function initTypedText() {
  const typedElem = document.getElementById('typedText');
  if (!typedElem) return;

  const phrases = [
    'AWS Cloud Architectures',
    'Full-Stack Web Apps',
    'Django & Spring Boot Backends',
    'Data Science & Analytics Solutions'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const delayBetweenPhrases = 2000;

  function type() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      typedElem.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedElem.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, delayBetweenPhrases);
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(type, 300);
    } else {
      setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    }
  }

  type();
}

/* 2. Navbar Scroll Behavior */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* 3. Mobile Navigation Drawer */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (!mobileToggle || !navLinks) return;

  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  // Close nav when clicking links
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    });
  });
}

/* 4. Project Filtering */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || (category && category.includes(filterValue))) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 5. Modal for Project & Certificate Previews */
const projectData = {
  exam: {
    title: 'Exam Hall Management & Seat Allocation',
    category: 'Full-Stack Django Application',
    tech: 'Python, Django, HTML, CSS, JavaScript, Bootstrap, SQLite',
    liveUrl: 'https://exam-hall-management-system-and.onrender.com/',
    details: `
      <p style="margin-bottom: 1rem;">This full-stack application automates exam hall management and seat allocation for educational institutions using constraint-based algorithms.</p>
      <h4 style="margin-bottom: 0.5rem; color: var(--accent-cyan);">Key Deliverables:</h4>
      <ul style="padding-left: 1.2rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 1rem;">
        <li>Automated seating plan generator preventing adjacent student branch conflicts.</li>
        <li>Invigilation duty assignment module & digital attendance logging.</li>
        <li>Multi-role access: Admins, Invigilators, and Student portals.</li>
        <li>Exportable hall seating charts & CSV bulk upload support.</li>
      </ul>
    `
  },
  voting: {
    title: 'Secure Online Voting System',
    category: 'Java, Spring Boot & Blockchain',
    tech: 'Java, Spring Boot, MySQL, OpenCV, HTML, CSS, JS, Blockchain',
    details: `
      <p style="margin-bottom: 1rem;">Built a secure digital election system incorporating multi-factor authentication (OTP), facial recognition verification with OpenCV, and tamper-proof voting ledgers.</p>
      <h4 style="margin-bottom: 0.5rem; color: var(--accent-purple);">Key Deliverables:</h4>
      <ul style="padding-left: 1.2rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 1rem;">
        <li>Biometric identity verification powered by OpenCV Python/Java bindings.</li>
        <li>Decentralized ledger integration for immutable audit trails.</li>
        <li>Instant real-time vote tallying and administrative controls.</li>
      </ul>
    `
  },
  hospital: {
    title: 'Hospital Management System',
    category: 'MERN Stack & Socket.IO',
    tech: 'React.js, Node.js, Express.js, MongoDB, Socket.IO, JWT',
    details: `
      <p style="margin-bottom: 1rem;">A comprehensive healthcare web portal featuring role-based portals for patients, doctors, nurses, and hospital administrators.</p>
      <h4 style="margin-bottom: 0.5rem; color: var(--accent-emerald);">Key Deliverables:</h4>
      <ul style="padding-left: 1.2rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 1rem;">
        <li>Secure authentication using JWT and Bcrypt encryption.</li>
        <li>Real-time instant communication for medical staff using Socket.IO.</li>
        <li>Online appointment scheduling and patient medical record management.</li>
      </ul>
    `
  }
};

function initModalHandler() {
  const modal = document.getElementById('appModal');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  if (!modal || !modalContent) return;

  // Open Project Details
  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];

      if (data) {
        const liveButtonHtml = data.liveUrl ? `
          <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
            <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1;">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Visit Live App
            </a>
            <button class="btn btn-secondary" onclick="closeModal()" style="flex: 1;">Close Details</button>
          </div>
        ` : `
          <button class="btn btn-primary" onclick="closeModal()" style="margin-top: 1rem; width: 100%;">Close Details</button>
        `;

        modalContent.innerHTML = `
          <div style="font-size: 0.85rem; color: var(--accent-cyan); text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem;">${data.category}</div>
          <h2 style="font-size: 1.6rem; margin-bottom: 0.75rem; color: var(--text-main);">${data.title}</h2>
          <div style="font-family: var(--font-code); font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.2rem; background: rgba(255,255,255,0.04); padding: 0.5rem 0.8rem; border-radius: 6px;">Tech: ${data.tech}</div>
          ${data.details}
          ${liveButtonHtml}
        `;
        modal.classList.add('active');
      }
    });
  });

  // Open Certificate Previews
  document.querySelectorAll('.view-cert-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const certName = btn.getAttribute('data-cert');
      const certImg = btn.getAttribute('data-cert-img');
      const certAltImg = btn.getAttribute('data-cert-alt-img');

      let altImageHtml = '';
      if (certAltImg) {
        altImageHtml = `
          <div style="margin-top: 1rem;">
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem; text-align: left; font-weight: 600;">Related Internship Certificate:</p>
            <img src="${certAltImg}" alt="${certName} Internship Certificate" style="width: 100%; max-height: 350px; object-fit: contain; border-radius: 8px; border: 1px solid var(--border-color); background: rgba(0,0,0,0.4);">
          </div>
        `;
      }

      modalContent.innerHTML = `
        <div style="text-align: center; padding: 0.5rem 0;">
          <h2 style="font-size: 1.4rem; margin-bottom: 0.35rem; color: var(--text-main);">${certName}</h2>
          <p style="color: var(--accent-cyan); font-size: 0.85rem; font-weight: 600; margin-bottom: 1.2rem;">
            <i class="fa-solid fa-certificate"></i> Verified Credential - Ancilin P G
          </p>
          
          <div style="max-height: 420px; overflow-y: auto; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 12px; border: 1px solid var(--border-color); margin-bottom: 1.2rem;">
            <img src="${certImg}" alt="${certName}" style="width: 100%; height: auto; max-height: 380px; object-fit: contain; border-radius: 8px;">
            ${altImageHtml}
          </div>

          <div style="display: flex; gap: 0.75rem;">
            <a href="${certImg}" target="_blank" class="btn btn-secondary" style="flex: 1;">
              <i class="fa-solid fa-up-right-from-square"></i> Open High-Res
            </a>
            <button class="btn btn-primary" onclick="closeModal()" style="flex: 1;">Close Preview</button>
          </div>
        </div>
      `;
      modal.classList.add('active');
    });
  });

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

function closeModal() {
  const modal = document.getElementById('appModal');
  if (modal) modal.classList.remove('active');
}

/* 6. Contact Form Submission Handling */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', () => {
    const name = document.getElementById('name').value.trim() || 'Visitor';
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const bodyContent = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=aancilin54@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;

    // Show in-page success modal with instant Gmail compose option
    const modal = document.getElementById('appModal');
    const modalContent = document.getElementById('modalContent');

    if (modal && modalContent) {
      modalContent.innerHTML = `
        <div style="text-align: center; padding: 1.5rem 0;">
          <div style="width: 75px; height: 75px; border-radius: 50%; background: rgba(16, 185, 129, 0.15); border: 2px solid var(--accent-emerald); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.2rem auto; font-size: 2.2rem; color: var(--accent-emerald);">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <h2 style="font-size: 1.6rem; margin-bottom: 0.5rem; color: var(--text-main);">Message Submitted!</h2>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.2rem; line-height: 1.6;">
            Thank you, <strong>${name}</strong>! Your message is processing for delivery to <strong>Ancilin P G</strong> (<a href="mailto:aancilin54@gmail.com" style="color: var(--accent-cyan); text-decoration: none;">aancilin54@gmail.com</a>).
          </p>
          <div style="background: rgba(255,255,255,0.03); border: 1px dashed var(--border-color); padding: 1rem; border-radius: 10px; font-size: 0.88rem; color: var(--text-dim); margin-bottom: 1.2rem; text-align: left;">
            <div><strong>Subject:</strong> ${subject}</div>
            <div style="margin-top: 0.35rem;"><strong>From:</strong> ${email}</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.65rem;">
            <a href="${gmailUrl}" target="_blank" class="btn btn-secondary" style="width: 100%; border-color: rgba(6, 182, 212, 0.4); color: var(--accent-cyan);">
              <i class="fa-brands fa-google"></i> Also Send via Gmail App (Instant Delivery)
            </a>
            <button class="btn btn-primary" onclick="closeModal()" style="width: 100%;">Back to Portfolio</button>
          </div>
        </div>
      `;
      modal.classList.add('active');
    }

    showToast('Success! Message submitted for Ancilin P G.');
    setTimeout(() => {
      contactForm.reset();
    }, 500);
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* 7. Active Navigation Link Scroll Highlight */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}
