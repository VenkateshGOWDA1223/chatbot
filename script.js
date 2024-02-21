// Get DOM elements
const chatBox = document.getElementById('chat-box');
const inputBox = document.getElementById('input-box');
const sendButton = document.getElementById('send-button');
const voiceButton = document.getElementById('voice-button');
const themeToggleButton = document.getElementById('theme-toggle');

let recognition;

// Initialize voice recognition
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function(event) {
        const message = event.results[0][0].transcript;
        addMessage(message, 'user-message');
        processUserMessage(message);
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
    };
} else {
    console.error('Speech recognition is not supported in this browser.');
    voiceButton.disabled = true;
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
inputBox.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        sendMessage();
    }
});
themeToggleButton.addEventListener('click', toggleTheme);
voiceButton.addEventListener('click', startVoiceRecognition);

// Functions
function sendMessage() {
    const message = inputBox.value.trim();
    if (message !== '') {
        addMessage(message, 'user-message');
        inputBox.value = '';
        processUserMessage(message);
    }
}

function addMessage(message, className) {
    const div = document.createElement('div');
    div.classList.add('message', className);
    div.textContent = message;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

function processUserMessage(message) {
    // Process the user's message and generate a response
    const response = generateBotResponse(message);
    addMessage(response, 'bot-message');
}

function generateBotResponse(message) {
    // Convert the user's message and comparison strings to lowercase
    const lowerCaseMessage = message.toLowerCase();

    // Hardcoded responses for pharmaceutical questions
    switch (lowerCaseMessage) {
        case 'hi':
            return 'Hi!, How can I help you today?';
        case 'how are you':
            return 'I am fine and doing well, what about you?';
        case 'hello':
            return 'Hello!, How can I help you today?';
        case 'who are you':
            return 'I am Srinivasa Pharmaceuticals chatbot';
        case 'what are you doing':
            return 'I am still in the learning process so kindly please cooperate with me.';
        case 'founder of srinivasa pharmaceuticals':
            return 'Raj Kumar';
        case 'bye':
            return 'Leaving so soon :( .BYE';
        case 'thank you':
            return 'You are welcome';
        case 'gmail':
            return 'Gmail: srinivasapharmaceuticals9@gmail.com';
        case 'facebook':
            return 'Facebook: Srinivasa Pharmaceuticals. Don\'t forget to follow us';
        case 'good':
            return 'Happy to hear that.';
        case 'instagram':
            return 'Instagram: srinivasa_pharmaceuticals. Don\'t forget to follow us';
        case 'whatsapp':
            return 'Whatsapp:9482049655';
        case 'sad':
            return ':(';
          case 'order':
            return 'you can place an online oreder now';
        default:
            return 'I am sorry, I am still learning, please cooperate. For more info email us - srinivasapharmaceuticals9@gmail.com. Follow us on Facebook and Instagram';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

function startVoiceRecognition() {
    if (recognition) {
        recognition.start();
    }
}
