import { getBotResponse, detectLanguage } from './botLogic.js';

const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const typingIndicator = document.getElementById('typing-indicator');
const langButtons = document.querySelectorAll('.lang-btn');

let currentLanguage = 'en';

// Language switching
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        switchLanguage(lang);
    });
});

function switchLanguage(lang) {
    currentLanguage = lang;
    langButtons.forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');

    // Update placeholder
    const placeholders = {
        en: "Type your question here...",
        ta: "உங்கள் கேள்வியை இங்கே தட்டச்சு செய்க...",
        hi: "अपना प्रश्न यहाँ टाइप करें..."
    };
    userInput.placeholder = placeholders[lang];
}

// Message rendering
function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', `${sender}-msg`);
    msgDiv.textContent = text;

    // Append and scroll
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Chat handling
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    userInput.value = '';

    // Language auto-detect
    const detected = detectLanguage(message);
    if (detected !== currentLanguage && detected !== 'en') {
        switchLanguage(detected);
    }

    // Show typing
    typingIndicator.style.display = 'flex';
    chatMessages.appendChild(typingIndicator); // Keep indicator at bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        const response = await getBotResponse(message, currentLanguage);
        typingIndicator.style.display = 'none';
        addMessage(response, 'bot');
    } catch (error) {
        typingIndicator.style.display = 'none';
        addMessage("Something went wrong. Please try again or contact support.", 'bot');
    }
});

// Initial greeting
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        addMessage("Hello! I am your College Enquiry Assistant. How can I help you today?", 'bot');
    }, 500);
});
