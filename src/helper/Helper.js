import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL;

export const GATEWAY = async (data) => {
  const { method, url, payload } = data;
  return await axios[method](url, payload, {
    "Content-Type": "application/json",
  });
};

export const FORMAT = (d) => {
  const date = d.split("-");
  const getMonth = (dt) => {
    const mlist = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return mlist[dt];
  };
  return `${getMonth(parseInt(date[1]) - 1)} ${parseInt(date[2], 10)}, ${
    date[0]
  }`;
};

export const SORT_DATA = (target, orderBy, data) => {
  return data.sort((a, b) => {
    let targetA =
      target === "username"
        ? `${a["first_name"].toLowerCase()} ${a["last_name"].toLowerCase()}`
        : a[target].toLowerCase();
    let targetB =
      target === "username"
        ? `${b["first_name"].toLowerCase()} ${b["last_name"].toLowerCase()}`
        : b[target].toLowerCase();
    if (orderBy === "DESC") {
      if (targetA > targetB) {
        return -1;
      }
    } else {
      if (targetA < targetB) {
        return -1;
      }
    }
    return 0;
  });
};
