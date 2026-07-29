/**
 * Odisha Primary School SCERT Textbook Learning Games - Interactive Game Engine
 */

class GameEngine {
  constructor() {
    this.currentGame = null;
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.answers = {};
  }

  start(gameObj) {
    if (typeof authManager !== 'undefined' && !authManager.currentUser) {
      alert('⚠️ ଖେଳ ଖେଳିବା ପାଇଁ ଦୟାକରି ଲଗଇନ୍ (Login) କରନ୍ତୁ!');
      authManager.showAuthModal('login');
      return;
    }
    this.currentGame = gameObj;
    this.questions = gameObj.questions || [];
    this.currentIndex = 0;
    this.score = 0;
    this.answers = {};

    if (!this.questions || this.questions.length === 0) {
      const container = document.getElementById('game-content-area');
      if (container) {
        container.innerHTML = `
          <div style="text-align:center; padding:30px;">
            <div style="font-size:3rem;">📖</div>
            <h3 style="color:#E11D48; margin-top:10px;">ଏହି ପାଠ୍ୟପୁସ୍ତକର ତଥ୍ୟ ଯୋଡାଯାଇନାହିଁ।</h3>
            <p style="color:#64748B;">Official SCERT questions for this topic have not been imported yet.</p>
          </div>
        `;
      }
      return;
    }

    this.renderCurrentQuestion();
  }

  renderCurrentQuestion() {
    const container = document.getElementById('game-content-area');
    if (!container) return;

    const q = this.questions[this.currentIndex];
    if (!q) {
      this.finishGame();
      return;
    }

    const titleEl = document.getElementById('game-title');
    const scoreEl = document.getElementById('game-live-score');
    const progressBar = document.getElementById('game-progress-bar');
    const progressText = document.getElementById('game-progress-text');

    if (titleEl) titleEl.textContent = this.currentGame.title || 'ଖେଳ';
    if (scoreEl) scoreEl.textContent = `⭐ ${this.score * 10}`;

    const pct = Math.round(((this.currentIndex + 1) / this.questions.length) * 100);
    if (progressBar) progressBar.style.width = `${pct}%`;
    if (progressText) progressText.textContent = `ପ୍ରଶ୍ନ: ${this.currentIndex + 1}/${this.questions.length}`;

    container.innerHTML = `
      <div class="game-card animate-pop" style="background:#FFFFFF; padding:24px; border-radius:18px; box-shadow:var(--shadow-md); border:2px solid #E2E8F0; margin-top:16px;">
        <div style="font-size:0.85rem; font-weight:800; color:#4F46E5; background:#EEF2FF; padding:4px 10px; border-radius:6px; display:inline-block; margin-bottom:12px;">
          ପ୍ରଶ୍ନ ${this.currentIndex + 1}
        </div>
        <h3 style="font-size:1.35rem; font-weight:800; color:#1E293B; margin-bottom:20px; line-height:1.4;">
          ${q.question}
        </h3>

        <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:24px;">
          ${(q.options || []).map((opt, i) => `
            <button class="opt-btn" onclick="gameEngine.submitAnswer(${i}, this)" style="padding:14px 18px; background:#F8FAFC; border:2px solid #CBD5E1; border-radius:12px; font-size:1.05rem; font-weight:700; color:#334155; text-align:left; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; gap:12px;">
              <span style="background:#E2E8F0; color:#475569; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; font-size:0.85rem; font-weight:800;">${i + 1}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  submitAnswer(selectedIdx, btnEl) {
    if (this.isAnswering) return;
    this.isAnswering = true;

    const q = this.questions[this.currentIndex];

    let correctIdx = Number(q.correctAnswer);
    if (isNaN(correctIdx) && q.options) {
      correctIdx = q.options.findIndex(opt => String(opt).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase());
    }

    let isCorrect = false;
    if (Number(selectedIdx) === correctIdx) {
      isCorrect = true;
    } else if (q.options && q.options[selectedIdx] !== undefined && q.correctAnswer !== undefined) {
      if (String(q.options[selectedIdx]).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()) {
        isCorrect = true;
      }
    }

    const allButtons = document.querySelectorAll('.opt-btn');
    allButtons.forEach((b, idx) => {
      b.disabled = true;
      b.style.pointerEvents = 'none';
      if (idx === correctIdx) {
        b.style.background = '#DCFCE7';
        b.style.borderColor = '#22C55E';
        b.style.color = '#15803D';
      }
    });

    if (isCorrect) {
      this.score += 1;
      try {
        if (typeof audioManager !== 'undefined' && audioManager.playSuccess) {
          audioManager.playSuccess();
        }
      } catch (e) {}
    } else {
      if (btnEl) {
        btnEl.style.background = '#FEE2E2';
        btnEl.style.borderColor = '#EF4444';
        btnEl.style.color = '#B91C1C';
      }
      try {
        if (typeof audioManager !== 'undefined' && audioManager.playError) {
          audioManager.playError();
        }
      } catch (e) {}
    }

    setTimeout(() => {
      this.isAnswering = false;
      this.currentIndex += 1;
      if (this.currentIndex < this.questions.length) {
        this.renderCurrentQuestion();
      } else {
        this.finishGame();
      }
    }, 900);
  }

  finishGame() {
    const container = document.getElementById('game-content-area');
    if (!container) return;

    const totalQuestions = this.questions.length || 1;
    const percentage = Math.round((this.score / totalQuestions) * 100);

    let starsEarned = 5;
    if (percentage >= 90) starsEarned = 5;
    else if (percentage >= 70) starsEarned = 4;
    else if (percentage >= 50) starsEarned = 3;
    else if (percentage >= 30) starsEarned = 2;
    else starsEarned = 1;

    let currentStars = 25;
    if (typeof app !== 'undefined') {
      currentStars = app.getStarBalance();
      app.setStarBalance(currentStars + starsEarned);
    } else {
      const existing = parseInt(localStorage.getItem('odia_guest_stars') || '25', 10);
      localStorage.setItem('odia_guest_stars', (existing + starsEarned).toString());
    }

    app.updateHeaderStats();

    container.innerHTML = `
      <div class="result-card animate-pop" style="text-align:center; padding:32px 20px; background:#FFFFFF; border-radius:20px; box-shadow:var(--shadow-lg); border:3px solid #4F46E5; margin-top:20px;">
        <div style="font-size:4rem; margin-bottom:12px;">🏆</div>
        <h2 style="font-size:1.8rem; font-weight:800; color:#1E293B;">ଅଭିନନ୍ଦନ! ଖେଳ ସମାପ୍ତ ହେଲା! 🎉</h2>
        <p style="font-size:1.1rem; color:#64748B; margin-top:8px;">ସଠିକ୍ ଉତ୍ତର: ${this.score} / ${this.questions.length} (${percentage}%)</p>
        <div style="font-size:1.5rem; font-weight:800; color:#D97706; margin:16px 0;">
          ⭐ +${starsEarned} ଷ୍ଟାର୍ ଜିତିଲେ!
        </div>
        <div style="display:flex; gap:12px; justify-content:center; margin-top:24px;">
          <button class="btn btn-outline" onclick="app.navigateTo('view-subject-select')">
            ⬅️ ବିଷୟ ସୂଚୀକୁ ଫେରନ୍ତୁ
          </button>
          <button class="btn btn-primary" onclick="app.navigateTo('view-home')">
            🏠 ହୋମ୍‌କୁ ଫେରନ୍ତୁ
          </button>
        </div>
      </div>
    `;
  }
}

const gameEngine = new GameEngine();
