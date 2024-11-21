import React, { useEffect, useRef, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; // Import the spinner
import './prompt.css';
import { getResponse, updateStyle } from './utils';
const StylePrompt = ({ selectedItem }) => {
  // State to manage loading
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [output, setOutPut] = useState(null)
  const curr = useRef("")

  // Function to handle submit action
  const handleSubmit = () => {
    // Set loading to true when an action starts
    setLoading(true);
    getResponse(setOutPut, `give me css code for this description: ${prompt}  use selector #${selectedItem.id} .use flexbox and proper color codes(only if background color or text color in the prompt). give output in the format: {"css" : "
      selector: style
      ", "javascript": "code"}.add required escape sequences. dont embed the output in code block. dont change dimensions of the element`, setLoading)
  };

  useEffect(() => {
    if (output) {
      updateStyle(output.css)
    }
  }, [output])

  return (
    <div className="prompt-box">
      <form onSubmit={handleSubmit}>
      <div className="flex gap-2 items-start justify-between mb-2">
        <button
          className="submit-butt flex items-center"
          onClick={handleSubmit}
          disabled={loading} // Disable button while loading
          type='submit'
        >
          {loading ? <ClipLoader color="#ffffff" loading={loading} size={11} /> : "Edit Style"}
        </button>
      </div>
      <textarea
        className="w-full prompt"
        placeholder="E.g. make background black...."
        value={prompt}
        onChange={(e) => {
          e.preventDefault()
          setPrompt(e.target.value)
        }}
      ></textarea>
      </form>
    </div>
  );
};

export default StylePrompt;
