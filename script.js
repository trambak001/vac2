const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "The pen is mightier than the sword.",
    "The only thing we have to fear is fear itself.",
    "The truth is rarely pure and never simple.",
    "The world is too much with us; late and soon, Getting and spending, we laywaste our powers; Little we see in Nature that is ours; We have given our hearts away, a sordid boon!",
    "The best way to predict the future is to invent it.",
    "The only way to do great work is to love what you do.",
    "The best preparation for tomorrow is doing your best today.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "The only source of knowledge is experience."
];

function getRandomSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
}

function resetTypingTest() {
    textToType = getRandomSentence();
    liveTrackingDisplay.innerText = textToType;
    typingArea.value = '';
    speedDisplay.innerText = '0';
    accuracyDisplay.innerText = '100';
    liveTrackingDisplay.innerHTML = '';
    typingArea.disabled = true;
    clearInterval(timer);
    const resultDisplay = document.getElementById('result-display');
    if (resultDisplay) {
        resultDisplay.remove();
    }
    const crackers = document.getElementById('crackers');
    if (crackers) {
        crackers.remove();
    }
    const refreshButton = document.getElementById('refresh-button');
    if (refreshButton) {
        refreshButton.remove();
    }
}

let textToType = getRandomSentence();
const liveTrackingDisplay = document.getElementById('live-tracking');
liveTrackingDisplay.innerText = textToType;

const typingArea = document.getElementById('typing-area');
const speedDisplay = document.getElementById('speed');
const accuracyDisplay = document.getElementById('accuracy');
const animationArea = document.getElementById('animation-area');
const startButton = document.getElementById('start-button');
const enterButton = document.getElementById('enter-button');
const startPage = document.getElementById('start-page');
const mainPage = document.getElementById('main-page');
const homeButton = document.getElementById('home-button');

let startTime;
let timer;

typingArea.disabled = true; // Disable typing area initially

// Add flower animation
function addFlower() {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    animationArea.appendChild(flower);
}

// Remove the initial call to addFlower()
// addFlower();

// Ensure the start button is enabled
startButton.disabled = false;

startButton.addEventListener('click', () => {
    startTime = null;
    typingArea.value = '';
    speedDisplay.innerText = '0';
    accuracyDisplay.innerText = '100';
    liveTrackingDisplay.innerHTML = textToType;
    typingArea.disabled = false; // Enable typing area on start
    typingArea.focus();
    addFlower(); // Add flower animation on start
});

typingArea.addEventListener('input', () => {
    const typedText = typingArea.value;

    if (!startTime) {
        startTime = new Date();
        timer = setInterval(updateStats, 1000);
    }

    const correctChars = getCorrectChars(typedText, textToType);
    const accuracy = (correctChars / textToType.length) * 100;

    accuracyDisplay.innerText = accuracy.toFixed(2);

    updateLiveTracking(typedText);

    if (typedText === textToType) {
        clearInterval(timer);
        setTimeout(displayResult, 500); // Add a delay before displaying the result
        typingArea.disabled = true; // Disable typing area after submission
    }
});

// Prevent copy and paste actions
typingArea.addEventListener('paste', (e) => {
    e.preventDefault();
});

typingArea.addEventListener('copy', (e) => {
    e.preventDefault();
});

function updateStats() {
    const elapsedTime = (new Date() - startTime) / 1000 / 60; // Time in minutes
    const typedText = typingArea.value;
    const wordsTyped = typedText.split(' ').length;
    const speed = wordsTyped / elapsedTime;

    speedDisplay.innerText = speed.toFixed(2);
}

function getCorrectChars(typed, text) {
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === text[i]) {
            correct++;
        }
    }
    return correct;
}

function updateLiveTracking(typedText) {
    let displayText = '';
    for (let i = 0; i < textToType.length; i++) {
        if (i < typedText.length) {
            if (typedText[i] === textToType[i]) {
                displayText += `<span style="color: green;">${textToType[i]}</span>`;
            } else {
                displayText += `<span style="color: red;">${textToType[i]}</span>`;
            }
        } else {
            displayText += textToType[i];
        }
    }
    liveTrackingDisplay.innerHTML = displayText;
}

function displayResult() {
    const accuracy = parseFloat(accuracyDisplay.innerText);
    let resultMessage = '';
    let emoji = '';

    if (accuracy === 100) {
        resultMessage = 'Excellent!';
        emoji = '🎉';
    } else if (accuracy >= 90) {
        resultMessage = 'Great Job!';
        emoji = '👍';
    } else if ( accuracy >= 75) {
        resultMessage = 'Good Effort!';
        emoji = '😊';
    } else if (accuracy >= 50) {
        resultMessage = 'Keep Practicing!';
        emoji = '🙂';
    } else {
        resultMessage = 'Needs Improvement!';
        emoji = '😟';
    }

    const resultDisplay = document.createElement('div');
    resultDisplay.id = 'result-display';
    resultDisplay.classList.add('result-animation');
    resultDisplay.innerHTML = `<p>${resultMessage} ${emoji}</p>`;
    document.querySelector('.container').appendChild(resultDisplay);

    // Add celebration crackers
    const crackers = document.createElement('div');
    crackers.id = 'crackers';
    crackers.innerHTML = '🎆🎇🎆🎇';
    document.querySelector('.container').appendChild(crackers);

    // Add refresh button
    const refreshButton = document.createElement('button');
    refreshButton.id = 'refresh-button';
    refreshButton.innerText = 'Try Again';
    refreshButton.addEventListener('click', () => {
        location.reload(); // Refresh the page
    });
    document.querySelector('.container').appendChild(refreshButton);

    // Hide start button
    startButton.style.display = 'none';

    // Add vanishing ring animation
    addVanishingRingAnimation();
}

function addVanishingRingAnimation() {
    const ring = document.createElement('div');
    ring.classList.add('vanishing-ring');
    document.body.appendChild(ring);

    setTimeout(() => {
        ring.remove();
    }, 2000); // Remove the ring after 2 seconds
}

animationArea.addEventListener('mousemove', (e) => {
    const rect = animationArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    animationArea.style.backgroundPosition = `${x / rect.width * 100}% ${y / rect.height * 100}%`;
});

const toggleModeSwitch = document.getElementById('toggle-mode');
toggleModeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

// Add event listener to enter button
enterButton.addEventListener('click', () => {
    startPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
});

// Add event listener to home button
homeButton.addEventListener('click', () => {
    mainPage.classList.add('hidden');
    startPage.classList.remove('hidden');
});