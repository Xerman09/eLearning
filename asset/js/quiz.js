const listOfType = {
  M: 'Multiple Choice',
  MWI: "Multiple Choice With Image",
  DAD: 'Drag and Drop'
};

const container = document.getElementById('quiz-container');

// Get page from URL
const pageParams = new URLSearchParams(window.location.search);
let currentPage = parseInt(pageParams.get('page')) || 1;
const subjectCode = params.get('subject');

// Pagination settings
const questionsPerPage = 10;
const totalPages = Math.ceil(questions.length / questionsPerPage);

// Create pagination controls
function createPaginationControls() {
  const paginationBottom = document.createElement('div');
  paginationBottom.className = 'pagination';

  if (currentPage > 1) {
    const prevButtonBottom = document.createElement('button');
    prevButtonBottom.textContent = 'Previous';
    prevButtonBottom.className = 'previous';
    prevButtonBottom.addEventListener('click', () => navigatePage(currentPage - 1));
    paginationBottom.appendChild(prevButtonBottom);
  }

  const pageInfo = document.createElement('span');
  pageInfo.textContent = ` Page ${currentPage} of ${totalPages} `;
  paginationBottom.appendChild(pageInfo);

  if (currentPage < totalPages) {
    const nextButtonBottom = document.createElement('button');
    nextButtonBottom.textContent = 'Next';
    nextButtonBottom.className = 'next';
    nextButtonBottom.addEventListener('click', () => navigatePage(currentPage + 1));
    paginationBottom.appendChild(nextButtonBottom);
  }

  container.parentElement.appendChild(paginationBottom);
}



// Navigate to another page
function navigatePage(page) {
  if (page >= 1 && page <= totalPages) {
    window.location.search = `?page=${page}&subject=${subjectCode}`;
  }
}

// Render single question
function renderQuestion(q) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('question-wrapper');

  //Creating a Header | Question 1      Topic|
  const header = document.createElement('div');
  header.classList.add('question-header');

  //Creating Question 1
  const questionNo = document.createElement('div');
  questionNo.classList.add('questionNo.');
  questionNo.textContent = `Question ${q.no}`;
  header.appendChild(questionNo);

  //Creating Topic
  const topic = document.createElement('div');
  topic.classList.add('topic');
  topic.textContent = cse_topics[q.topic];
  header.appendChild(topic);

  wrapper.appendChild(header);


  const questionText = document.createElement('div');
  questionText.classList.add('question-text');
  questionText.textContent = q.type === 'M' ? q.question : q.question.question;

  const answerBox = document.createElement('div');
  answerBox.className = 'answer-box';

  let checkBtn;

  if (q.type === 'M' || q.type === 'MWI') {
    if (q.type === 'MWI' && q.question.image) {
      const img = document.createElement('img');
      img.src = q.question.image;
      img.classList.add('question-image');
      wrapper.appendChild(img);
    }

    wrapper.appendChild(questionText);

    const choicesBox = document.createElement('div');
    choicesBox.classList.add('choices');
    let selectedKey = null;
    const choiceElements = {};

    Object.entries(q.choices).forEach(([key, val]) => {
      const choice = document.createElement('div');
      choice.className = 'choice';
      choice.textContent = `${key.toUpperCase()}. ${val}`;
      choice.addEventListener('click', () => {
        selectedKey = key;
        Object.values(choiceElements).forEach(el => el.classList.remove('selected'));
        choice.classList.add('selected');
      });
      choiceElements[key] = choice;
      choicesBox.appendChild(choice);
    });
    wrapper.appendChild(choicesBox);

    checkBtn = document.createElement('button');
    checkBtn.className = 'check-answer-btn';
    checkBtn.textContent = 'Check Answer';
    checkBtn.addEventListener('click', () => {
      if (checkBtn.textContent === 'Check Answer') {
        Object.keys(choiceElements).forEach(k => {
          choiceElements[k].style.pointerEvents = 'none';
        });
        if (!selectedKey || selectedKey !== q.answer) {
          if (selectedKey) choiceElements[selectedKey].classList.add('incorrect');
          choiceElements[q.answer].classList.add('correct');
        } else {
          choiceElements[selectedKey].classList.add('correct');
        }
        answerBox.innerHTML = `<div>Explanation: ${q.explanation}</div>`;
        answerBox.style.display = 'block';
        checkBtn.textContent = 'Hide Answer';
      } else {
        Object.keys(choiceElements).forEach(k => {
          choiceElements[k].style.pointerEvents = 'auto';
          choiceElements[k].classList.remove('correct', 'incorrect', 'selected');
        });
        selectedKey = null;
        answerBox.style.display = 'none';
        checkBtn.textContent = 'Check Answer';
      }
    });
    wrapper.appendChild(checkBtn);
    wrapper.appendChild(answerBox);

  } else if (q.type === 'DAD') {
    wrapper.appendChild(questionText);

    if (q.question.image) {
      const img = document.createElement('img');
      img.src = q.question.image;
      img.classList.add('question-image');
      wrapper.appendChild(img);
    }

    checkBtn = document.createElement('button');
    checkBtn.className = 'check-answer-btn';
    checkBtn.textContent = 'Show Answer';

    checkBtn.addEventListener('click', () => {
      if (checkBtn.textContent === 'Show Answer') {
        answerBox.innerHTML = `<img src="${q.answer}" class="question-image" /><div>${q.explanation}</div>`;
        answerBox.style.display = 'block';
        checkBtn.textContent = 'Hide Answer';
      } else {
        answerBox.style.display = 'none';
        checkBtn.textContent = 'Show Answer';
      }
    });
    wrapper.appendChild(checkBtn);
    wrapper.appendChild(answerBox);
  }

  container.appendChild(wrapper);
}

// Display the correct questions for the page
function displayQuestions() {
  container.innerHTML = ''; // Clear current questions
  const start = (currentPage - 1) * questionsPerPage;
  const end = start + questionsPerPage;
  const questionsToShow = questions.slice(start, end);
  questionsToShow.forEach(q => renderQuestion(q));
}

// Init
createPaginationControls();
displayQuestions();
