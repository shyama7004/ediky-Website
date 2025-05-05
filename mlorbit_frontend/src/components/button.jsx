import React from "react";
import { useNavigate } from "react-router-dom";
import sections from "../docViewer/sections.json"; // src/docViewer/sections.json
import "./button.css";

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
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default function StarButtons() {
  const navigate = useNavigate();

  return (
    <div className="star-buttons-wrapper">
      {sections.map((sec) => {
        // navigate to the first topic of each section:
        const firstTopic = sec.topics[0]?.slug || "index";
        return (
          <StarBorder
            key={sec.slug}
            as="button"
            className="topic-btn"
            color="cyan"
            speed="5s"
            onClick={() => navigate(`/docs/${sec.slug}/${firstTopic}`)}
          >
            {sec.label}
          </StarBorder>
        );
      })}
    </div>
  );
}
