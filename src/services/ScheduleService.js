import axios from "axios";

import StartUrl from "../configs/Url.json";

const CreateURL = StartUrl?.StartUrl + "/api/Schedule";
const GetAllURL = StartUrl?.StartUrl + "/api/Schedule";
const UpdateURL = StartUrl?.StartUrl + "/api/Schedule/";
const GetByID = StartUrl?.StartUrl + "/api/Schedule/";
const DeleteURL = StartUrl?.StartUrl + "/api/Schedule/";

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

export async function createSchedule(data) {

  console.log("Data", data);
  const alldata = {
    Id: data?.Id,
    StartCity: data?.startCity,
    Cities: data?.Cities,
    EndCity: data?.endCity,
    Price: data?.price,
    Train: data?.Train,
    StartTime: data?.startTime,
    EndTime: data?.endTime,
    Class: data?.class,
    Type: data?.type,
    RunBy: data?.runBy,
    IsActive: data?.IsActive,
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

export async function deleteSchedule(id) {
  let result;
  await axios
    .delete(DeleteURL + id)
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
