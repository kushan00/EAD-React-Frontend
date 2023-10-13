import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [Token, setToken] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [userLogged, setuserLogged] = useState(false);

  const checkToken = async () => {
    if (Cookies.get("TrainLogin") !== undefined) {
      setuserLogged(true);
    } else {
      setuserLogged(false);
    }
    console.log("data", Cookies.get("TrainLogin"));
  };

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
    <AuthContext.Provider value={{ Token, userRole, userLogged }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
