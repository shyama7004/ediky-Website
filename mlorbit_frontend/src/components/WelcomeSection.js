import React, { useState, useEffect, useRef } from "react";
import "./WelcomeSection.css";
import giphy from "../assets/giphy.gif";

function WelcomeSection() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const sectionRef = useRef(null);

  const fullText = "Welcome to MLOrbit";
  const typingSpeed = 200;
  const deletingSpeed = 150;
  const pauseBeforeDelete = 1000;
  const pauseBeforeRetype = 500;

  // Typing effect
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

  // 3D tilt handlers
  const handleMouseMove = (e) => {
    const { width, height, left, top } = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 20;
    const y = ((e.clientY - top) / height - 0.5) * 20;
    sectionRef.current.style.setProperty("--tiltX", -y.toFixed(2));
    sectionRef.current.style.setProperty("--tiltY",  x.toFixed(2));
  };
  const handleMouseLeave = () => {
    sectionRef.current.style.setProperty("--tiltX", 0);
    sectionRef.current.style.setProperty("--tiltY", 0);
  };

  // Ripple effect
  const createRipple = (e) => {
    const btn = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.offsetWidth, btn.offsetHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.nativeEvent.offsetX - radius}px`;
    circle.style.top  = `${e.nativeEvent.offsetY - radius}px`;
    circle.classList.add("ripple");
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  };

  return (
    <div
      ref={sectionRef}
      className="welcome-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img src={giphy} alt="Welcome GIF" className="welcome-gif" />
      <h1 className="welcome-title">
        {text}
        <span className="blinking-cursor">|</span>
      </h1>
      <p className="welcome-subtext">
        Browse free Algorithm Notes, tutorials, and explore programming!
      </p>
      <div className="button-group">
        <a href="#courses" className="btn btn-primary" onClick={createRipple}>
          Free Notes
        </a>
        <a href="/explore-ml" className="btn btn-outline-dark" onClick={createRipple}>
          Explore ML
        </a>
      </div>
    </div>
  );
}

export default WelcomeSection;
