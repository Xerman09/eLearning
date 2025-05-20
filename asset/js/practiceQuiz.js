
let selectedQuestions = [];
let currentIndex = 0;
let score = 0;
let userAnswers = [];
let qlen = questions.length;
const selectTopic = document.getElementById("select-topic-quiz");
const startQuizButton = document.getElementById('start-quiz-button');
const errorMessage = document.getElementById('error-message');

document.getElementById('num-questions-label').innerText = `How many questions do you want to answer? (Max: ${qlen})`;
startQuizButton.onclick = () => startQuiz(qlen, 0);




// Populate the <select> options
Object.entries(topics).forEach(([key, value]) => {
    const option = document.createElement("option");
    option.value = key;
    option.innerText = value;
    selectTopic.appendChild(option);
});

// Listen for selection change
selectTopic.addEventListener("change", function() {
    const selectedKey = this.value;
    selectedTopic(selectedKey);
});

function selectedTopic(key){
    
    let qFilter = questions.filter(q => !key || q.topic == key)
    let qlen = qFilter.length;
    document.getElementById('num-questions-label').innerText =
        `How many questions do you want to answer? (Max: ${qlen})`;
    startQuizButton.onclick = () => startQuiz(qlen, key);
}

function startQuiz(questionLength, key) {
    let num = parseInt(document.getElementById('num-questions').value);

    if (isNaN(num) || num < 1 || num > questionLength) {
        errorMessage.innerText = `Please enter a valid number between 1 and ${questionLength}.`;
        errorMessage.style.display = 'block';

        // Hide after 5 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);

        return;
    }

    const filterQuestion = questions.filter(q => !key || q.topic == key);
    selectedQuestions = [...filterQuestion]
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

    if (userChoice === q.answer) {
        score++;
        userAnswers.push({ question: q.question, userAnswer: userChoice, correctAnswer: q.answer, explanation: q.explanation, isCorrect: True });

    }else{
        userAnswers.push({ question: q.question, userAnswer: userChoice, correctAnswer: q.answer, explanation: q.explanation , isCorrect: False});

    }

    currentIndex++;
    if (currentIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showSummary();
    }
}

function getBackgroundColor(percentage) {
    if (percentage <= 50) {
        return interpolateColor("#8B0000", "#FFA500", percentage / 50);
    } else {
        return interpolateColor("#FFA500", "#006400", (percentage - 50) / 50);
    }
}

function interpolateColor(color1, color2, factor) {
    let c1 = hexToRgb(color1);
    let c2 = hexToRgb(color2);
    let result = {
        r: Math.round(c1.r + (c2.r - c1.r) * factor),
        g: Math.round(c1.g + (c2.g - c1.g) * factor),
        b: Math.round(c1.b + (c2.b - c1.b) * factor)
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
}

function hexToRgb(hex) {
    let bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function showSummary() {
    document.getElementById('quiz-container').classList.add('hidden');
    const summaryDiv = document.getElementById('summary');
    summaryDiv.classList.remove('hidden');
    const percentage = Math.floor((score / selectedQuestions.length)*100);

    let resultHTML = `<h2 class="ct-txt">Quiz Summary</h2>`;
    resultHTML += `<div class='percentage ct-txt'>${percentage}%</div>`;
    let bgColor = getBackgroundColor(percentage);

    resultHTML += `<div class='score-graph' style='background: linear-gradient(to right, ${bgColor} ${percentage}%, #ccc ${percentage}%);'></div>`;
    resultHTML += `<p>You answered ${score} out of ${selectedQuestions.length} correctly.</p>`;
    resultHTML += '<ul>';

    userAnswers.forEach((item, index) => {
        resultHTML += `<li><b>Q${index + 1}:</b> ${item.question}<br>
            Your Answer: ${item.userAnswer.toUpperCase()} ${item.isCorrect === True ? '✅' : '❌'}<br>
            Correct Answer: ${item.correctAnswer.toUpperCase()}<br>
            ${item.explanation ? `Explanation: ${item.explanation}` : ''}
            <br><br></li>`;
    });

    resultHTML += '</ul>';
    summaryDiv.innerHTML = resultHTML;


}

