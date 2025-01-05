import React, { useEffect, useState } from "react";
import image1 from "./images/1981.459.32_a.jpeg";
import image2 from "./images/DP133665.jpg";
import image3 from "./images/DP236100.jpg";
import image4 from "./images/DT1236.jpg";
import image5 from "./images/DT1241.jpg";
import image6 from "./images/DT1531a.jpg";

const Art = () => {
  return (
    <>
      <div className="grayContainer">
        <div className="heroContainer">
          <h1>Discover the World’s Rich Heritage</h1>
          <p className="heroText">
            Explore a diverse collection of art, artifacts, and history from
            cultures around the globe. Our curated gallery showcases the beauty
            and diversity of human expression across centuries and continents.
            Immerse yourself in the stories, craftsmanship, and traditions that
            shape our shared past.
          </p>
          <button class="cta-button"><a href="./Page">Start your journey</a></button>
        </div>
      </div>
      <div className="circles-containner">
        <div className="circle">
          <img src={image1} alt="" className="inside-circle" loading="lady"/>
        </div>
        <div className="circle">
          <img src={image2} alt="" className="inside-circle" loading="lady"/>
        </div>
        <div className="circle">
          <img src={image3} alt="" className="inside-circle" loading="lady"/>
        </div>
        <div className="circle">
          <img src={image4} alt="" className="inside-circle" loading="lady"/>
        </div>
        <div className="circle">
          <img src={image5} alt="" className="inside-circle" loading="lady"/>
        </div>
        <div className="circle">
          <img src={image6} alt="" className="inside-circle" loading="lady"/>
        </div>
      </div>
      <div className="moreInfo">
        <p>
          The Metropolitan Museum of Art, also known as The Met, features art
          from across cultures and time periods, including modern pieces. for
          more images please{" "}
          <button className="cta-button my-btn">
            <a href="../Page">click here</a>
          </button>
          to view our various images from different countries
        </p>
      </div>
      <hr />
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <a href="/" className="logo">
              ArtVista
            </a>
            <p>Your global art and culture journey starts here.</p>
          </div>

          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Gallery</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-social">
            <h4>Follow Us</h4>
            <ul>
              <li>
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 ArtVista. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Art;
