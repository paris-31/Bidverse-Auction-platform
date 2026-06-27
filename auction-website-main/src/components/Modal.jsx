import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import { itemStatus } from "../utils/itemStatus";
import { formatField, formatMoney } from "../utils/formatString";

import { updateProfile } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";

import { auth, db } from "../firebase/config";

import { ModalsContext } from "../contexts/ModalsContext";
import { ModalTypes } from "../utils/modalTypes";

const Modal = ({ type, title, children }) => {
  const { closeModal, currentModal } = useContext(ModalsContext);

  if (type !== currentModal) return null;

  return ReactDOM.createPortal(
    <div
      className="custom-modal-overlay"
      onClick={closeModal}
    >
      <div
        className="custom-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="custom-modal-header">
          <h2>{title}</h2>

          <button
            className="custom-close-btn"
            onClick={closeModal}
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};

const ItemModal = () => {
  const { activeItem, openModal, closeModal } =
    useContext(ModalsContext);

  const [secondaryImageSrc, setSecondaryImageSrc] = useState("");

  const [bid, setBid] = useState("");

  const [valid, setValid] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [feedback, setFeedback] = useState("");

  const [minBid, setMinBid] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  const minIncrease = 1;
  const maxIncrease = 10;

  useEffect(() => {
    if (!activeItem?.secondaryImage) return;

    import(`../assets/${activeItem.secondaryImage}.png`)
      .then((src) => {
        setSecondaryImageSrc(src.default);
      })
      .catch((err) => {
        console.log("Image load error:", err);
      });
  }, [activeItem]);

  useEffect(() => {
    if (!activeItem) return;

    const status = itemStatus(activeItem);

    setMinBid(
      formatMoney(
        activeItem.currency,
        status.amount + minIncrease
      )
    );
  }, [activeItem]);

  const delayedClose = () => {
    setTimeout(() => {
      closeModal();
      setFeedback("");
      setValid("");
      setBid("");
    }, 1200);
  };

  const handleSubmitBid = async () => {
    const nowTime = new Date().getTime();

    setIsSubmitting(true);

    if (activeItem.endTime - nowTime < 0) {
      setFeedback("Sorry, this auction has ended.");
      setValid("is-invalid");
      setIsSubmitting(false);
      return;
    }

    if (auth.currentUser.displayName == null) {
      setFeedback("Please create a username first.");
      setValid("is-invalid");

      setTimeout(() => {
        openModal(ModalTypes.SIGN_UP);
      }, 1000);

      setIsSubmitting(false);

      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(bid)) {
      setFeedback("Enter a valid bid amount.");
      setValid("is-invalid");
      setIsSubmitting(false);
      return;
    }

    const amount = parseFloat(bid);

    const status = itemStatus(activeItem);

    if (amount < status.amount + minIncrease) {
      setFeedback("Your bid is too low.");
      setValid("is-invalid");
      setIsSubmitting(false);
      return;
    }

    if (amount > status.amount + maxIncrease) {
      setFeedback(
        `You can only increase up to ${activeItem.currency}${maxIncrease} per bid.`
      );

      setValid("is-invalid");

      setIsSubmitting(false);

      return;
    }

    try {
      await updateDoc(doc(db, "auction", "items"), {
        [formatField(activeItem.id, status.bids + 1)]: {
          amount,
          uid: auth.currentUser.uid,
        },
      });

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2200);

      setValid("is-valid");

      delayedClose();
    } catch (error) {
      console.log(error);

      setFeedback("Something went wrong.");

      setValid("is-invalid");
    }

    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setBid(e.target.value);

    setValid("");

    setFeedback("");
  };

  return (
    <>
      <Modal
        type={ModalTypes.ITEM}
        title={activeItem.title}
      >
        <div className="custom-modal-body">

          <div className="modal-image-wrapper">
            <img
              src={secondaryImageSrc}
              alt={activeItem.title}
              className="custom-modal-image"
            />

            <div className="image-overlay"></div>
          </div>

          <div className="modal-details">

            <p className="modal-description">
              {activeItem.detail}
            </p>

            <div className="bid-info-box">
              <span>Minimum Bid</span>

              <h3>{minBid}</h3>
            </div>

            <div className="custom-bid-section">

              <div className="custom-input-wrapper">

                <div className="currency-box">
                  {activeItem.currency}
                </div>

                <input
                  type="text"
                  placeholder="Enter your bid"
                  className="custom-bid-input"
                  value={bid}
                  onChange={handleChange}
                />

              </div>

              <button
                className="custom-submit-btn"
                onClick={handleSubmitBid}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Submitting..."
                  : "Submit Bid"}
              </button>

              {feedback && (
                <div className={`feedback-text ${valid}`}>
                  {feedback}
                </div>
              )}

            </div>

          </div>
        </div>
      </Modal>

      {showSuccess && (
        <div className="bid-success-overlay">

          <div className="bid-success-box">

            <div className="success-check">
              ✓
            </div>

            <h2>Bid Placed Successfully</h2>

            <p>
              Your luxury auction bid has been recorded successfully.
            </p>

          </div>

        </div>
      )}
    </>
  );
};

const SignUpModal = () => {
  const { closeModal } = useContext(ModalsContext);

  const [username, setUsername] = useState("");

  const [valid, setValid] = useState("");

  const handleSignUp = () => {
    const user = auth.currentUser;

    updateProfile(user, {
      displayName: username,
    });

    setDoc(doc(db, "users", user.uid), {
      name: username,
      admin: "",
    });

    setValid("is-valid");

    setTimeout(() => {
      closeModal();
    }, 1000);
  };

  return (
    <Modal
      type={ModalTypes.SIGN_UP}
      title="Create Your BidVerse Identity"
    >
      <div className="custom-modal-body">

        <div className="signup-box">

          <p className="modal-description">
            Choose a premium username for bidding in luxury auctions.
          </p>

          <div className="custom-input-wrapper">

            <input
              type="text"
              placeholder="Enter username"
              className="custom-bid-input"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

          </div>

          <div className="signup-actions">

            <button
              className="cancel-btn"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              className="custom-submit-btn"
              onClick={handleSignUp}
            >
              Create Account
            </button>

          </div>

        </div>

      </div>
    </Modal>
  );
};

export { ItemModal, SignUpModal };
