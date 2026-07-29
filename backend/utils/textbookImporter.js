/**
 * Odia Medium Learning Games - Textbook Data Importer & Validation Engine
 */

const Book = require('../models/Book');
const Chapter = require('../models/Chapter');
const Lesson = require('../models/Lesson');
const Question = require('../models/Question');
const Subject = require('../models/Subject');
const Class = require('../models/Class');

const normalizeText = (text) => {
  if (!text) return '';
  return text.toLowerCase().replace(/[\s\t\n\r,\.?!]/g, '');
};

/**
 * Import a Textbook Data Payload with strict relationship checks
 */
const importTextbookJSON = async (payload, getIsConnectedFn, memoryStoreObj) => {
  const { classNumber, subject, book, chapters } = payload;
  const isMongo = getIsConnectedFn ? getIsConnectedFn() : false;

  const result = {
    classNumber,
    subjectName: subject,
    bookTitle: book ? book.title : '',
    chaptersProcessed: 0,
    lessonsProcessed: 0,
    questionsImported: 0,
    rejectedDuplicates: 0,
    errors: []
  };

  // 1. Validate Class
  if (!classNumber || classNumber < 1 || classNumber > 5) {
    result.errors.push('Invalid Class Number (Must be 1 to 5)');
    return result;
  }

  // 2. Validate Subject
  if (!subject) {
    result.errors.push('Subject name is required');
    return result;
  }

  if (isMongo) {
    const classDoc = await Class.findOne({ classNumber });
    if (!classDoc) {
      result.errors.push(`Class ${classNumber} not found in database`);
      return result;
    }

    let subjectDoc = await Subject.findOne({ classId: classDoc._id, name: subject });
    if (!subjectDoc) {
      subjectDoc = await Subject.create({
        classId: classDoc._id,
        name: subject,
        odiaName: subject,
        code: `sub_${classNumber}_${normalizeText(subject)}`,
        icon: '📚'
      });
    }

    // 3. Create / Find Book
    const bookTitle = book && book.title ? book.title : `${subject} ଶ୍ରେଣୀ ${classNumber} ପାଠ୍ୟପୁସ୍ତକ`;
    let bookDoc = await Book.findOne({ classNumber, subjectId: subjectDoc._id, title: bookTitle });

    if (!bookDoc) {
      bookDoc = await Book.create({
        classId: classDoc._id,
        classNumber,
        subjectId: subjectDoc._id,
        subjectName: subject,
        title: bookTitle,
        odiaTitle: bookTitle,
        code: `bk_c${classNumber}_${Date.now()}`,
        description: `Official Textbook for Class ${classNumber} ${subject}`
      });
    }

    // 4. Process Chapters
    if (Array.isArray(chapters)) {
      for (const chData of chapters) {
        let chDoc = await Chapter.findOne({
          classId: classDoc._id,
          subjectId: subjectDoc._id,
          title: chData.title
        });

        if (!chDoc) {
          chDoc = await Chapter.create({
            classId: classDoc._id,
            subjectId: subjectDoc._id,
            title: chData.title,
            chapterNumber: chData.chapterNumber || result.chaptersProcessed + 1,
            description: `Chapter ${chData.chapterNumber} content`
          });
        }
        result.chaptersProcessed++;

        // Process Lessons
        if (Array.isArray(chData.lessons)) {
          for (const lesData of chData.lessons) {
            let lesDoc = await Lesson.create({
              classId: classDoc._id,
              classNumber,
              subjectId: subjectDoc._id,
              bookId: bookDoc._id,
              chapterId: chDoc._id,
              lessonNumber: result.lessonsProcessed + 1,
              title: lesData.title,
              content: lesData.content || ''
            });
            result.lessonsProcessed++;

            // Process Questions inside Lesson
            if (Array.isArray(lesData.questions)) {
              for (const qData of lesData.questions) {
                const normQ = normalizeText(qData.question);

                // Duplicate Check
                const exists = await Question.findOne({
                  classNumber,
                  chapterId: chDoc._id,
                  questionNormalized: normQ
                });

                if (exists) {
                  result.rejectedDuplicates++;
                  continue;
                }

                await Question.create({
                  classId: classDoc._id,
                  classNumber,
                  subjectId: subjectDoc._id,
                  bookId: bookDoc._id,
                  chapterId: chDoc._id,
                  lessonId: lesDoc._id,
                  type: qData.type || 'mcq',
                  question: qData.question,
                  questionNormalized: normQ,
                  options: qData.options || [],
                  correctAnswer: qData.correctAnswer,
                  explanation: qData.explanation || '',
                  difficulty: qData.difficulty || 'easy',
                  status: 'REVIEW' // DRAFT -> REVIEW -> APPROVED
                });

                result.questionsImported++;
              }
            }
          }
        }
      }
    }
  } else {
    // Standalone Memory Store Fallback
    const newBook = {
      _id: `b_c${classNumber}_${Date.now()}`,
      classNumber,
      title: book && book.title ? book.title : `${subject} ଶ୍ରେଣୀ ${classNumber}`,
      subjectName: subject
    };
    memoryStoreObj.books.push(newBook);

    if (Array.isArray(chapters)) {
      for (const chData of chapters) {
        const newCh = {
          _id: `ch_c${classNumber}_${Date.now()}_${result.chaptersProcessed}`,
          classNumber,
          title: chData.title,
          chapterNumber: chData.chapterNumber || result.chaptersProcessed + 1
        };
        memoryStoreObj.chapters.push(newCh);
        result.chaptersProcessed++;

        if (Array.isArray(chData.lessons)) {
          for (const lesData of chData.lessons) {
            const newLes = {
              _id: `les_${Date.now()}_${result.lessonsProcessed}`,
              classNumber,
              bookId: newBook._id,
              chapterId: newCh._id,
              title: lesData.title,
              content: lesData.content
            };
            memoryStoreObj.lessons.push(newLes);
            result.lessonsProcessed++;

            if (Array.isArray(lesData.questions)) {
              for (const qData of lesData.questions) {
                const norm = normalizeText(qData.question);
                const dup = memoryStoreObj.questions.find(q => q.classNumber === classNumber && normalizeText(q.question) === norm);
                
                if (dup) {
                  result.rejectedDuplicates++;
                  continue;
                }

                memoryStoreObj.questions.push({
                  _id: `q_c${classNumber}_${Date.now()}_${result.questionsImported}`,
                  classNumber,
                  bookId: newBook._id,
                  chapterId: newCh._id,
                  lessonId: newLes._id,
                  question: qData.question,
                  options: qData.options || [],
                  correctAnswer: qData.correctAnswer,
                  explanation: qData.explanation || '',
                  status: 'REVIEW'
                });
                result.questionsImported++;
              }
            }
          }
        }
      }
    }
  }

  return result;
};

module.exports = { importTextbookJSON, normalizeText };
