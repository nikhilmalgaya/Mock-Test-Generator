import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import MCQParser from './parse';  
import axios from 'axios';

let Mcqtext="no text"

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/parse-mcq', { Mcqtext });
      setParsedMCQs(response.data);
    } catch (error) {
      console.error('Error parsing MCQ:', error);
    }
  };



function TextExtractor() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const handleImageUpload = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const extractText = () => {
    setLoading(true);
    Tesseract.recognize(
      image,
      'eng',
      {
        logger: (m) => console.log(m), // Log progress
      }
    ).then(({ data: { text } }) => {
      console.log('Extracted Text:', text);
      Mcqtext = text;
      // handleSubmit;
      
      setLoading(false);
    }).catch((err) => {
      console.error('Error during text recognition:', err);
      setLoading(false);
    });
  };


  return (
    <div className="text-extractor">
      <h1>Text Extraction from Image</h1>
      <input type="file" onChange={handleImageUpload} />
      {image && (
        <>
          <img src={image} alt="Uploaded" style={{ width: '300px' }} />
          <button onClick={extractText}>Extract Text</button>
          <MCQParser />
        </>
      )}
      {loading && <p>Processing...</p>}
      
    </div>
  );
};

export default TextExtractor;
