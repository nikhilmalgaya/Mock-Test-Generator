import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MCQParser = () => {
  
  const [parsedMCQs, setParsedMCQs] = useState([]);

  

  useEffect(() => {
    const fetchMCQs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/mcqs');
        setParsedMCQs(response.data);
      } catch (error) {
        console.error('Error fetching MCQs:', error);
      }
    };
    fetchMCQs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">MCQ Parser</h1>
      <form  className="mb-4">
        
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Parse MCQ
        </button>
      </form>
      <div>
        <h2 className="text-xl font-bold mb-2">Parsed MCQs:</h2>
        {parsedMCQs.map((mcq, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <p className="font-bold">Question {mcq.number}: {mcq.question}</p>
            <ul className="list-disc pl-8">
              {mcq.options.map((option, optIndex) => (
                <li key={optIndex}>
                  {option.letter} {option.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MCQParser;
