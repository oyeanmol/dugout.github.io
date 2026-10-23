/**
 * GAMERS DUGOUT JAIPUR (@gamers_dugout)
 * Interactive Gaming Frontend Logic
 * Features:
 * - Dynamic Cyber Grid & Particle Canvas
 * - Web Audio API Procedural Gaming Sound FX (no audio file dependencies)
 * - Custom Crosshair Cursor Tracking & Hover Physics
 * - Hardware Armory & FPS Benchmark Switcher
 * - Zone Filtering & Interactive Booking Calculator
 * - Instant Dugout Gamer Pass Ticket Generator Modal
 * - Real-time Tournament Countdown Timers
 * - FAQ Accordion & Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. PROCEDURAL SOUND SYNTHESIZER (WEB AUDIO API)
  // -------------------------------------------------------------------------
  let audioCtx = null;
  let sfxEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playHoverTone() {
    if (!sfxEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.06);
    } catch (e) {
      // Audio not permitted yet
    }
  }

  function playClickLaser() {
    if (!sfxEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.13);
    } catch (e) {
      // Ignore audio failure
    }
  }

  function playPassCelebration() {
    if (!sfxEnabled || !audioCtx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.05, audioCtx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + idx * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + idx * 0.08);
        osc.stop(audioCtx.currentTime + idx * 0.08 + 0.26);
      });
    } catch (e) {}
  }

  // Audio Toggle Button
  const audioToggle = document.getElementById('audioToggle');
  const audioIcon = document.getElementById('audioIcon');
  const audioStatusText = document.getElementById('audioStatusText');

  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      initAudio();
      sfxEnabled = !sfxEnabled;
      if (sfxEnabled) {
        audioIcon.className = 'fa-solid fa-volume-high';
        audioStatusText.textContent = 'SFX: ON';
        playClickLaser();
      } else {
        audioIcon.className = 'fa-solid fa-volume-xmark';
        audioStatusText.textContent = 'SFX: OFF';
      }
    });
  }

  // Bind audio to buttons and interactive links
  const interactiveElements = document.querySelectorAll('button, .nav-link, .filter-tab, .spec-tab-btn, .ig-item, .faq-question');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      initAudio();
      playHoverTone();
    });
    el.addEventListener('click', () => {
      initAudio();
      playClickLaser();
    });
  });

  // -------------------------------------------------------------------------
  // 2. CUSTOM CROSSHAIR CURSOR
  // -------------------------------------------------------------------------
  const customCursor = document.getElementById('customCursor');
  const cursorDot = document.getElementById('cursorDot');

  if (customCursor && cursorDot) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;
      customCursor.style.left = `${cursorX}px`;
      customCursor.style.top = `${cursorY}px`;
      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Expand cursor over interactive nodes
    const hoverTargets = document.querySelectorAll('button, a, input, select, .zone-card, .spec-item, .ig-item');
    hoverTargets.forEach((node) => {
      node.addEventListener('mouseenter', () => customCursor.classList.add('hovering'));
      node.addEventListener('mouseleave', () => customCursor.classList.remove('hovering'));
    });
  }

  // -------------------------------------------------------------------------
  // 3. BACKGROUND CYBER GRID & PARTICLE CANVAS
  // -------------------------------------------------------------------------
  const canvas = document.getElementById('cyberCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 20), 60);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.45)' : 'rgba(176, 38, 255, 0.45)',
      });
    }

    function renderCyberCanvas() {
      ctx.clearRect(0, 0, width, height);

      // Render subtle perspective grid lines at bottom
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSpacing = 80;
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render and connect floating particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderCyberCanvas);
    }
    requestAnimationFrame(renderCyberCanvas);
  }

  // -------------------------------------------------------------------------
  // 4. ZONE FILTERING TABS
  // -------------------------------------------------------------------------
  const filterTabs = document.querySelectorAll('.filter-tab');
  const zoneCards = document.querySelectorAll('.zone-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');

      zoneCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 5. HARDWARE ARMORY SPECS TABS
  // -------------------------------------------------------------------------
  const specTabs = document.querySelectorAll('.spec-tab-btn');
  const specPanels = document.querySelectorAll('.spec-content');

  specTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      specTabs.forEach((t) => t.classList.remove('active'));
      specPanels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-spec');
      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // Smooth scroll to specs when clicking "View Rig Specs" from zone cards
  const specLinks = document.querySelectorAll('[data-target]');
  specLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSpec = link.getAttribute('data-target');
      const specsSection = document.getElementById('specs');
      if (specsSection) {
        specsSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Activate corresponding tab
      const matchingTab = document.querySelector(`.spec-tab-btn[data-spec="${targetSpec}"]`);
      if (matchingTab) {
        matchingTab.click();
      }
    });
  });

  // -------------------------------------------------------------------------
  // 6. INTERACTIVE BOOKING CALCULATOR
  // -------------------------------------------------------------------------
  const zoneSelect = document.getElementById('zoneSelect');
  const hoursInput = document.getElementById('hoursInput');
  const playersInput = document.getElementById('playersInput');
  const decreaseHours = document.getElementById('decreaseHours');
  const increaseHours = document.getElementById('increaseHours');
  const decreasePlayers = document.getElementById('decreasePlayers');
  const increasePlayers = document.getElementById('increasePlayers');
  const addEnergy = document.getElementById('addEnergy');
  const addSnacks = document.getElementById('addSnacks');

  const summaryZoneName = document.getElementById('summaryZoneName');
  const summaryZoneRate = document.getElementById('summaryZoneRate');
  const summaryTimeAndSquad = document.getElementById('summaryTimeAndSquad');
  const summaryAddons = document.getElementById('summaryAddons');
  const calcTotalPrice = document.getElementById('calcTotalPrice');

  function updateCalculator() {
    if (!zoneSelect || !hoursInput || !playersInput) return;

    const selectedOption = zoneSelect.options[zoneSelect.selectedIndex];
    const baseRate = parseInt(selectedOption.value, 10) || 100;
    const zoneName = selectedOption.getAttribute('data-name') || 'Esports PC Battle Station';
    const hours = parseInt(hoursInput.value, 10) || 1;
    const players = parseInt(playersInput.value, 10) || 1;

    let addonsCost = 0;
    if (addEnergy && addEnergy.checked) addonsCost += parseInt(addEnergy.value, 10) * players;
    if (addSnacks && addSnacks.checked) addonsCost += parseInt(addSnacks.value, 10) * players;

    const stationsTotal = baseRate * hours * players;
    const grandTotal = stationsTotal + addonsCost;

    summaryZoneName.textContent = zoneName;
    summaryZoneRate.textContent = `₹${baseRate}/hr`;
    summaryTimeAndSquad.textContent = `${hours} hr${hours > 1 ? 's' : ''} × ${players} player${players > 1 ? 's' : ''}`;
    summaryAddons.textContent = addonsCost > 0 ? `₹${addonsCost}` : '₹0';
    calcTotalPrice.textContent = `₹${grandTotal}`;
  }

  if (decreaseHours) {
    decreaseHours.addEventListener('click', () => {
      let val = parseInt(hoursInput.value, 10);
      if (val > 1) {
        hoursInput.value = val - 1;
        updateCalculator();
      }
    });
  }

  if (increaseHours) {
    increaseHours.addEventListener('click', () => {
      let val = parseInt(hoursInput.value, 10);
      if (val < 12) {
        hoursInput.value = val + 1;
        updateCalculator();
      }
    });
  }

  if (decreasePlayers) {
    decreasePlayers.addEventListener('click', () => {
      let val = parseInt(playersInput.value, 10);
      if (val > 1) {
        playersInput.value = val - 1;
        updateCalculator();
      }
    });
  }

  if (increasePlayers) {
    increasePlayers.addEventListener('click', () => {
      let val = parseInt(playersInput.value, 10);
      if (val < 10) {
        playersInput.value = val + 1;
        updateCalculator();
      }
    });
  }

  if (zoneSelect) zoneSelect.addEventListener('change', updateCalculator);
  if (addEnergy) addEnergy.addEventListener('change', updateCalculator);
  if (addSnacks) addSnacks.addEventListener('change', updateCalculator);

  updateCalculator();

  // -------------------------------------------------------------------------
  // 7. BOOKING MODAL & GAMER PASS GENERATOR
  // -------------------------------------------------------------------------
  const bookingModal = document.getElementById('bookingModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookingForm = document.getElementById('bookingForm');
  const ticketPreview = document.getElementById('ticketPreview');
  const resetTicketBtn = document.getElementById('resetTicketBtn');

  const modalZoneSelect = document.getElementById('modalZoneSelect');
  const modalSquadSize = document.getElementById('modalSquadSize');

  function openModal(defaultZone = null) {
    if (bookingModal) {
      bookingModal.classList.add('active');
      bookingForm.style.display = 'block';
      ticketPreview.style.display = 'none';

      if (defaultZone && modalZoneSelect) {
        for (let i = 0; i < modalZoneSelect.options.length; i++) {
          if (modalZoneSelect.options[i].text.toLowerCase().includes(defaultZone.toLowerCase())) {
            modalZoneSelect.selectedIndex = i;
            break;
          }
        }
      }
    }
  }

  function closeModal() {
    if (bookingModal) {
      bookingModal.classList.remove('active');
    }
  }

  // Trigger buttons
  const openBookingBtn = document.getElementById('openBookingBtn');
  const heroBookBtn = document.getElementById('heroBookBtn');
  const confirmCalculatorBtn = document.getElementById('confirmCalculatorBtn');

  if (openBookingBtn) openBookingBtn.addEventListener('click', () => openModal());
  if (heroBookBtn) heroBookBtn.addEventListener('click', () => openModal());
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (confirmCalculatorBtn) {
    confirmCalculatorBtn.addEventListener('click', () => {
      const selectedOption = zoneSelect.options[zoneSelect.selectedIndex];
      const zoneName = selectedOption.getAttribute('data-name');
      openModal(zoneName);
    });
  }

  // Zone buttons inside cards
  const zoneBookBtns = document.querySelectorAll('.btn-zone-book');
  zoneBookBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const zone = btn.getAttribute('data-zone') || 'PC Battle Station';
      openModal(zone);
    });
  });

  // Pricing cards book buttons
  const pricingBookBtns = document.querySelectorAll('[data-pass]');
  pricingBookBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const passName = btn.getAttribute('data-pass');
      openModal(passName);
    });
  });

  // Tournament register buttons
  const tourneyBtns = document.querySelectorAll('.tournament-register-btn');
  tourneyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tournamentName = btn.getAttribute('data-tournament');
      openModal(`Tournament: ${tournamentName}`);
    });
  });

  // Quick explore tour button
  const quickTourBtn = document.getElementById('quickTourBtn');
  if (quickTourBtn) {
    quickTourBtn.addEventListener('click', () => {
      const zonesSec = document.getElementById('zones');
      if (zonesSec) zonesSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Handle Booking Form Submission -> Generates Pass
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const gamerName = document.getElementById('gamerName').value.trim() || 'Player_1';
      const zoneVal = modalZoneSelect ? modalZoneSelect.value : 'PC Battle Station';
      const slotVal = document.getElementById('modalTimeSlot').value;

      // Generate random ticket code
      const randomCode = 'DUG-' + Math.floor(1000 + Math.random() * 9000);

      document.getElementById('ticketPlayerName').textContent = gamerName;
      document.getElementById('ticketZone').textContent = zoneVal;
      document.getElementById('ticketSlot').textContent = slotVal;
      document.getElementById('ticketCode').textContent = randomCode;

      bookingForm.style.display = 'none';
      ticketPreview.style.display = 'block';

      playPassCelebration();
    });
  }

  if (resetTicketBtn) {
    resetTicketBtn.addEventListener('click', () => {
      bookingForm.reset();
      bookingForm.style.display = 'block';
      ticketPreview.style.display = 'none';
    });
  }

  // Close modal when clicking outside
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeModal();
      }
    });
  }

  // -------------------------------------------------------------------------
  // 8. TOURNAMENT COUNTDOWN TIMERS
  // -------------------------------------------------------------------------
  function setupCountdown(id, initialHours) {
    const el = document.getElementById(id);
    if (!el) return;

    let targetTime = Date.now() + initialHours * 3600 * 1000 + 14 * 60 * 1000;

    function update() {
      const diff = Math.max(0, targetTime - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      const dStr = String(days).padStart(2, '0');
      const hStr = String(hours).padStart(2, '0');
      const mStr = String(mins).padStart(2, '0');
      const sStr = String(secs).padStart(2, '0');

      el.textContent = `${dStr}d : ${hStr}h : ${mStr}m : ${sStr}s`;
    }
    update();
    setInterval(update, 1000);
  }

  setupCountdown('valTimer', 48);
  setupCountdown('fcTimer', 64);
  setupCountdown('tekkenTimer', 110);

  // -------------------------------------------------------------------------
  // 9. FAQ ACCORDION
  // -------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach((i) => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // -------------------------------------------------------------------------
  // 10. MOBILE MENU TOGGLE
  // -------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close when nav link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach((l) => {
      l.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // -------------------------------------------------------------------------
  // 11. ACTIVE NAV LINK ON SCROLL
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    allNavLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
