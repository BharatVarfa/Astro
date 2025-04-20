// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const chatBox = document.getElementById('chat-box');
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input input');

// Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Modal Functions
function toggleModal(type) {
    const modal = document.getElementById(`${type}-modal`);
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// Chat Functions
function toggleChat() {
    chatBox.classList.toggle('hidden');
}

// Added comments for better readability and error handling for sendMessage
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        try {
            addMessage('user', message);
            // Simulate astrologer response
            setTimeout(() => {
                addMessage('astrologer', 'Thank you for your message. Psychiatrist will respond shortly.');
            }, 1000);
            chatInput.value = '';

            // Store in localStorage
            saveToHistory(message);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}

function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Local Storage Functions
function saveToHistory(message) {
    let history = JSON.parse(localStorage.getItem('chatHistory')) || [];
    history.push({
        timestamp: new Date().toISOString(),
        message: message
    });
    localStorage.setItem('chatHistory', JSON.stringify(history));
}

// Load Astrologers
const astrologers = [
    {
        name: "Dr. Bhumi jain",
        expertise: "General Psychiatrist",
        rating: 4.8,
        image: "./img/bhumi.jpg"
    },
    // Add more astrologers here
];

function loadAstrologers() {
    const grid = document.querySelector('.astrologers-grid');
    astrologers.forEach(astrologer => {
        const card = document.createElement('div');
        card.className = 'astrologer-card';
        card.innerHTML = `
            <img src="${astrologer.image}" alt="${astrologer.name}">
            <h3>${astrologer.name}</h3>
            <p>${astrologer.expertise}</p>
            <div class="rating">★ ${astrologer.rating}</div>
            <div class="action-buttons">
                <button onclick="toggleChat()">Chat Now</button>
                <button>Call Now</button>
                <button>Video Call</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadAstrologers();
});