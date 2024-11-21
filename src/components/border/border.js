import React, { useState } from 'react';
import './border.css'; // Include this for custom styling if needed

const BorderEditor = ({ onBorderChange }) => {
  const [borderStyle, setBorderStyle] = useState('solid');
  const [borderWidth, setBorderWidth] = useState('1px');
  const [borderColor, setBorderColor] = useState('#000000');
  const [selectedColor, setSelectedColor] = useState('#000000')
  // Handle changes for border style, width, and color
  const handleStyleChange = (event) => {
    setBorderStyle(event.target.value);
    updateBorder();
  };

  const handleWidthChange = (event) => {
    setBorderWidth(event.target.value);
    updateBorder();
  };

  const handleColorChange = (event) => {
    setBorderColor(event.target.value);
    updateBorder();
  };

  const updateBorder = () => {
    onBorderChange && onBorderChange({
      style: borderStyle,
      width: borderWidth,
      color: borderColor,
    });
  };

  const openColorPicker = () => {
    document.getElementById('hidden-color-input-border').click(); // Trigger
};


  return (
    <div>
        <h1 className='mb-2'>Border</h1>
    <div className="border-editor flex">
      

      <div className="border-control w-fit">
        <select value={borderStyle} onChange={handleStyleChange}>
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
          <option value="double">Double</option>
          <option value="groove">Groove</option>
          <option value="ridge">Ridge</option>
          <option value="inset">Inset</option>
          <option value="outset">Outset</option>
          <option value="none">None</option>
        </select>
      </div>

      <div className="border-control w-fit">
        <input
          type="number"
          value={parseInt(borderWidth)}
          min="1"
          max="20"
          onChange={handleWidthChange}
        />
      </div>

      <div className="color-picker-container bg-white w-[fit-content] p-1">
                    <input
                        id="hidden-color-input-border"
                        type="color"
                        value={borderColor}
                        onChange={handleColorChange}
                        className="hidden-input"
                    />
                    {/* Proxy color display */}
                    <div
                        className="color-display w-6 h-6 rounded cursor-pointer"
                        style={{ backgroundColor: borderColor}}
                        onClick={openColorPicker}
                    ></div>
                    <span className="color-label">
                        {borderColor}
                    </span>
                </div>
    </div>
    </div>
  );
};

export default BorderEditor;
