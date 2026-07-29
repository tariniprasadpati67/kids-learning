/**
 * Odia Medium Learning Games - Main Application Controller
 */

class AppController {
  constructor() {
    this.currentView = 'view-home';
    this.selectedClassNumber = 1;
    this.selectedClassId = 'c1';
    this.selectedSubject = null;
    this.selectedChapter = null;
    this.selectedGame = null;
  }

  init() {
    localStorage.removeItem('odia_guest_stars');
    localStorage.removeItem('odia_unlocked_prizes');
    this.setupEventListeners();
    this.updateHeaderStats();
    this.navigateTo('view-home');
  }

  setupEventListeners() {
    document.querySelectorAll('.nav-link, .bottom-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const viewId = item.getAttribute('data-view');
        try { if (typeof audioManager !== 'undefined') audioManager.playButtonClick(); } catch (e) {}
        if (viewId) this.navigateTo(viewId);
      });
    });

    document.body.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        try { if (typeof audioManager !== 'undefined') audioManager.playButtonClick(); } catch (e) {}
      }
    });
  }

      getUserStarsKey() {
    const user = (typeof authManager !== 'undefined') ? authManager.currentUser : JSON.parse(localStorage.getItem('odia_user_cache') || 'null');
    if (user && (user.email || user.id || user.name)) {
      return 'odia_stars_' + (user.email || user.id || user.name);
    }
    return null;
  }

  getUserPrizesKey() {
    const user = (typeof authManager !== 'undefined') ? authManager.currentUser : JSON.parse(localStorage.getItem('odia_user_cache') || 'null');
    if (user && (user.email || user.id || user.name)) {
      return 'odia_prizes_' + (user.email || user.id || user.name);
    }
    return null;
  }

  getUnlockedPrizes() {
    const key = this.getUserPrizesKey();
    if (!key) return [];
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  getStarBalance() {
    const key = this.getUserStarsKey();
    if (!key) {
      return 0;
    }
    const currentAccountStars = localStorage.getItem(key);
    if (currentAccountStars !== null) {
      return parseInt(currentAccountStars, 10);
    }
    localStorage.setItem(key, '0');
    return 0;
  }

  setStarBalance(newStars) {
    const key = this.getUserStarsKey();
    if (!key) {
      this.updateHeaderStats();
      return;
    }
    const val = Math.max(0, newStars).toString();
    localStorage.setItem(key, val);
    this.updateHeaderStats();
  }

  updateHeaderStats() {
    const starCountEl = document.getElementById('header-star-count');
    const nameEl = document.getElementById('header-profile-name');
    const statusTextEl = document.getElementById('header-status-text');

    const currentUser = (typeof authManager !== 'undefined') ? authManager.currentUser : JSON.parse(localStorage.getItem('odia_user_cache') || 'null');

    if (currentUser) {
      const stars = this.getStarBalance();
      if (starCountEl) starCountEl.textContent = stars.toString();
      if (nameEl) nameEl.textContent = currentUser.name;
    } else {
      // LOGGED OUT: show 0 stars and Guest (ଅତିଥି)
      if (starCountEl) starCountEl.textContent = '0';
      if (nameEl) nameEl.textContent = 'Guest (ଅତିଥି)';
    }

    if (statusTextEl) statusTextEl.textContent = 'ସର୍ଭର ସହ ଯୋଡ଼ିହୋଇଛି';
  }

  getClassList() {
    return [
      { _id: 'c1', classNumber: 1, title: 'ଶ୍ରେଣୀ ୧', description: 'ଅକ୍ଷର, ସଂଖ୍ୟା, ରଙ୍ଗ ଓ ଚିତ୍ର ଚିହ୍ନଟ', icon: '🎒' },
      { _id: 'c2', classNumber: 2, title: 'ଶ୍ରେଣୀ ୨', description: 'ଶବ୍ଦ ଗଠନ, ଯୋଗ ଓ ବିୟୋଗ', icon: '📚' },
      { _id: 'c3', classNumber: 3, title: 'ଶ୍ରେଣୀ ୩', description: 'ଗୁଣନ, ସୁନ୍ଦର ବାକ୍ୟ, ପରିବେଶ', icon: '✏️' },
      { _id: 'c4', classNumber: 4, title: 'ଶ୍ରେଣୀ ୪', description: 'ହରଣ, ବିଜ୍ଞାନ, ଭୂଗୋଳ', icon: '🔬' },
      { _id: 'c5', classNumber: 5, title: 'ଶ୍ରେଣୀ ୫', description: 'ମିଶ୍ରିତ ଗଣିତ, ବ୍ୟାକରଣ, ଜ୍ଞାନ', icon: '🏆' }
    ];
  }

  navigateTo(viewId) {
    this.currentView = viewId;

    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.add('hidden');
    });

    const targetView = document.getElementById(viewId);
    if (targetView) {
      targetView.classList.remove('hidden');
      targetView.classList.add('animate-fade-in');
    }

    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-view') === viewId) {
        item.classList.add('active');
      }
    });

    switch (viewId) {
      case 'view-home':
        this.renderHomeView();
        break;
      case 'view-learn':
        this.renderLearnView();
        break;
      case 'view-class-select':
        this.renderClassSelectView();
        break;
      case 'view-subject-select':
        this.renderSubjectSelectView();
        break;
      case 'view-chapter-select':
        this.renderChapterSelectView();
        break;
      case 'view-leaderboard':
        this.renderLeaderboardView();
        break;
      case 'view-rewards':
        this.renderRewardsView();
        break;
      case 'view-profile':
        this.renderProfileView();
        break;
    }

    this.updateHeaderStats();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

    renderHomeView() {
    const container = document.getElementById('home-dashboard-container');
    if (!container) return;

    const profileName = localStorage.getItem('odia_profile_name') || 'Guest (ଅତିଥି)';
    const totalStars = this.getStarBalance();
    const unlockedPrizes = this.getUnlockedPrizes();
    const currentClass = this.selectedClassNumber || 1;

    const classes = [
      { id: 'c1', num: 1, title: 'ଶ୍ରେଣୀ ୧ (Class 1)', desc: 'ଅକ୍ଷର, ସଂଖ୍ୟା, ରଙ୍ଗ ଓ ଚିତ୍ର ଚିହ୍ନଟ', icon: '🎒', gradient: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)' },
      { id: 'c2', num: 2, title: 'ଶ୍ରେଣୀ ୨ (Class 2)', desc: 'ଶବ୍ଦ ଗଠନ, ଯୋଗ ଓ ବିୟୋଗ', icon: '📚', gradient: 'linear-gradient(135deg, #4568DC 0%, #B06AB3 100%)' },
      { id: 'c3', num: 3, title: 'ଶ୍ରେଣୀ ୩ (Class 3)', desc: 'ଗୁଣନ, ସୁନ୍ଦର ବାକ୍ୟ, ପରିବେଶ', icon: '✏️', gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
      { id: 'c4', num: 4, title: 'ଶ୍ରେଣୀ ୪ (Class 4)', desc: 'ହରଣ, ବିଜ୍ଞାନ, ଭୂଗୋଳ', icon: '🔬', gradient: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)' },
      { id: 'c5', num: 5, title: 'ଶ୍ରେଣୀ ୫ (Class 5)', desc: 'ମିଶ୍ରିତ ଗଣିତ, ବ୍ୟାକରଣ, ଜ୍ଞାନ', icon: '🏆', gradient: 'linear-gradient(135deg, #8A2387 0%, #E94057 50%, #F27121 100%)' }
    ];

    container.innerHTML = `
      <!-- 1. Hero Welcome Banner -->
      <div class="animate-pop" style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #C084FC 100%); border-radius: 28px; padding: 28px 24px; color: white; margin-bottom: 28px; box-shadow: 0 14px 28px rgba(79, 70, 229, 0.25); border: 3px solid rgba(255, 255, 255, 0.3); position: relative; overflow: hidden;">
        <div style="position: absolute; right: -20px; top: -20px; opacity: 0.15; font-size: 10rem; pointer-events: none;">🚀</div>
        
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px; position: relative; z-index: 2;">
          <div>
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px); padding: 6px 14px; border-radius: 50px; font-size: 0.88rem; font-weight: 800; margin-bottom: 10px;">
              <span>🔥 ଆଜିର ଷ୍ଟ୍ରିକ୍: ୩ ଦିନ</span>
              <span>•</span>
              <span>🏫 ଶ୍ରେଣୀ ${currentClass}</span>
            </div>
            <h1 style="font-size: 2.1rem; font-weight: 900; margin: 0; line-height: 1.2;">
              ସ୍ୱାଗତମ, ${profileName}! 👋✨
            </h1>
            <p style="font-size: 1.05rem; opacity: 0.95; font-weight: 600; margin-top: 8px; max-width: 520px;">
              ଓଡ଼ିଶା SCERT ଶିକ୍ଷା ଗେମ୍‌ସରେ ଆଜି ନୂଆ ବିଷୟ ଶିଖନ୍ତୁ, ପ୍ରଶ୍ନର ସଠିକ୍ ଉତ୍ତର ଦିଅନ୍ତୁ ଏବଂ ଷ୍ଟାର୍ ଜିତନ୍ତୁ!
            </p>
          </div>

          <div style="display: flex; align-items: center; gap: 12px; background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(12px); padding: 14px 20px; border-radius: 20px; border: 1.5px solid rgba(255, 255, 255, 0.25);">
            <div style="text-align: center; border-right: 1px solid rgba(255,255,255,0.3); padding-right: 14px;">
              <div style="font-size: 1.5rem; font-weight: 900; color: #FDE047;">⭐ ${totalStars}</div>
              <div style="font-size: 0.75rem; font-weight: 700; opacity: 0.9;">ମୋଟ ଷ୍ଟାର୍</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 1.5rem; font-weight: 900; color: #6EE7B7;">🏆 ${unlockedPrizes.length}</div>
              <div style="font-size: 0.75rem; font-weight: 700; opacity: 0.9;">ପୁରସ୍କାର</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Class Selection Section -->
      <div style="margin-bottom: 32px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <h2 style="font-size: 1.5rem; font-weight: 900; color: #1E293B; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>🏫 ଶ୍ରେଣୀ ଚୟନ କରନ୍ତୁ</span>
            <span style="font-size: 0.9rem; font-weight: 700; background: #EEF2FF; color: #4F46E5; padding: 4px 12px; border-radius: 50px;">Class 1 to 5</span>
          </h2>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
          ${classes.map(c => `
            <div class="subject-card animate-pop" onclick="app.selectClass(${c.num}, '${c.id}')" style="background: ${c.gradient}; border-radius: 24px; padding: 22px 20px; color: white; cursor: pointer; border: 4px solid #FFFFFF; box-shadow: 0 10px 20px rgba(0,0,0,0.1); position: relative; overflow: hidden; transition: transform 0.2s ease;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 2.8rem; filter: drop-shadow(0 4px 0 rgba(0,0,0,0.2));">${c.icon}</span>
                <span style="background: rgba(255,255,255,0.25); backdrop-filter: blur(8px); padding: 6px 12px; border-radius: 50px; font-weight: 800; font-size: 0.85rem;">
                  ଖେଳନ୍ତୁ ➡️
                </span>
              </div>
              <div style="margin-top: 16px;">
                <h3 style="font-size: 1.35rem; font-weight: 900; margin: 0;">${c.title}</h3>
                <p style="font-size: 0.85rem; opacity: 0.92; font-weight: 600; margin-top: 6px; line-height: 1.4;">${c.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 3. Daily Missions / Quick Challenges -->
      <div style="margin-bottom: 32px;">
        <h2 style="font-size: 1.35rem; font-weight: 900; color: #1E293B; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
          <span>🎯 ଆଜିର ସ୍ୱତନ୍ତ୍ର ମିଶନ୍</span>
          <span style="font-size: 0.8rem; font-weight: 800; background: #FEF3C7; color: #D97706; padding: 3px 10px; border-radius: 50px;">Daily Quests</span>
        </h2>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <div class="chapter-card animate-pop" style="background: #FFFFFF; border-radius: 20px; padding: 18px 20px; border: 2.5px solid #E2E8F0; box-shadow: 0 6px 16px rgba(0,0,0,0.05); display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div style="font-size: 2.2rem; background: #EEF2FF; padding: 10px; border-radius: 16px;">✍️</div>
              <div>
                <h4 style="font-size: 1.05rem; font-weight: 800; color: #1E293B; margin: 0;">ଓଡ଼ିଆ ଅକ୍ଷର ଗୁରୁ</h4>
                <p style="font-size: 0.82rem; color: #64748B; margin: 4px 0 0 0; font-weight: 600;">୫ଟି ସଠିକ୍ ଅକ୍ଷର ଚିହ୍ନଟ କରନ୍ତୁ</p>
              </div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="app.selectClass(1, 'c1')" style="border-radius: 50px; font-size: 0.85rem; font-weight: 800;">
              ⭐ +5 ଷ୍ଟାର୍
            </button>
          </div>

          <div class="chapter-card animate-pop" style="background: #FFFFFF; border-radius: 20px; padding: 18px 20px; border: 2.5px solid #E2E8F0; box-shadow: 0 6px 16px rgba(0,0,0,0.05); display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div style="font-size: 2.2rem; background: #F0FDF4; padding: 10px; border-radius: 16px;">🔢</div>
              <div>
                <h4 style="font-size: 1.05rem; font-weight: 800; color: #1E293B; margin: 0;">ଗଣିତ ଯୋଗ ଚାମ୍ପିଅନ୍</h4>
                <p style="font-size: 0.82rem; color: #64748B; margin: 4px 0 0 0; font-weight: 600;">ସଂଖ୍ୟା ଯୋଗ କ୍ବିଜ୍ ଜିତନ୍ତୁ</p>
              </div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="app.selectClass(2, 'c2')" style="border-radius: 50px; font-size: 0.85rem; font-weight: 800;">
              ⭐ +5 ଷ୍ଟାର୍
            </button>
          </div>
        </div>
      </div>

      <!-- 4. Motivational Quote & Learning Tip -->
      <div class="animate-pop" style="background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); border-radius: 20px; padding: 20px 24px; border: 2px solid #F59E0B; display: flex; align-items: center; gap: 16px;">
        <div style="font-size: 2.5rem;">💡</div>
        <div>
          <h4 style="font-size: 1rem; font-weight: 900; color: #92400E; margin: 0;">ଆଜିର ମଜାଦାର ଶିକ୍ଷଣ ଟିପ୍ସ (Tip of the Day)</h4>
          <p style="font-size: 0.92rem; color: #78350F; font-weight: 700; margin: 4px 0 0 0;">
            "ପ୍ରତିଦିନ ଖେଳି ଖେଳି ଅଭ୍ୟାସ କଲେ ଗଣିତ ଓ ଓଡ଼ିଆ ପାଠ ବହୁତ ସହଜ ହୋଇଥାଏ!" ✨
          </p>
        </div>
      </div>
    `;
  }

  async renderClassSelectView() {
    const grid = document.getElementById('class-cards-grid');
    if (!grid) return;

    let classes = this.getClassList();
    try {
      const res = await apiClient.getClasses();
      if (res && res.data && res.data.length > 0) {
        classes = res.data;
      }
    } catch (e) {
      console.warn('Using default class list:', e.message);
    }

    grid.innerHTML = classes.map(c => `
      <div class="class-card animate-pop ${c.classNumber === this.selectedClassNumber ? 'active' : ''}" 
           onclick="app.selectClass(${c.classNumber}, '${c._id}')">
        <div class="class-card-icon">${c.icon || '🎒'}</div>
        <div class="class-card-title">${c.title || `ଶ୍ରେଣୀ ${c.classNumber}`}</div>
        <div class="class-card-desc">${c.description || 'ଖେଳି ଖେଳି ଶିଖନ୍ତୁ'}</div>
        <button class="btn-play-card" onclick="event.stopPropagation(); app.selectClass(${c.classNumber}, '${c._id}')">ଖେଳନ୍ତୁ</button>
      </div>
    `).join('');
  }

  selectClass(classNum, classId) {
    this.selectedClassNumber = classNum;
    this.selectedClassId = classId || `c${classNum}`;
    try { if (typeof audioManager !== 'undefined') audioManager.playSuccess(); } catch (e) {}
    this.navigateTo('view-subject-select');
  }

  getSubjectList(classNum) {
    const num = Number(classNum) || 1;
    const subjectsMap = {
      1: [
        { _id: 'sc1_letter', name: 'ଅକ୍ଷର ଚିହ୍ନଟ', odiaName: 'ଅକ୍ଷର ଚିହ୍ନଟ (Odia Letters)', icon: '✍️', color: '#FF6B6B' },
        { _id: 'sc1_number', name: 'ସଂଖ୍ୟା (୧-୧୦)', odiaName: 'ସଂଖ୍ୟା ଗଣନା (Numbers 1-10)', icon: '🔢', color: '#4E65FF' },
        { _id: 'sc1_color',  name: 'ରଙ୍ଗ ଚିହ୍ନଟ', odiaName: 'ରଙ୍ଗ ଚିହ୍ନଟ (Colors)', icon: '🎨', color: '#F39C12' },
        { _id: 'sc1_picture', name: 'ଚିତ୍ର ଚିହ୍ନଟ', odiaName: 'ଚିତ୍ର ଚିହ୍ନଟ (Picture Quiz)', icon: '🖼️', color: '#2ECC71' }
      ],
      2: [
        { _id: 'sc2_word', name: 'ଶବ୍ଦ ଗଠନ', odiaName: 'ଶବ୍ଦ ଗଠନ (Word Formation)', icon: '📝', color: '#FF6B6B' },
        { _id: 'sc2_add',  name: 'ଯୋଗ', odiaName: 'ଯୋଗ (Addition)', icon: '➕', color: '#4E65FF' },
        { _id: 'sc2_sub',  name: 'ବିୟୋଗ', odiaName: 'ବିୟୋଗ (Subtraction)', icon: '➖', color: '#E74C3C' }
      ],
      3: [
        { _id: 'sc3_mul',  name: 'ଗୁଣନ', odiaName: 'ଗୁଣନ (Multiplication)', icon: '✖️', color: '#4E65FF' },
        { _id: 'sc3_sent', name: 'ସୁନ୍ଦର ବାକ୍ୟ', odiaName: 'ସୁନ୍ଦର ବାକ୍ୟ (Sentence Building)', icon: '✍️', color: '#FF6B6B' },
        { _id: 'sc3_env',  name: 'ପରିବେଶ', odiaName: 'ପରିବେଶ (Environment EVS)', icon: '🌿', color: '#2ECC71' }
      ],
      4: [
        { _id: 'sc4_div', name: 'ହରଣ', odiaName: 'ହରଣ (Division)', icon: '➗', color: '#4E65FF' },
        { _id: 'sc4_sci', name: 'ବିଜ୍ଞାନ', odiaName: 'ବିଜ୍ଞାନ (Science)', icon: '🔬', color: '#E74C3C' },
        { _id: 'sc4_geo', name: 'ଭୂଗୋଳ', odiaName: 'ଭୂଗୋଳ (Geography)', icon: '🌍', color: '#F39C12' }
      ],
      5: [
        { _id: 'sc5_mmath', name: 'ମିଶ୍ରିତ ଗଣିତ', odiaName: 'ମିଶ୍ରିତ ଗଣିତ (Advanced Math)', icon: '📐', color: '#4E65FF' },
        { _id: 'sc5_gram',  name: 'ବ୍ୟାକରଣ', odiaName: 'ବ୍ୟାକରଣ (Odia Grammar)', icon: '📖', color: '#9B59B6' },
        { _id: 'sc5_gk',    name: 'ଜ୍ଞାନ', odiaName: 'ଜ୍ଞାନ (General Knowledge)', icon: '💡', color: '#2ECC71' }
      ]
    };
    return subjectsMap[num] || subjectsMap[1];
  }

  getChapterList(classNum, subjectId) {
    const sName = this.selectedSubject?.odiaName || 'ପାଠ';
    return [
      { _id: `ch_${subjectId}_1`, chapterNumber: 1, title: `${sName} – ଅଭ୍ୟାସ ୧`, description: 'ଖେଳି ଶିଖନ୍ତୁ ଓ ପ୍ରଶ୍ନର ଉତ୍ତର ଦିଅନ୍ତୁ' },
      { _id: `ch_${subjectId}_2`, chapterNumber: 2, title: `${sName} – ଅଭ୍ୟାସ ୨`, description: 'ଉତ୍ତମ ଜ୍ଞାନ ପାଇଁ ଖେଳନ୍ତୁ' }
    ];
  }

  async renderSubjectSelectView() {
    const heading = document.getElementById('subject-class-heading');
    if (heading) heading.textContent = `ଶ୍ରେଣୀ ${this.selectedClassNumber} – ବିଷୟ ବାଛନ୍ତୁ 📚`;

    const grid = document.getElementById('subject-cards-grid');
    if (!grid) return;

    let subjects = this.getSubjectList(this.selectedClassNumber);
    try {
      const res = await apiClient.getSubjects(this.selectedClassId || `c${this.selectedClassNumber}`);
      if (res && res.data && res.data.length > 0) {
        subjects = res.data;
      }
    } catch (e) {
      console.warn('Using fallback subjects:', e.message);
    }

    grid.innerHTML = subjects.map(s => `
      <div class="subject-card animate-pop" onclick="app.selectSubject('${s._id}', '${s.name}', '${s.odiaName}')" style="background: ${s.color || '#4E65FF'}; border-radius: 24px; padding: 24px; color: white; cursor: pointer; border: 4px solid #FFFFFF; box-shadow: 0 10px 0 rgba(0,0,0,0.15);">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="font-size: 44px; filter: drop-shadow(0 4px 0 rgba(0,0,0,0.15));">${s.icon || '📘'}</div>
          <span style="font-size: 1.4rem;">➡️</span>
        </div>
        <div style="margin-top: 14px;">
          <h3 class="subject-title" style="font-size: 1.4rem; font-weight: 900; margin: 0;">${s.odiaName || s.name}</h3>
          <p class="subject-subtitle" style="font-size: 0.9rem; opacity: 0.9; font-weight: 700; margin-top: 4px;">ଶ୍ରେଣୀ ${this.selectedClassNumber} ପାଠ୍ୟ</p>
        </div>
      </div>
    `).join('');
  }

  selectSubject(subjectId, subjectName, odiaName) {
    this.selectedSubject = { id: subjectId, name: subjectName, odiaName: odiaName || subjectName };
    try { if (typeof audioManager !== 'undefined') audioManager.playSuccess(); } catch (e) {}
    this.navigateTo('view-chapter-select');
  }

  async renderChapterSelectView() {
    const heading = document.getElementById('chapter-subject-title');
    if (heading) {
      heading.textContent = `ଶ୍ରେଣୀ ${this.selectedClassNumber} (${this.selectedSubject?.odiaName || ''}) – ଅଧ୍ୟାୟ ବାଛନ୍ତୁ 🎯`;
    }

    const grid = document.getElementById('chapter-list-grid');
    if (!grid) return;

    let chapters = this.getChapterList(this.selectedClassNumber, this.selectedSubject?.id);
    try {
      const res = await apiClient.getChapters(this.selectedSubject?.id);
      if (res && res.data && res.data.length > 0) {
        chapters = res.data;
      }
    } catch (e) {
      console.warn('Using fallback chapters:', e.message);
    }

    grid.innerHTML = chapters.map(ch => `
      <div class="chapter-card animate-pop" onclick="app.playChapterGame('${ch._id}', '${ch.title}')" style="background: white; border-radius: 22px; padding: 20px; display: flex; align-items: center; justify-content: space-between; border: 3.5px solid #F1F5F9; box-shadow: 0 8px 0 #CBD5E1; cursor: pointer; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <div class="chapter-num" style="width: 44px; height: 44px; border-radius: 50%; background: #FF6B6B; color: white; font-weight: 900; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; box-shadow: 0 4px 0 #EE5253;">${ch.chapterNumber || 1}</div>
          <div>
            <h3 class="chapter-title" style="margin: 0; font-size: 1.2rem; font-weight: 900; color: #1E293B;">${ch.title}</h3>
            <p class="chapter-desc" style="margin: 4px 0 0 0; font-size: 0.85rem; color: #64748B; font-weight: 700;">${ch.description || 'ଖେଳି ଶିଖନ୍ତୁ'}</p>
          </div>
        </div>
        <button class="btn btn-primary btn-sm" style="border-radius: 50px; padding: 8px 20px; font-weight: 800;">🎮 ଖେଳନ୍ତୁ</button>
      </div>
    `).join('');
  }

  getFallbackGame(classNum, chapterId, title) {
    const num = Number(classNum) || 1;
    const defaultQuizMap = {
      1: {
        title: title || 'ଶ୍ରେଣୀ ୧ ଖେଳ',
        questions: [
          { question: "'ଅ' ଅକ୍ଷରରୁ କେଉଁ ଶବ୍ଦଟି ଆରମ୍ଭ ହୁଏ?", options: ['ଆମ୍ବ', 'ଅନାର', 'ଇଟା', 'ଉଠ'], correctAnswer: 1 },
          { question: "'ଆ' ଅକ୍ଷରରୁ କେଉଁ ଫଳର ନାମ ଆରମ୍ଭ ହୁଏ?", options: ['ଓଲ', 'ଇଟା', 'ଆମ୍ବ', 'ଅସୁର'], correctAnswer: 2 },
          { question: "୫ + ୩ = କେତେ?", options: ['୭', '୮', '<ctrl42>', '୧୦'], correctAnswer: 1 },
          { question: "ଆକାଶର ରଙ୍ଗ କ’ଣ?", options: ['ଲାଲ୍', 'ନୀଳ', 'ହଳଦିଆ', 'କଳା'], correctAnswer: 1 },
          { question: "🍎 ଏହି ଚିତ୍ରଟି କେଉଁ ଫଳର?", options: ['କଦଳୀ', 'ଆପଲ୍', 'କମଳା', 'ଅଙ୍ଗୁର'], correctAnswer: 1 }
        ]
      },
      2: {
        title: title || 'ଶ୍ରେଣୀ ୨ ଖେଳ',
        questions: [
          { question: "'କ' + 'ମ' + 'ଳ' = କ’ଣ ହେବ?", options: ['କମଳ', 'କଳମ', 'ମଳକ', 'କମଳା'], correctAnswer: 0 },
          { question: "'ଘ' + 'ର' = କ’ଣ ହେବ?", options: ['ରଘ', 'ଘର', 'ଘରଡ଼ି', 'ଘରୋଇ'], correctAnswer: 1 },
          { question: "୧୨ + ୧୫ = କେତେ?", options: ['୨୫', '୨୭', '୩୦', '୨୨'], correctAnswer: 1 },
          { question: "୨୦ - ୫ = କେତେ?", options: ['୧୦', '୧୨', '୧୫', '୧୮'], correctAnswer: 2 }
        ]
      },
      3: {
        title: title || 'ଶ୍ରେଣୀ ୩ ଖେଳ',
        questions: [
          { question: "୩ × ୪ = କେତେ?", options: ['୧୦', '୧୨', '୧୪', '୧୬'], correctAnswer: 1 },
          { question: "୫ × ୫ = କେତେ?", options: ['୨୦', '୨୫', '୩୦', '୩୫'], correctAnswer: 1 },
          { question: "'ଆମେ ପ୍ରତିଦିନ ସ୍କୁଲ୍ _____ ।'", options: ['ଯାଉ', 'ଖାଉ', 'ଶୋଉ', 'ପିଉ'], correctAnswer: 0 },
          { question: "ଆମକୁ ଅମ୍ଳଜାନ (Oxygen) କିଏ ଦିଏ?", options: ['ଗଛଲତା', 'ଗାଡ଼ି', 'ଘର', 'ପାଣି'], correctAnswer: 0 }
        ]
      },
      4: {
        title: title || 'ଶ୍ରେଣୀ ୪ ଖେଳ',
        questions: [
          { question: "୧୨ ÷ ୩ = କେତେ?", options: ['୩', '୪', '୫', '୬'], correctAnswer: 1 },
          { question: "୨୦ ÷ ୫ = କେତେ?", options: ['୨', '୩', '୪', '୫'], correctAnswer: 2 },
          { question: "ଉଦ୍ଭିଦ ନିଜର ଖାଦ୍ୟ କେଉଁଠାରେ ତିଆରି କରେ?", options: ['ମୂଳ', 'ପତ୍ର', 'ଫୁଲ', 'କାଣ୍ଡ'], correctAnswer: 1 },
          { question: "ଓଡ଼ିଶାର ସବୁଠାରୁ ବଡ଼ ନଦୀର ନାମ କ’ଣ?", options: ['ବ୍ରାହ୍ମଣୀ', 'ମହାନଦୀ', 'ବୈତରଣୀ', 'ବଂଶଧାରା'], correctAnswer: 1 }
        ]
      },
      5: {
        title: title || 'ଶ୍ରେଣୀ ୫ ଖେଳ',
        questions: [
          { question: "୧/୫ + ୨/୫ = କେତେ?", options: ['୩/୫', '୨/୫', '୪/୫', '୧/୫'], correctAnswer: 0 },
          { question: "୧୦୦ ର ୨୫% = କେତେ?", options: ['୨୦', '୨୫', '୩୦', '୫୦'], correctAnswer: 1 },
          { question: "'ସୁନ୍ଦର' ଶବ୍ଦର ବିପରୀତ ଶବ୍ଦ କ’ଣ?", options: ['ଅସୁନ୍ଦର', 'ଭଲ', 'ଉତ୍ତମ', 'ବଡ଼'], correctAnswer: 0 },
          { question: "ଭାରତର ପ୍ରଥମ ପ୍ରଧାନମନ୍ତ୍ରୀ କିଏ ଥିଲେ?", options: ['ମହାତ୍ମା ଗାନ୍ଧୀ', 'ଜବାହରଲାଲ ନେହେରୁ', 'ସୁବାଷ ବୋଷ', 'ସରଦାର ପଟେଲ'], correctAnswer: 1 }
        ]
      }
    };
    return defaultQuizMap[num] || defaultQuizMap[1];
  }

  async playChapterGame(chapterId, chapterTitle) {
    this.selectedChapter = { id: chapterId, title: chapterTitle };
    try { if (typeof audioManager !== 'undefined') audioManager.playSuccess(); } catch (e) {}
    this.navigateTo('view-game');

    const contentArea = document.getElementById('game-content-area');
    contentArea.innerHTML = '<div style="text-align:center; padding:30px;">ଖେଳ ଲୋଡ୍ ହେଉଛି... 🎮</div>';

    try {
      const gamesRes = await apiClient.getGames(chapterId);
      const games = gamesRes.data || [];

      let gameObj;
      if (games.length > 0) {
        gameObj = games[0];
        const qRes = await apiClient.getQuestions(gameObj._id);
        gameObj.questions = (qRes.data && qRes.data.length > 0) 
          ? qRes.data 
          : this.getFallbackGame(this.selectedClassNumber, chapterId, chapterTitle).questions;
      } else {
        gameObj = this.getFallbackGame(this.selectedClassNumber, chapterId, chapterTitle);
      }

      gameEngine.start(gameObj);
    } catch (e) {
      console.warn('Game load warning:', e.message);
      const gameObj = this.getFallbackGame(this.selectedClassNumber, chapterId, chapterTitle);
      gameEngine.start(gameObj);
    }
  }

  async renderLeaderboardView() {
    const grid = document.getElementById('leaderboard-list-grid');
    if (!grid) return;

    grid.innerHTML = '<div style="text-align:center; padding:20px; font-weight:700;">ଲିଡରବୋର୍ଡ ଲୋଡ୍ ହେଉଛି... 🏆</div>';

    const currentUser = (typeof authManager !== 'undefined' && authManager.currentUser)
      ? authManager.currentUser
      : JSON.parse(localStorage.getItem('odia_user_cache') || 'null');

    const currentLiveStars = this.getStarBalance();
    const currentClassLevel = `ଶ୍ରେଣୀ ${this.selectedClassNumber || 1}`;

    let leaders = [];

    try {
      const res = await apiClient.getLeaderboard();
      if (res && res.data && Array.isArray(res.data)) {
        leaders = res.data.filter(u => u.name !== 'ରାହୁଲ ଦାସ' && u.name !== 'ପ୍ରିୟା ଶର୍ମା' && u.name !== 'ଅମିତ୍ କୁମାର' && u.name !== 'tarini');
      }
    } catch (e) {
      console.warn('Leaderboard fetch notice:', e.message);
    }

    if (currentUser && currentUser.name) {
      const userIndex = leaders.findIndex(u =>
        (u.id && currentUser.id && u.id === currentUser.id) ||
        (u.name && currentUser.name && u.name.toLowerCase() === currentUser.name.toLowerCase())
      );

      const userStars = Math.max(currentUser.totalStars || 0, currentLiveStars);

      if (userIndex !== -1) {
        leaders[userIndex].stars = Math.max(leaders[userIndex].stars || 0, userStars);
      } else {
        leaders.push({
          id: currentUser.id,
          name: currentUser.name,
          classLevel: currentUser.classLevel ? `ଶ୍ରେଣୀ ${currentUser.classLevel}` : currentClassLevel,
          stars: userStars,
          avatar: currentUser.avatar || '👤'
        });
      }
    }

    if (leaders.length === 0) {
      grid.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; background: white; border-radius: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); max-width: 480px; margin: 20px auto; border: 3px solid #E2E8F0;">
          <div style="font-size: 54px; margin-bottom: 12px;">🏆</div>
          <h3 style="font-size: 1.25rem; color: #1E293B; margin-bottom: 8px; font-weight: 800;">କୌଣସି ଲଗଇନ୍ ଆକାଉଣ୍ଟ୍ ନାହିଁ (No Active Leaders)</h3>
          <p style="color: #64748B; font-size: 0.95rem; margin-bottom: 20px; line-height: 1.5; font-weight: 600;">ଲିଡରବୋର୍ଡରେ ଆପଣଙ୍କ ନାମ ଦେଖାଇବା ପାଇଁ ଦୟାକରି ଲଗଇନ୍ କରନ୍ତୁ କିମ୍ବା ଆକାଉଣ୍ଟ ତିଆରି କରନ୍ତୁ!</p>
          <button class="btn btn-primary" onclick="typeof authManager !== 'undefined' ? authManager.showAuthModal('login') : alert('ଲଗଇନ୍ କରନ୍ତୁ')" style="border-radius: 50px; font-weight: 800; padding: 12px 28px; font-size: 1rem;">
            🔐 ଲଗଇନ୍ କରନ୍ତୁ (Login / Register)
          </button>
        </div>
      `;
      return;
    }

    // Always sort by stars descending (highest stars on top)
    leaders.sort((a, b) => Number(b.stars || 0) - Number(a.stars || 0));

    // Re-assign ranks
    leaders.forEach((l, index) => {
      l.rank = index + 1;
    });

    grid.innerHTML = leaders.map(l => {
      const isCurrentUser = currentUser && currentUser.name && (l.name.toLowerCase() === currentUser.name.toLowerCase());
      let rankBadgeText = '#' + l.rank + ' Rank';
      let rankBadgeStyle = 'background: #F1F5F9; color: #475569; border: 2px solid #CBD5E1;';

      if (l.rank === 1) {
        rankBadgeText = '🥇 #1 Gold';
        rankBadgeStyle = 'background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #1E293B; border: 2px solid #FFF; box-shadow: 0 4px 10px rgba(255, 215, 0, 0.4);';
      } else if (l.rank === 2) {
        rankBadgeText = '🥈 #2 Silver';
        rankBadgeStyle = 'background: linear-gradient(135deg, #E0E0E0 0%, #B0B0B0 100%); color: #1E293B; border: 2px solid #FFF; box-shadow: 0 4px 10px rgba(192, 192, 192, 0.4);';
      } else if (l.rank === 3) {
        rankBadgeText = '🥉 #3 Bronze';
        rankBadgeStyle = 'background: linear-gradient(135deg, #CD7F32 0%, #A0522D 100%); color: #FFF; border: 2px solid #FFF; box-shadow: 0 4px 10px rgba(205, 127, 50, 0.4);';
      }

      return `
        <div class="chapter-card animate-pop" style="justify-content: space-between; border: ${isCurrentUser ? '3.5px solid #6366F1' : '3.5px solid #F1F5F9'}; background: ${isCurrentUser ? '#EEF2FF' : '#FFFFFF'}; padding: 18px 20px; border-radius: 24px; margin-bottom: 14px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="${rankBadgeStyle} font-weight: 900; font-size: 0.95rem; padding: 7px 14px; border-radius: 50px; display: flex; align-items: center;">
              <span>${rankBadgeText}</span>
            </div>
            <div>
              <h3 style="font-weight: 900; font-size: 1.15rem; margin: 0; color: #1E293B; display: flex; align-items: center; gap: 8px;">
                <span>${l.avatar || '👤'} ${l.name}</span>
                ${isCurrentUser ? '<span style="background: #6366F1; color: white; font-size: 0.72rem; padding: 2px 8px; border-radius: 50px; font-weight: 800;">(ଆପଣ)</span>' : ''}
              </h3>
              <p style="font-size: 0.85rem; color: #64748B; margin: 4px 0 0 0; font-weight: 700;">${l.classLevel || 'ଶ୍ରେଣୀ ୧'}</p>
            </div>
          </div>
          <div style="font-weight: 900; font-size: 1.25rem; color: #D97706; background: #FEF08A; padding: 8px 18px; border-radius: 50px; border: 2.5px solid #FDE047; box-shadow: 0 4px 0 #F59E0B;">
            ⭐ ${l.stars || 0}
          </div>
        </div>
      `;
    }).join('');
  }

    renderLearnView() {
    const container = document.getElementById('learn-dashboard-container');
    if (!container) return;

    const profileName = localStorage.getItem('odia_profile_name') || 'Guest (ଅତିଥି)';
    const totalStars = this.getStarBalance();
    const selectedClass = this.selectedClassNumber || 1;

    const skills = [
      {
        subject: '📖 ଓଡ଼ିଆ ସାହିତ୍ୟ (Odia Language)',
        color: '#4F46E5',
        bgColor: '#EEF2FF',
        items: [
          { name: '🔤 ଅକ୍ଷର, ସ୍ୱରବର୍ଣ୍ଣ ଓ ବ୍ୟଞ୍ଜନବର୍ଣ୍ଣ', mastery: 100, status: 'ସମ୍ପୂର୍ଣ୍ଣ ✅', action: 'ଅଭ୍ୟାସ କରନ୍ତୁ 🎮' },
          { name: '✍️ ମାତ୍ରା ଓ ଦୁଇ-ଅକ୍ଷରୀ ଶବ୍ଦ ଗଠନ', mastery: 85, status: 'ଉତ୍କୃଷ୍ଟ 🌟', action: 'ଖେଳନ୍ତୁ 🎮' },
          { name: '📜 ସୁନ୍ଦର କବିତା ଓ ଓଡ଼ିଆ ଗଳ୍ପ', mastery: 65, status: 'ଚାଲୁଛି ⏳', action: 'ଆରମ୍ଭ କରନ୍ତୁ 🚀' }
        ]
      },
      {
        subject: '🔢 ଗଣିତ ଯାଦୁ (Mathematics Mastery)',
        color: '#10B981',
        bgColor: '#ECFDF5',
        items: [
          { name: '1️⃣ ସଂଖ୍ୟା ଚିହ୍ନଟ (୧ ରୁ ୧୦୦)', mastery: 100, status: 'ସମ୍ପୂର୍ଣ୍ଣ ✅', action: 'ଅଭ୍ୟାସ କରନ୍ତୁ 🎮' },
          { name: '➕ ସଂଖ୍ୟା ଯୋଗ ଓ ସରଳ ମିଶାଣ', mastery: 80, status: 'ଉତ୍କୃଷ୍ଟ 🌟', action: 'ଖେଳନ୍ତୁ 🎮' },
          { name: '➖ ସଂଖ୍ୟା ବିୟୋଗ ଓ ଫେଡାଣ', mastery: 60, status: 'ଚାଲୁଛି ⏳', action: 'ଆରମ୍ଭ କରନ୍ତୁ 🚀' }
        ]
      },
      {
        subject: '🎨 ରଙ୍ଗ, ଆକାର ଓ ପରିବେଶ (EVS & Arts)',
        color: '#F59E0B',
        bgColor: '#FEF3C7',
        items: [
          { name: '🎨 ରଙ୍ଗ ଓ ଜାମିତିକ ଆକାର ଚିହ୍ନଟ', mastery: 95, status: 'ସମ୍ପୂର୍ଣ୍ଣ ✅', action: 'ଅଭ୍ୟାସ କରନ୍ତୁ 🎮' },
          { name: '🌿 ପଶୁପକ୍ଷୀ, ଫୁଲ ଓ ଫଳ ପରିଚୟ', mastery: 85, status: 'ଉତ୍କୃଷ୍ଟ 🌟', action: 'ଖେଳନ୍ତୁ 🎮' }
        ]
      }
    ];

    container.innerHTML = `
      <!-- 1. Hero Learn Header -->
      <div class="animate-pop" style="background: linear-gradient(135deg, #059669 0%, #10B981 50%, #34D399 100%); border-radius: 28px; padding: 28px 24px; color: white; margin-bottom: 28px; box-shadow: 0 14px 28px rgba(16, 185, 129, 0.25); border: 3px solid rgba(255, 255, 255, 0.3); position: relative; overflow: hidden;">
        <div style="position: absolute; right: -20px; top: -20px; opacity: 0.15; font-size: 10rem; pointer-events: none;">🎓</div>

        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px; position: relative; z-index: 2;">
          <div>
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px); padding: 6px 14px; border-radius: 50px; font-size: 0.88rem; font-weight: 800; margin-bottom: 10px;">
              <span>📚 ଶିକ୍ଷଣ ଦକ୍ଷତା ମ୍ୟାପ୍</span>
              <span>•</span>
              <span>🏫 ଶ୍ରେଣୀ ${selectedClass}</span>
            </div>
            <h1 style="font-size: 2.1rem; font-weight: 900; margin: 0; line-height: 1.2;">
              ଶିଖନ୍ତୁ ଓ ଜ୍ଞାନ ବଢ଼ାନ୍ତୁ! 🎓✨
            </h1>
            <p style="font-size: 1.05rem; opacity: 0.95; font-weight: 600; margin-top: 8px; max-width: 520px;">
              ପ୍ରତ୍ୟେକ ବିଷୟରେ ଦକ୍ଷତା ହାସଲ କରନ୍ତୁ, ପ୍ରଶ୍ନର ଅଭ୍ୟାସ କରନ୍ତୁ ଏବଂ ନୂଆ ମାଷ୍ଟର ବ୍ୟାଜ୍ ହାସଲ କରନ୍ତୁ!
            </p>
          </div>

          <div style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(12px); padding: 16px 24px; border-radius: 24px; border: 2px solid rgba(255, 255, 255, 0.3); text-align: center;">
            <div style="font-size: 2rem; font-weight: 900; color: #FEF08A;">82%</div>
            <div style="font-size: 0.85rem; font-weight: 800; opacity: 0.95;">ମୋଟ ଶିକ୍ଷଣ ସଫଳତା</div>
          </div>
        </div>
      </div>

      <!-- 2. Weekly Mastery Quest Card -->
      <div class="animate-pop" style="background: #FFFFFF; border-radius: 24px; padding: 22px 24px; border: 3px solid #6366F1; box-shadow: 0 10px 24px rgba(99, 102, 241, 0.12); margin-bottom: 32px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="font-size: 3rem; background: #EEF2FF; padding: 14px; border-radius: 20px;">🏆</div>
          <div>
            <div style="display: inline-block; background: #EEF2FF; color: #4F46E5; font-weight: 800; font-size: 0.78rem; padding: 3px 10px; border-radius: 50px; margin-bottom: 6px;">
              ⚡ ସପ୍ତାହର ଚ୍ୟାଲେଞ୍ଜ
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 900; color: #1E293B; margin: 0;">୫୦ଟି ପ୍ରଶ୍ନର ସଠିକ୍ ଉତ୍ତର ଦିଅନ୍ତୁ</h3>
            <p style="font-size: 0.88rem; color: #64748B; margin: 4px 0 0 0; font-weight: 600;">ସମ୍ପୂର୍ଣ୍ଣ କଲେ ⭐ +20 ଷ୍ଟାର୍ ଏବଂ ଗୋଲ୍ଡେନ୍ ସାର୍ଟିଫିକେଟ୍ ମିଳିବ!</p>
          </div>
        </div>

        <div style="min-width: 220px;">
          <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 0.88rem; color: #4F46E5; margin-bottom: 6px;">
            <span>ପ୍ରଗତି (35 / 50)</span>
            <span>70%</span>
          </div>
          <div style="background: #E2E8F0; height: 12px; border-radius: 50px; overflow: hidden;">
            <div style="width: 70%; height: 100%; background: linear-gradient(90deg, #6366F1, #8B5CF6); border-radius: 50px;"></div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="app.selectClass(${selectedClass}, 'c${selectedClass}')" style="width: 100%; margin-top: 12px; border-radius: 50px; font-weight: 800;">
            ଚ୍ୟାଲେଞ୍ଜ ଖେଳନ୍ତୁ 🚀
          </button>
        </div>
      </div>

      <!-- 3. Skill Trees / Subject Mastery Grids -->
      <div style="display: flex; flex-direction: column; gap: 28px; margin-bottom: 32px;">
        ${skills.map(s => `
          <div class="animate-pop" style="background: #FFFFFF; border-radius: 24px; padding: 24px; border: 2.5px solid #E2E8F0; box-shadow: 0 8px 20px rgba(0,0,0,0.04);">
            <h3 style="font-size: 1.3rem; font-weight: 900; color: ${s.color}; margin: 0 0 18px 0; display: flex; align-items: center; gap: 10px;">
              <span>${s.subject}</span>
            </h3>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;">
              ${s.items.map(item => `
                <div style="background: ${s.bgColor}; border-radius: 18px; padding: 16px 18px; border: 1.5px solid rgba(0,0,0,0.06); display: flex; flex-direction: column; justify-content: space-between; gap: 12px;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                      <span style="font-size: 0.78rem; font-weight: 800; background: white; color: ${s.color}; padding: 2px 8px; border-radius: 50px;">${item.status}</span>
                      <span style="font-weight: 900; font-size: 0.88rem; color: #1E293B;">${item.mastery}%</span>
                    </div>
                    <h4 style="font-size: 1.02rem; font-weight: 800; color: #1E293B; margin: 6px 0 0 0; line-height: 1.3;">${item.name}</h4>
                  </div>

                  <div>
                    <div style="background: rgba(0,0,0,0.08); height: 8px; border-radius: 50px; overflow: hidden; margin-bottom: 10px;">
                      <div style="width: ${item.mastery}%; height: 100%; background: ${s.color}; border-radius: 50px;"></div>
                    </div>
                    <button class="btn btn-outline btn-sm" onclick="app.selectClass(${selectedClass}, 'c${selectedClass}')" style="width: 100%; border-radius: 50px; font-weight: 800; background: white; color: ${s.color}; border-color: ${s.color};">
                      ${item.action}
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  getPrizesList() {
    return [
      {
        id: 'pz_crown',
        title: 'ସୁବର୍ଣ୍ଣ ମୁକୁଟ (Golden Crown)',
        description: 'ଶ୍ରେଷ୍ଠ ଛାତ୍ରଛାତ୍ରୀଙ୍କ ପାଇଁ ରାଜକୀୟ ସୁବର୍ଣ୍ଣ ମୁକୁଟ',
        icon: '👑',
        cost: 10,
        gradient: 'linear-gradient(135deg, #FFE000 0%, #799F0C 100%)',
        borderColor: '#EAB308'
      },
      {
        id: 'pz_medal',
        title: 'ମେଧାବୀ ଛାତ୍ର ମେଡାଲ୍ (Super Kid Medal)',
        description: 'ଗଣିତ ଓ ଓଡ଼ିଆରେ ଉତ୍କୃଷ୍ଟ ପ୍ରଦର୍ଶନ ପାଇଁ ସ୍ୱର୍ଣ୍ଣ ମେଡାଲ୍',
        icon: '🏅',
        cost: 20,
        gradient: 'linear-gradient(135deg, #F2994A 0%, #F2C94C 100%)',
        borderColor: '#F97316'
      },
      {
        id: 'pz_rocket',
        title: 'ବିଜ୍ଞାନ ରକେଟ୍ (Science Explorer Rocket)',
        description: 'ମହାକାଶ ଓ ବିଜ୍ଞାନ ଜ୍ଞାନର ସୁପର ରକେଟ୍',
        icon: '🚀',
        cost: 35,
        gradient: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)',
        borderColor: '#EF4444'
      },
      {
        id: 'pz_certificate',
        title: 'ଜ୍ଞାନୀ ସାର୍ଟିଫିକେଟ୍ (Honor Certificate)',
        description: 'SCERT ଓଡ଼ିଶା ପ୍ରାଥମିକ ଶିକ୍ଷାର ସମ୍ମାନଜନକ ପ୍ରମାଣପତ୍ର',
        icon: '📜',
        cost: 50,
        gradient: 'linear-gradient(135deg, #4568DC 0%, #B06AB3 100%)',
        borderColor: '#6366F1'
      },
      {
        id: 'pz_trophy',
        title: 'ମହାବୀର ଚାମ୍ପିଅନ୍ ଟ୍ରଫି (Gold Champion Trophy)',
        description: 'ପ୍ରଥମ ସ୍ଥାନ ହାସଲ କରିଥିବା ବିଜେତାଙ୍କ ଟ୍ରଫି',
        icon: '🏆',
        cost: 75,
        gradient: 'linear-gradient(135deg, #F7971E 0%, #FFD200 100%)',
        borderColor: '#D97706'
      },
      {
        id: 'pz_magic_pen',
        title: 'ଜାଦୁଇ ସୁବର୍ଣ୍ଣ କଲମ (Magic Golden Pen)',
        description: 'ସୁନ୍ଦର ହସ୍ତାକ୍ଷର ଓ ଶୁଦ୍ଧ ଲେଖନ ପାଇଁ ଜାଦୁଇ କଲମ',
        icon: '🪄',
        cost: 100,
        gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        borderColor: '#10B981'
      }
    ];
  }

  getBadgesList() {
    return [
      { id: 'bdg_starter', name: 'ଶୁଭାରମ୍ଭ (Beginner)', description: 'ପ୍ରଥମ ଖେଳ ସଫଳତାର ସହ ସମ୍ପୂର୍ଣ୍ଣ କଲେ', icon: '🌟', color: '#3B82F6', minStars: 0 },
      { id: 'bdg_letter',  name: 'ଅକ୍ଷର ଗୁରୁ (Letter Expert)', description: 'ଓଡ଼ିଆ ଅକ୍ଷର ଚିହ୍ନଟରେ ୧୦୦% ରଖିଲେ', icon: '✍️', color: '#EC4899', minStars: 10 },
      { id: 'bdg_math',    name: 'ଗଣିତ ଯାଦୁକର (Math Wizard)', description: 'ଗଣିତ ପ୍ରଶ୍ନର ସଠିକ୍ ଉତ୍ତର ଦେଲେ', icon: '🔢', color: '#8B5CF6', minStars: 20 },
      { id: 'bdg_color',   name: 'ରଙ୍ଗ ସୃଜନୀ (Color Master)', description: 'ସମସ୍ତ ରଙ୍ଗ ଓ ଚିତ୍ର ଚିହ୍ନଟ କଲେ', icon: '🎨', color: '#F59E0B', minStars: 30 },
      { id: 'bdg_nature',  name: 'ପରିବେଶ ପ୍ରେମୀ (Nature Lover)', description: 'ପରିବେଶ ଓ ବିଜ୍ଞାନ କ୍ବିଜ୍ ଜିତିଲେ', icon: '🌿', color: '#10B981', minStars: 40 },
      { id: 'bdg_super',   name: 'ସୁପର୍ ଷ୍ଟାର୍ (Super Star)', description: '୫୦ ରୁ ଊର୍ଦ୍ଧ୍ୱ ଷ୍ଟାର୍ ଅର୍ଜନ କଲେ', icon: '⭐', color: '#EF4444', minStars: 50 }
    ];
  }

  renderRewardsView() {
    const totalStars = this.getStarBalance();
    const unlockedPrizes = this.getUnlockedPrizes();
    const userKey = this.getUserStarsKey();

    const totalStarsEl = document.getElementById('rewards-total-stars');
    const totalGamesEl = document.getElementById('rewards-total-games');
    const unlockedCountEl = document.getElementById('rewards-unlocked-count');

    let totalGames = 0;
    if (userKey) {
      const user = (typeof authManager !== 'undefined') ? authManager.currentUser : JSON.parse(localStorage.getItem('odia_user_cache') || 'null');
      if (user) {
        totalGames = parseInt(localStorage.getItem('odia_games_played_' + (user.email || user.id || user.name)) || '0', 10);
      }
    }

    if (totalStarsEl) totalStarsEl.textContent = totalStars;
    if (totalGamesEl) totalGamesEl.textContent = totalGames;
    if (unlockedCountEl) unlockedCountEl.textContent = unlockedPrizes.length;

    // Render Prizes Grid
    const prizesGrid = document.getElementById('prizes-grid');
    if (prizesGrid) {
      const prizes = this.getPrizesList();
      prizesGrid.innerHTML = prizes.map(p => {
        const isUnlocked = unlockedPrizes.includes(p.id);
        const pct = Math.min(100, Math.round((totalStars / p.cost) * 100));
        const canUnlock = totalStars >= p.cost && !isUnlocked;

        return `
          <div class="prize-card animate-pop" style="border-color: ${isUnlocked ? '#10B981' : '#E2E8F0'};">
            <span class="prize-badge-top ${isUnlocked ? 'prize-badge-unlocked' : 'prize-badge-locked'}">
              ${isUnlocked ? '✨ ଅନ୍‌ଲକ୍ ହୋଇଛି' : `⭐ ${p.cost} ଷ୍ଟାର୍`}
            </span>
            <div class="prize-icon-box" style="background: ${p.gradient}; color: white;">
              ${p.icon}
            </div>
            <div>
              <h4 class="prize-title">${p.title}</h4>
              <p class="prize-desc">${p.description}</p>
            </div>
            <div>
              <div class="prize-progress-bg">
                <div class="prize-progress-fill" style="width: ${pct}%; background: ${isUnlocked ? '#10B981' : '#F59E0B'};"></div>
              </div>
              ${isUnlocked ? `
                <button class="prize-btn prize-btn-claimed" onclick="app.viewPrizeDetail('${p.id}')">
                  ✨ ଅନ୍‌ଲକ୍ ହୋଇଛି (ଦେଖନ୍ତୁ 🏆)
                </button>
              ` : canUnlock ? `
                <button class="prize-btn prize-btn-unlock" onclick="app.unlockPrize('${p.id}')">
                  🔓 ଅନ୍‌ଲକ୍ କରନ୍ତୁ (${p.cost} ଷ୍ଟାର୍)
                </button>
              ` : `
                <button class="prize-btn prize-btn-locked" disabled>
                  🔒 ଅଧିକ ${p.cost - totalStars} ଷ୍ଟାର୍ ଦରକାର
                </button>
              `}
            </div>
          </div>
        `;
      }).join('');
    }

    // Render Badges Grid
    const badgesGrid = document.getElementById('badges-grid');
    if (badgesGrid) {
      const badges = this.getBadgesList();
      badgesGrid.innerHTML = badges.map(b => {
        const isEarned = totalStars >= b.minStars;
        return `
          <div class="badge-card animate-pop" style="opacity: ${isEarned ? 1 : 0.6}; background: ${isEarned ? '#FFFFFF' : '#F8FAFC'};">
            <div class="badge-card-icon" style="background: ${b.color}; color: white;">
              ${b.icon}
            </div>
            <div>
              <h4 class="badge-card-name">${b.name} ${isEarned ? '✅' : '🔒'}</h4>
              <p class="badge-card-desc">${b.description}</p>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  unlockPrize(prizeId) {
    const prizes = this.getPrizesList();
    const prize = prizes.find(p => p.id === prizeId);
    if (!prize) return;

    const totalStars = this.getStarBalance();
    if (totalStars < prize.cost) {
      alert(`🔒 ଏହି ପୁରସ୍କାର ପାଇଁ ଆପଣଙ୍କୁ ${prize.cost - totalStars} ଷ୍ଟାର୍ ଅଧିକ ଦରକାର!`);
      return;
    }

    const unlockedPrizes = this.getUnlockedPrizes();
    let newStars = totalStars;

    if (!unlockedPrizes.includes(prizeId)) {
      unlockedPrizes.push(prizeId);
      const prizeKey = this.getUserPrizesKey();
      if (prizeKey) localStorage.setItem(prizeKey, JSON.stringify(unlockedPrizes));

      // Deduct prize cost from student's star balance
      newStars = Math.max(0, totalStars - prize.cost);
      this.setStarBalance(newStars);
      this.updateHeaderStats();
    }

    try { if (typeof audioManager !== 'undefined') audioManager.playVictory(); } catch (e) {}
    this.renderRewardsView();

    alert(`🎉 ଅଭିନନ୍ଦନ! ଆପଣ ${prize.cost} ଷ୍ଟାର୍ ଦେଇ "${prize.title}" ପୁରସ୍କାର ଅନ୍‌ଲକ୍ କଲେ! 🏆✨\n\n⭐ ଆପଣଙ୍କ ବାକି ଷ୍ଟାର୍: ${newStars}`);
  }

  viewPrizeDetail(prizeId) {
    const prizes = this.getPrizesList();
    const prize = prizes.find(p => p.id === prizeId);
    if (prize) {
      try { if (typeof audioManager !== 'undefined') audioManager.playSuccess(); } catch (e) {}
      alert(`🏆 ${prize.title}\n\n✨ ${prize.description}\n\nଆପଣ ଏହି ପୁରସ୍କାର ସଫଳତାର ସହ ହାସଲ କରିଛନ୍ତି! 🎉`);
    }
  }

    renderProfileView() {
    const container = document.getElementById('profile-dashboard-container');
    if (!container) return;

    const profileName = localStorage.getItem('odia_profile_name') || 'Guest (ଅତିଥି)';
    const totalStars = this.getStarBalance();
    const unlockedPrizes = this.getUnlockedPrizes();
    const selectedClass = this.selectedClassNumber || 1;
    const currentAvatar = localStorage.getItem('odia_profile_avatar') || '👤';

    const avatars = ['👤', '👦', '👧', '🎓', '🚀', '🦁', '👑', '⭐'];

    container.innerHTML = `
      <!-- 1. Hero Profile Banner -->
      <div class="animate-pop" style="background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%); border-radius: 28px; padding: 28px 24px; color: white; margin-bottom: 28px; box-shadow: 0 14px 28px rgba(99, 102, 241, 0.25); border: 3px solid rgba(255, 255, 255, 0.3); position: relative; overflow: hidden;">
        <div style="position: absolute; right: -20px; top: -20px; opacity: 0.15; font-size: 10rem; pointer-events: none;">👤</div>

        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px; position: relative; z-index: 2;">
          <div style="display: flex; align-items: center; gap: 18px;">
            <div style="font-size: 3.5rem; background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(10px); padding: 16px; border-radius: 24px; border: 2.5px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 16px rgba(0,0,0,0.15);">
              ${currentAvatar}
            </div>
            <div>
              <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px); padding: 4px 12px; border-radius: 50px; font-size: 0.82rem; font-weight: 800; margin-bottom: 6px;">
                <span>🥇 Gold Rank Student</span>
                <span>•</span>
                <span>🏫 ଶ୍ରେଣୀ ${selectedClass}</span>
              </div>
              <h1 style="font-size: 2.1rem; font-weight: 900; margin: 0; line-height: 1.2;">
                ${profileName}
              </h1>
              <p style="font-size: 0.95rem; opacity: 0.92; font-weight: 600; margin-top: 4px;">
                ଓଡ଼ିଶା SCERT ପ୍ରାଥମିକ ଶିକ୍ଷା ସୁପର ଷ୍ଟୁଡେଣ୍ଟ
              </p>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 12px; background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(12px); padding: 14px 20px; border-radius: 20px; border: 1.5px solid rgba(255, 255, 255, 0.25);">
            <div style="text-align: center; border-right: 1px solid rgba(255,255,255,0.3); padding-right: 14px;">
              <div style="font-size: 1.5rem; font-weight: 900; color: #FDE047;">⭐ ${totalStars}</div>
              <div style="font-size: 0.75rem; font-weight: 700; opacity: 0.9;">ମୋଟ ଷ୍ଟାର୍</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 1.5rem; font-weight: 900; color: #6EE7B7;">🏆 ${unlockedPrizes.length}</div>
              <div style="font-size: 0.75rem; font-weight: 700; opacity: 0.9;">ପୁରସ୍କାର</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Edit Profile & Avatar Selector -->
      <div class="animate-pop" style="background: #FFFFFF; border-radius: 24px; padding: 24px; border: 2.5px solid #E2E8F0; box-shadow: 0 8px 20px rgba(0,0,0,0.04); margin-bottom: 28px;">
        <h3 style="font-size: 1.25rem; font-weight: 900; color: #1E293B; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
          <span>✏️ ପ୍ରୋଫାଇଲ୍ ସେଟିଂସ</span>
        </h3>

        <!-- Avatar Choice -->
        <div style="margin-bottom: 20px;">
          <label style="font-weight: 800; font-size: 0.92rem; color: #64748B; display: block; margin-bottom: 10px;">
            ଆପଣଙ୍କର ପସନ୍ଦର ଅବତାର (Avatar) ବାଛନ୍ତୁ:
          </label>
          <div style="display: flex; flex-wrap: wrap; gap: 12px;">
            ${avatars.map(av => `
              <button onclick="app.selectProfileAvatar('${av}')" style="font-size: 1.8rem; background: ${currentAvatar === av ? '#EEF2FF' : '#F8FAFC'}; border: ${currentAvatar === av ? '3px solid #6366F1' : '2px solid #E2E8F0'}; padding: 10px 14px; border-radius: 16px; cursor: pointer; transition: transform 0.2s ease;">
                ${av}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Name Input -->
        <div>
          <label style="font-weight: 800; font-size: 0.92rem; color: #64748B; display: block; margin-bottom: 8px;">
            ଛାତ୍ର/ଛାତ୍ରୀଙ୍କ ନାମ (Student Name):
          </label>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <input type="text" id="profile-name-input" class="form-input" value="${profileName}" style="flex: 1; min-width: 220px; font-weight: 800; font-size: 1.1rem; border-radius: 16px; padding: 12px 18px; border: 2px solid #CBD5E1;">
            <button class="btn btn-primary" onclick="app.saveProfileName()" style="border-radius: 16px; padding: 12px 24px; font-weight: 800;">
              💾 ସେଭ୍ କରନ୍ତୁ
            </button>
          </div>
        </div>
      </div>

      <!-- 3. Class Switcher Section -->
      <div class="animate-pop" style="background: #FFFFFF; border-radius: 24px; padding: 24px; border: 2.5px solid #E2E8F0; box-shadow: 0 8px 20px rgba(0,0,0,0.04); margin-bottom: 28px;">
        <h3 style="font-size: 1.25rem; font-weight: 900; color: #1E293B; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
          <span>🏫 ଶ୍ରେଣୀ ବଦଳାନ୍ତୁ (Select Class Level)</span>
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px;">
          ${[1, 2, 3, 4, 5].map(num => `
            <button onclick="app.selectClass(${num}, 'c${num}')" style="background: ${selectedClass === num ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' : '#F8FAFC'}; color: ${selectedClass === num ? '#FFFFFF' : '#1E293B'}; border: ${selectedClass === num ? '3px solid #6366F1' : '2px solid #E2E8F0'}; padding: 14px; border-radius: 18px; font-weight: 900; font-size: 1.05rem; cursor: pointer; transition: all 0.2s ease;">
              🎒 ଶ୍ରେଣୀ ${num} ${selectedClass === num ? '✅' : ''}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- 4. Account Login & Sign Up Buttons -->
      <div class="animate-pop" style="background: #FFFFFF; border-radius: 24px; padding: 24px; border: 2.5px solid #E2E8F0; box-shadow: 0 8px 20px rgba(0,0,0,0.04); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; margin-top: 24px;">
        <div>
          <h4 style="font-size: 1.1rem; font-weight: 900; color: #1E293B; margin: 0;">🔐 ଆକାଉଣ୍ଟ ଲଗଇନ୍ ଓ ସାଇନ୍ ଅପ୍</h4>
          <p style="font-size: 0.85rem; color: #64748B; margin: 4px 0 0 0; font-weight: 600;">ଆପଣଙ୍କ ସମସ୍ତ ଗେମ୍ ଡାଟା ଓ ଷ୍ଟାର୍ ସୁରକ୍ଷିତ ରଖିବା ପାଇଁ ଲଗଇନ୍ କରନ୍ତୁ</p>
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="btn btn-outline" onclick="typeof authManager !== 'undefined' ? authManager.showAuthModal('login') : alert('ଲଗଇନ୍ ମୋଡାଲ୍ ଖୋଲୁଛି...')" style="border-radius: 50px; font-weight: 800; padding: 10px 22px; display: inline-flex; align-items: center; gap: 6px;">
            🔑 ଲଗଇନ୍ (Login)
          </button>
          <button class="btn btn-primary" onclick="typeof authManager !== 'undefined' ? authManager.showAuthModal('register') : alert('ସାଇନ୍ ଅପ୍ ମୋଡାଲ୍ ଖୋଲୁଛି...')" style="border-radius: 50px; font-weight: 800; padding: 10px 22px; display: inline-flex; align-items: center; gap: 6px;">
            ✨ ସାଇନ୍ ଅପ୍ (Sign Up)
          </button>
      </div>
    `;
  }

  selectProfileAvatar(avatar) {
    localStorage.setItem('odia_profile_avatar', avatar);
    try { if (typeof audioManager !== 'undefined') audioManager.playSuccess(); } catch (e) {}
    this.renderProfileView();
  }

  saveProfileName() {
    const input = document.getElementById('profile-name-input');
    if (input && input.value.trim()) {
      localStorage.setItem('odia_profile_name', input.value.trim());
      this.updateHeaderStats();
      this.renderProfileView();
      try { if (typeof audioManager !== 'undefined') audioManager.playSuccess(); } catch (e) {}
      alert('🎉 ପ୍ରୋଫାଇଲ୍ ନାମ ସଫଳତାର ସହ ସେଭ୍ ହେଲା!');
    }
  }

  confirmResetProgress() {
    if (confirm('ଆପଣ ସତରେ ଆପଣଙ୍କର ଗେମ୍ ପ୍ରଗତି ରିସେଟ୍ କରିବାକୁ ଚାହାଁନ୍ତି କି?')) {
      const key = this.getUserStarsKey();
      if (key) localStorage.removeItem(key);
      localStorage.removeItem('odia_unlocked_prizes');
      this.updateHeaderStats();
      this.renderProfileView();
      alert('ପ୍ରଗତି ରିସେଟ୍ କରାଗଲା।');
    }
  }
}

const app = new AppController();
document.addEventListener('DOMContentLoaded', () => app.init());
