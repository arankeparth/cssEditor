import React, { useRef } from 'react';
import './radio.css'; // Import styles for the custom radio button

const RadioButton = ({ name, value, checked, onChange, label }) => {
    const inputRef = useRef(null); // Reference to the actual radio button

    const handleFakeRadioClick = () => {
        if (inputRef.current && !checked) {
            inputRef.current.click(); // Simulate a click on the actual radio button
        }
    };

    return (
        <div className="radio-container flex items-center gap-2">
            <input
                type="radio"
                id={value}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                ref={inputRef} // Attach the ref to the actual radio button
                className="custom-radio"
            />
            <div
                className={`fake-radio ${checked ? "selected" : ""}`}
                onClick={handleFakeRadioClick} // Trigger the simulated click
            ></div>
            <label htmlFor={value} className="radio-label">
                {label}
            </label>
        </div>
    );
};

export default RadioButton;
