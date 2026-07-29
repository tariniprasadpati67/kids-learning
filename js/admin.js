/**
 * SCERT Odisha Primary School Textbook Admin Panel Controller
 */

class AdminController {
  constructor() {
    this.currentTab = 'tab-dashboard';
  }

  async init() {
    this.showTab('tab-dashboard');
    await this.loadDashboardMetrics();
    this.setupImportForm();
  }

  showTab(tabId) {
    this.currentTab = tabId;
    document.querySelectorAll('.admin-tab-page').forEach(page => {
      page.style.display = 'none';
    });

    document.querySelectorAll('.sidebar-nav button').forEach(btn => {
      btn.classList.remove('active');
    });

    const targetPage = document.getElementById(tabId);
    if (targetPage) targetPage.style.display = 'block';

    const activeBtn = document.getElementById(`nav-btn-${tabId.replace('tab-', '')}`);
    if (activeBtn) activeBtn.classList.add('active');

    if (tabId === 'tab-dashboard') this.loadDashboardMetrics();
    if (tabId === 'tab-tree') this.loadTextbookTree();
    if (tabId === 'tab-questions') this.loadQuestionsList();
  }

  async loadDashboardMetrics() {
    try {
      const res = await apiClient.getAdminDashboard();
      if (res.data) {
        document.getElementById('admin-stat-books').textContent = res.data.totalBooks || 0;
        document.getElementById('admin-stat-chapters').textContent = res.data.totalChapters || 0;
        document.getElementById('admin-stat-topics').textContent = res.data.totalTopics || 0;
        document.getElementById('admin-stat-questions').textContent = res.data.totalQuestions || 0;
      }
    } catch (err) {
      console.error('Failed to load dashboard metrics', err);
    }
  }

  async loadTextbookTree() {
    const container = document.getElementById('tree-container');
    if (!container) return;

    container.innerHTML = '<div style="text-align:center; padding:20px;">Tree structure loading...</div>';

    try {
      const res = await apiClient.getAdminTextbookTree();
      const tree = res.data || [];

      if (!tree || tree.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:20px;">No textbook data imported yet. Use the Import tab to publish textbooks.</div>';
        return;
      }

      container.innerHTML = tree.map(c => `
        <div class="tree-class-block">
          <div class="tree-class-header">
            <span>🏫 ${c.title || `Class ${c.classNumber}`} (${(c.books || []).length} Textbooks)</span>
            <span>Class #${c.classNumber}</span>
          </div>
          <div class="tree-body">
            ${(c.books || []).length === 0 ? '<p style="color:#94a3b8; font-size:0.85rem;">No textbooks added for this class.</p>' : ''}
            ${(c.books || []).map(b => `
              <div class="tree-book-node">
                <h4 style="font-size: 1rem; color: #667eea;">📕 Textbook: ${b.odiaTitle || b.title}</h4>
                ${(b.chapters || []).map(ch => `
                  <div class="tree-chapter-node">
                    <h5 style="font-size: 0.92rem; color: #10AC84;">📖 Chapter ${ch.chapterNumber || 1}: ${ch.odiaTitle || ch.title}</h5>
                    ${(ch.topics || []).map(tp => `
                      <div class="tree-topic-node">
                        <div style="font-size:0.85rem; color:#FFB800; font-weight:700;">
                          📌 Topic ${tp.topicNumber || 1}: ${tp.odiaTitle || tp.title}
                          <span style="color:#94a3b8; font-weight:normal; margin-left:10px;">
                            (${(tp.lessons || []).length} Lessons, ${(tp.questions || []).length} Questions)
                          </span>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                `).join('')}
              </div>
            `).join('')}
          </div>
        </div>
      `).join('');
    } catch (e) {
      container.innerHTML = `<div style="color:red; text-align:center; padding:20px;">Error loading tree: ${e.message}</div>`;
    }
  }

  onImportTypeChange(val) {
    const area = document.getElementById('json-input-area');
    if (area) {
      area.style.display = val === 'json' ? 'block' : 'none';
    }
  }

  setupImportForm() {
    const form = document.getElementById('form-import-textbook');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const classNumber = document.getElementById('import-class-num').value;
      const subjectName = document.getElementById('import-subject-name').value;
      const bookTitle = document.getElementById('import-book-title').value;
      const payloadStr = document.getElementById('import-json-payload').value;

      try {
        let chapters = [];
        if (payloadStr) {
          chapters = JSON.parse(payloadStr);
        } else {
          chapters = [{
            chapterNumber: 1,
            title: 'ମୂଳ ଅଧ୍ୟାୟ',
            topics: [{
              topicNumber: 1,
              title: 'ମୂଳ ଟପିକ୍',
              lessons: [{ title: 'ପ୍ରଥମ ପାଠ', content: 'ସରକାରୀ ପାଠ୍ୟପୁସ୍ତକ ବିଷୟବସ୍ତୁ' }]
            }]
          }];
        }

        const importPayload = {
          classNumber: Number(classNumber),
          subjectName: subjectName.trim(),
          bookTitle: bookTitle.trim(),
          odiaBookTitle: bookTitle.trim(),
          chapters
        };

        const res = await apiClient.importTextbookData(importPayload);
        alert(`🎉 ${res.message}\nImported Chapters: ${res.data.importedChaptersCount}, Topics: ${res.data.importedTopicsCount}`);
        form.reset();
        this.showTab('tab-tree');
      } catch (err) {
        alert(`⚠️ Import Error: ${err.message}`);
      }
    });
  }

  async loadQuestionsList() {
    const listEl = document.getElementById('admin-questions-list');
    if (!listEl) return;

    try {
      const res = await apiClient.getAdminQuestions();
      const questions = res.data || [];

      if (questions.length === 0) {
        listEl.innerHTML = `<p style="text-align:center; padding:16px;">No questions found. Use the Import tab to import textbooks.</p>`;
        return;
      }

      listEl.innerHTML = questions.map(q => `
        <div style="background: #1a1a2e; padding: 14px; border-radius: 10px; margin-bottom: 10px; border: 1px solid #3d3d5c;">
          <div style="display: flex; justify-content: space-between;">
            <strong>${q.question}</strong>
            <button class="btn btn-sm btn-danger" onclick="adminManager.deleteQuestion('${q._id}')">🗑️ Delete</button>
          </div>
          <div style="margin-top: 8px; font-size: 0.85rem; color: #94a3b8;">
            Class: ${q.classNumber || '1'} | Options: ${(q.options || []).join(', ')}
          </div>
        </div>
      `).join('');
    } catch (err) {
      listEl.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
    }
  }

  async deleteQuestion(id) {
    if (!confirm('Are you sure you want to delete this question?')) return;
    try {
      const res = await apiClient.deleteQuestion(id);
      alert(res.message);
      this.loadQuestionsList();
      this.loadDashboardMetrics();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  }
}

const adminManager = new AdminController();
document.addEventListener('DOMContentLoaded', () => adminManager.init());
