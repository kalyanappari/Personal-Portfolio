document.addEventListener('DOMContentLoaded', function() {
    const assistant = document.querySelector('.ai-assistant');
    const chatIcon = document.querySelector('.chat-icon');
    const chatWindow = document.querySelector('.chat-window');
    const closeBtn = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.send-btn');
    const messagesContainer = document.querySelector('.chat-messages');
  
    // Knowledge base
    const knowledgeBase = {
      "skills": "Kalyan specializes in Python, Machine Learning (especially NLP), and has strong skills in Java, Data Structures, and Algorithms.",
      "experience": "He has internship experience in AI/ML from TechSaksham (Microsoft & SAP partnership) and multiple academic projects.",
      "projects": "Notable projects include: 1) Movie Recommendation System 2) Indian Language Classification 3) Financial Fraud Detection",
      "education": "Pursuing B.Tech in Computer Science at Lovely Professional University with a focus on ML/AI.",
      "contact": "You can reach him via email at asaikalyan2005@gmail.com or connect on LinkedIn/GitHub.",
      "default": "I can answer questions about Kalyan's: 1) Skills 2) Experience 3) Projects 4) Education 5) Contact info"
    };
  
    // Toggle chat window
    chatIcon.addEventListener('click', () => {
      assistant.classList.toggle('active');
    });
  
    closeBtn.addEventListener('click', () => {
      assistant.classList.remove('active');
    });
  
    // Handle messages
    function addMessage(text, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
      messageDiv.textContent = text;
      messagesContainer.appendChild(messageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  
    function processQuestion(question) {
      const lowerQuestion = question.toLowerCase();
      let response = knowledgeBase.default;
  
      if (lowerQuestion.includes('skill') || lowerQuestion.includes('technology')) {
        response = knowledgeBase.skills;
      } else if (lowerQuestion.includes('experience') || lowerQuestion.includes('intern')) {
        response = knowledgeBase.experience;
      } else if (lowerQuestion.includes('project')) {
        response = knowledgeBase.projects;
      } else if (lowerQuestion.includes('educat') || lowerQuestion.includes('degree')) {
        response = knowledgeBase.education;
      } else if (lowerQuestion.includes('contact') || lowerQuestion.includes('reach')) {
        response = knowledgeBase.contact;
      }
  
      // Simulate typing effect
      setTimeout(() => {
        addMessage(response);
      }, 500);
    }
  
    // Send button click
    sendBtn.addEventListener('click', sendMessage);
  
    // Enter key press
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  
    function sendMessage() {
      const question = chatInput.value.trim();
      if (question) {
        addMessage(question, true);
        chatInput.value = '';
        processQuestion(question);
      }
    }
  
    // Optional: Voice recognition
    if ('webkitSpeechRecognition' in window) {
      const voiceBtn = document.createElement('button');
      voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
      voiceBtn.className = 'voice-btn';
      chatInput.parentNode.insertBefore(voiceBtn, sendBtn);
  
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
  
      voiceBtn.addEventListener('click', () => {
        recognition.start();
        voiceBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
      });
  
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript;
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
      };
  
      recognition.onerror = () => {
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
      };
    }
  });