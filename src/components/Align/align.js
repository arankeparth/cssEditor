import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; // Import the spinner
import './align.css';
import RadioButton from '../Radio/radio';

function updateStyle(style) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "updateStyle",
                styles: style
            });
        }
    });
}

const Align = ({ selectedItem }) => {
    const [alignVertical, setAlignVertical] = useState(null);
    const [alignHori, setAlignHori] = useState(null);
    const [flexDirection, setFlexDirection] = useState("row");
    const [flexWrap, setFlexWrap] = useState("nowrap");
    useEffect(() => {
        if (selectedItem.style.display === "flex") {
            setFlexDirection(selectedItem.style.flexDirection || "row");
            setFlexWrap(selectedItem.style.flexWrap || "nowrap");

            if (selectedItem.style.flexDirection === "column") {
                setAlignVertical(selectedItem.style.alignItems);
                setAlignHori(selectedItem.style.justifyContent);
            } else {
                setAlignVertical(selectedItem.style.justifyContent);
                setAlignHori(selectedItem.style.alignItems);
            }
        }
    }, []);
    return (
        <div>
            <h1 className='mb-2'>Alignment</h1>
            <div className='flex justify-between mb-2'>
                <div className='align-box flex'>
                    <div className={`h-8 w-10 bg-white flex items-center justify-center align first ${alignVertical === "start" ? "border-solid border-2 border-blue-500" : ""
                        }`} onClick={(e) => {
                            if (selectedItem.style.display === "flex" && selectedItem.style.flexDirection === "row") {
                                updateStyle({
                                    justifyContent: "start"
                                })
                            } else if (selectedItem.style.flexDirection === "column") {
                                updateStyle({
                                    alignItems: "start"
                                })
                            } else {
                                updateStyle({
                                    display: "flex",
                                    justifyContent: "start"
                                })
                            }
                            setAlignVertical("start")
                        }}>
                        <img src='https://img.icons8.com/?size=100&id=2955&format=png&color=000000' className='align-left h-5 w-5'></img>
                    </div>
                    <div className={`h-8 w-10 bg-white flex items-center justify-center align ${alignVertical === "center" ? "border-solid border-2 border-blue-500" : ""
                        }`} onClick={(e) => {
                            if (selectedItem.style.display === "flex" && selectedItem.style.flexDirection === "row") {
                                updateStyle({
                                    justifyContent: "center"
                                })
                            } else if (selectedItem.style.flexDirection === "column") {
                                updateStyle({
                                    alignItems: "center"
                                })
                            } else {
                                updateStyle({
                                    display: "flex",
                                    justifyContent: "center"
                                })
                            }
                            setAlignVertical("center")
                        }}>
                        <img src='https://img.icons8.com/?size=100&id=2846&format=png&color=000000' className='h-5 w-5 align-center'></img>
                    </div>
                    <div className={`h-8 w-10 bg-white flex items-center justify-center align ${alignVertical === "end" ? "border-solid border-2 border-blue-500" : ""
                        } last`} onClick={(e) => {
                            if (selectedItem.style.display === "flex" && selectedItem.style.flexDirection === "row") {
                                updateStyle({
                                    justifyContent: "end"
                                })
                            } else if (selectedItem.style.flexDirection === "column") {
                                updateStyle({
                                    alignItems: "end"
                                })
                            } else {
                                updateStyle({
                                    display: "flex",
                                    justifyContent: "end"
                                })
                            }
                            setAlignVertical("end")

                        }}>
                        <img src='https://img.icons8.com/?size=100&id=2761&format=png&color=000000' className='h-5 w-5 align-right'></img>
                    </div>
                </div>
                <div className='align-box flex'>
                    <div className={`h-8 w-10 bg-white flex items-center justify-center align ${alignHori === "start" ? "border-solid border-2 border-blue-500" : ""
                        } first`} onClick={(e) => {
                            if (selectedItem.style.display === "flex" && selectedItem.style.flexDirection === "row") {
                                updateStyle({
                                    alignItems: "start"
                                })
                            } else if (selectedItem.style.flexDirection === "column") {
                                updateStyle({
                                    justifyContent: "start"
                                })
                            } else {
                                updateStyle({
                                    display: "flex",
                                    alignItems: "start"
                                })
                            }
                            setAlignHori("start")
                        }}>
                        <img src='https://img.icons8.com/?size=100&id=31573&format=png&color=000000' className='h-5 w-5 align-top'></img>
                    </div>
                    <div className={`h-8 w-10 bg-white flex items-center justify-center align  ${alignHori === "center" ? "border-solid border-2 border-blue-500" : ""
                        }`} onClick={(e) => {
                            if (selectedItem.style.display === "flex" && selectedItem.style.flexDirection === "row") {
                                updateStyle({
                                    alignItems: "center"
                                })
                            } else if (selectedItem.style.flexDirection === "column") {
                                updateStyle({
                                    justifyContent: "center"
                                })
                            } else {
                                updateStyle({
                                    display: "flex",
                                    alignItems: "center"
                                })
                            }
                            setAlignHori("center")
                        }}>
                        <img src='https://img.icons8.com/?size=100&id=otY58UOWtvzI&format=png&color=000000' className='h-5 w-5 align-hori'></img>
                    </div>
                    <div className={`h-8 w-10 bg-white flex items-center justify-center align ${alignHori === "end" ? "border-solid border-2 border-blue-500" : ""
                        } last`} onClick={(e) => {
                            if (selectedItem.style.display === "flex" && selectedItem.style.flexDirection === "row") {
                                updateStyle({
                                    alignItems: "end"
                                })
                            } else if (selectedItem.style.flexDirection === "column") {
                                updateStyle({
                                    justifyContent: "end"
                                })
                            } else {
                                updateStyle({
                                    display: "flex",
                                    alignItems: "end"
                                })
                            }
                            setAlignHori("end")
                        }}>
                        <img src='https://img.icons8.com/?size=100&id=35529&format=png&color=000000' className='h-5 w-5 align-bottom'></img>
                    </div>
                </div>
            </div>
            <div className='flex justify-between'>
                <div className='align-box flex'>
                    <div className={`h-8 w-10 bg-white flex items-center justify-center align ${alignVertical === "space-between" ? "border-solid border-2 border-blue-500" : ""
                        } first`} onClick={(e) => {
                            if (selectedItem.style.display === "flex" && selectedItem.style.flexDirection === "row") {
                                updateStyle({
                                    justifyContent: "space-between"
                                })
                            } else if (selectedItem.style.flexDirection === "column") {
                                updateStyle({
                                    alignItems: "space-between"
                                })
                            } else {
                                updateStyle({
                                    display: "space-between",
                                    justifyContent: "space-between"
                                })
                            }
                            setAlignVertical("space-between")
                        }}>
                        <img src='https://img.icons8.com/?size=100&id=p4C3ggHIJ2u5&format=png&color=000000' className='align-left h-5 w-5'></img>
                    </div>
                    <div className={`h-8 w-10 bg-white flex items-center justify-center align ${alignVertical === "space-around" ? "border-solid border-2 border-blue-500" : ""
                        } last`} onClick={(e) => {
                            if (selectedItem.style.display === "flex" && selectedItem.style.flexDirection === "row") {
                                updateStyle({
                                    justifyContent: "space-around"
                                })
                            } else if (selectedItem.style.flexDirection === "column") {
                                updateStyle({
                                    alignItems: "space-around"
                                })
                            } else {
                                updateStyle({
                                    display: "flex",
                                    justifyContent: "space-around"
                                })
                            }
                            setAlignVertical("space-around")
                        }}>
                        <img src='https://cdn.icon-icons.com/icons2/3251/PNG/512/align_space_around_horizontal_regular_icon_204076.png' className='h-5 w-5 align-center'></img>
                    </div>
                </div>
                <div className='align-box flex'>
                    <div className={`h-8 w-10 bg-white flex items-center justify-center align ${alignHori === "space-between" ? "border-solid border-2 border-blue-500" : ""
                        } first`} onClick={(e) => {
                            if (selectedItem.style.display === "flex" && selectedItem.style.flexDirection === "row") {
                                updateStyle({
                                    alignItems: "space-between"
                                })
                            } else if (selectedItem.style.flexDirection === "column") {
                                updateStyle({
                                    justifyContent: "space-between"
                                })
                            } else {
                                updateStyle({
                                    display: "flex",
                                    alignItems: "space-between"
                                })
                            }
                            setAlignHori("space-between")
                        }}>
                        <img src='https://img.icons8.com/?size=100&id=p4C3ggHIJ2u5&format=png&color=000000' className='h-5 w-5 align-top' style={{
                            transform: "rotate(90deg)"
                        }}></img>
                    </div>
                    <div className={`h-8 w-10 bg-white flex items-center justify-center align ${alignHori === "space-around" ? "border-solid border-2 border-blue-500" : ""
                        } last`} onClick={(e) => {
                            if (selectedItem.style.display === "flex" && selectedItem.style.flexDirection === "row") {
                                updateStyle({
                                    alignItems: "space-around"
                                })
                            } else if (selectedItem.style.flexDirection === "column") {
                                updateStyle({
                                    justifyContent: "space-around"
                                })
                            } else {
                                updateStyle({
                                    display: "flex",
                                    alignItems: "space-around"
                                })
                            }
                            setAlignHori("space-around")
                        }}>
                        <img src='https://cdn.icon-icons.com/icons2/3251/PNG/512/align_space_around_vertical_regular_icon_204075.png' className='h-5 w-5 align-hori'></img>
                    </div>
                </div>
            </div>
            <div className='mb-1 mt-1'>
                <h2 className='subt'>Direction</h2>
                <div className='flex gap-4 gap-y-2 flex-wrap'>
                    {["row", "column", "row-reverse", "column-reverse"].map((direction) => (
                        <RadioButton
                name="flexDirection"
                value={direction}
                checked={flexDirection === direction}
                onChange={() =>{
                    updateStyle({
                        display: "flex",
                        flexDirection: direction
                    })
                    setFlexDirection(direction)
                    selectedItem.style.flexDirection = direction 
                }
            }
                label={direction}
            />
                    ))}
                </div>
            </div>
            <div className='mb-2'>
                <h2 className='subt'>Wrap</h2>
                <div className='flex gap-4 gap-y-2 flex-wrap'>
                    {["nowrap", "wrap", "wrap-reverse"].map((wrap) => (
                        // <label key={wrap} className='flex items-center gap-2'>
                        //     <input
                        //         type="radio"
                        //         name="flexWrap"
                        //         value={wrap}
                        //         checked={flexWrap === wrap}
                            //     onChange={() =>{
                            //         updateStyle({
                            //             display: "flex",
                            //             flexWrap: wrap
                            //         })
                            //         setFlexWrap(wrap)
                            //         selectedItem.style.flexWrap = wrap 
                            //     }
                            // }
                        //     />
                        //     <h2 className='subt ml-2'>{wrap}</h2>
                        // </label>
                        <RadioButton
                name="flexWrap"
                value={wrap}
                checked={flexWrap === wrap}
                onChange={() =>{
                    updateStyle({
                        display: "flex",
                        flexWrap: wrap
                    })
                    setFlexWrap(wrap)
                    selectedItem.style.flexWrap = wrap 
                }
            }
                label={wrap}
            />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Align