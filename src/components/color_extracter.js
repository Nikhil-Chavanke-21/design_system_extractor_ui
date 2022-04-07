import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { getSvgPath } from 'figma-squircle'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios');

function ColorExtracter(props) {
    const [colors, setColors] = useState([]);
    useEffect(() => {
        init(props.websiteUrl);
    }, [props.websiteUrl]);
    const init = async (websiteUrl) => {
        const { data } = await axios.get(process.env.REACT_APP_SERVER_ADDRESS + 'colors/', { params: { url: websiteUrl } });
        setColors(data);
    };
    return (
        <div style={{ display: 'flex', paddingLeft: 20, paddingTop: 10, paddingRight: 20 }}>
            {Object.keys(colors).map((tag) => {
                return <div key={tag} style={{ width: 170, wordBreak: 'break-all' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h4 style={{ color: 'white' }}>{tag.replace('-', ' ')}</h4>
                    </div>
                    {colors[tag].map((color) => {
                        return <div key={color.hexcode} style={{ display: 'flex', paddingBottom: 5, paddingLeft: 10, height: 50 }}>
                            <svg width="40" height="40" style={{ position: "absolute" }}>
                                <path d={getSvgPath({
                                    width: 40,
                                    height: 40,
                                    cornerRadius: 13, // defaults to 0
                                    cornerSmoothing: 0.1, // cornerSmoothing goes from 0 to 1
                                })} fill={color.hexcode} />
                            </svg>
                            <div style={{ position: 'absolute', marginLeft: 26, marginTop: 22 }}>
                                <svg width="18" height="18">
                                    <path d={getSvgPath({
                                        width: 18,
                                        height: 18,
                                        cornerRadius: 9, // defaults to 0
                                        cornerSmoothing: 0.1, // cornerSmoothing goes from 0 to 1
                                    })} fill='#282c34' />
                                </svg>
                            </div>
                            <div style={{ position: 'absolute', marginLeft: 31, marginTop: 28 }}>
                                <p style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{color.count}</p>
                            </div>
                            <div style={{ position: 'absolute', marginLeft: 50 }}>
                                <Button variant='dark' style={{ height: 35 }} onClick={() => {
                                    navigator.clipboard.writeText(color.hexcode);
                                    toast('Copied to Clipboard!', {
                                        position: "bottom-center",
                                        type: 'success',
                                        autoClose: 2000,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                    });
                                    return;
                                }}>
                                    <h6 style={{ color: 'white' }}>{color.hexcode}</h6>
                                </Button>
                            </div>
                        </div>;
                    })}
                </div>;
            })}
        </div>
    );
}


export default ColorExtracter;

