import React from "react";
import "./Spinner.scss";
import PropTypes from "prop-types";

const Spinner = ({ color, status }) => {
  return status === "Please wait..." ? (
    <div className="spinner spinner-container">
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-warning" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <div className={`alert alert-${color}`} role="alert">
      <i className="fa fa-info-circle info-icon" aria-hidden="true"></i>
      <span className="statut-message">{status}</span>
    </div>
  );
};

Spinner.propTypes = {
  color: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Spinner;
