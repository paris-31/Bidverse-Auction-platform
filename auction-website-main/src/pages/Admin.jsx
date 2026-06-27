import React from "react";
import { editItems } from "../firebase/utils";
import Table from "../components/Table";

function AdminPage() {
  return (
    <div className="admin-page">

      {/* HEADER */}
      <div className="admin-header">
        <div>
          <p className="admin-subtitle">Luxury Marketplace Control Panel</p>
          <h1 className="admin-title">BidVerse Admin Dashboard</h1>
        </div>

        <div className="admin-badge">
          LIVE ADMIN ACCESS
        </div>
      </div>

      {/* STATS */}
      <div className="admin-stats-grid">

        <div className="admin-stat-card">
          <h3>Total Auctions</h3>
          <p>24+</p>
        </div>

        <div className="admin-stat-card">
          <h3>Categories</h3>
          <p>4</p>
        </div>

        <div className="admin-stat-card">
          <h3>Marketplace</h3>
          <p>Luxury</p>
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="admin-actions">

        <button
          className="admin-btn danger-btn"
          onClick={() => editItems(undefined, true, false)}
        >
          Update All Items
        </button>

        <button
          className="admin-btn warning-btn"
          onClick={() => editItems(undefined, false, true)}
        >
          Delete All Bids
        </button>

      </div>

      {/* TABLE */}
      <div className="admin-table-wrapper">
        <Table />
      </div>

    </div>
  );
}

export default AdminPage;