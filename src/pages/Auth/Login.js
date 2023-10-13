import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUsers } from "../../services/AuthServices.js";
import Swal from "sweetalert2";
import "./responsive.css";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nic: "8965436789",
    password: "12345678",
  });

  const { nic, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    let data = await LoginUsers(formData);
    console.log("data", data?.data);
    if (data?.data?.token != null) {
      Cookies.set("TrainLogin", data?.data?.token, { expires: 1 / 24 });
      Cookies.set("userID", data?.data?.id, { expires: 1 / 24 });
      Swal.fire({
        icon: "success",
        title: "Login success..!",
        text: `Login success`,
      });
      if (data?.data?.role === "Traveler") {
        navigate("/traveler-booking");
        window.location.reload();
      } else {
        navigate("/");
        window.location.reload();
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed..!",
        text: `${data?.data?.message}`,
      });
    }
  };

  return (
    <div className="main">
      <div className="sub-main">
        <div className="main-center">
          <div style={{ padding: "100px" }}>
            <center>
              <br></br>
              <h1 className="heading" style={{ fontWeight: "bold" }}>
                Login
              </h1>
              <h4 className="heading">Login To Your Account</h4>
              <hr />

              <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="nic" className="larger-label">
                    NIC
                  </label>
                  <input
                    className="form-control-user"
                    type="text"
                    required
                    placeholder="NIC"
                    name="nic"
                    value={nic}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="larger-label">
                    Password
                  </label>
                  <input
                    className="form-control-user"
                    type="password"
                    required
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password}
                    onChange={(e) => onChange(e)}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-dark larger-button"
                  value="Login"
                />
              </form>
              <br />
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
