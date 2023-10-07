import { createContext, useEffect, useState } from "react";
import { Auth } from "../services/AuthServices";
import Cookies from "js-cookie";

const AuthContext = createContext();

function AuthContextProvider(props) {

  const [Token, setToken] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [userLogged, setuserLogged] = useState(false);

  const checkToken = async ()=>{
    // let data = await Auth(Cookies.get("Train"));
    // if(data?.status == 200){
      if (Cookies.get("Train") !== undefined) 
      {
        setuserLogged(true);
      }
      else{
        setuserLogged(false);
      }
      console.log("data",Cookies.get("Train"));
    
  }

  useEffect(() => {

    checkToken();
    setToken(Cookies.get("Train"));
    setUserRole("admin");
    setuserLogged(true);

    if (Cookies.get("Train") === undefined) 
    {
      Cookies.remove('Train', { path: '' })
      setToken(Cookies.get("Train"));
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
