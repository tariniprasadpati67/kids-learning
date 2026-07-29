/**
 * Odia Medium Learning Games - Centralized API Client
 */

class ApiClient {
  constructor() {
    this.baseUrl = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
      ? `${window.location.origin}/api`
      : '/api';
    this.token = localStorage.getItem('odia_app_token') || null;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('odia_app_token', token);
    } else {
      localStorage.removeItem('odia_app_token');
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (err) {
      console.warn(`[API Client Warning] Request to ${endpoint} failed: ${err.message}`);
      throw err;
    }
  }

  // Auth APIs
  async register(userData) {
    const res = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    if (res.data && res.data.token) {
      this.setToken(res.data.token);
    }
    return res;
  }

  async login(credentials) {
    const res = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    if (res.data && res.data.token) {
      this.setToken(res.data.token);
    }
    return res;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    }
    this.setToken(null);
  }

  async getMe() {
    return await this.request('/auth/me');
  }

  // Curriculum APIs
  async getClasses() {
    return await this.request('/classes');
  }

  async getSubjects(classId) {
    return await this.request(`/classes/${classId}/subjects`);
  }

  async getChapters(subjectId) {
    return await this.request(`/subjects/${subjectId}/chapters`);
  }

  async getGames(chapterId) {
    return await this.request(`/chapters/${chapterId}/games`);
  }

  async getQuestions(gameId) {
    return await this.request(`/games/${gameId}/questions`);
  }

  // Game Engine API
  async submitGame(gameId, payload) {
    return await this.request(`/games/${gameId}/submit`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  // Progress & Leaderboard
  async getMyProgress() {
    return await this.request('/progress/me');
  }

  async getLeaderboard() {
    return await this.request('/progress/leaderboard');
  }

  // Badges
  async getMyBadges() {
    return await this.request('/badges/me');
  }

  // Admin APIs
  async getAdminDashboard() {
    return await this.request('/admin/dashboard');
  }

  async getAdminUsers() {
    return await this.request('/admin/users');
  }

  async toggleUserStatus(userId) {
    return await this.request(`/admin/users/${userId}/toggle-status`, { method: 'PATCH' });
  }

  async getAdminQuestions() {
    return await this.request('/admin/questions');
  }

  async createQuestion(questionData) {
    return await this.request('/admin/questions', {
      method: 'POST',
      body: JSON.stringify(questionData)
    });
  }

  async deleteQuestion(id) {
    return await this.request(`/admin/questions/${id}`, { method: 'DELETE' });
  }
}

const apiClient = new ApiClient();
