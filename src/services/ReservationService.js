import axios from "axios";
import StartUrl from "../configs/Url.json";

const CreateURL = StartUrl?.StartUrl + "/api/Reservation"; // Adjust the URL for creating a reservation
const GetAllURL = StartUrl?.StartUrl + "/api/Reservation"; // Adjust the URL for getting all reservations
const UpdateURL = StartUrl?.StartUrl + "/api/Reservation/"; // Adjust the URL for updating a reservation
const GetByID = StartUrl?.StartUrl + "/api/Reservation/"; // Adjust the URL for getting a reservation by ID
const DeleteURL = StartUrl?.StartUrl + "/api/Reservation/"; // Adjust the URL for deleting a reservation

export async function getAllReservations() {
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

export async function createReservation(data,scheduleID) {
  const alldata = {
    bookingId: data?.bookingId,
    user: data?.user,
    schedule: scheduleID,
    bookedTime: data?.bookedTime,
    reserveTime: data?.reserveTime,
    startCity: data?.startCity,
    endCity: data?.endCity,
    paxCount: data?.paxCount,
    status: data?.status,
  };

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

export async function updateReservation(id, data) {
  const alldata = {
    bookingId: data?.bookingId,
    user: data?.user,
    schedule: data?.schedule,
    bookedTime: data?.bookedTime,
    reserveTime: data?.reserveTime,
    startCity: data?.startCity,
    endCity: data?.endCity,
    paxCount: data?.paxCount,
    status: data?.status,
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

export async function getReservationByID(id) {
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

export async function deleteReservation(id) {
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
