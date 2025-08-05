import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sections.css";

function Sections() {
  const navigate = useNavigate();

  const handleAlgorithmsClick = () => {
    navigate("/schedule-planner", { state: { section: "Algorithms" } });
  };

  const handleDataStructuresClick = () => {
    navigate("/schedule-planner", { state: { section: "Data Structures" } });
  };

  const handleMachineLearningClick = () => {
    navigate("/schedule-planner", { state: { section: "Machine Learning" } });
  };

  return (
    <div className="container mt-5">
      <div className="row mt-4">
        <div className="col-md-4">
          <button className="custom-btn" onClick={handleAlgorithmsClick}>
            Algorithms
          </button>
        </div>
        <div className="col-md-4">
          <button className="custom-btn" onClick={handleDataStructuresClick}>
            Data Structures
          </button>
        </div>
        <div className="col-md-4">
          <button className="custom-btn" onClick={handleMachineLearningClick}>
            Machine Learning
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sections;
