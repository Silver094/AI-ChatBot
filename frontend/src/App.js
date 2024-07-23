import React from 'react';
import './App.css';
import Chatbot from './Chatbot';
import './Chatbot.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>AI Chatbot</h1>
                <div className='chat'>
                <Chatbot />
                </div>
            </header>
        </div>
    );
}

export default App;
