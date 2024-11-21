import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; // Import the spinner
import './prompt.css';
import RadioButton from '../Radio/radio';
import { getResponse } from './utils';

import { useRef } from 'react';
function sendData(data) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "injectData", data });
    }
  });
}

const AddPrompt = ({selectedItem}) => {
  // State to manage loading
  const [isDone, setIsDone] = useState(false)
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("document"); // State for the radio buttons
  const [prompt, setPrompt] = useState("");
  const [output, setOutPut] = useState(null)
  // Function to handle submit action
  const handleSubmit = () => {
    // Set loading to true when an action starts
    setLoading(true);
    setIsDone(false)
    (
      async function  () {
        const resp = await getResponse(setOutPut, `give me html, css and javascript code considering prompt: ${prompt}. the current structure of element is: ${selectedItem.innerHTML} and styling is: ${selectedItem.cssText}. give only new code. give the output in format '{"html": "html code", "css": "css code", "js": "js code" }' only and dont give anything else. dont embed output in codeblock. also add proper escape sequences in the html, css and js code strings so the output can be parsed into a json object.`, setLoading)
        sendData(resp)
      }()
    )
    
  };

  // useEffect(()=>{
  //   if (output && !isDone) {
  //     setIsDone(true)
  //     console.log(output)
  //   }
  // },[output])


  return (
    <div className="prompt-box">
      <div className="flex gap-2 items-center justify-between mb-2">
        <button 
          className="submit-butt flex items-center" 
          onClick={handleSubmit}
          disabled={loading} // Disable button while loading
        >
          {loading ?  <ClipLoader color="#ffffff" loading={loading} size={11} /> : "Add New"}
        </button>
        <div className="radio-buttons flex gap-2 items-center">
          <label className="text-white">
            {/* <input
              type="radio"
              value="current"
              checked={selectedOption === "current"}
              onChange={() => setSelectedOption("current")}
              className="mr-1"
            /> */}
            <RadioButton value="current" onChange={() => setSelectedOption("current")} label="Current" checked={selectedOption === "current"}></RadioButton>
          </label>
          <label className="text-white ml-3">
            {/* <input
              type="radio"
              value="document"
              checked={selectedOption === "document"}
              onChange={() => setSelectedOption("document")}
              className="mr-1"
            /> */}
            <RadioButton value="document" label="Document" onChange={() => setSelectedOption("document")} checked={selectedOption === "document"}></RadioButton>
          </label>
        </div>
      </div>
      <textarea
        className="w-full prompt"
        placeholder="E.g. Add a login form..."
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value)
        }}
      ></textarea>
    </div>
  );
};

export default AddPrompt;
