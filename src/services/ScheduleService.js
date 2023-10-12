import axios from "axios";

import StartUrl from "../configs/Url.json";

const CreateURL = StartUrl?.StartUrl + "/Schedule";
const GetAllURL = StartUrl?.StartUrl + "/Schedule";
const UpdateURL = StartUrl?.StartUrl + "/Schedule/";
const GetByID = StartUrl?.StartUrl + "/Schedule/";
const DeleteURL = StartUrl?.StartUrl + "/Schedule/";
const SearchSchedule = StartUrl?.StartUrl + "/Schedule/Search";
const ActiveURL = StartUrl?.StartUrl + "/Schedule/enable/";
const DeactivateURL = StartUrl?.StartUrl + "/Schedule/disable/";

export async function getAllSchedules() {
  let result;
  await axios
    .get(GetAllURL)
    .then(function (data) {
      result = data;
    })
    .catch(function (error) {
      if (error.response) {
        result = error.response;
      } else if (error.request) {
        result = error.request;
      }
    });
  return result;
}

export async function createSchedule(data,selected) {

  console.log("Data", data);
  const alldata = {
    StartCity: data?.startCity,
    Cities: selected,
    EndCity: data?.endCity,
    Price: data?.price,
    Train: data?.Train,
    StartTime: data?.startTime,
    EndTime: data?.endTime,
    Class: data?.class,
    Type: data?.type,
    RunBy: data?.runBy,
  };

  console.log("all data", alldata);
  let result;
  await axios
    .post(CreateURL, alldata)
    .then(function (data) {
      result = data;
    })
    .catch(function (error) {
      if (error.response) {
        result = error.response;
      } else if (error.request) {
        result = error.request;
      }
    });
  return result;
}

export async function searchSchedules(startCity, endCity,time) {
  const alldata = {
    startCity: startCity,
    endCity: endCity,
    time: time,
  };

  let result;
  await axios
    .post(SearchSchedule, alldata)
    .then(function (data) {
      result = data;
    })
    .catch(function (error) {
      if (error.response) {
        result = error.response;
      } else if (error.request) {
        result = error.request;
      }
    });
  return result;
}

export async function updateSchedule(id, data) {
  const alldata = {
    Id: data?.Id,
    StartCity: data?.StartCity,
    Cities: data?.Cities,
    EndCity: data?.EndCity,
    Price: data?.Price,
    Train: data?.Train,
    StartTime: data?.StartTime,
    EndTime: data?.EndTime,
    Class: data?.Class,
    Type: data?.Type,
    RunBy: data?.RunBy,
    IsActive: data?.IsActive,
  };

  let result;
  await axios
    .put(UpdateURL + id, alldata)
    .then(function (data) {
      result = data;
    })
    .catch(function (error) {
      if (error.response) {
        result = error.response;
      } else if (error.request) {
        result = error.request;
      }
    });
  return result;
}

export async function getScheduleByID(id) {
  let result;
  await axios
    .get(GetByID + id)
    .then(function (data) {
      result = data;
    })
    .catch(function (error) {
      if (error.response) {
        result = error.response;
      } else if (error.request) {
        result = error.request;
      }
    });
  return result;
}

export async function inactiveSchedule(id) {
  let result;
  await axios
    .put(DeactivateURL + id)
    .then(function (data) {
      result = data;
    })
    .catch(function (error) {
      if (error.response) {
        result = error.response;
      } else if (error.request) {
        result = error.request;
      }
    });
  return result;
}


export async function activeSchedule(id) {
  let result;
  await axios
    .put(ActiveURL + id)
    .then(function (data) {
      result = data;
    })
    .catch(function (error) {
      if (error.response) {
        result = error.response;
      } else if (error.request) {
        result = error.request;
      }
    });
  return result;
}