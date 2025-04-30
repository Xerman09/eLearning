
let selectedQuestions = [];
let currentIndex = 0;
let score = 0;
let userAnswers = [];

function startQuiz() {
    let num = parseInt(document.getElementById('num-questions').value);
    if (isNaN(num) || num < 1 || num > questions.length) {
        alert('Please enter a valid number between 1 and 12.');
        return;
    }
    selectedQuestions = [...questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, num);
    document.getElementById('start-container').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const q = selectedQuestions[currentIndex];
    document.getElementById('question-text').innerHTML = `<b>Question ${currentIndex + 1}:</b> ${q.question}`;

    const totalQuestion = selectedQuestions.length;
    const progressPercent = ((currentIndex + 1)/totalQuestion)*100;
    document.getElementById('progress-bar').style.background = `linear-gradient(to right, #4caf50 ${progressPercent}%, #ccc ${progressPercent}%)`;
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = ''; // Clear previous choices

    // Randomize and render choices
    const choicesArray = Object.entries(q.choices).sort(() => Math.random() - 0.5);

    choicesArray.forEach(([key, value]) => {
        const label = document.createElement('label');
        label.className = 'choice';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'choice';
        input.value = key;

        // Highlight on click
        input.addEventListener('change', () => {
            // Remove "selected" class from all choices
            document.querySelectorAll('.choice').forEach(choice => {
                choice.classList.remove('selected');
            });
            // Add "selected" to the clicked one
            label.classList.add('selected');
        });

        label.appendChild(input);
        label.appendChild(document.createTextNode(` ${value}`));
        choicesDiv.appendChild(label);
    });
}




function submitAnswer() {
    const selected = document.querySelector('input[name="choice"]:checked');
    if (!selected) {
        alert('Please select an answer.');
        return;
    }
    const q = selectedQuestions[currentIndex];
    const userChoice = selected.value;
    userAnswers.push({ question: q.question, userAnswer: userChoice, correctAnswer: q.answer, explanation: q.explanation });

    if (userChoice === q.answer) {
        score++;
    }

    currentIndex++;
    if (currentIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showSummary();
    }
}

function showSummary() {
    document.getElementById('quiz-container').classList.add('hidden');
    const summaryDiv = document.getElementById('summary');
    summaryDiv.classList.remove('hidden');
    const percentage = (score / selectedQuestions.length)*100;

    let resultHTML = `<h2>Quiz Summary</h2>`;
    resultHTML += `<div class='percentage'>${percentage}</div>`;
    resultHTML += `<div class='score-graph' style='background: linear-gradient(to right, #4caf50 ${percentage}%, #ccc ${percentage}%);'></div>`
    resultHTML += `<p>You answered ${score} out of ${selectedQuestions.length} correctly.</p>`;
    resultHTML += '<ul>';

    userAnswers.forEach((item, index) => {
        resultHTML += `<li><b>Q${index + 1}:</b> ${item.question}<br>
            Your Answer: ${item.userAnswer.toUpperCase()} ${item.userAnswer === item.correctAnswer ? '✅' : '❌'}<br>
            Correct Answer: ${item.correctAnswer.toUpperCase()}<br>
            ${item.explanation ? `Explanation: ${item.explanation}` : ''}
            <br><br></li>`;
    });

    resultHTML += '</ul>';
    summaryDiv.innerHTML = resultHTML;


}
