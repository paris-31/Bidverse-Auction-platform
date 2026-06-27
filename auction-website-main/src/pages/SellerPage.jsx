import React, { useState } from "react";

function SellerPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="seller-page">

      {/* HERO */}

      <div className="seller-hero">
        <div className="seller-overlay"></div>

        <div className="seller-hero-content">
          <span className="seller-badge">
            Become a Verified Seller
          </span>

          <h1>
            Sell Luxury Assets on <span>BidVerse</span>
          </h1>

          <p>
            Join premium sellers worldwide and showcase
            luxury watches, supercars, collectibles,
            art pieces and exclusive assets to elite buyers.
          </p>
        </div>
      </div>

      {/* FORM SECTION */}

      <div className="seller-form-container">

        <div className="seller-form-card">

          <h2>Seller Application</h2>

          <p className="seller-subtitle">
            Fill in your details to start selling on BidVerse
          </p>

          <form onSubmit={handleSubmit}>

            <div className="seller-grid">

              <input
                type="text"
                placeholder="Full Name"
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                required
              />

              <input
                type="tel"
                placeholder="Phone Number"
                required
              />

              <input
                type="text"
                placeholder="Country"
                required
              />

              <input
                type="text"
                placeholder="Business / Brand Name"
              />

              <input
                type="text"
                placeholder="Years of Experience"
              />

            </div>

            <textarea
              rows="5"
              placeholder="What products do you want to sell?"
              required
            ></textarea>

            <textarea
              rows="4"
              placeholder="Why do you want to join BidVerse?"
            ></textarea>

            {/* DOCUMENTS */}

            <div className="upload-box">
              <label>
                Upload Verification Documents
              </label>

              <input type="file" />
            </div>

            {/* AGREEMENT */}

            <div className="agreement-box">

              <input type="checkbox" required />

              <span>
                I agree to BidVerse seller policies and
                verification guidelines.
              </span>

            </div>

            <button
              type="submit"
              className="seller-submit-btn"
            >
              Submit Seller Request
            </button>

          </form>
        </div>
      </div>

      {/* SUCCESS POPUP */}

      {submitted && (
        <div className="bid-success-overlay">
          <div className="bid-success-box">
            <div className="success-check">✓</div>

            <h2>Application Submitted</h2>

            <p>
              Your seller request has been submitted
              successfully.
              <br /><br />
              Our verification team will review your
              application shortly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerPage;