import React, { useState, useEffect } from "react";
import { ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import { FiDownload } from 'react-icons/fi';
import { MdInvertColors } from 'react-icons/md';
import parse from 'html-react-parser';
const axios = require('axios');

function IconExtracter(props) {
    const [iconUrls, setIconUrls] = useState([]);
    useEffect(() => {
        init(props.websiteUrl);
    }, [props.websiteUrl]);
    const init = async (websiteUrl) => {
        const { data } = await axios.get(process.env.REACT_APP_SERVER_ADDRESS + 'icons/', { params: { url: websiteUrl } });
        setIconUrls(data);
    };

    function downloadSVG(html) {
        const blob = new Blob([html], { type: "image/svg+xml" });

        const objectUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = `icon.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div style={{ color: 'white', padding: '2rem' }}>
            <Row className="g-4">
                {iconUrls.map((icon, index) => {
                    return <Col key={index} style={{ padding: '1rem' }}>
                        <div style={{ width: '6rem', height: '4rem', justifyContent: 'center', display: 'flex' }}>
                            {parse(icon.html)}
                        </div>
                        <ButtonGroup>
                            <Button variant='dark'><MdInvertColors /></Button>
                            <Button variant='primary' onClick={() => { downloadSVG(icon.html); }}><FiDownload /></Button>
                        </ButtonGroup>
                    </Col>;
                })}
            </Row>
        </div>
    );
}


export default IconExtracter;

