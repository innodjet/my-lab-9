import React from "react";
import PropTypes from "prop-types";
import "./PeopleList.scss";
import { FORMAT } from "../../helper/Helper";

const PeopleList = ({
  favoritePeople,
  onUpdate,
  onRemove,
  search,
  handleInput,
  onSort,
  next,
  previous,
  totalData,
  minPage,
  maxPage,
}) => {
  const displayData = () => {
    return favoritePeople.map((el) => {
      return (
        <tr className="new-edits" key={`${el.id}`}>
          <td>{`${el.first_name} ${el.last_name}`}</td>
          <td className="border-left">{FORMAT(el.date_of_birth)}</td>
          <td className="border-left border-right">{el.phone}</td>
          <td>{el.address}</td>
          <td>
            <div className="btnGrp">
              <i
                className="fa fa-pen mr-3"
                data-toggle="modal"
                data-target=".bd-example-modal-xl"
                onClick={() => onUpdate(el.id)}
              ></i>
              <i
                className="fa fa-trash"
                data-toggle="modal"
                data-target=".bd-example-modal-xl"
                onClick={() => onRemove(el.id)}
              ></i>
            </div>
          </td>
        </tr>
      );
    });
  };

  return favoritePeople ? (
    <div className="people-list-card">
      <div className="form-group search-input">
        <input
          type="text"
          className="form-control"
          name="search"
          value={search}
          onChange={handleInput}
          id="search"
          placeholder="Search"
        />
      </div>
      <table className="table border-bottom">
        <thead className="border-left border-right">
          <tr>
            <th>
              <span onClick={() => onSort("username")}>
                Username <i className="fas fa-sort"></i>
              </span>
            </th>
            <th>
              <span onClick={() => onSort("date_of_birth")}>
                Date of Birth <i className="fas fa-sort"></i>
              </span>
            </th>
            <th>
              <span onClick={() => onSort("phone")}>
                Phone Number <i className="fas fa-sort"></i>{" "}
              </span>
            </th>
            <th>
              <span onClick={() => onSort("address")}>
                Address <i className="fas fa-sort"></i>
              </span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>{displayData()}</tbody>
      </table>
      <div className="text-right">
        <ul className="pagination pagination">
          <li className="page-item p-2">
            <span className="page">
              {minPage}-{maxPage} of {totalData.length}
            </span>
          </li>
          <li className={`page-item ${minPage === 1 ? "disabled" : ""}`}>
            <span className="page-link" onClick={previous}>
              {"<"}
            </span>
          </li>
          <li
            className={`page-item ${
              maxPage === totalData.length ? "disabled" : ""
            }`}
          >
            <span className="page-link" onClick={next}>
              {">"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    ""
  );
};

PeopleList.propTypes = {
  favoritePeople: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default PeopleList;
