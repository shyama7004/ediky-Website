import React from "react";
import "./Sections.css";

function Sections() {
    return (
        <div className="container mt-5">
            <div className="row mt-4">
                <div className="col-md-4">
                    <button className="custom-btn">Algorithms</button>
                </div>
                <div className="col-md-4">
                    <button className="custom-btn">Data Structures</button>
                </div>
                <div className="col-md-4">
                    <button className="custom-btn">Machine Learning</button>
                </div>
            </div>
        </div>
    );
}

export default Sections;
