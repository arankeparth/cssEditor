import React, { useState, useEffect } from 'react';
import './font.css'; // Optional: Include if you want to add custom styling
import WebFont from 'webfontloader'; // Import the WebFont loader

const FontSelector = ({ onFontChange }) => {
  const fonts = [
    'Arial', 'Verdana', 'Times New Roman', 'Georgia',
    'Courier New', 'Roboto', 'Lato', 'Montserrat',
    'Open Sans', 'Oswald', 'Raleway', 'Merriweather',
    'Playfair Display', 'Noto Sans', 'Poppins', 'Ubuntu',
    'Dancing Script', 'Pacifico', 'Source Sans Pro', 'Titillium Web',
  ];
  const weights = [
    { label: 'Light', value: '300' },
    { label: 'Normal', value: '400' },
    { label: 'Bold', value: '700' },
  ];
  const fontSizes = [
    '8px', '10px', '12px', '14px', '16px', '18px',
    '20px', '24px', '28px', '32px', '36px', '40px',
  ];
  const lineHeights = [
    '1.0', '1.2', '1.4', '1.6', '1.8', '2.0', '2.4', '2.8', '3.0',
  ];

  // State to manage the selected line height
  const [selectedLineHeight, setSelectedLineHeight] = useState(lineHeights[2]); // Default: 1.4

  const [selectedFont, setSelectedFont] = useState('');
  const [selectedWeight, setSelectedWeight] = useState(weights[1].value);
  const [selectedFontSize, setSelectedFontSize] = useState(fontSizes[4]);

  // Fetch fonts from the API (e.g., Google Fonts API)
 

  // Handle font change
  const handleFontChange = (event) => {
    const font = event.target.value;
    setSelectedFont(font);
    onFontChange && onFontChange({ font, weight: selectedWeight, size: selectedFontSize });
  };

  // Handle weight change
  const handleWeightChange = (event) => {
    const weight = event.target.value;
    setSelectedWeight(weight);
    onFontChange && onFontChange({ font: selectedFont, weight, size: selectedFontSize });
  };

  // Handle font size change
  const handleFontSizeChange = (event) => {
    const size = event.target.value;
    setSelectedFontSize(size);
    onFontChange && onFontChange({ font: selectedFont, weight: selectedWeight, size });
  };

   // Handle line height change
   const handleLineHeightChange = (event) => {
    const lineHeight = event.target.value;
    setSelectedLineHeight(lineHeight);
  };

  return (
    <div>
      <h1 className="mb-2">Typography</h1>
      <div className="font-selector-container">
        <select className="font-dropdown w-[80%]" value={selectedFont} onChange={handleFontChange}>
          {fonts.map((font, index) => (
            <option key={index} value={font} style={{
                fontFamily: font}} onClick={() => {
                    WebFont.load({
                        google: {
                          families: [font], // Load the specific font
                        },
                      });
                }}>
            {font}
              
            </option>
          ))}
        </select>
        <select className="weight-dropdown w-50" value={selectedWeight} onChange={handleWeightChange}>
          {weights.map((weight, index) => (
            <option key={index} value={weight.value}>
              {weight.label}
            </option>
          ))}
        </select>
        <select className="size-dropdown" value={selectedFontSize} onChange={handleFontSizeChange}>
          {fontSizes.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
        <div className='flex'>
            <div className='flex flex-col'>
            <h2 className='subt'>line height</h2>
            <select
          className="line-height-dropdown"
          value={selectedLineHeight}
          onChange={handleLineHeightChange}
        >
          {lineHeights.map((lineHeight, index) => (
            <option key={index} value={lineHeight}>
              {lineHeight}
            </option>
          ))}
        </select>
            </div>
        </div>
    </div>
  );
};

export default FontSelector;

