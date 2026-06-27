import React from "react";
import Grid from "../components/Grid";
import { ItemModal } from "../components/Modal";

function HomePage() {

  const scrollToAuctions = () => {
    document
      .getElementById("auction-collections")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div>

      {/* HERO SECTION */}

      <section className="hero-section">

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <span className="hero-badge">
            🔥 Live Premium Auctions
          </span>

          <h1 className="hero-title">
            Discover Rare <span>Luxury Collections</span>
          </h1>

          <p className="hero-subtitle">
            Bid on elite watches, supercars, rare sneakers,
            premium artwork, and exclusive collectibles
            from around the world.
          </p>

          <div className="hero-buttons">

            <button
              className="hero-btn-primary"
              onClick={scrollToAuctions}
            >
              Explore Auctions
            </button>

            <button
              className="hero-btn-secondary"
              onClick={scrollToAuctions}
            >
              Trending Items
            </button>

          </div>

        </div>

      </section>

      {/* AUCTIONS */}

      <div className="main-container">
        <Grid />
        <ItemModal />
      </div>

    </div>
  );
}

export default HomePage;
