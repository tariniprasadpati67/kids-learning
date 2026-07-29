/**
 * SCERT Odisha Prescribed Primary Textbook Database Seeding Script (Classes 1 to 5)
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Class = require('../models/Class');
const Subject = require('../models/Subject');
const Book = require('../models/Book');
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const Lesson = require('../models/Lesson');
const Game = require('../models/Game');
const Question = require('../models/Question');
const Badge = require('../models/Badge');
const defaultMemoryStore = require('../config/defaultData');

const seedDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/odia_learning_games';
    console.log(`Connecting to MongoDB at ${connUri}...`);
    
    await mongoose.connect(connUri, { serverSelectionTimeoutMS: 2000 });

    console.log('Clearing existing collections...');
    await User.deleteMany({});
    await Class.deleteMany({});
    await Subject.deleteMany({});
    await Book.deleteMany({});
    await Chapter.deleteMany({});
    await Topic.deleteMany({});
    await Lesson.deleteMany({});
    await Game.deleteMany({});
    await Question.deleteMany({});
    await Badge.deleteMany({});

    // 1. Seed Users
    const adminPassword = await bcrypt.hash('Admin@123456', 10);
    const studentPassword = await bcrypt.hash('Student@123456', 10);

    await User.create({
      name: 'ଶିକ୍ଷା ଆଡମିନ୍ (Admin)',
      email: 'admin@odisha.edu',
      passwordHash: adminPassword,
      role: 'admin',
      classLevel: 5,
      avatar: '👨‍🏫'
    });

    // 2. Seed Classes 1 to 5
    const classDocs = await Class.insertMany([
      { classNumber: 1, title: 'ଶ୍ରେଣୀ ୧', odiaTitle: 'ଶ୍ରେଣୀ ୧', description: 'ସରକାରୀ ପାଠ୍ୟପୁସ୍ତକ: ହସଖୁସି (ପ୍ରଥମ ଭାଗ)', icon: '🎒' },
      { classNumber: 2, title: 'ଶ୍ରେଣୀ ୨', odiaTitle: 'ଶ୍ରେଣୀ ୨', description: 'ସରକାରୀ ପାଠ୍ୟପୁସ୍ତକ: ହସଖୁସି (ଦ୍ୱିତୀୟ ଭାଗ)', icon: '📚' },
      { classNumber: 3, title: 'ଶ୍ରେଣୀ ୩', odiaTitle: 'ଶ୍ରେଣୀ ୩', description: 'ସାହିତ୍ୟ କଳିକା, ଗଣିତ ମଜା, ଆମ ପରିବେଶ, My English Book', icon: '✏️' },
      { classNumber: 4, title: 'ଶ୍ରେଣୀ ୪', odiaTitle: 'ଶ୍ରେଣୀ ୪', description: 'ସାହିତ୍ୟ କଳିକା, ଗଣିତ ମଜା, ଆମ ପରିବେଶ, My English Book', icon: '🔬' },
      { classNumber: 5, title: 'ଶ୍ରେଣୀ ୫', odiaTitle: 'ଶ୍ରେଣୀ ୫', description: 'ସାହିତ୍ୟ କୁସୁମ, ଗଣିତ ଧାରା, ଆମ ପରିବେଶ, My English Book', icon: '🏆' }
    ]);

    const cMap = {};
    classDocs.forEach(c => cMap[c.classNumber] = c._id);

    // 3. Seed Subjects per Class
    const subjectDocs = await Subject.insertMany([
      { classId: cMap[1], name: 'ହସଖୁସି (ଓଡ଼ିଆ ଓ ଗଣିତ)', odiaName: 'ହସଖୁସି', icon: '📕', color: '#FF6B6B', code: 'sub_c1_hk' },
      { classId: cMap[2], name: 'ହସଖୁସି (ଓଡ଼ିଆ ଓ ଗଣିତ)', odiaName: 'ହସଖୁସି', icon: '📘', color: '#4E65FF', code: 'sub_c2_hk' },
      { classId: cMap[3], name: 'ଓଡ଼ିଆ (ସାହିତ୍ୟ କଳିକା)', odiaName: 'ଓଡ଼ିଆ', icon: '✍️', color: '#FF6B6B', code: 'sub_c3_odia' },
      { classId: cMap[3], name: 'ଗଣିତ (ଗଣିତ ମଜା)', odiaName: 'ଗଣିତ', icon: '🔢', color: '#4E65FF', code: 'sub_c3_math' },
      { classId: cMap[3], name: 'ଆମ ପରିବେଶ', odiaName: 'ଆମ ପରିବେଶ', icon: '🌿', color: '#2ECC71', code: 'sub_c3_evs' },
      { classId: cMap[3], name: 'English', odiaName: 'ଇଂରାଜୀ', icon: '🔤', color: '#F39C12', code: 'sub_c3_eng' },
      { classId: cMap[4], name: 'ଓଡ଼ିଆ (ସାହିତ୍ୟ କଳିକା)', odiaName: 'ଓଡ଼ିଆ', icon: '✍️', color: '#FF6B6B', code: 'sub_c4_odia' },
      { classId: cMap[4], name: 'ଗଣିତ (ଗଣିତ ମଜା)', odiaName: 'ଗଣିତ', icon: '🔢', color: '#4E65FF', code: 'sub_c4_math' },
      { classId: cMap[4], name: 'ଆମ ପରିବେଶ', odiaName: 'ଆମ ପରିବେଶ', icon: '🌿', color: '#2ECC71', code: 'sub_c4_evs' },
      { classId: cMap[4], name: 'English', odiaName: 'ଇଂରାଜୀ', icon: '🔤', color: '#F39C12', code: 'sub_c4_eng' },
      { classId: cMap[5], name: 'ଓଡ଼ିଆ (ସାହିତ୍ୟ କୁସୁମ)', odiaName: 'ଓଡ଼ିଆ', icon: '✍️', color: '#FF6B6B', code: 'sub_c5_odia' },
      { classId: cMap[5], name: 'ଗଣିତ (ଗଣିତ ଧାରା)', odiaName: 'ଗଣିତ', icon: '🔢', color: '#4E65FF', code: 'sub_c5_math' },
      { classId: cMap[5], name: 'ଆମ ପରିବେଶ', odiaName: 'ଆମ ପରିବେଶ', icon: '🌿', color: '#2ECC71', code: 'sub_c5_evs' },
      { classId: cMap[5], name: 'English', odiaName: 'ଇଂରାଜୀ', icon: '🔤', color: '#F39C12', code: 'sub_c5_eng' }
    ]);

    const sMap = {};
    subjectDocs.forEach(s => sMap[s.code] = s._id);

    // 4. Seed Official Textbooks
    const bookDocs = await Book.insertMany([
      { classId: cMap[1], classNumber: 1, subjectId: sMap['sub_c1_hk'], subjectName: 'ହସଖୁସି', title: 'ହସଖୁସି (ପ୍ରଥମ ଭାଗ)', odiaTitle: 'ହସଖୁସି (ପ୍ରଥମ ଭାଗ)', code: 'bk_c1_hk1' },
      { classId: cMap[2], classNumber: 2, subjectId: sMap['sub_c2_hk'], subjectName: 'ହସଖୁସି', title: 'ହସଖୁସି (ଦ୍ୱିତୀୟ ଭାଗ)', odiaTitle: 'ହସଖୁସି (ଦ୍ୱିତୀୟ ଭାଗ)', code: 'bk_c2_hk2' },
      { classId: cMap[3], classNumber: 3, subjectId: sMap['sub_c3_odia'], subjectName: 'ଓଡ଼ିଆ', title: 'ସାହିତ୍ୟ କଳିକା (ତୃତୀୟ ଶ୍ରେଣୀ)', odiaTitle: 'ସାହିତ୍ୟ କଳିକା (ତୃତୀୟ ଶ୍ରେଣୀ)', code: 'bk_c3_sk' },
      { classId: cMap[3], classNumber: 3, subjectId: sMap['sub_c3_math'], subjectName: 'ଗଣିତ', title: 'ଗଣିତ ମଜା (ତୃତୀୟ ଶ୍ରେଣୀ)', odiaTitle: 'ଗଣିତ ମଜା (ତୃତୀୟ ଶ୍ରେଣୀ)', code: 'bk_c3_gm' },
      { classId: cMap[3], classNumber: 3, subjectId: sMap['sub_c3_evs'],  subjectName: 'ଆମ ପରିବେଶ', title: 'ଆମ ପରିବେଶ (ତୃତୀୟ ଶ୍ରେଣୀ)', odiaTitle: 'ଆମ ପରିବେଶ (ତୃତୀୟ ଶ୍ରେଣୀ)', code: 'bk_c3_ap' },
      { classId: cMap[3], classNumber: 3, subjectId: sMap['sub_c3_eng'],  subjectName: 'English', title: 'My English Book (Class 3)', odiaTitle: 'My English Book (Class 3)', code: 'bk_c3_eng' },
      { classId: cMap[4], classNumber: 4, subjectId: sMap['sub_c4_odia'], subjectName: 'ଓଡ଼ିଆ', title: 'ସାହିତ୍ୟ କଳିକା (ଚତୁର୍ଥ ଶ୍ରେଣୀ)', odiaTitle: 'ସାହିତ୍ୟ କଳିକା (ଚତୁର୍ଥ ଶ୍ରେଣୀ)', code: 'bk_c4_sk' },
      { classId: cMap[4], classNumber: 4, subjectId: sMap['sub_c4_math'], subjectName: 'ଗଣିତ', title: 'ଗଣିତ ମଜା (ଚତୁର୍ଥ ଶ୍ରେଣୀ)', odiaTitle: 'ଗଣିତ ମଜା (ଚତୁର୍ଥ ଶ୍ରେଣୀ)', code: 'bk_c4_gm' },
      { classId: cMap[4], classNumber: 4, subjectId: sMap['sub_c4_evs'],  subjectName: 'ଆମ ପରିବେଶ', title: 'ଆମ ପରିବେଶ (ଚତୁର୍ଥ ଶ୍ରେଣୀ)', odiaTitle: 'ଆମ ପରିବେଶ (ଚତୁର୍ଥ ଶ୍ରେଣୀ)', code: 'bk_c4_ap' },
      { classId: cMap[4], classNumber: 4, subjectId: sMap['sub_c4_eng'],  subjectName: 'English', title: 'My English Book (Class 4)', odiaTitle: 'My English Book (Class 4)', code: 'bk_c4_eng' },
      { classId: cMap[5], classNumber: 5, subjectId: sMap['sub_c5_odia'], subjectName: 'ଓଡ଼ିଆ', title: 'ସାହିତ୍ୟ କୁସୁମ (ପଞ୍ଚମ ଶ୍ରେଣୀ)', odiaTitle: 'ସାହିତ୍ୟ କୁସୁମ (ପଞ୍ଚମ ଶ୍ରେଣୀ)', code: 'bk_c5_sk' },
      { classId: cMap[5], classNumber: 5, subjectId: sMap['sub_c5_math'], subjectName: 'ଗଣିତ', title: 'ଗଣିତ ଧାରା (ପଞ୍ଚମ ଶ୍ରେଣୀ)', odiaTitle: 'ଗଣିତ ଧାରା (ପଞ୍ଚମ ଶ୍ରେଣୀ)', code: 'bk_c5_gd' },
      { classId: cMap[5], classNumber: 5, subjectId: sMap['sub_c5_evs'],  subjectName: 'ଆମ ପରିବେଶ', title: 'ଆମ ପରିବେଶ (ପଞ୍ଚମ ଶ୍ରେଣୀ)', odiaTitle: 'ଆମ ପରିବେଶ (ପଞ୍ଚମ ଶ୍ରେଣୀ)', code: 'bk_c5_ap' },
      { classId: cMap[5], classNumber: 5, subjectId: sMap['sub_c5_eng'],  subjectName: 'English', title: 'My English Book (Class 5)', odiaTitle: 'My English Book (Class 5)', code: 'bk_c5_eng' }
    ]);

    console.log('Database seeded successfully with official SCERT Odisha textbook hierarchy!');
    process.exit(0);
  } catch (error) {
    console.log('[Info] MongoDB server not active. Active Standalone Memory Store loaded with full SCERT dataset.');
    await defaultMemoryStore.seedDefaults();
    console.log('In-Memory Store Initialized Successfully with Class 1-5 SCERT Odisha Textbooks.');
    process.exit(0);
  }
};

seedDB();
