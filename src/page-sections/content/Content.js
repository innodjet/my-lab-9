import React, { useState, useEffect } from "react";
import "./Content.scss";
import PeopleList from "../../components/peopleList/PeopleList";
import ButtonAdd from "../../components/buttonAdd/ButtonAdd";
import ButtonSecondary from "../../components/buttonSecondary/ButtonSecondary";
import Model from "../../components/model/Model";
import Spinner from "../../components/spinner/Spinner";
import validator from "validator";
import { API_URL, GATEWAY, SORT_DATA } from "../../helper/Helper";

const Content = () => {
  const [initial, setInitial] = useState({
    isLoading: false,
    status: "",
    color: "",
  });

  const numberOfDataToDisplayPerPages = 5;

  const [state, setState] = useState({
    favoritePeople: [],
    favoritePeopleCopy: [],
    numberOfPage: "",
    numberOfDataToDisplayPerPage: numberOfDataToDisplayPerPages,
    pageSelected: 1,
    minPage: 1,
    maxPage: numberOfDataToDisplayPerPages,
    status: "",
    color: "",
    form: {
      id: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      phone: "",
      address: "",
      search: "",
    },
    isEdit: false,
    onRemove: {
      isRemove: false,
      id: "",
    },
    isAddNew: false,
    showModal: false,
    orderBy: {
      username: "ASC",
      date_of_birth: "ASC",
      phone: "ASC",
      address: "ASC",
    },
  });

  const {
    favoritePeople,
    showModal,
    isEdit,
    favoritePeopleCopy,
    numberOfPage,
    numberOfDataToDisplayPerPage,
    pageSelected,
    minPage,
    maxPage,
    form: { id, first_name, last_name, date_of_birth, phone, address, search },
  } = state;

  const clearForm = {
    first_name: "",
    last_name: "",
    date_of_birth: "",
    phone: "",
    address: "",
    search: "",
  };

  const clear = {
    status: "",
    color: "",
    form: {
      id: "",
      ...clearForm,
    },
    isEdit: false,
    onRemove: {
      isRemove: false,
      id: "",
    },
    isAddNew: false,
    showModal: false,
  };

  const getFavoritePeopleData = async () => {
    setInitial({
      ...initial,
      status: "Please wait...",
      color: "primary",
      isLoading: true,
    });
    const response = await GATEWAY({
      method: "get",
      url: `${API_URL}/getFavoritePeople`,
    });
    const { message, status, favoritePeople } = response.data;
    if (status === 200) {
      setState({
        ...state,
        ...clear,
        favoritePeople: favoritePeople.filter((el, index) => {
          if (index < numberOfDataToDisplayPerPages) {
            return el;
          }
          return "";
        }),
        favoritePeopleCopy: favoritePeople,
        numberOfPage: page(favoritePeople),
      });
      setInitial({
        ...initial,
        status: "",
        color: "",
        isLoading: false,
      });
    } else {
      setState({
        ...state,
        status: message,
        color: "danger",
      });
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setState({
        ...state,
        status: "Please wait...",
        color: "primary",
      });
      const response = await GATEWAY({
        method: "put",
        url: `${API_URL}/updateFavoritePerson`,
        payload: {
          id,
          first_name,
          last_name,
          date_of_birth,
          phone,
          address,
        },
      });
      const { message, status } = response.data;
      if (status === 200) {
        setState({
          ...state,
          ...clear,
        });
        getFavoritePeopleData();
      } else {
        setState({
          ...state,
          status: message,
          color: "danger",
        });
      }
    }
  };

  const addFavoritePerson = async () => {
    setState({
      ...state,
      status: "Please wait...",
      color: "primary",
      isAddNew: true,
    });
    const response = await GATEWAY({
      method: "post",
      url: `${API_URL}/addFavoritePerson`,
      payload: {
        first_name,
        last_name,
        date_of_birth,
        phone,
        address,
      },
    });
    const { message, status } = response.data;
    if (status === 200) {
      setState({
        ...state,
        ...clear,
      });
      getFavoritePeopleData();
    } else {
      setState({
        ...state,
        status: message,
        color: "danger",
      });
    }
  };

  const removeFavoritePerson = async () => {
    setState({
      ...state,
      status: "Please wait...",
      color: "primary",
    });
    const {
      onRemove: { id },
    } = state;
    const response = await GATEWAY({
      method: "put",
      url: `${API_URL}/removeFavoritePerson`,
      payload: {
        id,
      },
    });
    const { message, status } = response.data;
    if (status === 200) {
      setState({
        ...state,
        ...clear,
      });
      getFavoritePeopleData();
    } else {
      setState({
        ...state,
        status: message,
        color: "danger",
      });
    }
  };

  useEffect(() => {
    getFavoritePeopleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (search === "") {
      dataToDisplayByPage(pageSelected);
    } else {
      setState({
        ...state,
        ...clear,
        form: {
          ...state.form,
          search: state.form.search,
        },
        favoritePeople: currentDataPerPage(pageSelected).result.filter(
          (el) =>
            el.first_name
              .toLowerCase()
              .indexOf(state.form.search.toLowerCase()) !== -1 ||
            el.last_name
              .toLowerCase()
              .indexOf(state.form.search.toLowerCase()) !== -1 ||
            state.form.search.toLowerCase() ===
              `${el.first_name.toLowerCase()} ${el.last_name.toLowerCase()}`.trim()
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const isFormValid = () => {
    let rep = false;
    if (
      !validator.isEmpty(first_name) &&
      !validator.isEmpty(last_name) &&
      !validator.isEmpty(date_of_birth) &&
      !validator.isEmpty(phone) &&
      !validator.isEmpty(address) &&
      validator.isMobilePhone(phone)
    ) {
      rep = true;
    }
    return rep;
  };

  const handleInput = (e) => {
    e.preventDefault();
    setState({
      ...state,
      form: {
        ...state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  const onCancel = (e) => {
    e.preventDefault();
    if (isEdit) {
      setState({
        ...state,
        form: {
          ...state.form,
          ...clearForm,
        },
      });
    } else {
      setState({
        ...state,
        form: {
          id: "",
          ...clearForm,
        },
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      addFavoritePerson();
    }
  };

  const openCloseModal = (e, status) => {
    e.preventDefault();
    setState({
      ...state,
      ...clear,
      showModal: status,
    });
  };

  const onUpdate = (id) => {
    const dataToUpdate = JSON.parse(
      JSON.stringify(state.favoritePeople.filter((el) => el.id === id))
    );
    setState({
      ...state,
      ...clear,
      form: {
        ...state.form,
        ...dataToUpdate[0],
      },
      isEdit: true,
      showModal: true,
    });
  };

  const onRemove = (id) => {
    setState({
      ...state,
      ...clear,
      onRemove: {
        ...state.onRemove,
        isRemove: true,
        id: id,
      },
      showModal: true,
    });
  };

  const onSort = (target) => {
    const orderBy = state.orderBy[target] === "ASC" ? "DESC" : "ASC";
    const dataToUpdate = JSON.parse(JSON.stringify(state.orderBy));
    dataToUpdate[target] = orderBy;
    setState({
      ...state,
      ...clear,
      orderBy: dataToUpdate,
      favoritePeople: SORT_DATA(target, orderBy, state.favoritePeople),
    });
  };

  const page = (data) => {
    let result;
    if (data.length % numberOfDataToDisplayPerPage === 0) {
      result = parseInt(data.length / numberOfDataToDisplayPerPage);
    } else {
      result = parseInt(data.length / numberOfDataToDisplayPerPage) + 1;
    }
    return result;
  };

  const next = () => {
    let reqPage =
      parseInt(pageSelected) + 1 < numberOfPage
        ? parseInt(pageSelected) + 1
        : numberOfPage;
    dataToDisplayByPage(reqPage);
  };

  const previous = () => {
    let reqPage =
      parseInt(pageSelected) - 1 > 1 ? parseInt(pageSelected) - 1 : 1;
    dataToDisplayByPage(reqPage);
  };

  const currentDataPerPage = (page) => {
    let min =
      page * numberOfDataToDisplayPerPage - numberOfDataToDisplayPerPage;
    let max =
      page * numberOfDataToDisplayPerPage > favoritePeopleCopy.length
        ? favoritePeopleCopy.length
        : page * numberOfDataToDisplayPerPage;
    let result = [];
    favoritePeopleCopy.forEach((el, index) => {
      if (index >= min && index < max) {
        result.push(el);
      }
    });
    return { result, min, max };
  };

  const dataToDisplayByPage = (page) => {
    const { result, min, max } = currentDataPerPage(page);
    setState({
      ...state,
      favoritePeople: result,
      pageSelected: page,
      minPage: min === 0 ? 1 : min,
      maxPage: max,
    });
  };

  return (
    <div className="container container-content">
      <Model
        showModal={showModal}
        data={state}
        onCancel={onCancel}
        onSubmit={onSubmit}
        handleInput={handleInput}
        isFormValid={isFormValid}
        openCloseModal={openCloseModal}
        updateData={updateData}
        removeFavoritePerson={removeFavoritePerson}
      />
      <div className="container text-center mb-4 mt-4">
        <h3>Add a favorite person.</h3>
      </div>
      {initial.isLoading && !state.status ? (
        <div className="text-center">
          <Spinner status={initial.status} color={initial.color} />
        </div>
      ) : (
        <>
          {state.status &&
          !state.isAddNew &&
          !state.isEdit &&
          !state.onRemove.isRemove ? (
            <Spinner status={state.status} color={state.color} />
          ) : (
            <>
              <div className="card card-mb people-list-card">
                <div className="card-body">
                  <PeopleList
                    favoritePeople={favoritePeople}
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                    handleInput={handleInput}
                    onSort={onSort}
                    search={search}
                    next={next}
                    previous={previous}
                    totalData={favoritePeopleCopy}
                    minPage={minPage}
                    maxPage={maxPage}
                  />
                </div>
              </div>
              <ButtonAdd openCloseModal={openCloseModal} />
              <ButtonSecondary />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Content;
