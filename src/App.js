import ImageExtracter from './components/image_extracter';
import IconExtracter from './components/icon_extracter';
import TypographyExtracter from './components/typography_extracter';
import ColorExtracter from './components/color_extracter';
import ButtonExtracter from './components/button_extracter';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from "react";
import { BiLink } from 'react-icons/bi';
import { ToastContainer } from 'react-toastify';
import {
  Navbar,
  Nav,
  Container,
  ButtonGroup,
  ButtonToolbar,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
const axios = require('axios');

function App() {
  const [style, setStyle] = useState('');
  const [url, setUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const images = useRef(null);
  const icons = useRef(null);
  const typography = useRef(null);
  const colors = useRef(null);
  const buttons = useRef(null);

  function toggleView(index) {
    let views = [images, icons, buttons, typography, colors];
    for (let i = 0; i < views.length; i++) {
      if (views[i].current != null) views[i].current.style.width = 0;
      if (views[i].current != null) views[i].current.style.visibility = 'hidden';
    }
    if (views[index].current != null) views[index].current.style.width = '100%';
    if (views[index].current != null) views[index].current.style.visibility = 'visible';
  };
  return (
    <div>
      <style>{style}</style>
      <div style={{ background: '#282c34' }}>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
          integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
          crossOrigin="anonymous"
        />
        <div style={{ padding: '3rem', height: '12rem', color: 'white', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <h1>Design System Extracter</h1>
          <ButtonToolbar>
            <InputGroup style={{ width: '25rem' }}>
              <InputGroup.Text><BiLink /></InputGroup.Text>
              <FormControl type="text" placeholder="Website URL" onChange={(e) => { setUrl(e.target.value); }} />
            </InputGroup>
            <ButtonGroup style={{ paddingLeft: '0.5rem' }}>
              <Button variant="primary" onClick={async () => {
                const { data } = await axios.get(process.env.REACT_APP_SERVER_ADDRESS + 'style/', { params: { url: url } });
                setStyle(data);
                setWebsiteUrl(url);
              }}>Extract</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Nav>
              <Nav.Link onClick={() => { toggleView(0); }}>Images</Nav.Link>
              <Nav.Link onClick={() => { toggleView(1); }}>Icons</Nav.Link>
              <Nav.Link onClick={() => { toggleView(2); }}>Buttons</Nav.Link>
              <Nav.Link onClick={() => { toggleView(3); }}>Typography</Nav.Link>
              <Nav.Link onClick={() => { toggleView(4); }}>Colors</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <ToastContainer />
        <div style={{ display: 'flex' }}>
          <div ref={images} style={{ width: '100%' }}>
            <ImageExtracter websiteUrl={websiteUrl}></ImageExtracter>
          </div>
          <div ref={icons} style={{ width: 0, visibility: 'hidden' }}>
            <IconExtracter websiteUrl={websiteUrl}></IconExtracter>
          </div>
          <div ref={buttons} style={{ width: 0, visibility: 'hidden' }}>
            <ButtonExtracter websiteUrl={websiteUrl}></ButtonExtracter>
          </div>
          <div ref={typography} style={{ width: 0, visibility: 'hidden' }}>
            <TypographyExtracter websiteUrl={websiteUrl}></TypographyExtracter>
          </div>
          <div ref={colors} style={{ width: 0, visibility: 'hidden' }}>
            <ColorExtracter websiteUrl={websiteUrl}></ColorExtracter>
          </div>
        </div>
        <div style={{ minHeight: '12rem' }}></div>
      </div>
    </div>
  );
}

export default App;
