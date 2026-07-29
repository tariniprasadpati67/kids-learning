/**
 * ଓଡ଼ିଆ ମାଧ୍ୟମ Learning Games - Storage & Progress Manager
 * Persists user state, stars, unlocked chapters, and badges in localStorage
 */

const STORAGE_KEY = "odia_learning_games_storage_v1";

class StorageManager {
  constructor() {
    this.state = this.loadState();
  }

  loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error("Failed to parse storage data", e);
      }
    }
    return this.getDefaultState();
  }

  getDefaultState() {
    return {
      profile: {
        name: "ଛାତ୍ର/ଛାତ୍ରୀ",
        selectedClass: "class1"
      },
      stats: {
        totalStars: 0,
        completedGamesCount: 0,
        chapterStars: {},      // { "c1_o1": 3 }
        completedChapters: []  // ["c1_o1"]
      },
      unlockedBadges: [],      // ["badge_first_game"]
      settings: {
        soundEnabled: true,
        animationsEnabled: true
      }
    };
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error("Failed to save storage data", e);
    }
  }

  getProfile() {
    return this.state.profile;
  }

  setProfileName(name) {
    if (name && name.trim()) {
      this.state.profile.name = name.trim();
      this.saveState();
    }
  }

  getSelectedClass() {
    return this.state.profile.selectedClass || "class1";
  }

  setSelectedClass(classId) {
    this.state.profile.selectedClass = classId;
    this.saveState();
  }

  getStats() {
    return this.state.stats;
  }

  getSettings() {
    return this.state.settings || { soundEnabled: true, animationsEnabled: true };
  }

  toggleSound(enable) {
    this.state.settings.soundEnabled = enable;
    this.saveState();
  }

  toggleAnimations(enable) {
    this.state.settings.animationsEnabled = enable;
    this.saveState();
  }

  isChapterCompleted(chapterId) {
    return this.state.stats.completedChapters.includes(chapterId);
  }

  getChapterStars(chapterId) {
    return this.state.stats.chapterStars[chapterId] || 0;
  }

  isChapterUnlocked(subjectChapters, index) {
    if (index === 0) return true; // First chapter always unlocked
    const prevChapter = subjectChapters[index - 1];
    return this.isChapterCompleted(prevChapter.id);
  }

  recordGameCompletion(chapterId, starsEarned, accuracyPercentage, subjectId) {
    const currentStars = this.state.stats.chapterStars[chapterId] || 0;
    
    // If earned more stars than previous attempt, add the difference to totalStars
    if (starsEarned > currentStars) {
      const diff = starsEarned - currentStars;
      this.state.stats.totalStars += diff;
      this.state.stats.chapterStars[chapterId] = starsEarned;
    }

    if (!this.state.stats.completedChapters.includes(chapterId)) {
      this.state.stats.completedChapters.push(chapterId);
      this.state.stats.completedGamesCount += 1;
    }

    this.saveState();
    const newBadges = this.checkBadgeUnlocks(starsEarned, accuracyPercentage, subjectId, chapterId);
    return newBadges;
  }

  checkBadgeUnlocks(starsEarned, accuracyPercentage, subjectId, chapterId) {
    const newlyUnlocked = [];

    const unlock = (badgeId) => {
      if (!this.state.unlockedBadges.includes(badgeId)) {
        this.state.unlockedBadges.push(badgeId);
        const badgeObj = BADGES_CONFIG.find(b => b.id === badgeId);
        if (badgeObj) newlyUnlocked.push(badgeObj);
      }
    };

    // 1. First game
    if (this.state.stats.completedGamesCount >= 1) unlock("badge_first_game");

    // 2. Stars thresholds
    if (this.state.stats.totalStars >= 10) unlock("badge_stars_10");
    if (this.state.stats.totalStars >= 50) unlock("badge_stars_50");

    // 3. Completed games thresholds
    if (this.state.stats.completedGamesCount >= 5) unlock("badge_games_5");
    if (this.state.stats.completedGamesCount >= 10) unlock("badge_games_10");

    // 4. Perfect Quiz
    if (accuracyPercentage >= 100) unlock("badge_perfect_quiz");

    // 5. Subject specific
    if (subjectId === "math") unlock("badge_math_star");
    if (subjectId === "english") unlock("badge_english_star");
    if (subjectId === "gk") unlock("badge_gk_champ");

    // 6. Memory Game victory
    if (chapterId && chapterId.includes("memory")) {
      unlock("badge_memory_king");
    }

    // 7. Class 5 achievement
    if (chapterId && chapterId.startsWith("c5_")) {
      unlock("badge_class5_hero");
    }

    if (newlyUnlocked.length > 0) {
      this.saveState();
    }

    return newlyUnlocked;
  }

  resetProgress() {
    this.state = this.getDefaultState();
    this.saveState();
  }
}

const storageManager = new StorageManager();
