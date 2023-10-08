import { createContext, useEffect, useState } from "react";
import { Auth } from "../services/AuthServices";
import Cookies from "js-cookie";

const AuthContext = createContext();

function AuthContextProvider(props) {

  const [Token, setToken] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [userLogged, setuserLogged] = useState(false);

  const checkToken = async ()=>{
    // let data = await Auth(Cookies.get("TrainLogin"));
    // if(data?.status == 200){
    if (Cookies.get("TrainLogin") !== undefined) {
      setuserLogged(true);
    } else {
      setuserLogged(false);
    }
    console.log("data", Cookies.get("TrainLogin"));
  }

  useEffect(() => {

    checkToken();
    setToken(Cookies.get("TrainLogin"));
    setUserRole("admin");
    setuserLogged(true);

    if (Cookies.get("TrainLogin") === undefined) {
      Cookies.remove("TrainLogin", { path: "" });
      setToken(Cookies.get("TrainLogin"));
      setUserRole("");
      setuserLogged(false);
    }
    
  }, []);


  return (
    <AuthContext.Provider value={{ Token, userRole , userLogged}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
