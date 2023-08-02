import React from "react";
import { Button, Image, Row, Col, Container } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container className="home">
      <h1>Welcome to Inkscribe Studio</h1>
      <Col>
        <Row xs={6} md={4} >
          <Image style={{borderRadius: '100px'}} src="https://github.com/Bryan-Velez/InkScribe/blob/main/Frontend-Inkscribe-Studio/src/assets/OK.png?raw=true" roundedCircle />
        </Row>
        <Row xs={6} md={4} style={{ 
          fontSize:'20px',
          color:'black',
          height: '650px',
          width: '975px',
          backgroundImage: 'url(https://github.com/Bryan-Velez/InkScribe/blob/main/Frontend-Inkscribe-Studio/src/assets/Home%20intro%20background.jpg?raw=true)',
          backgroundSize:'cover',
          padding: '100px',
          margin: '40px',
          borderRadius: '100px',
          textAlign: 'center'

      }}>
          <p style={{ 
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.675)',
            position: 'relative',
            top: '100px',
            left: '260px',
            width: '500px',
            borderRadius: '50px',
        }}>
            Unleash your imagination and embark on a thrilling journey into the
            world of comic book creation!
        <br />
            Here, you have the power to craft captivating stories, bring
            characters to life, and design stunning visual narratives that will
            mesmerize your readers.
         <br />
            Whether you're a seasoned artist or a budding creator, our creative
            space is the perfect canvas for your ideas. Dive into the world of
            superheroes, explore fantastical realms, or delve into
            thought-provoking tales.
          <br />
            So, what are you waiting for? Join our vibrant community of creators
            and start weaving your comic book magic today!
          </p>
        </Row>
      </Col>
      {/* Render login or sign-up forms */}
    </Container>
  );
};

export default HomePage;
