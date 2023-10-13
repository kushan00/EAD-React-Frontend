
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../services/AuthServices";
import { Card, CardBody, Form, Button } from "reactstrap";
import Swal from "sweetalert2";
import "./Auth/responsive.css";
import { ValidateUserUpdate } from "./Auth/Validation";
import { UpdateProfile } from "../services/AuthServices";
import Navbar from "../components/Navbar/Navbar";

const TravelerProfile = () => {
  const navigate = useNavigate();

  const [User, setUser] = useState({});
  const [UserData, setUserData] = useState({
    name: "",
    email: "",
    number: "",
    nic: "",
    user_role: "",
    status: "",
    uid: "",
  });

  const { name, email, number } = UserData;

  const onChange = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
  };

  const getUser = async () => {
    const data = await Auth();
    console.log("Auth data", data.data);
    setUser(data?.data);
    setUserData({
      name: data?.data?.name,
      email: data?.data?.email,
      number: data?.data?.number,
      nic: data?.data?.nic,
      user_role: data?.data?.userRole,
      status: data?.data?.isActive,
      uid: data?.data?.id,
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const [updateChange, setUpdateChange] = useState(false);
  const ChangeToUpdate = (e) => {
    e.preventDefault();
    setUpdateChange(true);
  };

  const UpdateData = async (e) => {
    e.preventDefault();

    let validate = ValidateUserUpdate(UserData);
    let msg = validate?.message;
    if (validate.status == false) {
      Swal.fire({
        toast: true,
        icon: "warning",
        html: `<span>${msg}</span>`,
        animation: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
      });
    } else {
      var data = await UpdateProfile(User._id, UserData);
      console.log("data", data);
      if (data?.data?.status == 1) {
        Swal.fire({
          icon: "success",
          title: "Congrats!",
          text: "Update successfull...!",
        });
        navigate("/profile");
        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed..!",
          text: `${data?.data?.message}`,
        });
      }
    }
  };

  return (
    <div>
      <Navbar/>
      <br></br>
      <div>
        <center>
          <h1
            style={{
              fontSize: "40px",
              marginBottom: "30px",
              color: "white",
              width: "800px",
            }}
          >
            <b>{User?.name}'s Profile</b>
          </h1>
          <div>
            <Card id="responsiveCard">
              <CardBody>
                <div style={{ width: "600px" }}>
                  <br />
                  <br />
                  <Form className="form">
                    <div className="form-group">
                      <input
                        id="responsiveProfile"
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={(e) => onChange(e)}
                        readOnly={!updateChange ? true : false}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        id="responsiveProfile"
                        className="form-control"
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                        readOnly={!updateChange ? true : false}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        id="responsiveProfile"
                        className="form-control"
                        type="text"
                        placeholder="Mobile no"
                        name="number"
                        value={number}
                        onChange={(e) => onChange(e)}
                        readOnly={!updateChange ? true : false}
                      />
                    </div>
                    <br />
                    <Button
                      color="danger"
                      onClick={(e) => ChangeToUpdate(e)}
                      style={{ display: updateChange ? "none" : "flex" }}
                    >
                      Click To Update
                    </Button>
                    <Button
                      className="btn btn-dark"
                      onClick={(e) => UpdateData(e)}
                      style={{ display: updateChange ? "flex" : "none" }}
                    >
                      Update
                    </Button>
                    <br />
                  </Form>
                </div>
              </CardBody>
            </Card>
          </div>
        </center>
      </div>
    </div>
  );
};

export default TravelerProfile;
