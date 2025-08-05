import React from "react";
import { FaUserAstronaut, FaGamepad, FaGithub } from "react-icons/fa";
import { GiCrystalBars, GiRocket, GiDiamondTrophy } from "react-icons/gi";
import "./AboutSection.css";

const developers = [
  {
    Icon: FaUserAstronaut,
    name: "Shyama7004",
    role: "C++ / Python / Rust Developer & DevOps",
    bio:
      "GSoC 2025 contributor with OpenCV, exploring the world of C++, Python, and Rust. Enthusiastic about DevOps and passionate about building clean, meaningful solutions. Also a professional badminton player and a music lover from NIT Rourkela.",
    github: "https://github.com/shyama7004",
  },
  {
    Icon: FaGamepad,
    name: "Ayushi2234",
    role: "Web & ML Developer",
    bio:
      "Web and ML developer from NIT Jamshedpur, passionate about creating smart and engaging tech solutions. Google Cloud Certified with a strong academic record (9.13 CGPA). Gamer at heart — loves diving into Valorant, Minecraft, and God of War.",
    github: "https://github.com/Ayushi2234",
  },
];

const plans = [
  {
    Icon: GiCrystalBars,
    tier: "Starter",
    price: "Free",
    features: ["Basic UI Components", "Community Support", "1 Project"],
    cta: "Get Started",
  },
  {
    Icon: GiRocket,
    tier: "Pro",
    price: "$29/mo",
    features: [
      "Advanced Analytics",
      "Priority Email Support",
      "Up to 5 Projects",
    ],
    cta: "Upgrade Now",
  },
  {
    Icon: GiDiamondTrophy,
    tier: "Enterprise",
    price: "Contact Us",
    features: ["Custom Integrations", "Dedicated SLA", "Unlimited Projects"],
    cta: "Contact Sales",
  },
];

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="container">
        {/* Developer Cards */}
        <h2 className="section-title">Meet the Developers</h2>
        <div className="dev-grid">
          {developers.map(({ Icon, name, role, college, bio, github }, i) => (
            <div
              key={i}
              className="dev-card"
              style={{ animationDelay: `${0.2 + i * 0.2}s` }}
            >
              <div className="dev-icon">
                <Icon />
              </div>
              <h5 className="dev-name">{name}</h5>
              <p className="dev-role">{role}</p>
              {college && <p className="dev-college">{college}</p>}
              <p className="dev-bio">{bio}</p>
              <div className="dev-social">
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} GitHub`}
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Plans */}
        <h2 className="section-title">Our Plans</h2>
        <div className="plan-grid">
          {plans.map(({ Icon, tier, price, features, cta }, i) => (
            <div
              key={i}
              className="plan-card"
              style={{ animationDelay: `${0.2 + i * 0.2}s` }}
            >
              <div className="plan-icon">
                <Icon />
              </div>
              <h5 className="plan-tier">{tier}</h5>
              <p className="plan-price">{price}</p>
              <ul className="plan-features">
                {features.map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </ul>
              <button className="btn-plan">{cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
