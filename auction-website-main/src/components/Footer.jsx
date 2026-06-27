import React from "react";
import {
  FaGavel,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-custom text-light mt-5">
      <div className="container py-5">

        {/* TOP SECTION */}

        <div className="row mb-5">

          {/* BRAND SECTION */}

          <div className="col-lg-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <FaGavel className="text-warning me-2" size={28} />
              <span className="fw-bold fs-2">BidVerse</span>
            </div>

            <p className="footer-description">
              Discover rare collectibles, luxury watches, vintage cars,
              premium artwork, and exclusive auctions from around the world.
            </p>
          </div>

          {/* AUCTION CATEGORIES */}

          <div className="col-lg-2 col-md-4 mb-4">
            <h5 className="footer-heading">Categories</h5>

            <ul className="footer-links">
              <li>Luxury Watches</li>
              <li>Vintage Cars</li>
              <li>Fine Art</li>
              <li>Sneakers</li>
              <li>Collectibles</li>
            </ul>
          </div>

          {/* ABOUT */}

          <div className="col-lg-3 col-md-4 mb-4">
            <h5 className="footer-heading">About Us</h5>

            <ul className="footer-links">
              <li>Our Story</li>
              <li>How It Works</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* SUPPORT */}

          <div className="col-lg-3 col-md-4 mb-4">
            <h5 className="footer-heading">Support</h5>

            <ul className="footer-links">
              <li>Your Account</li>
              <li>Secure Payments</li>
              <li>Buyer Protection</li>
              <li>Help Center</li>
              <li>FAQs</li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* BOTTOM SECTION */}

        <div className="row align-items-center pt-3">

          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <span className="footer-copyright">
              © {year} BidVerse. All rights reserved.
            </span>
          </div>

          <div className="col-md-6">
            <ul className="list-unstyled d-flex justify-content-center justify-content-md-end mb-0">

              <li className="ms-3">
                <a className="footer-social-icon" href="#">
                  <FaTwitter size={22} />
                </a>
              </li>

              <li className="ms-3">
                <a className="footer-social-icon" href="#">
                  <FaInstagram size={22} />
                </a>
              </li>

              <li className="ms-3">
                <a className="footer-social-icon" href="#">
                  <FaLinkedin size={22} />
                </a>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
