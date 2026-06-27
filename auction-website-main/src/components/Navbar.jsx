import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { ModalsContext } from "../contexts/ModalsContext";
import { ModalTypes } from "../utils/modalTypes";
import { FaGavel } from "react-icons/fa";

const Navbar = ({ admin }) => {
  const openModal = useContext(ModalsContext).openModal;
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [authButtonText, setAuthButtonText] = useState("Sign up");
  const [adminButtonText, setAdminButtonText] = useState("Admin");
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName != null) {
        setUser(`Hi ${user.displayName}`);
        setAuthButtonText("Sign out");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAdmin = () => {
    console.log("Admin clicked. Current path:", location.pathname);

    const adminPath = import.meta.env.BASE_URL + "admin";
    const homePath = import.meta.env.BASE_URL;

    if (location.pathname === adminPath) {
      navigate(homePath);
      setAdminButtonText("Admin");
    } else {
      navigate(adminPath);
      setAdminButtonText("Home");
    }
  };

  const handleAuth = () => {
    if (user) {
      setUser("");
      setAuthButtonText("Sign up");
    } else {
      openModal(ModalTypes.SIGN_UP);
    }
  };

  return (
    <nav className="navbar-custom">
      <div className="navbar-container">

        <div
          className="logo"
          onClick={() => navigate(import.meta.env.BASE_URL)}
        >
          <FaGavel className="logo-icon" />
          <span className="logo-text">BidVerse</span>
        </div>

        <div className="nav-actions">

          {user && (
            <span className="user-greeting">
              {user}
            </span>
          )}

          {admin && (
            <button
              onClick={handleAdmin}
              className="nav-btn-secondary"
            >
              {adminButtonText}
            </button>
          )}

          <button
            onClick={handleAuth}
            className="nav-btn-primary"
          >
            {authButtonText}
          </button>
          <button
  className="nav-btn-primary"
  onClick={() => navigate("/seller")}
>
  Become a Seller
</button>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  admin: PropTypes.bool
};

export default Navbar;
