import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [userInput, setUserInput] = useState('');
    const [chatLog, setChatLog] = useState([]);

    const sendQuery = async () => {
        if (!userInput) return;

        const userMessage = { type: 'user', text: userInput };
        setUserInput('');
        setChatLog([...chatLog, userMessage]);

        try {
            const response = await axios.post('https://ai-chatbot-xzut.onrender.com/ask', {
                query: userInput,
            });

            const botMessage = { type: 'bot', text: response.data.response };
            setChatLog([...chatLog, userMessage, botMessage]);
        } catch (error) {
            console.error('Error:', error.message);
            const errorMessage = { type: 'bot', text: 'Sorry, there was an error processing your request.' };
            setChatLog([...chatLog, userMessage, errorMessage]);
        }

    };

    return (
        <div className="chatbot-container">
            <div className="chat-log">
                {chatLog.map((entry, index) => (
                    <div key={index} className={`chat-entry ${entry.type}`}>
                        {entry.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && sendQuery()}
                placeholder="Type your message..."
            />
            <button onClick={sendQuery}>Send</button>
        </div>
    );
};

export default Chatbot;
