// DE5 Chat Assistant Script

document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const typingIndicator = document.querySelector('.typing-indicator');

    // Knowledge base simulation (in real app, this would be API calls or embeddings)
    const knowledgeBase = {
        mission: "DE5 is building an AI and blockchain-powered tokenization platform that democratizes capital access, creates liquidity, and supports a more inclusive financial ecosystem.",
        offerings: "Our platform enables SMEs and organizations to tokenize assets for better liquidity, while providing investors with new opportunities in tokenized assets.",
        whitepaper: "The DE5 whitepaper outlines our tokenomics, roadmap, platform mechanics, and business model. Key points include our AI-driven tokenization process and blockchain security.",
        tokenomics: "DE5's tokenomics involve a dual-token system: DE5 tokens for governance and utility, and asset-specific tokens for tokenized assets.",
        roadmap: "Our roadmap includes Phase 1: Platform launch, Phase 2: AI enhancements, Phase 3: Global expansion.",
        issuer: "For issuers (SMEs and organizations): DE5 helps you tokenize assets to access liquidity without traditional barriers. Interested? I can help you get in touch with our team.",
        investor: "For investors: Explore tokenized asset opportunities on DE5. Our platform offers diversified investment options with blockchain transparency. Want more details? Let's connect.",
        general: "DE5 democratizes finance through AI and blockchain. Learn about our mission, technology, and how we're building a more inclusive ecosystem."
    };

    let audience = 'general'; // default audience

    // Function to add message to chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

        if (!isUser) {
            const avatar = document.createElement('div');
            avatar.className = 'bot-avatar';
            avatar.textContent = 'D';
            messageDiv.appendChild(avatar);
        }

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = content;
        messageDiv.appendChild(messageContent);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to show typing indicator
    function showTyping() {
        typingIndicator.style.display = 'block';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to hide typing indicator
    function hideTyping() {
        typingIndicator.style.display = 'none';
    }

    // Function to simulate AI response
    function getBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();

        // Detect audience
        if (lowerMessage.includes('invest') || lowerMessage.includes('investor')) {
            audience = 'investor';
        } else if (lowerMessage.includes('issuer') || lowerMessage.includes('sme') || lowerMessage.includes('organization')) {
            audience = 'issuer';
        }

        // Check for keywords and respond accordingly
        if (lowerMessage.includes('mission') || lowerMessage.includes('about')) {
            return knowledgeBase.mission;
        } else if (lowerMessage.includes('offering') || lowerMessage.includes('service')) {
            return knowledgeBase.offerings;
        } else if (lowerMessage.includes('whitepaper') || lowerMessage.includes('document')) {
            return knowledgeBase.whitepaper;
        } else if (lowerMessage.includes('tokenomic')) {
            return knowledgeBase.tokenomics;
        } else if (lowerMessage.includes('roadmap')) {
            return knowledgeBase.roadmap;
        } else if (lowerMessage.includes('investor') || audience === 'investor') {
            return knowledgeBase.investor;
        } else if (lowerMessage.includes('issuer') || audience === 'issuer') {
            return knowledgeBase.issuer;
        } else if (lowerMessage.includes('summarize') && lowerMessage.includes('tokenomic')) {
            return "Summary of Tokenomics: DE5 uses a dual-token model with governance tokens for platform decisions and asset tokens representing real-world assets.";
        } else if (lowerMessage.includes('help') || lowerMessage.includes('guide')) {
            return "I can help you with information about DE5's mission, offerings, whitepaper, tokenomics, roadmap, or guide you to relevant sections. What would you like to know?";
        } else {
            return "I'm not sure about that specific detail, but you can check our whitepaper or contact our team for more information. Is there something else I can help with?";
        }
    }

    // Function to handle lead capture
    function promptLeadCapture() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Interested in Learning More?</h3>
                <p>Share your details and our team will follow up!</p>
                <input type="text" id="lead-name" placeholder="Your Name">
                <input type="email" id="lead-email" placeholder="Your Email">
                <input type="text" id="lead-type" placeholder="Type of Inquiry (e.g., Investor, Issuer)">
                <button id="submit-lead">Submit</button>
                <button id="cancel-lead">Cancel</button>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'flex';

        document.getElementById('submit-lead').addEventListener('click', function() {
            const name = document.getElementById('lead-name').value;
            const email = document.getElementById('lead-email').value;
            const type = document.getElementById('lead-type').value;
            if (name && email) {
                addMessage(`Thank you, ${name}! Our team will contact you at ${email} regarding your ${type} inquiry.`, false);
                modal.remove();
            } else {
                alert('Please fill in all fields.');
            }
        });

        document.getElementById('cancel-lead').addEventListener('click', function() {
            modal.remove();
        });
    }

    // Function to send message
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';

            showTyping();

            setTimeout(() => {
                hideTyping();
                const response = getBotResponse(message);
                addMessage(response, false);

                // Check if lead capture should be triggered
                if (message.toLowerCase().includes('interested') || message.toLowerCase().includes('contact') || audience !== 'general') {
                    setTimeout(promptLeadCapture, 1000);
                }
            }, 1500); // Simulate typing delay
        }
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
