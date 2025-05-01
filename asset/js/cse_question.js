
document.getElementById('subject-title').innerText = 'CIVIL SERVICE PRACTICE EXAM';
document.getElementById('sidebar-subject-title').innerText = 'CIVIL SERVICE PRACTICE EXAM';

const cse_topics = {
    0 : 'ALL',
    1 : 'MATHEMATICS',
    2 : 'VERBAL ABILITY',
    2.1 : 'Word Meaning',
    2.2 : 'Sentence Completion',
    3 : 'FILIPINO',
    4 : 'PHILIPPINE CONSTITUTION',
    5 : 'INDUCTIVE REASONING',
    6 : 'ABSTRACT REASONING',
}

const sideBarContainer = document.getElementById("topicLinks"); // The container where links will be inserted

Object.entries(cse_topics).forEach(([key, value]) => {
  const a = document.createElement("a");
  a.href = `../library/practiceExam.html?page=1&subject=cse_question&topic=${key}`;
  a.id = `topic-${key}`;
  a.className = `w3-bar-item w3-button w3-padding `;
  a.innerHTML = `<img src="" class="notepadIcon">${value}`;
  sideBarContainer.appendChild(a);
});


const practiceTest = document.createElement("a");
practiceTest.href = `../library/quiz.html?page=1&subject=cse_question&topic=`;
practiceTest.className = `w3-bar-item w3-button w3-padding topic-quiz`;
practiceTest.innerHTML = `<img src="" class="notepadIcon">PRACTICE QUIZ (FLASHCARD)`;
sideBarContainer.appendChild(practiceTest);



const questions = [
    {
        no : 1, 
        topic: 1,
        type : 'M',
        question : 'Find the sum: 299 + 943 + 398 + 101.',
        choices : {
            a : '1 531',
            b : '1 641',
            c : '1 741',
            d : '122 222',
        },
        answer : 'c',
        explanation: 'The sum of 299 + 943 + 398 + 101 is <b>1 741</b>',
    },
    {
        no : 2, 
        topic: 1,
        type : 'M',
        question : 'If 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = 55, then 11 + 12 + 13 + 14 + 15 + 16 + 17 + 18 + 19 + 20 = ?',
        choices : {
            a : '65',
            b : '155',
            c : '125',
            d : '550',
        },
        answer : 'b',
        explanation: '',
    },
    {
        no : 3, 
        topic: 1,
        type : 'M',
        question : 'If 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = 55, then 101 + 102 + 103 + 104 + 105 + 106 + 107 + 108 + 109 + 110 = ?',
        choices : {
            a : '1 055',
            b : '1 065',
            c : '1 075',
            d : '5 500',
        },
        answer : 'a',
        explanation: '',
    },
    {
        no : 4, 
        topic: 1,
        type : 'M',
        question : 'Evaluate: {16 - (24 - 8) + 22 x 8 - 8}.',
        choices : {
            a : '40',
            b : '48',
            c : '64',
            d : '168',
        },
        answer : 'd',
        explanation: '',
    },
    {
        no : 5, 
        topic: 1,
        type : 'M',
        question : 'If 23 + 28 + 37 + x + 53 = 168 and 23 + 28 + 40 + y + 50 = 120. Find the value of x - y?',
        choices : {
            a : '36',
            b : '48',
            c : '56',
            d : '64',
        },
        answer : 'b',
        explanation: '',
    },
    {
        no : 6, 
        topic: 1,
        type : 'M',
        question : 'Find the product: 800 x 125',
        choices : {
            a : '925',
            b : '1 000',
            c : '10 000',
            d : '100 000',
        },
        answer : 'd',
        explanation: '',
    },
    {
        no : 7, 
        topic: 1,
        type : 'M',
        question : 'Find the quotient: 8000 / 125',
        choices : {
            a : '48',
            b : '64',
            c : '80',
            d : '88',
        },
        answer : 'b',
        explanation: '',
    },
    {
        no : 8, 
        topic: 1,
        type : 'M',
        question : 'What is the remainder when 192 888 is divided by 8?',
        choices : {
            a : '0',
            b : '4',
            c : '8',
            d : '24 111',
        },
        answer : 'a',
        explanation: '',
    },
    {
        no : 9, 
        topic: 1,
        type : 'M',
        question : 'Rounding 299 943 to the nearest thousands the result is',
        choices : {
            a : '299 940',
            b : '299 000',
            c : '299 900',
            d : '300 000',
        },
        answer : 'd',
        explanation: '',
    },
    {
        no : 10, 
        topic: 1,
        type : 'M',
        question : '398.101 is read as',
        choices : {
            a : 'three hundred ninety eight, one hundred one.',
            b : 'three hundred ninety eight and one hundred one.',
            c : 'three hundred ninety eight and one hundred',
            d : 'three hundred ninety eight and one hundred one thousandths',
        },
        answer : 'd',
        explanation: '',
    },
    {
        no : 11, 
        topic: 1,
        type : 'M',
        question : 'A number is divisible by 8 if its last three digit is divisible by 8. Which of the following numbers is divisible by 8?',
        choices : {
            a : '9 208',
            b : '6 236',
            c : '88 254',
            d : '8 886',
        },
        answer : 'a',
        explanation: '',
    },
    {
        no : 12, 
        topic: 1,
        type : 'M',
        question : 'A number is divisible by 8 if its last three digit is divisible by 8. Which of the following numbers is divisible by 8?',
        choices : {
            a : '9 208',
            b : '6 236',
            c : '88 254',
            d : '8 886',
        },
        answer : 'a',
        explanation: '',
    },
    {
        no : 4.1, 
        topic: 4,
        type : 'M',
        question : 'What is the highest law of the land in the Philippines',
        choices : {
            a : 'Civil Code',
            b : 'Philippine Constitution',
            c : 'Penal Code',
            d : 'Local Government Code',
        },
        answer : 'b',
        explanation: '',
    },
    {
        no : 4.2, 
        topic: 4,
        type : 'M',
        question : 'How many articles are there in the 1987 Philippine Constitution?',
        choices : {
            a : '18',
            b : '12',
            c : '21',
            d : '22',
        },
        answer : 'a',
        explanation: '',
    },
    {
        no : 4.3, 
        topic: 4,
        type : 'M',
        question : 'Which branch of the government is responsible for making laws?',
        choices : {
            a : 'Executive',
            b : 'Legislative',
            c : 'Judicial',
            d : 'Electoral',
        },
        answer : 'b',
        explanation: '',
    },
    {
        no : 4.4, 
        topic: 4,
        type : 'M',
        question : 'The power to declare martial law is vested in which official?',
        choices : {
            a : 'Senate President',
            b : 'Chief Justice',
            c : 'President of the Philippines',
            d : 'Speaker of the House',
        },
        answer : 'c',
        explanation: '',
    },
    {
        no : 4.5, 
        topic: 4,
        type : 'M',
        question : 'Which article of the Constitution focuses on the Bill of Rights',
        choices : {
            a : 'Article II',
            b : 'Article III',
            c : 'Article IV',
            d : 'Article V',
        },
        answer : 'a',
        explanation: '',
    },
    {
        no : 4.6, 
        topic: 4,
        type : 'M',
        question : 'Who is responsible for determining the existence of probable cause for the issuance of a warrant of arrest or search warrant?',
        choices : {
            a : 'Lawyer',
            b : 'Judge',
            c : 'Fiscal',
            d : 'Prosecutor',
        },
        answer : 'b',
        explanation: '',
    },
    {
        no : 4.7, 
        topic: 4,
        type : 'M',
        question : 'The Senate shall be composed of how many senators elected at large by voters of the Philippines?',
        choices : {
            a : '21',
            b : '22',
            c : '23',
            d : '24',
        },
        answer : 'd',
        explanation: '',
    },
    {
        no : 4.8, 
        topic: 4,
        type : 'M',
        question : 'The term of office of the President and Vice-President of the Philippines shall be up to how many years?',
        choices : {
            a : '3 Years',
            b : '4 Years',
            c : '5 Years',
            d : '6 Years',
        },
        answer : 'd',
        explanation: '',
    },
    {
        no : 4.9, 
        topic: 4,
        type : 'M',
        question : 'It states that "no person shall be deprived of life, liberty, or property without due process of law, nor any person be denied the equal protection of the laws.',
        choices : {
            a : 'Article VI',
            b : 'Bill of Rights',
            c : 'Republic Act',
            d : 'Court Order',
        },
        answer : 'b',
        explanation: '',
    },
    {
        no : 4.10, 
        topic: 4,
        type : 'M',
        question : 'What are the 3 branches of the Governemnt of the Philippines?',
        choices : {
            a : 'Senate, Supreme Court, Congress',
            b : 'Presidential, Unicameral - Parliamentary, Bicameral -Parliamentary',
            c : 'Legislative, Executive, Judicial',
            d : 'The Legislative, The Senate, The Supreme Court',
        },
        answer : 'c',
        explanation: '',
    },
    {
        no : 4.11, 
        topic: 4,
        type : 'M',
        question : 'The following shall be exempted from taxation except:',
        choices : {
            a : 'Lands and buildings',
            b : 'Churches and convents',
            c : 'Charitable institutions',
            d : 'Non-profit cemeteries',
        },
        answer : 'a',
        explanation: '',
    },
    {
        no : 4.12, 
        topic: 4,
        type : 'M',
        question : 'It is a law in the Philippines that aims to address legal issues concerning online interactions and harmful internet behavior in the Philippines. It aims to present and punish cybercrime in the country.',
        choices : {
            a : 'Cybersquatting',
            b : 'Cybercrime Act',
            c : 'Cybercrime Prevention Act',
            d : 'Cyber Identity Theft Act',
        },
        answer : 'c',
        explanation: '',
    },
    {
        no : 4.13, 
        topic: 4,
        type : 'M',
        question : 'It is a project of DOST for more accurate integrated and responsive disaster prevention and mitigation system expecially in high-risk calamity areas of the Philippines',
        choices : {
            a : 'PAGASA',
            b : 'I am ready',
            c : 'DOST - Advance Disaster Program',
            d : 'Project NOAH',
        },
        answer : 'd',
        explanation: 'D. Project NOAH - Nationwide Operational Assessment of Hazards',
    },
    {
        no : 4.14, 
        topic: 4,
        type : 'M',
        question : 'The member of the House of Representatives shall be elected for a term of _____.',
        choices : {
            a : '3 Years',
            b : '4 Years',
            c : '5 Years',
            d : '6 Years',
        },
        answer : 'a',
        explanation: 'A. 3 Years is the term of the Elecetd Represenative and also the Senator',
    },
    {
        no : 4.15, 
        topic: 4,
        type : 'M',
        question : 'It is the power of the State to promote public welfare by restraining the use of both liberty and property of all people',
        choices : {
            a : 'Police Power',
            b : 'Power of Eminent Domain',
            c : 'Power of Taxation',
            d : 'Power to Impeach',
        },
        answer : 'a',
        explanation: 'A. Police Power',
    },
    {
        no : "2.R", 
        topic: 2.2,
        type : 'M',
        question : 'The researcher’s groundbreaking work was met with initial resistance, but over time, it gained widespread _______ as further studies confirmed its validity.',
        choices : {
            a : 'Disapproval',
            b : 'Recognition',
            c : 'Indifference',
            d : 'Opposition',
        },
        answer : 'b',
        explanation: '',
    },
    {
        no : "2.R", 
        topic: 2.2,
        type : 'M',
        question : 'The engineers said the bridge was now ______, however, no one wanted to risk crossing it.',
        choices : {
            a : 'protected',
            b : 'prudent',
            c : 'fixed',
            d : 'safe',
        },
        answer : 'c',
        explanation: 'The structure of the sentence gives us a clue. It has two contrasting parts, connected by "however," which signals a contradiction. This means that although the engineers claimed something positive, people still did not trust the bridge enough to cross it. So, "fixed" makes the most sense because it acknowledges that the bridge was repaired, but people were still unsure or scared to cross—which matches the contrast introduced by “however.”',
    },
    {
        no : "2.CSC-1", 
        topic: 2.2,
        type : 'M',
        question : 'The commoners played a show about the Lannisters, a _____ of the ineffective rulling of the leaders of King\'s Landing.',
        choices : {
            a : 'Play',
            b : 'Travesty',
            c : 'Pretention',
            d : 'Role-Playing',
            e : 'Showcase'
        },
        answer : 'b',
        explanation: '',
    },
    {
        no : "2.CSC-2", 
        topic: 2.2,
        type : 'M',
        question : 'The dentist ridiculed his patient\' ____ tooth enamel.',
        choices : {
            a : 'hard',
            b : 'favorable',
            c : 'healthy',
            d : 'mottled',
            e : 'lovely'
        },
        answer : 'd',
        explanation: '',
    },
    {
        no : "2.R", 
        topic: 2.2,
        type : 'M',
        question : 'To ensure that Nathalie wouldn\'t know where we were going for her birthday, I took the most _____ route i could think of.',
        choices : {
            a : 'circuitous',
            b : 'craven',
            c : 'enigmatic',
            d : 'mercurial',
        },
        answer : 'a',
        explanation: 'The best word to complete the sentence is a. circuitous.',
    },
    {
        no : "2.CSC-3", 
        topic: 2.2,
        type : 'M',
        question : 'Arya _____ upon witnessing his father\'s decapitation. Her face because ashen upon seeing such horabble scene, and she was not able to say anuthing for a while.',
        choices : {
            a : 'Gasped',
            b : 'Looked',
            c : 'Flummoxed',
            d : 'Breathed',
            e : 'Flunked'
        },
        answer : 'c',
        explanation: '',
    },
    {
        no : "2.CSC-4", 
        topic: 2.2,
        type : 'M',
        question : 'Emma Watson was chosen to become a/an _____ for the remake of Beauty and the Beast in 2017. She will be playing as Belle.',
        choices : {
            a : 'Antagonist',
            b : 'Protagonist',
            c : 'Wicked',
            d : 'Opponent',
            e : 'Narrator'
        },
        answer : 'b',
        explanation: '',
    },
    {
        no : "2.CSC-5", 
        topic: 2.2,
        type : 'M',
        question : 'The beast promised to _____ havoc if ever somebody trespasses his kingdom.',
        choices : {
            a : 'Endow',
            b : 'Warrant',
            c : 'Ensue',
            d : 'Placate',
            e : 'Wreak'
        },
        answer : 'e',
        explanation: '',
    },
    {
        no : "2.CSC-6", 
        topic: 2.2,
        type : 'M',
        question : 'Mae\'s talent in singing _____ under the tutelage of Prof. Dela Cruz, her music teacher. She is now a well-known singer from across the world.',
        choices : {
            a : 'Improved',
            b : 'Flourished',
            c : 'Embellished',
            d : 'Colluded',
            e : 'touted'
        },
        answer : 'b',
        explanation: '',
    },
    {
        no : "2.CSC-7", 
        topic: 2.2,
        type : 'M',
        question : 'Ana reached the _____ of her career upon the release of her second novel, which gained positive remarks from world-renowned authors from different countries.',
        choices : {
            a : 'Apogee',
            b : 'Plateau',
            c : 'Bottom',
            d : 'Trough',
            e : 'Downfall'
        },
        answer : 'a',
        explanation: '',
    },
    {
        no : "2.CSC-8", 
        topic: 2.2,
        type : 'M',
        question : 'Smoking cigarettes is mostly _____ in some part of the world. In the Philippines, however, there are still a lot of people who smoke cigarettes.',
        choices : {
            a : 'Taboo',
            b : 'Legal',
            c : 'Favorable',
            d : 'Common',
            e : 'Collective'
        },
        answer : 'a',
        explanation: '',
    },
    {
        no : "2.CSC-9", 
        topic: 2.2,
        type : 'M',
        question : 'Unlike dogs which are known to be loyal, cats are _____ in nature.',
        choices : {
            a : 'Treacheous',
            b : 'Dependable',
            c : 'Steadfast',
            d : 'Sweet',
            e : 'Clingy'
        },
        answer : 'a',
        explanation: '',
    },
    {
        no : "2.CSC-10", 
        topic: 2.2,
        type : 'M',
        question : 'The _____ told him to be careul in his way home, for the might encounter a tragedy he will never forget his entire life.',
        choices : {
            a : 'Stranger',
            b : 'Harbinger',
            c : 'Apogee',
            d : 'Dictum',
            e : 'Scintilla'
        },
        answer : 'b',
        explanation: '',
    },
]
/*
    {
        no : "2.R", 
        topic: 2.2,
        type : 'M',
        question : '',
        choices : {
            a : '',
            b : '',
            c : '',
            d : '',
            e : ''
        },
        answer : '',
        explanation: '',
    },
*/

// Function to display questions
