# DE5 Chat Assistant - Python Implementation
# A simple CLI-based chat assistant for DE5, demonstrating the same functionality as the web version

import time
import random

class DE5ChatAssistant:
    def __init__(self):
        self.audience = 'general'  # default audience
        self.knowledge_base = {
            'mission': "DE5 is building an AI and blockchain-powered tokenization platform that democratizes capital access, creates liquidity, and supports a more inclusive financial ecosystem.",
            'offerings': "Our platform enables SMEs and organizations to tokenize assets for better liquidity, while providing investors with new opportunities in tokenized assets.",
            'whitepaper': "The DE5 whitepaper outlines our tokenomics, roadmap, platform mechanics, and business model. Key points include our AI-driven tokenization process and blockchain security.",
            'tokenomics': "DE5's tokenomics involve a dual-token system: DE5 tokens for governance and utility, and asset-specific tokens for tokenized assets.",
            'roadmap': "Our roadmap includes Phase 1: Platform launch, Phase 2: AI enhancements, Phase 3: Global expansion.",
            'issuer': "For issuers (SMEs and organizations): DE5 helps you tokenize assets to access liquidity without traditional barriers. Interested? I can help you get in touch with our team.",
            'investor': "For investors: Explore tokenized asset opportunities on DE5. Our platform offers diversified investment options with blockchain transparency. Want more details? Let's connect.",
            'general': "DE5 democratizes finance through AI and blockchain. Learn about our mission, technology, and how we're building a more inclusive ecosystem."
        }

    def get_response(self, user_message):
        lower_message = user_message.lower()

        # Detect audience
        if 'invest' in lower_message or 'investor' in lower_message:
            self.audience = 'investor'
        elif 'issuer' in lower_message or 'sme' in lower_message or 'organization' in lower_message:
            self.audience = 'issuer'

        # Keyword matching
        if 'mission' in lower_message or 'about' in lower_message:
            return self.knowledge_base['mission']
        elif 'offering' in lower_message or 'service' in lower_message:
            return self.knowledge_base['offerings']
        elif 'whitepaper' in lower_message or 'document' in lower_message:
            return self.knowledge_base['whitepaper']
        elif 'tokenomic' in lower_message:
            return self.knowledge_base['tokenomics']
        elif 'roadmap' in lower_message:
            return self.knowledge_base['roadmap']
        elif 'investor' in lower_message or self.audience == 'investor':
            return self.knowledge_base['investor']
        elif 'issuer' in lower_message or self.audience == 'issuer':
            return self.knowledge_base['issuer']
        elif 'summarize' in lower_message and 'tokenomic' in lower_message:
            return "Summary of Tokenomics: DE5 uses a dual-token model with governance tokens for platform decisions and asset tokens representing real-world assets."
        elif 'help' in lower_message or 'guide' in lower_message:
            return "I can help you with information about DE5's mission, offerings, whitepaper, tokenomics, roadmap, or guide you to relevant sections. What would you like to know?"
        else:
            return "I'm not sure about that specific detail, but you can check our whitepaper or contact our team for more information. Is there something else I can help with?"

    def simulate_typing(self):
        print("DE5 is typing...", end="", flush=True)
        time.sleep(random.uniform(1, 2))  # Random delay between 1-2 seconds
        print("\r" + " " * 20 + "\r", end="")  # Clear the typing message

    def prompt_lead_capture(self):
        print("\nInterested in Learning More?")
        print("Share your details and our team will follow up!")
        name = input("Your Name: ")
        email = input("Your Email: ")
        inquiry_type = input("Type of Inquiry (e.g., Investor, Issuer): ")
        if name and email:
            print(f"Thank you, {name}! Our team will contact you at {email} regarding your {inquiry_type} inquiry.")
        else:
            print("Please provide both name and email.")

    def run(self):
        print("Hello! I'm the DE5 Chat Assistant.")
        print("How can I help you today? You can ask about our mission, offerings, whitepaper, or anything related to democratizing capital access through tokenization.")
        print("Type 'quit' to exit.\n")

        while True:
            user_input = input("You: ")
            if user_input.lower() == 'quit':
                print("Goodbye! Thanks for chatting with DE5.")
                break

            self.simulate_typing()
            response = self.get_response(user_input)
            print(f"DE5: {response}")

            # Check if lead capture should be triggered
            if 'interested' in user_input.lower() or 'contact' in user_input.lower() or self.audience != 'general':
                self.prompt_lead_capture()

if __name__ == "__main__":
    assistant = DE5ChatAssistant()
    assistant.run()
