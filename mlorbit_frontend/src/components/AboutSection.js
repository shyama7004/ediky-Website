import React from "react";
import "./AboutSection.css";

import spaceImage1 from "../assets/space1.jpg";
import spaceImage2 from "../assets/space2.jpg";
import minecraftImage from "../assets/minecraft.jpg";
import jettImage from "../assets/jett.jpg";

const AboutBox = ({ image, alt, title, description, reverse }) => {
  return (
    <div
      className={`row align-items-center mb-5 py-4 about-box ${
        reverse ? "flex-row-reverse" : ""
      }`}
    >
      <div className="col-md-6 d-flex justify-content-center">
        <img
          src={image}
          alt={alt}
          className="img-fluid rounded about-image"
          loading="lazy"
        />
      </div>
      <div className="col-md-6 about-text">
        <h3 className="fw-bold">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const AboutSection = () => {
  const aboutData = [
    {
      image: spaceImage1,
      alt: "Space Enthusiast",
      title: "Shyama the Astronomer Wannabe",
      description: (
        <>
          Hi, I'm Shyama, Space is my greatest passion, and I’m endlessly
          captivated by the mysteries of the cosmos. Star-forming nebulae like
          the <strong>Star Factory W51</strong> and the <strong>Swan Nebula</strong> fascinate
          me.
        </>
      ),
    },
    {
      image: spaceImage2,
      alt: "Starry Cosmos",
      title: "My Hobbies",
      description: (
        <>
          The infinite beauty of space continues to inspire awe and wonder, fueling my passion for astrophysics and mathematics. Exploring star-forming regions and cosmic phenomena deepens my curiosity and drives my desire to understand the mysteries of the universe.
        </>
      ),
      reverse: true,
    },
    {
      image: minecraftImage,
      alt: "Minecraft Gaming",
      title: "Ayushi the Ultimate Binge Gamer",
      description: (
        <>
          Hi, I'm Ayushi, Gaming is my world. Whether I’m building intricate
          worlds in <strong>Minecraft</strong> or diving into competitive gameplay,
          gaming fuels my creativity and drive or that's what I think.
        </>
      ),
    },
    {
      image: jettImage,
      alt: "Jett Gaming",
      title: "My Hobbies",
      description: (
        <>
          Gaming has been one of my favorite hobbies for the past 2 years, especially playing Valorant with friends. My go-to character is <strong>Jett</strong>, who never fails to keep the game exciting. I also enjoy playing table tennis and exploring the world of books, with fantasy novels being my absolute favorite.
        </>
      ),
      reverse: true,
    },
  ];

  return (
    <section className="container mt-5 about-container">
      <h2 className="text-center fw-bold mb-5 about-title">About Us</h2>
      {aboutData.map((item, index) => (
        <AboutBox
          key={index}
          image={item.image}
          alt={item.alt}
          title={item.title}
          description={item.description}
          reverse={item.reverse}
        />
      ))}
    </section>
  );
};

export default AboutSection;
