import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");

  const change = (event) => {
    setInputText(event.target.value);
  };

  const submitInput = async () => {
    try {
      const response = await fetch("/analyse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: inputText }), 
      });

      const data = await response.json(); 
      setResponseText(data.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resultMap = {
    0 : "Negative 👎",
    1: "Positive 👍"
  };
  const resultText = resultMap[responseText]

  return (
    <div className="App">
      <h1>Sentiment Analyser</h1>

      <input
        type="text"
        value={inputText}
        onChange={change} 
        placeholder="Enter some text"
      />

      <button onClick={submitInput}>Submit text input</button>

      {responseText && <p>Sentiment Analysis Result: {resultText}</p>} 
    </div>
  );
}

export default App;
