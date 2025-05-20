import {containerContent} from './asset/js/functions.js';

const practiceExamArray = [
  {
    link: "./library/practiceExam.html?subject=cse_question&topic=0",
    subjectTitle: "Civil Service Exam",
  },
    {
    link: "./library/practiceExam.html?subject=ccna_200_301&topic=0",
    subjectTitle: "CCNA 200 - 301",
  },
];

containerContent(practiceExamArray, 'render-practice-exam');

