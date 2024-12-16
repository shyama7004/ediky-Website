import React from "react";
import { Link } from "react-router-dom";
import algosImage from "../assets/algos.jpg";
import datastructuresImage from "../assets/datastructures.jpg";
import mlImage from "../assets/ml.jpg";

function RecommendedSections() {
  return (
    <div className="container mt-5 text-center">
      <h2 className="fw-bold text-primary">Recommended Sections</h2>
      <div className="row mt-4">
        {/* Algorithms Section */}
        <div className="col-md-4">
          <Link to="/algorithms" className="text-decoration-none">
            <div className="card bg-dark text-light shadow-sm">
              <img
                src={algosImage}
                className="card-img-top"
                alt="Algorithms"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Explore Algorithms</h5>
              </div>
            </div>
          </Link>
        </div>

        {/* Data Structures Section */}
        <div className="col-md-4">
          <Link to="/data-structures" className="text-decoration-none">
            <div className="card bg-dark text-light shadow-sm">
              <img
                src={datastructuresImage}
                className="card-img-top"
                alt="Data Structures"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Explore Data Structures</h5>
              </div>
            </div>
          </Link>
        </div>

        {/* Machine Learning Section */}
        <div className="col-md-4">
          <Link to="/machine-learning" className="text-decoration-none">
            <div className="card bg-dark text-light shadow-sm">
              <img
                src={mlImage}
                className="card-img-top"
                alt="Machine Learning"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Explore Machine Learning</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecommendedSections;
