import React, { useState, useEffect } from "react";
import { ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import { FiDownload } from 'react-icons/fi';
import { HiOutlineZoomIn } from 'react-icons/hi';
import parse from 'html-react-parser';
const axios = require('axios');

function ButtonExtracter(props) {
    const [iconUrls, setIconUrls] = useState([]);
    useEffect(() => {
        init(props.websiteUrl);
    }, [props.websiteUrl]);
    const init = async (websiteUrl) => {
        const { data } = await axios.get(process.env.REACT_APP_SERVER_ADDRESS + 'buttons/', { params: { url: websiteUrl } });
        setIconUrls(data);
    };
    return (
        <div style={{ color: 'white', padding: '2rem' }}>
            <Row className="g-4">
                {iconUrls.map((icon, index) => {
                    return <Col key={index} style={{ padding: '1rem' }}>
                        <div style={{ justifyContent: 'center', display: 'flex' }}>
                            {parse(icon.html)}
                        </div>
                    </Col>;
                })}
            </Row>
        </div>
    );
}


export default ButtonExtracter;

