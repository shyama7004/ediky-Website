import React from "react";
import "./button.css";

const topics = [
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing",
  "Reinforcement Learning",
];



const StarBorder = ({
  as: Component = "button",
  className = "",
  color = "white",
  speed = "1s",
  children,
  ...rest
}) => {
  return (
    <Component className={`star-border-container ${className}`} {...rest}>
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 5%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className="inner-content">{children}</div>
    </Component>
  );
};

const StarButtons = () => {
  return (
    <div className="star-buttons-wrapper">
      {topics.map((topic) => (
        <StarBorder key={topic} color="cyan" speed="5s">
          {topic}
        </StarBorder>
      ))}
    </div>
  );
};

export default StarButtons;