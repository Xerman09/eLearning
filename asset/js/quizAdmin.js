const listOfType = {
  M: 'Multiple Choice',
  MWI: "Multiple Choice With Image",
  DAD: 'Drag and Drop'
};

const container = document.getElementById('quiz-container');

// Get URL parameters
let currentPage = parseInt(params.get('page')) || 1;
const subjectCode = params.get('subject');
const topicCode = params.get('topic');

console.log(topicCode);

// Filter questions by topic
const filteredQuestions = questions.filter(q => !topicCode || q.topic == topicCode);
console.log(filteredQuestions);

// Pagination settings
const questionsPerPage = 10;
const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

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
    window.location.search = `?page=${page}&subject=${subjectCode}&topic=${topicCode}`;
  }
}

// Render single question
function renderQuestion(q, index) {
  index = (currentPage * 10) - 10 + index;
  const wrapper = document.createElement('div');
  wrapper.classList.add('question-wrapper');
  wrapper.style.position = 'relative'; // ensure positioning for hiding elements

  // Header
  const header = document.createElement('div');
  header.classList.add('question-header');

  const questionNo = document.createElement('div');
  questionNo.classList.add('questionNo');
  questionNo.textContent = `Question ${index + 1}`;
  header.appendChild(questionNo);

  const topic = document.createElement('div');
  topic.classList.add('topic');
  topic.textContent = cse_topics[q.topic];
  header.appendChild(topic);

  wrapper.appendChild(header);

  const questionText = document.createElement('div');
  questionText.classList.add('question-text');
  questionText.textContent = q.question;
  wrapper.appendChild(questionText);

  const answerBox = document.createElement('div');
  answerBox.className = 'answer-box';

  let checkBtn;

  if (q.type === 'M' || q.type === 'MWI') {
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
        answerBox.innerHTML = `<div>Explanation: ${q.explanation || 'No explanation available.'}</div>`;
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
    answerBox.style.display = 'none';
    wrapper.appendChild(answerBox);
  }

  // ========== DOWNLOAD BUTTON ==========
  const downloadBtn = document.createElement('button');
  downloadBtn.className = 'download-btn';
  downloadBtn.textContent = 'Download as Image';

  downloadBtn.addEventListener('click', () => {
    // Temporarily hide the button
    downloadBtn.style.display = 'none';

    html2canvas(wrapper, {
      backgroundColor: null,
      scale: 2
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = `question-${index + 1}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Restore the button after download
      downloadBtn.style.display = 'inline-block';
    }).catch(err => {
      console.error('Image download failed:', err);
      downloadBtn.style.display = 'inline-block';
    });
  });

  wrapper.appendChild(downloadBtn);
  container.appendChild(wrapper);
}

// Display the correct questions for the page
function displayQuestions() {
  container.innerHTML = ''; // Clear current questions
  if (filteredQuestions.length === 0) {
    container.innerHTML = '<div class="no-questions">No questions found for this topic.</div>';
    return;
  }
  const start = (currentPage - 1) * questionsPerPage;
  const end = start + questionsPerPage;
  const questionsToShow = filteredQuestions.slice(start, end);
  questionsToShow.forEach((q, i) => renderQuestion(q, i)); // Pass index!
}

// Init
createPaginationControls();
displayQuestions();
document.getElementById('warning-message').style.display = "none";