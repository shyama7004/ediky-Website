import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { emailLogin, emailSignup, googleLogin } from "./AuthService";
import { UserContext } from "../context/UserContext";
import ShapeBlur from "./ShapeBlur";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin]   = useState(true);
  const { setUser }             = useContext(UserContext);
  const navigate                = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const u = isLogin
        ? await emailLogin(email, password)
        : await emailSignup(email, password);

      setUser({
        uid:      u.uid,
        name:     u.displayName || u.email,
        email:    u.email,
        progress: JSON.parse(localStorage.getItem("userProgress")) || {},
      });

      alert(isLogin ? "Login successful!" : "Signup successful!");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const u = await googleLogin();
      setUser({
        uid:      u.uid,
        name:     u.displayName || u.email,
        email:    u.email,
        progress: JSON.parse(localStorage.getItem("userProgress")) || {},
      });
      alert("Google login successful!");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content row justify-content-center">
        {/* Left animation / text */}
        <div className="col-md-6 d-none d-md-flex flex-column align-items-center">
          <h1 className="welcome-text">WELCOME TO MLORBIT</h1>
          <p className="tagline">
            Join a growing community of learners, developers, and creators!
          </p>
          <img
            src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif"
            alt="Animation"
            className="login-animation"
          />
        </div>

        {/* Right form + blur */}
        <div className="col-md-5 col-sm-12 form-section">
          {/* blur lives behind the card */}
          <ShapeBlur
            className="shape-background"
            variation={0}
            pixelRatioProp={window.devicePixelRatio || 1}
            shapeSize={1.2}
            roundness={0.8}
            borderSize={0.05}
            circleSize={0.5}
            circleEdge={1}
          />

          <div className="login-card">
            <h2 className="login-card-title">
              {isLogin ? "Login to MLOrbit" : "Create Your Account"}
            </h2>

            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                className="login-input"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="login-input"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="login-btn login-btn-primary">
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            <button
              className="login-btn login-btn-google"
              onClick={handleGoogleLogin}
            >
              <i className="fab fa-google me-2" />
              {isLogin ? "Sign in with Google" : "Continue with Google"}
            </button>

            <p className="login-toggle-text">
              {isLogin ? "Don't have an account?" : "Already have one?"}
              <span
                className="login-toggle-link"
                onClick={() => setIsLogin(p => !p)}
              >
                {isLogin ? " Create Account" : " Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
