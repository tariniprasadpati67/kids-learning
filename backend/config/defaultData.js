const bcrypt = require('bcryptjs');

class MemoryStore {
  constructor() {
    this.initialized = false;
    this.users = [];
    this.classes = [];
    this.subjects = [];
    this.books = [];
    this.chapters = [];
    this.lessons = [];
    this.games = [];
    this.questions = [];
    this.attempts = [];
    this.progress = [];
    this.badges = [];
    this.userBadges = [];
  }

  async seedDefaults() {
    if (this.initialized) return;
    const adminHash = await bcrypt.hash('Admin@123456', 10);
    const studentHash = await bcrypt.hash('Student@123456', 10);

    this.users = [
      { _id: 'u_admin', name: 'ଶିକ୍ଷା ଆଡମିନ୍', email: 'admin@odisha.edu', passwordHash: adminHash, role: 'admin', classLevel: 5, avatar: '👨‍🏫', totalStars: 50, totalGames: 10, completedGames: 10, isActive: true, createdAt: new Date() }
    ];

    // ======= CLASSES 1 TO 5 =======
    this.classes = [
      { _id: 'c1', classNumber: 1, title: 'ଶ୍ରେଣୀ ୧', odiaTitle: 'ଶ୍ରେଣୀ ୧', description: 'ଅକ୍ଷର, ସଂଖ୍ୟା, ରଙ୍ଗ ଓ ଚିତ୍ର ଚିହ୍ନଟ', icon: '🎒', isActive: true },
      { _id: 'c2', classNumber: 2, title: 'ଶ୍ରେଣୀ ୨', odiaTitle: 'ଶ୍ରେଣୀ ୨', description: 'ଶବ୍ଦ ଗଠନ, ଯୋଗ ଓ ବିୟୋଗ', icon: '📚', isActive: true },
      { _id: 'c3', classNumber: 3, title: 'ଶ୍ରେଣୀ ୩', odiaTitle: 'ଶ୍ରେଣୀ ୩', description: 'ଗୁଣନ, ସୁନ୍ଦର ବାକ୍ୟ, ପରିବେଶ', icon: '✏️', isActive: true },
      { _id: 'c4', classNumber: 4, title: 'ଶ୍ରେଣୀ ୪', odiaTitle: 'ଶ୍ରେଣୀ ୪', description: 'ହରଣ, ବିଜ୍ଞାନ, ଭୂଗୋଳ', icon: '🔬', isActive: true },
      { _id: 'c5', classNumber: 5, title: 'ଶ୍ରେଣୀ ୫', odiaTitle: 'ଶ୍ରେଣୀ ୫', description: 'ମିଶ୍ରିତ ଗଣିତ, ବ୍ୟାକରଣ, ଜ୍ଞାନ', icon: '🏆', isActive: true }
    ];

    // ======= SUBJECTS FOR CLASSES =======
    this.subjects = [
      // Class 1
      { _id: 'sc1_letter', classId: 'c1', classNumber: 1, name: 'ଅକ୍ଷର ଚିହ୍ନଟ', odiaName: 'ଅକ୍ଷର ଚିହ୍ନଟ (Odia Letters)', icon: '✍️', color: '#FF6B6B', isActive: true },
      { _id: 'sc1_number', classId: 'c1', classNumber: 1, name: 'ସଂଖ୍ୟା (୧-୧୦)', odiaName: 'ସଂଖ୍ୟା ଗଣନା (Numbers 1-10)', icon: '🔢', color: '#4E65FF', isActive: true },
      { _id: 'sc1_color',  classId: 'c1', classNumber: 1, name: 'ରଙ୍ଗ ଚିହ୍ନଟ', odiaName: 'ରଙ୍ଗ ଚିହ୍ନଟ (Colors)', icon: '🎨', color: '#F39C12', isActive: true },
      { _id: 'sc1_picture', classId: 'c1', classNumber: 1, name: 'ଚିତ୍ର ଚିହ୍ନଟ', odiaName: 'ଚିତ୍ର ଚିହ୍ନଟ (Picture Quiz)', icon: '🖼️', color: '#2ECC71', isActive: true },

      // Class 2
      { _id: 'sc2_word', classId: 'c2', classNumber: 2, name: 'ଶବ୍ଦ ଗଠନ', odiaName: 'ଶବ୍ଦ ଗଠନ (Word Formation)', icon: '📝', color: '#FF6B6B', isActive: true },
      { _id: 'sc2_add',  classId: 'c2', classNumber: 2, name: 'ଯୋଗ', odiaName: 'ଯୋଗ (Addition)', icon: '➕', color: '#4E65FF', isActive: true },
      { _id: 'sc2_sub',  classId: 'c2', classNumber: 2, name: 'ବିୟୋଗ', odiaName: 'ବିୟୋଗ (Subtraction)', icon: '➖', color: '#E74C3C', isActive: true },

      // Class 3
      { _id: 'sc3_mul',  classId: 'c3', classNumber: 3, name: 'ଗୁଣନ', odiaName: 'ଗୁଣନ (Multiplication)', icon: '✖️', color: '#4E65FF', isActive: true },
      { _id: 'sc3_sent', classId: 'c3', classNumber: 3, name: 'ସୁନ୍ଦର ବାକ୍ୟ', odiaName: 'ସୁନ୍ଦର ବାକ୍ୟ (Sentence Building)', icon: '✍️', color: '#FF6B6B', isActive: true },
      { _id: 'sc3_env',  classId: 'c3', classNumber: 3, name: 'ପରିବେଶ', odiaName: 'ପରିବେଶ (Environment EVS)', icon: '🌿', color: '#2ECC71', isActive: true },

      // Class 4
      { _id: 'sc4_div', classId: 'c4', classNumber: 4, name: 'ହରଣ', odiaName: 'ହରଣ (Division)', icon: '➗', color: '#4E65FF', isActive: true },
      { _id: 'sc4_sci', classId: 'c4', classNumber: 4, name: 'ବିଜ୍ଞାନ', odiaName: 'ବିଜ୍ଞାନ (Science)', icon: '🔬', color: '#E74C3C', isActive: true },
      { _id: 'sc4_geo', classId: 'c4', classNumber: 4, name: 'ଭୂଗୋଳ', odiaName: 'ଭୂଗୋଳ (Geography)', icon: '🌍', color: '#F39C12', isActive: true },

      // Class 5
      { _id: 'sc5_mmath', classId: 'c5', classNumber: 5, name: 'ମିଶ୍ରିତ ଗଣିତ', odiaName: 'ମିଶ୍ରିତ ଗଣିତ (Advanced Math)', icon: '📐', color: '#4E65FF', isActive: true },
      { _id: 'sc5_gram',  classId: 'c5', classNumber: 5, name: 'ବ୍ୟାକରଣ', odiaName: 'ବ୍ୟାକରଣ (Odia Grammar)', icon: '📖', color: '#9B59B6', isActive: true },
      { _id: 'sc5_gk',    classId: 'c5', classNumber: 5, name: 'ଜ୍ଞାନ', odiaName: 'ଜ୍ଞାନ (General Knowledge)', icon: '💡', color: '#2ECC71', isActive: true }
    ];

    // ======= CHAPTERS =======
    this.chapters = [
      // Class 1
      { _id: 'ch_c1_1', classId: 'c1', subjectId: 'sc1_letter', chapterNumber: 1, title: 'ଅକ୍ଷର ଚିହ୍ନଟ (ଅ-ଅଃ)', description: 'ଓଡ଼ିଆ ସ୍ୱରବର୍ଣ୍ଣ ଓ ବ୍ୟଞ୍ଜନବର୍ଣ୍ଣ' },
      { _id: 'ch_c1_2', classId: 'c1', subjectId: 'sc1_number', chapterNumber: 1, title: 'ସଂଖ୍ୟା ୧ ରୁ ୧୦', description: 'ଏକ ରୁ ଦଶ ଗଣନା' },
      { _id: 'ch_c1_3', classId: 'c1', subjectId: 'sc1_color',  chapterNumber: 1, title: 'ରଙ୍ଗ ଚିହ୍ନଟ', description: 'ପ୍ରାକୃତିକ ରଙ୍ଗ' },
      { _id: 'ch_c1_4', classId: 'c1', subjectId: 'sc1_picture', chapterNumber: 1, title: 'ଚିତ୍ର ଚିହ୍ନଟ ଖେଳ', description: 'ଫଳ, ଫୁଲ ଓ ପଶୁ ଚିହ୍ନଟ' },

      // Class 2
      { _id: 'ch_c2_1', classId: 'c2', subjectId: 'sc2_word', chapterNumber: 1, title: 'ଅକ୍ଷରରୁ ଶବ୍ଦ ଗଠନ', description: 'ସରଳ ଓଡ଼ିଆ ଶବ୍ଦ' },
      { _id: 'ch_c2_2', classId: 'c2', subjectId: 'sc2_add',  chapterNumber: 1, title: 'ସରଳ ଯୋଗ', description: 'ଦୁଇ ଅଙ୍କ ଯୋଗ' },
      { _id: 'ch_c2_3', classId: 'c2', subjectId: 'sc2_sub',  chapterNumber: 1, title: 'ସରଳ ବିୟୋଗ', description: 'ଦୁଇ ଅଙ୍କ ବିୟୋଗ' },

      // Class 3
      { _id: 'ch_c3_1', classId: 'c3', subjectId: 'sc3_mul',  chapterNumber: 1, title: 'ଗୁଣନ ସାରଣୀ', description: 'ଗୁଣନ ପ୍ରଶ୍ନୋତ୍ତର' },
      { _id: 'ch_c3_2', classId: 'c3', subjectId: 'sc3_sent', chapterNumber: 1, title: 'ଶୁଦ୍ଧ ବାକ୍ୟ ପୂରଣ', description: 'ବାକ୍ୟ ଗଠନ କୌଶଳ' },
      { _id: 'ch_c3_3', classId: 'c3', subjectId: 'sc3_env',  chapterNumber: 1, title: 'ଆମ ପରିବେଶ', description: 'ଗଛଲତା ଓ ଜୀବଜନ୍ତୁ' },

      // Class 4
      { _id: 'ch_c4_1', classId: 'c4', subjectId: 'sc4_div', chapterNumber: 1, title: 'ହରଣ ଖେଳ', description: 'ସରଳ ହରଣ ପ୍ରଶ୍ନ' },
      { _id: 'ch_c4_2', classId: 'c4', subjectId: 'sc4_sci', chapterNumber: 1, title: 'ସାଧାରଣ ବିଜ୍ଞାନ', description: 'ଆମ ଶରୀର ଓ ଉଦ୍ଭିଦ' },
      { _id: 'ch_c4_3', classId: 'c4', subjectId: 'sc4_geo', chapterNumber: 1, title: 'ଓଡ଼ିଶାର ଭୂଗୋଳ', description: 'ନଦୀ, ପାହାଡ଼ ଓ ରାଜଧାନୀ' },

      // Class 5
      { _id: 'ch_c5_1', classId: 'c5', subjectId: 'sc5_mmath', chapterNumber: 1, title: 'ଭଗ୍ନାଂଶ ଓ ଶତକଡ଼ା', description: 'ମିଶ୍ରିତ ଗଣିତ' },
      { _id: 'ch_c5_2', classId: 'c5', subjectId: 'sc5_gram',  chapterNumber: 1, title: 'ପଦ, ବିପରୀତ ଶବ୍ଦ', description: 'ଓଡ଼ିଆ ବ୍ୟାକରଣ' },
      { _id: 'ch_c5_3', classId: 'c5', subjectId: 'sc5_gk',    chapterNumber: 1, title: 'ସାଧାରଣ ଜ୍ଞାନ ଓ କମ୍ପ୍ୟୁଟର', description: 'ଇତିହାସ, ବିଶ୍ୱ ଜ୍ଞାନ' }
    ];

    // ======= GAMES =======
    this.games = [
      { _id: 'g_c1_1', classId: 'c1', subjectId: 'sc1_letter', chapterId: 'ch_c1_1', gameCode: 'g_c1_1', title: 'ଅକ୍ଷର ଚିହ୍ନଟ ଖେଳ', odiaTitle: 'ଅକ୍ଷର ଚିହ୍ନଟ ଖେଳ', gameType: 'quiz' },
      { _id: 'g_c1_2', classId: 'c1', subjectId: 'sc1_number', chapterId: 'ch_c1_2', gameCode: 'g_c1_2', title: 'ସଂଖ୍ୟା ଗଣନା ଖେଳ', odiaTitle: 'ସଂଖ୍ୟା ଗଣନା ଖେଳ', gameType: 'quiz' },
      { _id: 'g_c1_3', classId: 'c1', subjectId: 'sc1_color',  chapterId: 'ch_c1_3', gameCode: 'g_c1_3', title: 'ରଙ୍ଗ ଚିହ୍ନଟ ଖେଳ', odiaTitle: 'ରଙ୍ଗ ଚିହ୍ନଟ ଖେଳ', gameType: 'quiz' },
      { _id: 'g_c1_4', classId: 'c1', subjectId: 'sc1_picture', chapterId: 'ch_c1_4', gameCode: 'g_c1_4', title: 'ଚିତ୍ର ଚିହ୍ନଟ ଖେଳ', odiaTitle: 'ଚିତ୍ର ଚିହ୍ନଟ ଖେଳ', gameType: 'quiz' },

      { _id: 'g_c2_1', classId: 'c2', subjectId: 'sc2_word', chapterId: 'ch_c2_1', gameCode: 'g_c2_1', title: 'ଶବ୍ଦ ଗଠନ ଖେଳ', odiaTitle: 'ଶବ୍ଦ ଗଠନ ଖେଳ', gameType: 'quiz' },
      { _id: 'g_c2_2', classId: 'c2', subjectId: 'sc2_add',  chapterId: 'ch_c2_2', gameCode: 'g_c2_2', title: 'ଯୋଗ କ୍ବିଜ୍', odiaTitle: 'ଯୋଗ କ୍ବିଜ୍', gameType: 'quiz' },
      { _id: 'g_c2_3', classId: 'c2', subjectId: 'sc2_sub',  chapterId: 'ch_c2_3', gameCode: 'g_c2_3', title: 'ବିୟୋଗ କ୍ବିଜ୍', odiaTitle: 'ବିୟୋଗ କ୍ବିଜ୍', gameType: 'quiz' },

      { _id: 'g_c3_1', classId: 'c3', subjectId: 'sc3_mul',  chapterId: 'ch_c3_1', gameCode: 'g_c3_1', title: 'ଗୁଣନ ଖେଳ', odiaTitle: 'ଗୁଣନ ଖେଳ', gameType: 'quiz' },
      { _id: 'g_c3_2', classId: 'c3', subjectId: 'sc3_sent', chapterId: 'ch_c3_2', gameCode: 'g_c3_2', title: 'ସୁନ୍ଦର ବାକ୍ୟ ଖେଳ', odiaTitle: 'ସୁନ୍ଦର ବାକ୍ୟ ଖେଳ', gameType: 'quiz' },
      { _id: 'g_c3_3', classId: 'c3', subjectId: 'sc3_env',  chapterId: 'ch_c3_3', gameCode: 'g_c3_3', title: 'ପରିବେଶ କ୍ବିଜ୍', odiaTitle: 'ପରିବେଶ କ୍ବିଜ୍', gameType: 'quiz' },

      { _id: 'g_c4_1', classId: 'c4', subjectId: 'sc4_div', chapterId: 'ch_c4_1', gameCode: 'g_c4_1', title: 'ହରଣ ଖେଳ', odiaTitle: 'ହରଣ ଖେଳ', gameType: 'quiz' },
      { _id: 'g_c4_2', classId: 'c4', subjectId: 'sc4_sci', chapterId: 'ch_c4_2', gameCode: 'g_c4_2', title: 'ବିଜ୍ଞାନ କ୍ବିଜ୍', odiaTitle: 'ବିଜ୍ଞାନ କ୍ବିଜ୍', gameType: 'quiz' },
      { _id: 'g_c4_3', classId: 'c4', subjectId: 'sc4_geo', chapterId: 'ch_c4_3', gameCode: 'g_c4_3', title: 'ଭୂଗୋଳ ଖେଳ', odiaTitle: 'ଭୂଗୋଳ ଖେଳ', gameType: 'quiz' },

      { _id: 'g_c5_1', classId: 'c5', subjectId: 'sc5_mmath', chapterId: 'ch_c5_1', gameCode: 'g_c5_1', title: 'ମିଶ୍ରିତ ଗଣିତ ଖେଳ', odiaTitle: 'ମିଶ୍ରିତ ଗଣିତ ଖେଳ', gameType: 'quiz' },
      { _id: 'g_c5_2', classId: 'c5', subjectId: 'sc5_gram',  chapterId: 'ch_c5_2', gameCode: 'g_c5_2', title: 'ବ୍ୟାକରଣ କ୍ବିଜ୍', odiaTitle: 'ବ୍ୟାକରଣ କ୍ବିଜ୍', gameType: 'quiz' },
      { _id: 'g_c5_3', classId: 'c5', subjectId: 'sc5_gk',    chapterId: 'ch_c5_3', gameCode: 'g_c5_3', title: 'ସାଧାରଣ ଜ୍ଞାନ ଖେଳ', odiaTitle: 'ସାଧାରଣ ଜ୍ଞାନ ଖେଳ', gameType: 'quiz' }
    ];

    // ======= QUESTIONS =======
    this.questions = [
      // CLASS 1: ଅକ୍ଷର ଚିହ୍ନଟ
      { _id: 'q_c1_1', classId: 'c1', classNumber: 1, subjectId: 'sc1_letter', chapterId: 'ch_c1_1', gameId: 'g_c1_1', question: "'ଅ' ଅକ୍ଷରରୁ କେଉଁ ଶବ୍ଦଟି ଆରମ୍ଭ ହୁଏ?", options: ['ଆମ୍ବ', 'ଅନାର', 'ଇଟା', 'ଉଠ'], correctAnswer: 1, explanation: 'ଅ- ଅନାର', status: 'APPROVED', isActive: true },
      { _id: 'q_c1_2', classId: 'c1', classNumber: 1, subjectId: 'sc1_letter', chapterId: 'ch_c1_1', gameId: 'g_c1_1', question: "'ଆ' ଅକ୍ଷରରୁ କେଉଁ ଫଳର ନାମ ଆରମ୍ଭ ହୁଏ?", options: ['ଓଲ', 'ଇଟା', 'ଆମ୍ବ', 'ଅସୁର'], correctAnswer: 2, explanation: 'ଆ- ଆମ୍ବ', status: 'APPROVED', isActive: true },
      { _id: 'q_c1_3', classId: 'c1', classNumber: 1, subjectId: 'sc1_letter', chapterId: 'ch_c1_1', gameId: 'g_c1_1', question: "'ଇ' ଅକ୍ଷରରୁ କେଉଁ ଶବ୍ଦଟି ଆରମ୍ଭ ହୁଏ?", options: ['ଇଟା', 'ଉଠ', 'ଋଷି', 'ଏକ'], correctAnswer: 0, explanation: 'ଇ- ଇଟା', status: 'APPROVED', isActive: true },

      // CLASS 1: ସଂଖ୍ୟା (୧-୧୦)
      { _id: 'q_c1_4', classId: 'c1', classNumber: 1, subjectId: 'sc1_number', chapterId: 'ch_c1_2', gameId: 'g_c1_2', question: "୫ + ୩ = କେତେ?", options: ['୭', '୮', '୯', '୧୦'], correctAnswer: 1, explanation: '୫ + ୩ = ୮', status: 'APPROVED', isActive: true },
      { _id: 'q_c1_5', classId: 'c1', classNumber: 1, subjectId: 'sc1_number', chapterId: 'ch_c1_2', gameId: 'g_c1_2', question: "୪ ପରେ କେଉଁ ସଂଖ୍ୟା ଆସେ?", options: ['୩', '୫', '୬', '୨'], correctAnswer: 1, explanation: '୪ ପରେ ୫', status: 'APPROVED', isActive: true },
      { _id: 'q_c1_6', classId: 'c1', classNumber: 1, subjectId: 'sc1_number', chapterId: 'ch_c1_2', gameId: 'g_c1_2', question: "୩ + ୩ = କେତେ?", options: ['୪', '୫', '୬', '୭'], correctAnswer: 2, explanation: '୩ + ୩ = ୬', status: 'APPROVED', isActive: true },

      // CLASS 1: ରଙ୍ଗ ଚିହ୍ନଟ
      { _id: 'q_c1_7', classId: 'c1', classNumber: 1, subjectId: 'sc1_color', chapterId: 'ch_c1_3', gameId: 'g_c1_3', question: "ଆକାଶର ରଙ୍ଗ କ’ଣ?", options: ['ଲାଲ୍', 'ନୀଳ', 'ହଳଦିଆ', 'କଳା'], correctAnswer: 1, explanation: 'ଆକାଶର ରଙ୍ଗ ନୀଳ', status: 'APPROVED', isActive: true },
      { _id: 'q_c1_8', classId: 'c1', classNumber: 1, subjectId: 'sc1_color', chapterId: 'ch_c1_3', gameId: 'g_c1_3', question: "ଗଛର ପତ୍ରର ରଙ୍ଗ କ’ଣ?", options: ['ସବୁଜ', 'ଲାଲ୍', 'ଧଳା', 'ବାଇଗଣୀ'], correctAnswer: 0, explanation: 'ପତ୍ରର ରଙ୍ଗ ସବୁଜ', status: 'APPROVED', isActive: true },

      // CLASS 1: ଚିତ୍ର ଚିହ୍ନଟ
      { _id: 'q_c1_9', classId: 'c1', classNumber: 1, subjectId: 'sc1_picture', chapterId: 'ch_c1_4', gameId: 'g_c1_4', question: "🍎 ଏହି ଚିତ୍ରଟି କେଉଁ ଫଳର?", options: ['କଦଳୀ', 'ଆପଲ୍ (Apple)', 'କମଳା', 'ଅଙ୍ଗୁର'], correctAnswer: 1, explanation: '🍎 - ଆପଲ୍', status: 'APPROVED', isActive: true },
      { _id: 'q_c1_10', classId: 'c1', classNumber: 1, subjectId: 'sc1_picture', chapterId: 'ch_c1_4', gameId: 'g_c1_4', question: "🐶 ଏହି ଚିତ୍ରଟି କେଉଁ ପଶୁର?", options: ['ବିରାଡ଼ି', 'କୁକୁର (Dog)', 'ହାତୀ', 'ବାଘ'], correctAnswer: 1, explanation: '🐶 - କୁକୁର', status: 'APPROVED', isActive: true },

      // CLASS 2: ଶବ୍ଦ ଗଠନ
      { _id: 'q_c2_1', classId: 'c2', classNumber: 2, subjectId: 'sc2_word', chapterId: 'ch_c2_1', gameId: 'g_c2_1', question: "'କ' + 'ମ' + 'ଳ' = କ’ଣ ହେବ?", options: ['କମଳ', 'କଳମ', 'ମଳକ', 'କମଳା'], correctAnswer: 0, status: 'APPROVED', isActive: true },
      { _id: 'q_c2_2', classId: 'c2', classNumber: 2, subjectId: 'sc2_word', chapterId: 'ch_c2_1', gameId: 'g_c2_1', question: "'ଘ' + 'ର' = କ’ଣ ହେବ?", options: ['ରଘ', 'ଘର', 'ଘରଡ଼ି', 'ଘରୋଇ'], correctAnswer: 1, status: 'APPROVED', isActive: true },

      // CLASS 2: ଯୋଗ
      { _id: 'q_c2_3', classId: 'c2', classNumber: 2, subjectId: 'sc2_add', chapterId: 'ch_c2_2', gameId: 'g_c2_2', question: "୧୨ + ୧୫ = କେତେ?", options: ['୨୫', '୨୭', '୩୦', '୨୨'], correctAnswer: 1, status: 'APPROVED', isActive: true },
      { _id: 'q_c2_4', classId: 'c2', classNumber: 2, subjectId: 'sc2_add', chapterId: 'ch_c2_2', gameId: 'g_c2_2', question: "୧୫ + ୫ = କେତେ?", options: ['୧୮', '୧୯', '୨୦', '୨୧'], correctAnswer: 2, status: 'APPROVED', isActive: true },

      // CLASS 2: ବିୟୋଗ
      { _id: 'q_c2_5', classId: 'c2', classNumber: 2, subjectId: 'sc2_sub', chapterId: 'ch_c2_3', gameId: 'g_c2_3', question: "୨୦ - ୫ = କେତେ?", options: ['୧୦', '୧୨', '୧୫', '୧୮'], correctAnswer: 2, status: 'APPROVED', isActive: true },
      { _id: 'q_c2_6', classId: 'c2', classNumber: 2, subjectId: 'sc2_sub', chapterId: 'ch_c2_3', gameId: 'g_c2_3', question: "୧୨ - ୪ = କେତେ?", options: ['୬', '୭', '୮', '୯'], correctAnswer: 2, status: 'APPROVED', isActive: true },

      // CLASS 3: ଗୁଣନ
      { _id: 'q_c3_1', classId: 'c3', classNumber: 3, subjectId: 'sc3_mul', chapterId: 'ch_c3_1', gameId: 'g_c3_1', question: "୩ × ୪ = କେତେ?", options: ['୧୦', '୧୨', '୧୪', '୧୬'], correctAnswer: 1, status: 'APPROVED', isActive: true },
      { _id: 'q_c3_2', classId: 'c3', classNumber: 3, subjectId: 'sc3_mul', chapterId: 'ch_c3_1', gameId: 'g_c3_1', question: "୫ × ୫ = କେତେ?", options: ['୨୦', '୨୫', '୩୦', '୩୫'], correctAnswer: 1, status: 'APPROVED', isActive: true },

      // CLASS 3: ସୁନ୍ଦର ବାକ୍ୟ
      { _id: 'q_c3_3', classId: 'c3', classNumber: 3, subjectId: 'sc3_sent', chapterId: 'ch_c3_2', gameId: 'g_c3_2', question: "'ଆମେ ପ୍ରତିଦିନ ସ୍କୁଲ୍ _____ ।' (ଶୂନ୍ୟସ୍ଥାନ ପୂରଣ କରନ୍ତୁ)", options: ['ଯାଉ', 'ଖାଉ', 'ଶୋଉ', 'ପିଉ'], correctAnswer: 0, status: 'APPROVED', isActive: true },
      { _id: 'q_c3_4', classId: 'c3', classNumber: 3, subjectId: 'sc3_sent', chapterId: 'ch_c3_2', gameId: 'g_c3_2', question: "କେଉଁଟି ଏକ ଶୁଦ୍ଧ ବାକ୍ୟ?", options: ['ସୂର୍ଯ୍ୟ ପୂର୍ବ ଦିଗରେ ଉଦୟ ହୁଅନ୍ତି।', 'ସୂର୍ଯ୍ୟ ରାତିରେ ଦେଖାଯାନ୍ତି।', 'ଚନ୍ଦ୍ର ଦିନରେ ଆଲୋକ ଦିଏ।', 'ଗଛ ଚାଲିପାରେ।'], correctAnswer: 0, status: 'APPROVED', isActive: true },

      // CLASS 3: ପରିବେଶ
      { _id: 'q_c3_5', classId: 'c3', classNumber: 3, subjectId: 'sc3_env', chapterId: 'ch_c3_3', gameId: 'g_c3_3', question: "ଆମକୁ ଅମ୍ଳଜାନ (Oxygen) କିଏ ଦିଏ?", options: ['ଗଛଲତା', 'ଗାଡ଼ି', 'ଘର', 'ପାଣି'], correctAnswer: 0, status: 'APPROVED', isActive: true },
      { _id: 'q_c3_6', classId: 'c3', classNumber: 3, subjectId: 'sc3_env', chapterId: 'ch_c3_3', gameId: 'g_c3_3', question: "ଓଡ଼ିଶାର ରାଜ୍ୟ ପକ୍ଷୀ କିଏ?", options: ['ଭଦଭଦଳି', 'ମୟୂର', 'କାଉ', 'ଚିଲ'], correctAnswer: 0, status: 'APPROVED', isActive: true },

      // CLASS 4: ହରଣ
      { _id: 'q_c4_1', classId: 'c4', classNumber: 4, subjectId: 'sc4_div', chapterId: 'ch_c4_1', gameId: 'g_c4_1', question: "୧୨ ÷ ୩ = କେତେ?", options: ['୩', '୪', '୫', '୬'], correctAnswer: 1, status: 'APPROVED', isActive: true },
      { _id: 'q_c4_2', classId: 'c4', classNumber: 4, subjectId: 'sc4_div', chapterId: 'ch_c4_1', gameId: 'g_c4_1', question: "୨୦ ÷ ୫ = କେତେ?", options: ['୨', '୩', '୪', '୫'], correctAnswer: 2, status: 'APPROVED', isActive: true },

      // CLASS 4: ବିଜ୍ଞାନ
      { _id: 'q_c4_3', classId: 'c4', classNumber: 4, subjectId: 'sc4_sci', chapterId: 'ch_c4_2', gameId: 'g_c4_2', question: "ଉଦ୍ଭିଦ ନିଜର ଖାଦ୍ୟ କେଉଁଠାରେ ତିଆରି କରେ?", options: ['ମୂଳ', 'ପତ୍ର', 'ଫୁଲ', 'କାଣ୍ଡ'], correctAnswer: 1, status: 'APPROVED', isActive: true },
      { _id: 'q_c4_4', classId: 'c4', classNumber: 4, subjectId: 'sc4_sci', chapterId: 'ch_c4_2', gameId: 'g_c4_2', question: "ପୃଥିବୀର ପ୍ରାକୃତିକ ଉପଗ୍ରହ କିଏ?", options: ['ସୂର୍ଯ୍ୟ', 'ଚନ୍ଦ୍ର', 'ମଙ୍ଗଳ', 'ଶୁକ୍ର'], correctAnswer: 1, status: 'APPROVED', isActive: true },

      // CLASS 4: ଭୂଗୋଳ
      { _id: 'q_c4_5', classId: 'c4', classNumber: 4, subjectId: 'sc4_geo', chapterId: 'ch_c4_3', gameId: 'g_c4_3', question: "ଓଡ଼ିଶାର ସବୁଠାରୁ ବଡ଼ ନଦୀର ନାମ କ’ଣ?", options: ['ବ୍ରାହ୍ମଣୀ', 'ମହାନଦୀ', 'ବୈତରଣୀ', 'ବଂଶଧାରା'], correctAnswer: 1, status: 'APPROVED', isActive: true },
      { _id: 'q_c4_6', classId: 'c4', classNumber: 4, subjectId: 'sc4_geo', chapterId: 'ch_c4_3', gameId: 'g_c4_3', question: "ଓଡ଼ିଶାର ରାଜଧାନୀର ନାମ କ’ଣ?", options: ['କଟକ', 'ପୁରୀ', 'ଭୁବନେଶ୍ୱର', 'ସମ୍ବଲପୁର'], correctAnswer: 2, status: 'APPROVED', isActive: true },

      // CLASS 5: ମିଶ୍ରିତ ଗଣିତ
      { _id: 'q_c5_1', classId: 'c5', classNumber: 5, subjectId: 'sc5_mmath', chapterId: 'ch_c5_1', gameId: 'g_c5_1', question: "୧/୫ + ୨/୫ = କେତେ?", options: ['୩/୫', '୨/୫', '୪/୫', '୧/୫'], correctAnswer: 0, status: 'APPROVED', isActive: true },
      { _id: 'q_c5_2', classId: 'c5', classNumber: 5, subjectId: 'sc5_mmath', chapterId: 'ch_c5_1', gameId: 'g_c5_1', question: "୧୦୦ ର ୨୫% = କେତେ?", options: ['୨୦', '୨୫', '୩୦', '୫୦'], correctAnswer: 1, status: 'APPROVED', isActive: true },

      // CLASS 5: ବ୍ୟାକରଣ
      { _id: 'q_c5_3', classId: 'c5', classNumber: 5, subjectId: 'sc5_gram', chapterId: 'ch_c5_2', gameId: 'g_c5_2', question: "'ସୁନ୍ଦର' ଶବ୍ଦର ବିପରୀତ ଶବ୍ଦ କ’ଣ?", options: ['ଅସୁନ୍ଦର', 'ଭଲ', 'ଉତ୍ତମ', 'ବଡ଼'], correctAnswer: 0, status: 'APPROVED', isActive: true },
      { _id: 'q_c5_4', classId: 'c5', classNumber: 5, subjectId: 'sc5_gram', chapterId: 'ch_c5_2', gameId: 'g_c5_2', question: "ନାମ ବଦଳରେ ବ୍ୟବହୃତ ହେଉଥିବା ପଦକୁ କ’ଣ କୁହାଯାଏ?", options: ['ବିଶେଷ୍ୟ', 'ସର୍ବନାମ', 'ବିଶେଷଣ', 'କ୍ରିୟା'], correctAnswer: 1, status: 'APPROVED', isActive: true },

      // CLASS 5: ଜ୍ଞାନ
      { _id: 'q_c5_5', classId: 'c5', classNumber: 5, subjectId: 'sc5_gk', chapterId: 'ch_c5_3', gameId: 'g_c5_3', question: "ଭାରତର ପ୍ରଥମ ପ୍ରଧାନମନ୍ତ୍ରୀ କିଏ ଥିଲେ?", options: ['ମହାତ୍ମା ଗାନ୍ଧୀ', 'ଜବାହରଲାଲ ନେହେରୁ', 'ସୁବାଷ ବୋଷ', 'ସରଦାର ପଟେଲ'], correctAnswer: 1, status: 'APPROVED', isActive: true },
      { _id: 'q_c5_6', classId: 'c5', classNumber: 5, subjectId: 'sc5_gk', chapterId: 'ch_c5_3', gameId: 'g_c5_3', question: "କମ୍ପ୍ୟୁଟରର ମସ୍ତିଷ୍କ (Brain of Computer) କାହାକୁ କୁହାଯାଏ?", options: ['Monitor', 'Keyboard', 'CPU', 'Mouse'], correctAnswer: 2, status: 'APPROVED', isActive: true }
    ];

    // ======= BADGES =======
    this.badges = [
      { _id: 'b1', name: 'ଶୁଭାରମ୍ଭ (Beginner)', description: 'ପ୍ରଥମ ଖେଳ ସଫଳତାର ସହ ଶେଷ କଲେ', icon: '🌟', category: 'GENERAL', requirement: '1_game' },
      { _id: 'b2', name: 'ଓଡ଼ିଆ ବିଜ୍ଞ (Odia Scholar)', description: 'ଓଡ଼ିଆରେ ୧୦୦% ରଖିଲେ', icon: '📜', category: 'SUBJECT', requirement: 'perfect_odia' },
      { _id: 'b3', name: 'ଗଣିତ ଯାଦୁକର (Math Wizard)', description: 'ଗଣିତରେ ୧୦୦% ରଖିଲେ', icon: '🔢', category: 'SUBJECT', requirement: 'perfect_math' },
      { _id: 'b4', name: 'ତାରକା ସଂଗ୍ରାହକ (Star Master)', description: '୨୦ଟି ତାରକା ହାସଲ କଲେ', icon: '⭐', category: 'STARS', requirement: '20_stars' }
    ];

    this.userBadges = [
      { _id: 'ub1', userId: 'u_student', badgeId: 'b1', awardedAt: new Date() }
    ];

    this.initialized = true;
  }
}

module.exports = new MemoryStore();
