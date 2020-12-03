import React from "react";
import Spinner from "../spinner/Spinner";
import "./Model.scss";
import validator from "validator";
import PropTypes from "prop-types";

const Model = ({
  data,
  onCancel,
  onSubmit,
  handleInput,
  isFormValid,
  openCloseModal,
  updateData,
  showModal,
  removeFavoritePerson,
}) => {
  const {
    status,
    color,
    isAddNew,
    form,
    isEdit,
    onRemove: { isRemove },
  } = data;

  const { first_name, last_name, date_of_birth, phone, address } = form;

  return showModal ? (
    <div
      className="modal fade bd-example-modal-xl"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          {isRemove ? (
            <>
              <div className="modal-header pl-5 pb-0">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="alert alert-primary mr-5 ml-5 mt-5" role="alert">
                <i
                  className="fa fa-info-circle info-icon"
                  aria-hidden="true"
                ></i>
                <span className="statut-message">
                  Are you sure you want to delete this record?...
                </span>
              </div>
              <div className="modal-footer pr-5 pt-3 pb-5">
                <button
                  type="submit"
                  onClick={removeFavoritePerson}
                  data-dismiss="modal"
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="modal-header pl-5 pb-0">
                <h5 className="modal-title" id="exampleModalLabel">
                  {isFormValid()
                    ? "Entries look good!"
                    : "Complete the fields below."}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={(e) => {
                    openCloseModal(e, false);
                  }}
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body  pl-5 pr-5">
                {status && (isAddNew || isEdit) ? (
                  <Spinner status={status} color={color} />
                ) : (
                  ""
                )}
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    First Name:
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={first_name}
                    onChange={handleInput}
                    className={`form-control ${
                      !validator.isEmpty(first_name) ? "is-valid" : ""
                    }`}
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={last_name}
                    onChange={handleInput}
                    className={`form-control ${
                      !validator.isEmpty(last_name) ? "is-valid" : ""
                    }`}
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={date_of_birth}
                    onChange={handleInput}
                    className={`form-control ${
                      !validator.isEmpty(date_of_birth) ? "is-valid" : ""
                    }`}
                    placeholder="Date of Birth"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={handleInput}
                    className={`form-control ${
                      !validator.isEmpty(phone) &&
                      validator.isMobilePhone(phone)
                        ? "is-valid"
                        : ""
                    }`}
                    placeholder="Phone Number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Address:
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleInput}
                    className={`form-control ${
                      !validator.isEmpty(address) ? "is-valid" : ""
                    }`}
                    placeholder="Address"
                  />
                </div>
              </div>
              <div className="modal-footer pr-5 pt-3 pb-5">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={isEdit ? updateData : onSubmit}
                  data-dismiss={isFormValid() ? "modal" : ""}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

Model.propTypes = {
  data: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  isFormValid: PropTypes.func.isRequired,
  openCloseModal: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  removeFavoritePerson: PropTypes.func.isRequired,
};

export default Model;
