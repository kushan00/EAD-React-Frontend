import axios from "axios";

import StartUrl from "../configs/Url.json";

const AddUserURL = StartUrl?.StartUrl + "/Account";
const GetAllUsersURL = StartUrl?.StartUrl + "/Account";
const GetAllTravelersURL = StartUrl?.StartUrl + "/Account/travelers";
const GetUserByIdURL = StartUrl?.StartUrl + "/Account/";
const UpdateUserByIdURL = StartUrl?.StartUrl + "/Account/";
const DeleteUserByIdURL = StartUrl?.StartUrl + "/Account/";
const StatusUserByIdURL = StartUrl?.StartUrl + "/Account/status/";

export async function addUser(data) {
  let result;
  await axios
    .post(AddUserURL, data)
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

export async function getAllUsers() {
  let result;
  await axios
    .get(GetAllUsersURL)
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

export async function getUserByID(id) {
  let result;
  await axios
    .get(GetUserByIdURL + id)
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

export async function editUser(id, data) {
  let result;
  await axios
    .put(UpdateUserByIdURL + id, data)
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

export async function deleteUserByID(id) {
  let result;
  await axios
    .delete(DeleteUserByIdURL + id)
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
export async function enableUserByID(id) {
  let result;
  const status = {
    isActive: true,
  };
  await axios
    .put(StatusUserByIdURL + id, status)
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
export async function disableUserByID(id) {
  let result;
  const status = {
    isActive: false,
  };
  await axios
    .put(StatusUserByIdURL + id, status)
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
export async function getAllTravelers() {
  let result;
  await axios
    .get(GetAllTravelersURL)
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