import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { itemStatus } from "../utils/itemStatus";
import { formatTime, formatMoney } from "../utils/formatString";
import { ModalsContext } from "../contexts/ModalsContext";
import { ModalTypes } from "../utils/modalTypes";

export const Item = ({ item }) => {
  const { openModal } = useContext(ModalsContext);

  // =========================
  // STATES
  // =========================

  const [primaryImageSrc, setPrimaryImageSrc] = useState("");
  const [bids, setBids] = useState(0);
  const [amount, setAmount] = useState(item.startingPrice);
  const [timeLeft, setTimeLeft] = useState("");

  // PAYMENT SUCCESS POPUP
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");

  // CHECKOUT MODAL
  const [showCheckout, setShowCheckout] = useState(false);

  const [checkoutData, setCheckoutData] = useState({
    name: "",
    email: "",
    card: "",
    expiry: "",
    cvv: "",
    address: "",
  });

  // =========================
  // ITEM STATUS
  // =========================

  useEffect(() => {
    const status = itemStatus(item);

    setBids(status.bids);
    setAmount(formatMoney(item.currency, status.amount));
  }, [item]);

  // =========================
  // TIMER
  // =========================

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const remaining = item.endTime - now;

      if (remaining > 0) {
        setTimeLeft(formatTime(remaining));
        requestAnimationFrame(updateTimer);
      } else {
        setTimeLeft("Item Ended");
      }
    };

    requestAnimationFrame(updateTimer);
  }, [item.endTime]);

  // =========================
  // IMAGE IMPORT
  // =========================

  const images = import.meta.glob("../assets/*.{png,jpg,jpeg,webp}", {
    eager: true,
  });

  useEffect(() => {
    const imagePath = `../assets/${item.primaryImage}.png`;

    if (images[imagePath]) {
      setPrimaryImageSrc(images[imagePath].default);
    } else {
      console.error("Image not found:", imagePath);
    }
  }, [item.primaryImage]);

  // =========================
  // BUY NOW LOGIC
  // =========================

  const canBuyNow = bids > 0 && timeLeft !== "Item Ended";

  const handleBuyNow = (e) => {
    e.stopPropagation();

    if (!canBuyNow) return;

    setShowCheckout(true);
  };

  // =========================
  // FORM INPUTS
  // =========================

  const handleInputChange = (e) => {
    setCheckoutData({
      ...checkoutData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // COMPLETE PAYMENT
  // =========================

  const handleCompletePayment = () => {
    const { name, email, card, expiry, cvv, address } =
      checkoutData;

    if (
      !name ||
      !email ||
      !card ||
      !expiry ||
      !cvv ||
      !address
    ) {
      alert("Please fill all payment details");
      return;
    }

    setShowCheckout(false);

    setPaymentMessage(
      `You successfully purchased ${item.title} for ${amount}`
    );

    setShowPaymentPopup(true);

    setTimeout(() => {
      setShowPaymentPopup(false);
    }, 4000);
  };

  // =========================
  // JSX
  // =========================

  return (
    <>
      {/* CARD */}

      <div
        className="auction-card"
        onClick={() => openModal(ModalTypes.ITEM, item)}
      >
        <img src={primaryImageSrc} alt={item.title} />

        <div className="card-body">
          <h3 className="card-title">{item.title}</h3>

          <h6 className="card-subtitle">{item.subtitle}</h6>

          <p className="card-price">
            <strong>{amount}</strong>
          </p>

          {/* BADGES */}

          <div className="card-meta">
            <span className="bid-badge">
              <svg
                className="bid-icon"
                viewBox="0 0 24 24"
                width="14"
                height="14"
              >
                <path
                  fill="currentColor"
                  d="M5,6H23V8H5V6M5,11H23V13H5V11M5,16H23V18H5V16Z"
                />
              </svg>

              {bids} {bids === 1 ? "bid" : "bids"}
            </span>

            <span className="countdown">
              <svg
                className="clock-icon"
                viewBox="0 0 24 24"
                width="14"
                height="14"
              >
                <path
                  fill="currentColor"
                  d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"
                />
              </svg>

              {timeLeft}
            </span>
          </div>

          {/* BUTTONS */}

          <div
            style={{
              display: "flex",
              gap: "14px",
              marginTop: "10px",
            }}
          >
            {/* PLACE BID */}

            <button
              className="card-btn"
              style={{
                flex: 1,
              }}
            >
              Place Bid
            </button>

            {/* BUY NOW */}

            <button
              onClick={handleBuyNow}
              disabled={!canBuyNow}
              style={{
                flex: 1,
                borderRadius: "14px",
                border: "1px solid rgba(255,193,7,0.2)",
                background: canBuyNow
                  ? "linear-gradient(135deg,#111,#1c1c1c)"
                  : "rgba(255,255,255,0.08)",
                color: canBuyNow ? "#ffcc00" : "#777",
                fontWeight: "700",
                fontSize: "1rem",
                cursor: canBuyNow ? "pointer" : "not-allowed",
                transition: "0.3s ease",
                padding: "14px 18px",
                minHeight: "58px",
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* CHECKOUT MODAL */}
      {/* ========================= */}

      {showCheckout && (
        <div
          className="bid-success-overlay"
          onClick={() => setShowCheckout(false)}
        >
          <div
            className="checkout-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Luxury Checkout</h2>

            <p className="checkout-subtitle">
              Complete your purchase securely
            </p>

            <div className="checkout-grid">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={checkoutData.name}
                onChange={handleInputChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={checkoutData.email}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="card"
                placeholder="Card Number"
                value={checkoutData.card}
                onChange={handleInputChange}
              />

              <div className="card-row">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={checkoutData.expiry}
                  onChange={handleInputChange}
                />

                <input
                  type="password"
                  name="cvv"
                  placeholder="CVV"
                  value={checkoutData.cvv}
                  onChange={handleInputChange}
                />
              </div>

              <textarea
                name="address"
                placeholder="Billing Address"
                rows="4"
                value={checkoutData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="checkout-price">
              Total: <span>{amount}</span>
            </div>

            <button
              className="complete-payment-btn"
              onClick={handleCompletePayment}
            >
              Complete Payment
            </button>
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* SUCCESS POPUP */}
      {/* ========================= */}

      {showPaymentPopup && (
        <div className="bid-success-overlay">
          <div className="bid-success-box">
            <div className="success-check">✓</div>

            <h2>Payment Successful</h2>

            <p>{paymentMessage}</p>
          </div>
        </div>
      )}
    </>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    startingPrice: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    endTime: PropTypes.object.isRequired,
    primaryImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
  }),
};

