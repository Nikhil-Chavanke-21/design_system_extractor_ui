import React, { useState, useEffect } from "react";
import { ButtonGroup, Button, Row, Col, Card } from 'react-bootstrap';
import { FiDownload } from 'react-icons/fi';
import { MdInvertColors } from 'react-icons/md';
import { HiOutlineZoomIn } from 'react-icons/hi';
const axios = require('axios');

function ImageExtracter(props) {
  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    init(props.websiteUrl);
  }, [props.websiteUrl]);
  const init = async (websiteUrl) => {
    const { data } = await axios.get(process.env.REACT_APP_SERVER_ADDRESS + 'images/', { params: { url: websiteUrl } });
    setImageUrls(data);
  };
  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      <Row id='row' xs={2} md={4} className="g-4">
        {imageUrls.map((image, index) => {
          let data = image.split('.')[image.split('.').length - 1];
          let type = data.split('?')[0];
          return <Col key={index}>
            <Card bg="dark" style={{ padding: '0.5rem' }}>
              <div style={{ height: '11rem', alignContent: 'center', display: 'flex' }}>
                <Card.Img variant="top" src={image} style={{ objectFit: 'contain', backgroundColor: '#282c34' }} />
              </div>
              <Card.Body>
                <div>
                  <ButtonGroup style={{ paddingRight: '4rem' }}>
                    <Button variant='dark'><MdInvertColors /></Button>
                    <Button variant='success' href={image} download target="_blank"><HiOutlineZoomIn /></Button>
                    <Button variant='primary' onClick={() => {
                      axios({
                        url: image,
                        method: 'GET',
                        responseType: 'blob'
                      })
                        .then((response) => {
                          const url = window.URL
                            .createObjectURL(new Blob([response.data]));
                          const link = document.createElement('a');
                          link.href = url;
                          link.setAttribute('download', 'image.jpg');
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        });
                    }}><FiDownload /></Button>
                  </ButtonGroup>
                  {type}
                </div>
              </Card.Body>
            </Card>
          </Col>;
        })}
      </Row>
    </div >
  );
}

export default ImageExtracter;
