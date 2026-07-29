/**
 * Odia Medium Learning Games - Audio Effects Manager
 */

class AudioManager {
  constructor() {
    this.soundEnabled = localStorage.getItem('odia_sound_enabled') !== 'false';
    this.ctx = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playTone(freq, type = 'sine', duration = 0.15) {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio not permitted without interaction
    }
  }

  playButtonClick() {
    this.playTone(520, 'sine', 0.08);
  }

  playVictory() {
    this.playTone(523.25, 'triangle', 0.2);
    setTimeout(() => this.playTone(659.25, 'triangle', 0.2), 150);
    setTimeout(() => this.playTone(783.99, 'triangle', 0.3), 300);
  }

  playSuccess() {
    this.playVictory();
  }

  playWrongAnswer() {
    this.playTone(220, 'sawtooth', 0.25);
  }

  playError() {
    this.playWrongAnswer();
  }

  playBadgeUnlocked() {
    this.playTone(440, 'sine', 0.15);
    setTimeout(() => this.playTone(880, 'sine', 0.3), 150);
  }

  playCorrectSound() {
    this.playVictory();
  }

  playWrongSound() {
    this.playWrongAnswer();
  }

  playVictorySound() {
    this.playVictory();
  }

  playCardFlip() {
    this.playTone(400, 'sine', 0.05);
  }

  toggleSound(enable) {
    this.soundEnabled = enable;
    localStorage.setItem('odia_sound_enabled', enable ? 'true' : 'false');
  }
}

const audioManager = new AudioManager();
