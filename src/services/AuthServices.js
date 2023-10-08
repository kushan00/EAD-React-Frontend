import axios from "axios";

import StartUrl from "../configs/Url.json";

const LoginURL = StartUrl?.StartUrl + "/account/login";
const AuthURL = StartUrl?.StartUrl + "/Account/Profile";
const UpdateUserURL = StartUrl?.StartUrl + "/user/update-user/";

export async function LoginUsers(data){
    const alldata = {
        nic:data?.nic,
        password:data?.password,
    };

    // const alldata = {
    //   nic : "123456789",
    //   password : "12345678",
    // }
  
    
    let result;
    await  axios.post(LoginURL,alldata)
     .then(function(data) {
         //console.log("success data",data)
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
           //console.log(error.response.data);
           result = error.response;
           
         } else if (error.request) {
           //console.log(error.request);
           result = error.request;
         } 
     
       });
  return result;
}


export async function Auth(){

    let result;
    await  axios.get(AuthURL)
     .then(function(data) {
         //console.log("success data",data)
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
           //console.log(error.response.data);
           result = error.response;
           
         } else if (error.request) {
           //console.log(error.request);
           result = error.request;
         } 
     
       });
  return result;
}

export async function UpdateUser(id,data) {
  const alldata = {
      name: data?.name,
      number: data?.number,
      email: data?.email,
      nic: data?.nic,
  };

  return await axios.put(UpdateUserURL + id, alldata);

}