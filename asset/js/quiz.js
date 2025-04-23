const listOfType = {
    M: 'Multiple Choice',
    MWI: "Multiple Choice With Image",
    DAD: 'Drag and Drop'
  }
  const container = document.getElementById('quiz-container');

  function renderQuestion(q) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('question-wrapper');

    const header = document.createElement('div');
    header.classList.add('question-header');
    header.textContent = `Question ${q.no}`;
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
          // Reset state
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
    return wrapper.childNodes;
  }

  questions.forEach(q => renderQuestion(q));