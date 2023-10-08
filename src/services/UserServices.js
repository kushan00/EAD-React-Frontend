import axios from "axios";

import StartUrl from "../configs/Url.json";

const AddUserURL = StartUrl?.StartUrl + "/Account";
const GetAllUsersURL = StartUrl?.StartUrl + "/Account";
const GetUserByIDURL = StartUrl?.StartUrl + "/Account/";
const UpdateUserByIDURL = StartUrl?.StartUrl + "/Account/";
const DeleteUserByIDURL = StartUrl?.StartUrl + "/Account/";


export async function addUser(data){
  let result;
  await axios.post(AddUserURL,data)
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

export async function getAllUsers(){
    let result;
    await axios.get(GetAllUsersURL)
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


export async function getUserByID(id){
  let result;
  await axios.get(GetUserByIDURL+id)
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

export async function editUser(id,data){
  let result;
  await axios.put(UpdateUserByIDURL+id,data)
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

export async function deleteUserByID(id){
  let result;
  await axios.delete(DeleteUserByIDURL+id)
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