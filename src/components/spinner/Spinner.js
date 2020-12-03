import React from "react";
import "./Spinner.scss";
import PropTypes from "prop-types";

const Spinner = ({ color, status }) => {
  const displaySpinner = () => {
    return ["primary", "danger", "dark", "warning"].map((el) => {
      return (
        <div className={`spinner-grow text-${el}`} role="status" key={el}>
          <span className="sr-only">Loading...</span>
        </div>
      );
    });
  };
  return status === "Please wait..." ? (
    <div className="spinner spinner-container">{displaySpinner()}</div>
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
