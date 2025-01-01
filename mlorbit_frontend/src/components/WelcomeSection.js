import React, { useState, useEffect } from "react";
import "./WelcomeSection.css";
import giphy from "../assets/giphy.gif";

function WelcomeSection() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const fullText = "Welcome to MLOrbit";
  const typingSpeed = 200;
  const deletingSpeed = 150;
  const pauseBeforeDelete = 1000;
  const pauseBeforeRetype = 500;

  useEffect(() => {
    const typingEffect = () => {
      if (!isDeleting) {
        if (index < fullText.length) {
          setText((prev) => prev + fullText[index]);
          setIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
        }
      } else {
        if (index > 0) {
          setText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        } else {
          setTimeout(() => setIsDeleting(false), pauseBeforeRetype);
        }
      }
    };

    const timer = setTimeout(
      typingEffect,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [text, isDeleting, index]);

  return (
    <div className="welcome-section">
      <img src={giphy} alt="Welcome GIF" className="welcome-gif" />
      <h1 className="welcome-title">
        {text}
        <span className="blinking-cursor">|</span>
      </h1>
      <p className="welcome-subtext">
        Browse free Algorithm Notes, tutorials, and explore programming!
      </p>
      <div className="button-group">
        <a href="#courses" className="btn btn-primary">
          Free Notes
        </a>
        <a href="/explore-ml" className="btn btn-outline-dark">
          Explore ML
        </a>
      </div>
    </div>
  );
}

export default WelcomeSection;
