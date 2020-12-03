import React from "react";
import "./ButtonAdd.scss";
import PropTypes from "prop-types";

const ButtonAdd = ({ openCloseModal }) => {
  return (
    <div className="container container-btn-add text-center mt-4 mb-4">
      <button
        type="button"
        data-toggle="modal"
        onClick={(e) => {
          openCloseModal(e, true);
        }}
        data-target=".bd-example-modal-xl"
        className="button-add btn-primary"
      >
        +
      </button>
    </div>
  );
};

ButtonAdd.propTypes = {
  openCloseModal: PropTypes.func.isRequired,
};

export default ButtonAdd;
