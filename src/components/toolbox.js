import React, { useRef, useState } from 'react';
import "./toolbox.css"
import StylePrompt from './Prompt/stylePrompt';
import AddPrompt from './Prompt/addPrompt';
import Align from './Align/align';
import ColorPicker from './Color/color';
import FontSelector from './Font/font';
import BorderEditor from './border/border';
import { useEffect } from 'react';
import clickHandler from './utils';
// Sample toolbox items
const toolboxItems = [
  { id: 1, name: 'Tool 1', description: 'This is Tool 1' },
  { id: 2, name: 'Tool 2', description: 'This is Tool 2' },
  { id: 3, name: 'Tool 3', description: 'This is Tool 3' },
];


function init(setSelectedElement) {
  // Sending a message to retrieve data
chrome.runtime.sendMessage({ action: "getSelected" }, (response) => {
  if (response.status === "success") {
    console.log("Retrieved data:", response.data);
    const nodeData = response.data
    const reconstructedElement = document.createElement(nodeData.tagName);

    // Apply attributes
    nodeData.attributes.forEach(attr => {
      reconstructedElement.setAttribute(attr.name, attr.value);
    });
    console.log(nodeData.style, nodeData.id)
    // Apply styles
    reconstructedElement.style.cssText = nodeData.styles;
    // Set innerHTML
    reconstructedElement.innerHTML = nodeData.innerHTML;
    reconstructedElement.id = nodeData.id
    setSelectedElement(reconstructedElement)
  } else if (response.status === "not_found") {
    console.log("No data found.");
  } else {
    console.error("Error retrieving data:", response.error);
  }
});

}


const Toolbox = () => {
  const [selectedElement, setSelectedElement] = useState(null)
  const moverRef = useRef(null)
  useEffect(() => {
    init(setSelectedElement)
    // Define the event handler
  }, [moverRef]);
  return (
    <div className="toolbar bg-[#BED6DA] w-[20rem] p-[1rem] flex flex-col gap-2" id="panel">
      {
        selectedElement && <>
        
        <StylePrompt selectedItem={selectedElement}></StylePrompt>
      <AddPrompt selectedItem={selectedElement}></AddPrompt>
      <Align selectedItem={selectedElement}></Align>
      <ColorPicker selectedElement={selectedElement}></ColorPicker>
      <FontSelector></FontSelector>
      <BorderEditor></BorderEditor></>
      }
    </div>
  );
};

export default Toolbox;
