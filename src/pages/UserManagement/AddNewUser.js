import React, { useState, useEffect } from "react";
import { addUser} from "../../services/UserServices";
import { CardTitle } from "reactstrap";
import Select from "react-select";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

const Adduser = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    nic: "",
    address: "",
    number: "",
    email: "",
    password:"",
    dob: "",
    gender: "",
    userRole: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };






  const AddNewUser = async (e) => {
    e.preventDefault();
      console.log(data);
      let newdata = await addUser(data);
      console.log(" addUser data ", newdata);
      if (newdata?.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Successful!",
          text: "User Added Success!",
        });
        
        navigate("/user-manage");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Add Failed!",
        });
      }
  };

  const options = [
    { value: "backoffice", label: "Backoffice" },
    { value: "traveler", label: "Traveller" },
    { value: "TravelAgent", label: "Travel Agent" },
  ];

    const [selectedUserRole, setSelectedUserRole] = useState(null);

    const handleUserRoleChange = (selectedOption) => {
        setSelectedUserRole(selectedOption);
        setData((prevData) => ({
            ...prevData,
            "userRole": selectedOption?.value
          }));
    };

  return (
    <div>
      <div>
        <div
          class="container"
          style={{
            marginTop: "70px",
            marginBottom: "70px",
            width: "950px",
            float: "none",
            backgroundColor: "white",
            border: "1px solid black",
          }}
        >
          <div>
            <center>
              <br></br>
              <CardTitle style={{ color: "black", fontSize: "40px" }}><h3><b>Edit User Details</b></h3>
              </CardTitle>
            </center>

            <div className="container" style={{ width: "50%" }}>
              <form className="form-group" onSubmit={AddNewUser}>
                <label style={{ marginTop: "15px" }}>Full Name</label>
                <input
                  className="form-control"
                  name="name"
                  value={data?.name}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Email</label>
                <input
                  className="form-control"
                  name="email"
                  value={data?.email}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Password</label>
                <input
                  className="form-control"
                  name="password"
                  value={data.password}
                  type="password"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>NIC</label>
                <input
                  className="form-control"
                  name="nic"
                  value={data.nic}
                  type="text"
                  onChange={handleChange}
                />

                <div className="row">
                  <div className="col">
                    <label style={{ marginTop: "15px" }}>Address</label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={data.address}
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <label style={{ marginTop: "15px" }}>Number</label>
                <input
                  className="form-control"
                  name="number"
                  value={data.number}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Date Of Birth</label>
                <input
                  className="form-control"
                  name="dob"
                  value={data.dob}
                  type="date"
                  onChange={handleChange}
                />


                <label style={{ marginTop: "15px" }}>Gender</label>
                <input
                  className="form-control"
                  name="gender"
                  value={data.gender}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>User Role</label>
                <Select
                    value={selectedUserRole}
                    onChange={handleUserRoleChange}
                    options={options}
                />
                

                <center>
                  <br></br>
                  <center>
                        <div className="row">
                          <div className="col">
                            <button
                              style={{
                                marginTop: "15px",
                                marginBottom: "15px",
                                width: "200px",
                              }}
                              type="submit"
                              className="btn btn-dark"
                            >
                              Confirm Edit
                            </button>
                          </div>
                        </div>
                  </center>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adduser;
