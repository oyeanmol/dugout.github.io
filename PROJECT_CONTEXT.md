# PROJECT CONTEXT & ARCHITECTURE AUDIT: GAMERS DUGOUT WEBSITE

> **Document Type:** Codebase Understanding & Architecture Reference  
> **Target Audience:** Frontend Developers & Maintainers  
> **Scope:** `index.html`, `style.css`, `app.js`, and `assets/`  
> **Status:** Read-Only Audit & Preservation Guide  

---

## 1. Executive Summary & Purpose

### 1.1 What the Website Is
**Gamers Dugout** (`@gamers_dugout`) is a high-performance, cyberpunk/esports-themed single-page web application for a premier gaming cafe and entertainment lounge located in **Mansarovar, Jaipur, Rajasthan**.

### 1.2 Purpose of the Site
1. **Showcase Facilities:** Introduce the lounge's high-spec setups—liquid-cooled RTX 40-series PC battle stations (up to 360Hz), PlayStation 5 VIP recliner pods, Fanatec direct-drive racing simulators, and tournament-grade snooker tables.
2. **Transparent Pricing:** Display transparent hourly rates, discounted multi-hour marathon passes, and all-night LAN lock-in packages.
3. **Interactive Session Estimator:** Allow gamers to calculate costs in real-time based on zone choice, playtime, squad size, and snack/fuel add-ons.
4. **Instant Pass Booking System:** Provide a zero-friction reservation modal that generates a digital **Dugout Gamer Pass** ticket with a booking reference code and barcode mockup.
5. **Community & Competitive Engagement:** Highlight live lounge status (occupied seats, network ping), upcoming esports tournaments with live countdown timers, and an Instagram community wall linking directly to [`https://www.instagram.com/gamers_dugout/`](https://www.instagram.com/gamers_dugout/).

---

## 2. Technical Stack & Dependencies

| Layer | Technology / Source | Description |
|---|---|---|
| **Structure** | Semantic HTML5 | Clean semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<dialog>` style modals) |
| **Styling** | Vanilla CSS3 | Custom design system using CSS Custom Properties (`:root`), glassmorphism, flexbox, CSS grid, keyframe animations |
| **Interactivity** | Vanilla JavaScript (ES6+) | Event-driven architecture, Web Audio API synth, HTML5 Canvas 2D context, requestAnimationFrame loops |
| **Typography** | Google Fonts CDN | `Orbitron` (Futuristic display), `Rajdhani` (Technical headers/badges), `Inter` (High-readability UI body) |
| **Icons** | FontAwesome 6.5.1 CDN | Social icons (`fa-instagram`, `fa-discord`), gaming peripherals, badges, and controls |
| **Audio** | Web Audio API | 100% procedural sound synthesis (sine, sawtooth, triangle waves)—**zero external `.mp3`/`.wav` dependencies** |
| **Local Assets** | `assets/` directory | 5 localized assets (`dugout_logo.jpg`, `hero_battlestation.jpg`, `ps5_lounge.jpg`, `racing_simulator.jpg`, `snooker_lounge.jpg`) |

---

## 3. Complete Section-by-Section Breakdown

### 3.1 Background & Ambient Layers
* **HTML:**
  * `<div class="custom-cursor" id="customCursor"></div>` & `<div class="custom-cursor-dot" id="cursorDot"></div>`: Dual-layer crosshair cursor.
  * `<canvas id="cyberCanvas"></canvas>`: Fullscreen 2D canvas for interactive particle mesh.
  * `<div class="ambient-glow glow-cyan"></div>`, `.glow-purple`, `.glow-pink`: Blurred atmospheric color orbs.
* **CSS:** Lines 103–204 of `style.css`.
* **JS:** Lines 134–251 of `app.js` (`animateCursor()` and `renderCyberCanvas()`).

### 3.2 Top Announcement Ticker / Live Status Bar
* **HTML Element:** `<header class="top-status-bar">` (Lines 35–51 of `index.html`)
* **Content:**
  * Live status radar dot (`.live-dot.pulse`).
  * Lounge occupancy indicator: `"DUGOUT LIVE: 18/24 Rigs Occupied • Low Latency Fiber (3ms) • Open till 2:00 AM"`.
  * Direct Instagram link to `@gamers_dugout`.
  * Audio FX toggle button (`#audioToggle`, `#audioIcon`, `#audioStatusText`).
* **CSS Selector:** `.top-status-bar`, `.status-inner`, `.live-dot.pulse`, `.audio-toggle-btn`.
* **JS Event:** Click listener on `#audioToggle` toggling `sfxEnabled` boolean and icon state.

### 3.3 Navigation Bar
* **HTML Element:** `<nav class="navbar" id="mainNav">` (Lines 54–86 of `index.html`)
* **Content:**
  * Brand logo & title (`.brand-logo`, `assets/dugout_logo.jpg`).
  * Navigation links (`#navLinks`: Home `#hero`, Gaming Zones `#zones`, The Armory `#specs`, Passes `#pricing`, Tournaments `#tournaments`, Community `#instagram`, Locate Us `#contact`).
  * Action buttons: `#quickTourBtn` ("Explore"), `#openBookingBtn` ("Book Station"), `#mobileMenuBtn` (hamburger icon).
* **CSS Selector:** `.navbar`, `.nav-container`, `.nav-links`, `.nav-link`, `.mobile-toggle-btn`.
* **JS Event:**
  * Mobile toggle menu (`#mobileMenuBtn` toggling `.active` on `#navLinks`).
  * Scrollspy (`window.addEventListener('scroll')`) setting `.active` on matching nav link.
  * `#quickTourBtn` triggers smooth scroll to `#zones`.
  * `#openBookingBtn` triggers `openModal()`.

### 3.4 Hero Section
* **HTML Element:** `<section class="hero-section" id="hero">` (Lines 90–165 of `index.html`)
* **Content:**
  * Rating badge (`#1 RATED GAMING LOUNGE IN JAIPUR ★★★★★ 4.9/5`).
  * Title: `"LEVEL UP AT GAMERS DUGOUT"`.
  * Value proposition description.
  * 4 Stat Cards: `360Hz` (Esports Monitors), `RTX 40-Series` (Max Graphics), `1Gbps` (Ultra-Low Ping), `4K OLED` (VIP PS5 Pods).
  * CTAs: `#heroBookBtn` ("RESERVE A SEAT") and Instagram link.
  * Live Game Ticker: Current trending titles (Valorant, CS2, EA FC 25, GTA V, Tekken 8, F1 24).
  * Visual Display: 3D-angled frame (`assets/hero_battlestation.jpg`), hologram scanline effect, floating telemetry badge overlays (`RTX 4080 SUPER`, `LATENCY: 3ms`).
* **CSS Selector:** `.hero-section`, `.hero-grid`, `.hero-heading`, `.stat-card`, `.hero-image-frame`.
* **JS Event:** `#heroBookBtn` triggers `openModal()`.

### 3.5 Gaming Zones Section
* **HTML Element:** `<section class="section zones-section" id="zones">` (Lines 168–287 of `index.html`)
* **Content:**
  * Filter bar (`.zone-filter-bar`) with tabs: `All Zones`, `Esports PC Arena` (`pc`), `VIP PS5 Lounge` (`ps5`), `Racing Sim Rig` (`sim`), `Snooker & Pool` (`snooker`).
  * 4 Zone Cards (`.zone-card`):
    1. **Pro Esports Battle Stations** (RTX 4080 Super, 360Hz Fast-IPS, from ₹100/hr).
    2. **PlayStation 5 VIP Lounge** (PS5 Slim, 65" 4K 120Hz OLED, recliners, from ₹150/hr).
    3. **Pro Direct-Drive Racing Simulator** (Fanatec DD 15Nm, triple screen, from ₹200/hr).
    4. **Tournament Snooker & 8-Ball Lounge** (Full-size slate tables, Aramith balls, from ₹120/hr).
  * Dual card action buttons: `.btn-zone-book` ("Book Rig/Pod/Sim/Table") and `.btn-details-ghost` ("View Rig Specs").
* **CSS Selector:** `.zones-section`, `.zone-filter-bar`, `.filter-tab`, `.zones-grid`, `.zone-card`, `.zone-image-wrapper`, `.zone-price-tag`.
* **JS Event:**
  * Filter tabs click handler filtering cards via `data-filter` matching `data-category`.
  * `.btn-zone-book` clicks trigger `openModal(zoneName)`.
  * `.btn-details-ghost` clicks read `data-target`, scroll smoothly to `#specs`, and activate the target spec tab.

### 3.6 Hardware Armory & FPS Benchmarks
* **HTML Element:** `<section class="section specs-section" id="specs">` (Lines 290–503 of `index.html`)
* **Content:**
  * 4 Spec Tabs (`.spec-tab-btn`): PC Rig Specs (`pc-specs`), Peripherals & Gear (`peripherals-specs`), Console & Lounge (`console-specs`), Sim Rig Telemetry (`sim-specs`).
  * 4 Spec Content Panels (`.spec-content`):
    * **PC Rig:** RTX 4080 Super, i9-14900KF / Ryzen 7 7800X3D, 24.5" 360Hz Fast-IPS, 32GB DDR5 6000MHz.
    * **Benchmarks Meter:** Real-world FPS bars for Valorant (550+ FPS), CS2 (380+ FPS), Apex Legends/Warzone (240+ FPS), Cyberpunk 2077 RT (145+ FPS).
    * **Peripherals:** Rapid Trigger keyboards, Logitech G Pro X Superlight 2 / Razer Viper V3 Pro mice, HyperX Cloud Alpha Wireless, Secretlab TITAN Evo chairs.
    * **Console:** PS5 Slim, 65" LG OLED 4K 120Hz, DualSense Edge controllers, motorized cinema recliners.
    * **Sim Rig:** Fanatec ClubSport DD+ (15 Nm), Formula Carbon & Porsche GT3 wheels, V3 load-cell hydraulic pedals, triple 32" curved QHD 165Hz array.
* **CSS Selector:** `.specs-showcase-box`, `.specs-tabs`, `.spec-tab-btn`, `.spec-content`, `.spec-grid`, `.benchmark-container`, `.meter-track`, `.meter-fill`.
* **JS Event:** Tab switching logic toggling `.active` on `.spec-tab-btn` and `.spec-content`.

### 3.7 Pricing Passes & Memberships
* **HTML Element:** `<section class="section pricing-section" id="pricing">` (Lines 506–590 of `index.html`)
* **Content:**
  * 3 Tier Cards:
    1. **Recruit - Hourly Pass:** ₹100/hr (RTX 40-Series PC, 360Hz, 1Gbps fiber).
    2. **Veteran - Marathon Pass (5 Hours):** ₹400 / 5 hrs (Featured squad choice, save ₹100, free energy drink, 30m snooker warm-up).
    3. **Champion - Night Owl Lock-In:** ₹750 / full night (11 PM - 7 AM, all-access PC/PS5/Sim, midnight snack & cold brew included).
* **CSS Selector:** `.pricing-grid`, `.pricing-card`, `.featured-pricing`, `.popular-ribbon`, `.btn-card-action`.
* **JS Event:** Buttons with `[data-pass]` call `openModal(passName)`.

### 3.8 Interactive Session Configurator & Calculator
* **HTML Element:** `<section class="section booking-interactive-section">` (Lines 593–686 of `index.html`)
* **Content:**
  * Dropdown selector `#zoneSelect`:
    * PC Battle Station (₹100/hr)
    * PS5 VIP Pod (₹150/hr)
    * Fanatec Sim (₹200/hr)
    * Snooker & Pool (₹120/hr)
  * Steppers for Duration (`#hoursInput`, `#decreaseHours`, `#increaseHours`) and Squad Size (`#playersInput`, `#decreasePlayers`, `#increasePlayers`).
  * Fuel add-ons checkboxes: Energy Drink (+₹80/player, `#addEnergy`), Loaded Nachos (+₹120/player, `#addSnacks`).
  * Live Receipt Summary (`.calc-receipt`): `#summaryZoneName`, `#summaryZoneRate`, `#summaryTimeAndSquad`, `#summaryAddons`, `#calcTotalPrice`.
  * Instant Action Button: `#confirmCalculatorBtn` ("PROCEED TO INSTANT BOOKING").
* **CSS Selector:** `.booking-calculator-panel`, `.calc-body-grid`, `.stepper-wrap`, `.step-btn`, `.custom-checkbox`, `.calc-receipt`.
* **JS Event:** `updateCalculator()` recalculated on any change; `#confirmCalculatorBtn` opens modal with selected zone.

### 3.9 Tournaments & Events Arena
* **HTML Element:** `<section class="section tournaments-section" id="tournaments">` (Lines 689–766 of `index.html`)
* **Content:**
  * 3 Event Cards:
    1. **Valorant 5v5 Jaipur Clutch Major 2026:** Prize pool ₹25,000, timer `#valTimer`.
    2. **EA Sports FC 25 Dugout FIFA Showdown:** Prize pool ₹15,000, timer `#fcTimer`.
    3. **Tekken 8 & Snooker Iron Fist & Cue Clash:** Prize pool ₹10,000, timer `#tekkenTimer`.
  * Dynamic countdown timers (`02d : 14h : 22m : 10s`).
  * Squad registration CTAs (`.tournament-register-btn`).
* **CSS Selector:** `.tournaments-grid`, `.tournament-card`, `.t-banner`, `.valorant-gradient`, `.fifa-gradient`, `.tekken-gradient`, `.t-countdown`.
* **JS Event:** `setupCountdown()` intervals running every 1,000ms; `.tournament-register-btn` opens booking modal pre-filled with tournament title.

### 3.10 Instagram Community & Social Hub
* **HTML Element:** `<section class="section instagram-section" id="instagram">` (Lines 769–849 of `index.html`)
* **Content:**
  * Official Instagram profile badge (`assets/dugout_logo.jpg`, handle `@gamers_dugout`, 500+ posts, 4.8K+ followers, verified icon, follow button).
  * 4-Column Media Grid (`.ig-media-grid`) with hover states displaying likes, comments, and authentic gaming captions.
* **CSS Selector:** `.ig-profile-card`, `.ig-avatar-wrap`, `.ig-avatar`, `.btn-instagram-follow`, `.ig-media-grid`, `.ig-item`, `.ig-hover-overlay`.
* **JS Event:** Audio hover/click bindings on `.ig-item`.

### 3.11 Testimonials & Reviews
* **HTML Element:** `<section class="section reviews-section">` (Lines 852–898 of `index.html`)
* **Content:**
  * 3 Jaipur gamer review cards (Aarav Sharma - Valorant Immortal, Rohan Mathur - Mansarovar, Vikramaditya S. - Sim racer) with star ratings and avatar badges.
* **CSS Selector:** `.reviews-grid`, `.review-card`, `.review-stars`, `.reviewer-avatar`.

### 3.12 Location, Contact & FAQ Section
* **HTML Element:** `<section class="section contact-section" id="contact">` (Lines 901–1004 of `index.html`)
* **Content:**
  * Left Card: Physical address (`Plot No. 23-A, Sukhija Vihar Vistar, Manyawas, Block B, Mansarovar, Jaipur, Rajasthan 302020`), timings (`11:00 AM – 2:00 AM`), Instagram handle link, phone link, Google Maps navigation button.
  * Right Card: Interactive 4-item FAQ Accordion (`.faq-accordion`, `.faq-item`, `.faq-question`, `.faq-answer`).
* **CSS Selector:** `.contact-wrapper`, `.contact-details-card`, `.faq-card`, `.faq-item`, `.faq-question`, `.faq-arrow`, `.faq-answer`.
* **JS Event:** FAQ accordion toggle logic (`.faq-question` click expands active item and closes siblings).

### 3.13 Footer
* **HTML Element:** `<footer class="footer">` (Lines 1008–1066 of `index.html`)
* **Content:**
  * Brand summary, arena anchor links, site navigation anchor links, Instagram social links (`@gamers_dugout`, Discord, Google Maps), copyright bar.
* **CSS Selector:** `.footer`, `.footer-content`, `.footer-links-col`, `.social-badges`, `.footer-bottom`.

### 3.14 Booking Modal & Dugout Gamer Pass Ticket Generator
* **HTML Element:** `<div class="modal-overlay" id="bookingModal">` (Lines 1069–1171 of `index.html`)
* **Content:**
  * Form view (`#bookingForm`): Inputs for gamer tag (`#gamerName`), phone (`#gamerPhone`), arena selector (`#modalZoneSelect`), start time (`#modalTimeSlot`), squad size (`#modalSquadSize`), and submit button.
  * Ticket pass view (`#ticketPreview`): Generated pass card with header, status badge ("RESERVED"), player tag (`#ticketPlayerName`), arena (`#ticketZone`), slot (`#ticketSlot`), generated pass ID (`#ticketCode`, e.g. `DUG-4819`), barcode graphic, and "Book Another Slot" button (`#resetTicketBtn`).
  * Close button (`#closeModalBtn`).
* **CSS Selector:** `.modal-overlay`, `.modal-card`, `.ticket-preview`, `.ticket-card`, `.barcode-mockup`.
* **JS Event:**
  * `openModal()` / `closeModal()` logic.
  * `#bookingForm` submit listener prevents default, formats data, computes random pass code, swaps form for ticket preview, and fires `playPassCelebration()`.
  * `#resetTicketBtn` resets form and returns to input view.
  * Backdrop click dismisses modal.

---

## 4. JavaScript Functionality & Interaction Architecture

All JavaScript is encapsulated within a single `DOMContentLoaded` listener in `app.js` (628 lines).

```
DOMContentLoaded
├── 1. Procedural Audio Synthesizer (Web Audio API)
│   ├── audioCtx initialization (resumed on first gesture)
│   ├── playHoverTone() [880Hz -> 1200Hz sine wave, 50ms]
│   ├── playClickLaser() [600Hz -> 80Hz sawtooth wave, 120ms]
│   ├── playPassCelebration() [C5, E5, G5, C6 arpeggio, 250ms]
│   └── Audio toggle listener (#audioToggle)
│
├── 2. Custom Crosshair Cursor Tracking
│   ├── window.mousemove -> records clientX / clientY
│   ├── animateCursor() -> 60fps lerp loop (cursorX += (mouseX - cursorX) * 0.18)
│   └── hoverTargets hover bindings -> toggles .hovering class
│
├── 3. Animated Cyberpunk Grid & Particle Canvas
│   ├── resize listener -> maintains canvas buffer dimensions
│   ├── 60 floating particles with independent velocity vectors
│   └── renderCyberCanvas() -> 60fps loop rendering grid + distance-based interconnecting lines
│
├── 4. Gaming Zones Category Filtering
│   └── .filter-tab click -> matches data-filter to .zone-card[data-category]
│
├── 5. Hardware Armory Tabs & Smooth Spec Jumping
│   ├── .spec-tab-btn click -> toggles .active on matching .spec-content
│   └── [data-target] click -> scrolls to #specs and triggers corresponding tab
│
├── 6. Interactive Session & Price Calculator
│   ├── Input step handlers: #decreaseHours, #increaseHours, #decreasePlayers, #increasePlayers
│   ├── Checkbox handlers: #addEnergy, #addSnacks
│   ├── updateCalculator() -> computes total: (rate * hours * players) + (addons * players)
│   └── #confirmCalculatorBtn -> passes selected arena to openModal(zoneName)
│
├── 7. Booking Modal & Digital Gamer Pass Generation
│   ├── openModal(defaultZone) -> preselects dropdown option & reveals modal
│   ├── closeModal() -> hides modal overlay
│   ├── #bookingForm submit -> generates 'DUG-XXXX', populates ticket, plays synth fanfare
│   ├── #resetTicketBtn -> resets form and returns to input state
│   └── Backdrop click -> dismisses modal
│
├── 8. Real-Time Tournament Countdowns
│   └── setupCountdown(id, hours) -> 1,000ms interval updating days, hours, mins, secs
│
├── 9. FAQ Collapsible Accordion
│   └── .faq-question click -> toggles .active on .faq-item, closes siblings
│
├── 10. Mobile Responsive Navigation Drawer
│   ├── #mobileMenuBtn click -> toggles .active on #navLinks
│   └── Nav link clicks -> closes drawer
│
└── 11. Scrollspy Active Navigation
    └── window.scroll -> compares scrollY with section offsets to toggle .active on nav links
```

---

## 5. Design System, Color Tokens & Typography

### 5.1 CSS Custom Properties (`:root`)

```css
/* Core Backgrounds */
--bg-deep: #06070a;                 /* Ultra dark obsidian background */
--bg-surface: #0c0e17;              /* Section base background */
--bg-card: rgba(18, 22, 36, 0.75);  /* Glassmorphic card fill */
--bg-card-hover: rgba(26, 31, 52, 0.88);
--bg-glass: rgba(14, 18, 30, 0.65);

/* Neon Accents & Glows */
--neon-cyan: #00f0ff;               /* Primary esports cyan */
--neon-cyan-glow: rgba(0, 240, 255, 0.45);
--neon-cyan-subtle: rgba(0, 240, 255, 0.12);

--neon-purple: #9d4edd;
--neon-violet: #b026ff;             /* Cyber violet accent */
--neon-violet-glow: rgba(176, 38, 255, 0.45);

--neon-pink: #ff007f;               /* Hot magenta accent */
--neon-pink-glow: rgba(255, 0, 127, 0.4);

--gold-accent: #ffb703;             /* Trophy / review stars */
--emerald-accent: #00f59b;          /* Online status & confirm */
--ruby-accent: #ff3366;             /* Alert accent */

/* Typography Tokens */
--font-display: 'Orbitron', -apple-system, sans-serif;
--font-tech: 'Rajdhani', -apple-system, sans-serif;
--font-body: 'Inter', -apple-system, sans-serif;
```

### 5.2 Responsive Breakpoint Matrix

| Breakpoint | Target Devices | Key Layout Adjustments |
|---|---|---|
| **> 1024px** | Desktop / Laptops | 2-column hero grid, 2-column zones grid, 3-column pricing & tournaments, 4-column IG grid, full horizontal navbar |
| **769px – 1024px** | Tablets / Small Laptops | Single-column hero with centered typography, 1-column pricing/tournaments, 2-column IG grid, 2-column footer |
| **481px – 768px** | Mobile Landscape / Standard Mobile | Mobile drawer nav (`#navLinks.active`), 2-column stat cards, 1-column zones & specs, stacked contact/FAQ |
| **≤ 480px** | Compact Mobile | Hero heading scales to `2.1rem`, zone card footers stack vertically (`grid-template-columns: 1fr`), form rows stack |

---

## 6. HTML, CSS, and JS Dependency Mapping

| Feature / UI Element | HTML Identifier / Class | CSS Selector | JavaScript Hook / Function |
|---|---|---|---|
| Audio Toggle Button | `#audioToggle`, `#audioIcon` | `.audio-toggle-btn` | `audioToggle.addEventListener('click')` |
| Custom Cursor | `#customCursor`, `#cursorDot` | `.custom-cursor`, `.hovering` | `animateCursor()`, `mousemove` |
| Cyber Canvas | `<canvas id="cyberCanvas">` | `#cyberCanvas` | `renderCyberCanvas()`, `resize` |
| Mobile Menu Toggle | `#mobileMenuBtn`, `#navLinks` | `.mobile-toggle-btn`, `.nav-links.active` | `mobileMenuBtn.addEventListener('click')` |
| Zone Filter Tabs | `.filter-tab[data-filter]` | `.filter-tab.active` | `filterTabs.forEach(...)` |
| Zone Cards | `.zone-card[data-category]` | `.zone-card` | filtered via `display: flex/none` |
| Zone Rig Spec Links | `.btn-details-ghost[data-target]` | `.btn-details-ghost` | reads `data-target`, triggers tab click |
| Armory Spec Tabs | `.spec-tab-btn[data-spec]` | `.spec-tab-btn.active` | `specTabs.forEach(...)` |
| Armory Panels | `.spec-content[id]` | `.spec-content.active` | toggles `.active` class |
| Session Hours Stepper | `#decreaseHours`, `#increaseHours`, `#hoursInput` | `.stepper-wrap`, `.step-btn` | click updates `#hoursInput`, calls `updateCalculator()` |
| Squad Size Stepper | `#decreasePlayers`, `#increasePlayers`, `#playersInput` | `.stepper-wrap`, `.step-btn` | click updates `#playersInput`, calls `updateCalculator()` |
| Fuel Checkboxes | `#addEnergy`, `#addSnacks` | `.custom-checkbox` | `change` event calls `updateCalculator()` |
| Price Display | `#calcTotalPrice`, `#summaryZoneName` | `.total-price`, `.line-item` | updated in `updateCalculator()` |
| Booking Modal Trigger | `#openBookingBtn`, `#heroBookBtn`, `.btn-zone-book` | `.modal-overlay.active` | `openModal(zoneName)` |
| Booking Modal Form | `#bookingForm`, `#bookingModal` | `.booking-modal-form` | `bookingForm.addEventListener('submit')` |
| Ticket Output | `#ticketPreview`, `#ticketCode` | `.ticket-preview`, `.ticket-card` | revealed on valid submit |
| Countdown Timers | `#valTimer`, `#fcTimer`, `#tekkenTimer` | `.countdown-timer` | `setupCountdown(id, hours)` |
| FAQ Accordion | `.faq-item`, `.faq-question` | `.faq-item.active`, `.faq-arrow` | accordion toggle click listener |
| Active Nav on Scroll | `.nav-link`, `section[id]` | `.nav-link.active` | `window.addEventListener('scroll')` |

---

## 7. Hardcoded Content, Mock Data & Placeholders

When moving from frontend prototype to production backend integration, replace the following:

1. **Lounge Live Status (`.status-text`):** Hardcoded string (`"18/24 Rigs Occupied • Low Latency Fiber (3ms)"`). Can be connected to a live WebSockets / REST endpoint.
2. **Instagram Media Stats (`.ig-item`):** Mock like/comment counts (e.g. 642 likes, 48 comments) and static photo thumbnails. Can be replaced with an Instagram Graph API feed.
3. **Contact Phone (`<a href="tel:+919876543210">`):** Placeholder Indian phone number. Needs actual business SIM / WhatsApp Business number.
4. **Google Maps Link (`q=Gamers+Dugout+Mansarovar+Jaipur`):** Currently opens a general search query on Google Maps. Replace with exact Google Place CID / Maps Embed.
5. **Tournament Countdown Timers (`setupCountdown`):** Calculated dynamically relative to `Date.now() + X hours` at client runtime. Replace with fixed ISO 8601 UTC timestamps (e.g. `2026-11-15T17:00:00Z`).
6. **Pass Generation System (`#ticketCode`):** Generates client-side in-memory mock ticket (`DUG-XXXX`). In production, this should dispatch an API request to store reservations in a database and send a WhatsApp/SMS confirmation.

---

## 8. Existing Issues, Edge Cases & Potential Improvements

1. **Web Audio API Autoplay Policy:**
   * Browsers block Web Audio until the first user gesture. In `app.js`, `initAudio()` is correctly invoked on user interaction (`mouseenter`/`click`), but on initial page load before any interaction, audio is dormant. This is standard behavior.
2. **Scroll Event Performance:**
   * The scrollspy listener in `app.js` runs on raw `window.scroll`. While lightweight on desktop, wrapping it in a `requestAnimationFrame` throttle will improve performance on low-powered mobile devices.
3. **Canvas Window Resize Bounds:**
   * On window resize, canvas dimensions update, but particles outside new dimensions wait for wrap-around. Clamping particle coordinates on resize ensures zero offscreen delay.
4. **Custom Cursor on Touch Devices:**
   * On touch devices (smartphones/tablets), hardware mice don't exist. Adding `@media (pointer: coarse) { .custom-cursor, .custom-cursor-dot { display: none; } }` cleanly disables the cursor on touch screens.
5. **Modal Keydown Dismissal:**
   * The modal currently closes on backdrop click and `closeModalBtn`. Adding an `Escape` key event listener (`e.key === 'Escape'`) will improve accessibility (WCAG).

---

## 9. Quick Reference: Where to Make Common Modifications

| Desired Change | File to Edit | Exact Element / Selector / Function |
|---|---|---|
| **Change Hourly Rates** | `index.html` & `app.js` | Update options in `#zoneSelect` (value & text) in `index.html`, and cards under `#pricing`. |
| **Add a New Gaming Zone** | `index.html` & `style.css` | Add a `.zone-card` in `#zonesGrid` with corresponding `data-category`. If adding a new category, add a `.filter-tab`. |
| **Change Lounge Address or Timings** | `index.html` | Edit `.contact-details-card` in `#contact` section (Lines 910–945). |
| **Update Colors or Glows** | `style.css` | Modify `:root` variables `--neon-cyan`, `--neon-violet`, `--neon-pink` (Lines 6–52). |
| **Update Sound Effects** | `app.js` | Adjust oscillator frequencies and waveforms in `playHoverTone()`, `playClickLaser()`, or `playPassCelebration()` (Lines 34–98). |
| **Change Particle Density** | `app.js` | Adjust `particleCount` in `renderCyberCanvas()` (Line 185). |
| **Add New FAQ Item** | `index.html` | Add another `<div class="faq-item">` block inside `.faq-accordion` (Line 960). No JS modification required! |
| **Update Instagram Handle / Links** | `index.html` | Search for `https://www.instagram.com/gamers_dugout/` and replace handle text. |
| **Adjust Booking Form Fields** | `index.html` & `app.js` | Modify inputs inside `#bookingForm` in `index.html`, and update extraction in `#bookingForm.addEventListener('submit')` in `app.js`. |

---

## 10. Rules for Future Modifications

When making any future changes to this codebase, adhere to these architectural rules:

1. **Three-File Architecture:** Do NOT introduce extra build steps, bundlers, TypeScript, or CSS frameworks unless explicitly mandated. Keep it lean and directly inspectable in the browser.
2. **Preserve Audio Synthesizer:** Do NOT add external `.mp3` or `.wav` files for UI sounds. The Web Audio API synthesizer is lightweight, has zero HTTP round-trips, and avoids 404/CORS errors.
3. **Preserve IDs and Data Attributes:** JavaScript relies on IDs (`#zoneSelect`, `#bookingModal`, `#ticketCode`, etc.) and data attributes (`data-spec`, `data-target`, `data-filter`, `data-category`, `data-pass`, `data-zone`, `data-tournament`). Never alter or remove these attributes without updating their corresponding handlers in `app.js`.
4. **Preserve CSS Token System:** Always use CSS variables (`var(--neon-cyan)`, `var(--bg-card)`, `var(--font-display)`) rather than hardcoding arbitrary hex colors or ad-hoc styles.
5. **Mobile-First Validation:** Whenever editing desktop styles, always inspect the tablet (768px–1024px) and mobile (<768px) views to ensure the mobile menu, cards, and modal remain legible and functional.
6. **No Duplicate Event Listeners:** Keep all event listeners consolidated inside the single `DOMContentLoaded` listener in `app.js`. Avoid inline HTML `onclick=""` handlers.
