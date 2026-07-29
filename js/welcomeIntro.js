/**
 * Odia Medium Learning Games - Opening Welcome Cartoon Intro Controller
 */

class WelcomeIntroController {
  constructor() {
    this.introDuration = 5500; // 5.5 seconds
    this.autoTimer = null;
    this.hasEnded = false;
  }

  init() {
    this.setupListeners();
    // Play intro on page load
    this.playIntro();
  }

  playIntro() {
    const overlay = document.getElementById('welcome-intro-overlay');
    if (!overlay) return false;

    // Reset flags & display overlay
    this.hasEnded = false;
    overlay.style.display = 'flex';
    overlay.classList.remove('hidden');
    overlay.classList.remove('fade-out');

    // Force CSS Animation Reflow so character entrance keyframes re-run cleanly
    const guplu = overlay.querySelector('.guplu');
    const neelu = overlay.querySelector('.neelu');
    const textBox = overlay.querySelector('.intro-text-box');

    if (guplu) {
      guplu.style.animation = 'none';
      void guplu.offsetWidth;
      guplu.style.animation = 'bounceInLeft 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
    }

    if (neelu) {
      neelu.style.animation = 'none';
      void neelu.offsetWidth;
      neelu.style.animation = 'bounceInRight 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
    }

    if (textBox) {
      textBox.style.animation = 'none';
      void textBox.offsetWidth;
      textBox.style.animation = 'textPopIn 0.8s ease-out forwards';
    }

    // Play cheerful entrance audio tone if permitted
    try {
      if (typeof audioManager !== 'undefined') {
        audioManager.playTone(440, 'sine', 0.12);
        setTimeout(() => audioManager.playTone(660, 'sine', 0.18), 160);
      }
    } catch (e) {
      // Audio autoplay fallback
    }

    // Clear any previous timer
    if (this.autoTimer) clearTimeout(this.autoTimer);

    // Auto-transition timer after 5.5 seconds
    this.autoTimer = setTimeout(() => {
      this.finishIntro('home');
    }, this.introDuration);

    return true;
  }

  checkAndStart(force = false) {
    return this.playIntro();
  }

  setupListeners() {
    const skipBtn = document.getElementById('intro-skip-btn');
    const ctaBtn = document.getElementById('intro-cta-btn');

    if (skipBtn) {
      skipBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof audioManager !== 'undefined') audioManager.playButtonClick();
        this.finishIntro('home');
      };
    }

    if (ctaBtn) {
      ctaBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof audioManager !== 'undefined') audioManager.playButtonClick();
        this.finishIntro('view-home');
      };
    }
  }

  finishIntro(targetView = 'view-home') {
    if (this.hasEnded) return;
    this.hasEnded = true;

    if (this.autoTimer) {
      clearTimeout(this.autoTimer);
      this.autoTimer = null;
    }

    const overlay = document.getElementById('welcome-intro-overlay');
    if (overlay) {
      overlay.classList.add('fade-out');
      setTimeout(() => {
        overlay.classList.add('hidden');
        overlay.style.display = 'none';
        overlay.classList.remove('fade-out');

        if (typeof app !== 'undefined') {
          app.navigateTo('view-home');
        }
      }, 400);
    }
  }

  replayIntro() {
    this.playIntro();
  }
}

const welcomeIntroManager = new WelcomeIntroController();
document.addEventListener('DOMContentLoaded', () => welcomeIntroManager.init());
