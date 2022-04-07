import React, { useState, useEffect, useRef } from "react";
import { Card, Button } from 'react-bootstrap';
import { getSvgPath } from 'figma-squircle';
import { toast } from 'react-toastify';
const axios = require('axios');

function TypographyExtracter(props) {
    const [typography, setTypography] = useState([]);
    const h1 = useRef(null);
    const h2 = useRef(null);
    const h3 = useRef(null);
    const h4 = useRef(null);
    const h5 = useRef(null);
    const h6 = useRef(null);
    useEffect(() => {
        init(props.websiteUrl);
    }, [props.websiteUrl]);
    const init = async (websiteUrl) => {
        const { data } = await axios.get(process.env.REACT_APP_SERVER_ADDRESS + 'typography/', { params: { url: websiteUrl } });
        setTypography(data);
    };
    function rgbToHex(s) {
        const value = s.split('(')[1].split(')')[0].split(', ');
        const hexcode = '#' + value.map((x) => {
            const hex = parseInt(x).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join('');
        return hexcode;
    }
    function numberToFontWeight(w) {
        if (w <= 100) return 'Thin';
        else if (w <= 200) return 'Extra Light';
        else if (w <= 300) return 'Light';
        else if (w <= 400) return 'Normal';
        else if (w <= 500) return 'Medium';
        else if (w <= 600) return 'Semi Bold';
        else if (w <= 700) return 'Bold';
        else if (w <= 800) return 'Extra Bold';
        else if (w <= 900) return 'Ultra Bold';
    }

    function getStyle(element, tag) {
        if (element.current == null) return <Card style={{ color: 'white', backgroundColor: '#282c34', borderColor: 'black', marginRight: 20, marginTop: 10, marginBottom: 10 }}>
            <Card.Body>
                <Card.Title>{tag.toUpperCase()} not found!</Card.Title>
            </Card.Body>
        </Card>;
        const x = window.getComputedStyle(element.current);
        return <Card style={{ color: 'white', backgroundColor: '#282c34', borderColor: 'black', marginRight: 20, marginTop: 10, marginBottom: 10 }}>
            <Card.Body>
                <Card.Title>{tag.toUpperCase()}</Card.Title>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h5 style={{ padding: 10, color: 'white' }}>Size:</h5>
                    <Button className="disabled" variant='dark' style={{ height: 35, width: 75 }}>
                        <h6>{x.getPropertyValue("font-size").replace('px', ' px')}</h6>
                    </Button>
                    <div style={{ display: 'flex', paddingLeft: 10 }}>
                        <svg width="40" height="40">
                            <path d={getSvgPath({
                                width: 40,
                                height: 40,
                                cornerRadius: 13, // defaults to 0
                                cornerSmoothing: 0.1,
                            })} fill={rgbToHex(x.getPropertyValue("color"))} />
                        </svg>
                        <Button variant='dark' style={{ height: 35, width: 90, marginLeft: 5 }} onClick={() => {
                            navigator.clipboard.writeText(rgbToHex(x.getPropertyValue("color")));
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
                            <h6 style={{ color: 'black' }}>{rgbToHex(x.getPropertyValue("color"))}</h6>
                        </Button>
                    </div>
                    <h5 style={{ padding: 10, color: 'white' }}>Weight:</h5>
                    <Button className="disabled" variant='dark' style={{ height: 35, width: 103 }}>
                        <h6>{numberToFontWeight(x.getPropertyValue("font-weight"))}</h6>
                    </Button>
                    <h5 style={{ padding: 10, color: 'white' }}>Letter Spacing:</h5>
                    <Button className="disabled" variant='dark' style={{ height: 35, width: 100 }}>
                        <h6>{x.getPropertyValue("letter-spacing").replace('px', ' px')}</h6>
                    </Button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h5 style={{ padding: 10, color: 'white' }}>Font Family:</h5>
                    <Button className="disabled" variant='dark'>
                        <h6>{x.getPropertyValue("font-family")}</h6>
                    </Button>
                </div>
            </Card.Body>
        </Card>;
    }
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '50%', padding: 20 }}>
                {typography.h1 != null ? <h1 ref={h1} style={{ bottom: 0, top: 0, left: 0, right: 0, position: 'relative', margin: 0, padding: 0 }} className={typography.h1}>Heading 1</h1> : null}
                {typography.h2 != null ? <h2 ref={h2} style={{ bottom: 0, top: 0, left: 0, right: 0, position: 'relative', margin: 0, padding: 0 }} className={typography.h2}>Heading 2</h2> : null}
                {typography.h3 != null ? <h3 ref={h3} style={{ bottom: 0, top: 0, left: 0, right: 0, position: 'relative', margin: 0, padding: 0 }} className={typography.h3}>Heading 3</h3> : null}
                {typography.h4 != null ? <h4 ref={h4} style={{ bottom: 0, top: 0, left: 0, right: 0, position: 'relative', margin: 0, padding: 0 }} className={typography.h4}>Heading 4</h4> : null}
                {typography.h5 != null ? <h5 ref={h5} style={{ bottom: 0, top: 0, left: 0, right: 0, position: 'relative', margin: 0, padding: 0 }} className={typography.h5}>Heading 5</h5> : null}
                {typography.h6 != null ? <h6 ref={h6} style={{ bottom: 0, top: 0, left: 0, right: 0, position: 'relative', margin: 0, padding: 0 }} className={typography.h6}>Heading 6</h6> : null}
            </div>
            <div>
                {typography.h1 != null ? getStyle(h1, 'h1') : null}
                {typography.h2 != null ? getStyle(h2, 'h2') : null}
                {typography.h3 != null ? getStyle(h3, 'h3') : null}
                {typography.h4 != null ? getStyle(h4, 'h4') : null}
                {typography.h5 != null ? getStyle(h5, 'h5') : null}
                {typography.h6 != null ? getStyle(h6, 'h6') : null}
            </div>
        </div>
    );
}


export default TypographyExtracter;

