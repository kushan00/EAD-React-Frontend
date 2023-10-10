import axios from "axios";

import StartUrl from "../configs/Url.json";

const CreateURL = StartUrl?.StartUrl + "/api/Train";
const GetAllURL = StartUrl?.StartUrl + "/api/Train";
const GetAllActiveURL = StartUrl?.StartUrl + "/api/Train/active";
const UpdateURL = StartUrl?.StartUrl + "/api/Train/";
const GetByID = StartUrl?.StartUrl + "/api/Train/";
const DeleteURL = StartUrl?.StartUrl + "/api/Train/";



export async function getAllTrains() {
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

export async function getAllActiveTrains() {
  let result;
  await axios
    .get(GetAllActiveURL)
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



export async function createTrain(data) {
  const alldata = {
    TrainId: data?.TrainId,
    Name: data?.Name,
    SeatingCapacity: data?.SeatingCapacity,
    FuelType: data?.FuelType,
    Model: data?.Model,       
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

export async function updateTrain(id,data) {
  const alldata = {
    trainId: data?.TrainId,
    name: data?.Name,
    seatingCapacity: data?.SeatingCapacity,
    fuelType: data?.FuelType,
    model: data?.Model,       
  };

  console.log(" all data ",alldata);

  let result;
  await  axios.put(UpdateURL + id,alldata)
   .then(function(data) {
      
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

export async function getTrainByID(id) {
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


export async function deleteTrain(id) {
  let result;
  await axios.delete(DeleteURL + id)
   .then(function(data) {
      
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


