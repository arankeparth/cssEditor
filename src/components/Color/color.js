import React, { useEffect, useState } from 'react';
import './color.css'; // Optional: Include if you want to add custom styling

function rgbToHex(rgb) {
    // Extract the numbers from the rgb string
    const match = rgb.match(/\d+/g);
    if (!match || match.length < 3) {
        throw new Error("Invalid rgb() format");
    }

    const [r, g, b] = match.map(Number);

    // Convert to hex and pad with 0 if necessary
    const hex = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;

    return hex.toLowerCase(); // Optional: Convert to uppercase
}



function updateColors({ bgColor, textColor }) {
    var newStyle = {}
    if (bgColor) {
        newStyle = { backgroundColor: bgColor }
    }
    if (textColor) {
        newStyle = { ...newStyle, color: textColor }
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "updateStyle",
                styles: newStyle
            });
        }
    });
}

const ColorPicker = ({ onColorChange, selectedElement }) => {
    const [selectedColorBG, setSelectedColorBG] = useState('#000000'); // 
    const [selectedColorText, setSelectedColorText] = useState('#000000')
    const [bgDisplay, setBgDisplay] = useState("bg-black")
    const [opacity, setOpacity] = useState("1")
    const handleColorChangeBG = (event) => {
        const color = event.target.value;
        setSelectedColorBG(color);
        selectedElement.style.backgroundColor = color
        updateColors({ bgColor: selectedColorBG })
    };
    const handleColorChangeText = (event) => {
        const color = event.target.value;
        setSelectedColorText(color);
        selectedElement.style.color = color
        updateColors({ textColor: selectedColorText })
    };
    const openColorPickerBG = () => {
        document.getElementById('hidden-color-input-bg').click(); // Trigger
    };
    const openColorPickerText = () => {
        document.getElementById('hidden-color-input-text').click(); // Trigger
        console.log("getting here at open color", document.getElementById('hidden-color-input-text'))
    };
    function removeLeadingAndTrailingZeroes(numStr) {
        // Remove leading zeroes but keep "0" if the input is just "0" or "0.x"
        numStr = numStr.replace(/^0+(?!\.|$)/, '');

        // Use regex to remove trailing zeroes from decimal parts
        numStr = numStr.replace(/(\.\d*?[1-9])0+$/g, '$1').replace(/\.0+$/, '');

        return numStr;
    }

    const onOpacityChange = () => {
        
    }

    useEffect(() => {
        console.log(selectedElement.style)
        console.log(selectedElement.style.backgroundColor, selectedElement.style.color)
        if (selectedElement.style.backgroundColor !== "") {
            setSelectedColorBG(rgbToHex(selectedElement.style.backgroundColor))
        } else {
            setSelectedColorBG('#000000')
        }
        if (selectedElement.style.color !== "") {
            setSelectedColorText(rgbToHex(selectedElement.style.color))
        } else {
            setSelectedColorText('#000000')
        }
        if (selectedElement.style.opacity !== "") {
            setOpacity(selectedElement.style.opacity)
            
        } else {
            setOpacity("1")
        }
    }, [])
    return (
        <div>
            <h1 className='mb-2'>Color Scheme</h1>

            <div className='flex gap-4'>
                <div className="color-picker-container bg-white w-[fit-content] p-1">
                    <input
                        id="hidden-color-input-bg"
                        type="color"
                        value={selectedColorBG}
                        onChange={handleColorChangeBG}
                        className="hidden-input"
                    />
                    {/* Proxy color display */}
                    <div
                        className="color-display w-8 h-8 rounded cursor-pointer"
                        style={{ backgroundColor: selectedColorBG }}
                        onClick={openColorPickerBG}
                    ></div>
                    <span className="color-label" >
                        {selectedColorBG}
                    </span>
                </div>
                <div className="color-picker-container bg-white w-[fit-content] p-1">
                    <input
                        id="hidden-color-input-text"
                        type="color"
                        value={selectedColorText}
                        onChange={handleColorChangeText}
                        className="hidden-input"
                    />
                    {/* Proxy color display */}
                    <div
                        className="color-display w-8 h-8 rounded cursor-pointer"
                        style={{ backgroundColor: selectedColorText }}
                        onClick={openColorPickerText}
                    ></div>
                    <span className="color-label">
                        {selectedColorText}
                    </span>
                </div>
                
            </div>
            <h2 className='subt'>opacity</h2>
            <div className="flex items-center justify-center rounded gap-1">
                    <input
                        className="h-4 w-full" // Adjust the width of the slider
                        type="range"
                        min="0"
                        max="100"
                        value={parseFloat(opacity) * 100} // Assuming opacity is a value between 0 and 1
                        onChange={(e) => {
                            e.preventDefault()
                            let value = parseFloat(parseInt(e.target.value)/100)
                            if (parseFloat(value) > 1) {
                                value = 1
                            } else if (value === "") {
                                value = 0
                            }
                            setOpacity(value)
                            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                                if (tabs[0]) {
                                    chrome.tabs.sendMessage(tabs[0].id, {
                                        action: "updateStyle",
                                        styles: {
                                            opacity
                                        }
                                    });
                                }
                            });
                        }} // Convert to a decimal value
                    />
                    <span className="text-center">{(parseFloat(opacity) * 100).toFixed(0)}%</span>
                </div>
        </div>
    );
};

export default ColorPicker;
