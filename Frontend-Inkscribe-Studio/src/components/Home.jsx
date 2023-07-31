import React from "react";
import { Button, Image, Row, Col } from "react-bootstrap";

const HomePage = () => {
  return (
    <div className="home">
      <h1>Welcome to Inkscribe Studio</h1>
      <Row>
        <Col>
          <Image src=""></Image>
        </Col>
        <Col>
          <p>
            Unleash your imagination and embark on a thrilling journey into the
            world of comic book creation!
          </p>
          <p>
            Here, you have the power to craft captivating stories, bring
            characters to life, and design stunning visual narratives that will
            mesmerize your readers.
          </p>
          <p>
            Whether you're a seasoned artist or a budding creator, our creative
            space is the perfect canvas for your ideas. Dive into the world of
            superheroes, explore fantastical realms, or delve into
            thought-provoking tales.
          </p>
          <p>
            So, what are you waiting for? Join our vibrant community of creators
            and start weaving your comic book magic today!
          </p>
        </Col>
      </Row>
      {/* Render login or sign-up forms */}
    </div>
  );
};

export default HomePage;
