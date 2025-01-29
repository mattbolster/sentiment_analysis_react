import React, { useState } from 'react';
import './App.css';

function App() {

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'



  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");

  const change = (event) => {
    const value = event.target.value;
    setInputText(value);

    // Clear the result only if the input is completely cleared
    if (value.trim() === "") {
      setResponseText("");
    }
  };

  const submitInput = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/analyse`, {
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
    0: "Negative 👎",
    1: "Positive 👍"
  };
  const resultText = resultMap[responseText]

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <h1 className="text-2xl font-bold text-gray-700">Sentiment Analyser</h1>

      <form
        className="flex w-full max-w-sm space-x-3"
        onSubmit={submitInput}
      >
        <input
          className="flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          type="text"
          value={inputText}
          onChange={change}
          placeholder="Enter some text"
        />
        <button
          className="flex-shrink-0 bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 transform motion-safe:hover:scale-105"
          type="submit"
        >
          Submit
        </button>
      </form>


      <div className="w-full max-w-sm bg-gray-100 p-4 rounded-lg shadow-md text-center mx-auto">
        <p className="text-lg font-semibold text-gray-800">
          Sentiment Analysis Result:
        </p>
        <p className="text-xl font-bold text-purple-700">{resultText || "..."}</p>
      </div>
    </div>
  );
}

export default App;
