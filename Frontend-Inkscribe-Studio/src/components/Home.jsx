import React from "react";
import { Button, Image, Row, Col, Container } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container className="home">
      <h1>Welcome to Inkscribe Studio</h1>
      <Row>
        <Col xs={6} md={4}>
          <Image src="https://github.com/Bryan-Velez/InkScribe/blob/main/Frontend-Inkscribe-Studio/src/assets/OK.png?raw=true" roundedCircle />
        </Col>
        <Col xs={6} md={4} style={{ fontSize:'20px'}}>
          <p>
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
        </Col>
      </Row>
      {/* Render login or sign-up forms */}
    </Container>
  );
};

export default HomePage;
