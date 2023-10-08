import React, { useState, useEffect } from "react";
import { getUserByID , editUser} from "../../services/UserServices";
import { CardTitle } from "reactstrap";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UpdateStatus } from "../../services/PRServices";
import { createOrder } from "../../services/OrderService";
import moment from "moment";

const EditUser = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    nic: "",
    address: "",
    number: "",
    email: "",
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



  const id = useParams();

  const getSelectedUser = async () => {
    const data = await getUserByID(id.id);
    console.log("selected user data", data.data);
    setData({     
      name: data.data?.name,
      nic: data.data?.email,
      address: data.data?.address,
      number: data.data?.number,
      email: data.data?.email,
      dob: data.dob,
      gender: data.data?.gender,
      userRole: data.data?.userRole
    });
 
  };

  useEffect(() => {
    getSelectedUser();
  }, []);



  const EditUserFunc = async (e) => {
    e.preventDefault();
      console.log(id.id, data);
      let newdata = await editUser(id.id,data);
      console.log(" Order data ", newdata);
      if (newdata?.status == 204) {
        Swal.fire({
          icon: "success",
          title: "Successful!",
          text: "User Updated Success!",
        });
        
        navigate("/user-manage");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Update Failed!",
        });
      }
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
              <form className="form-group" onSubmit={EditUserFunc}>
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

                <label style={{ marginTop: "15px" }}>NIC</label>
                <input
                  className="form-control"
                  name="nic"
                  value={data.nic}
                  type="text"
                  onChange={handleChange}
                />

                {/* <label style={{ marginTop: "15px" }}>Address</label>
                <input
                  className="form-control"
                  name="address"
                  value={data.address}
                  type="text"
                  
                /> */}
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
                  value={moment(data.dob).format("MM/DD/YYYY")}
                  type="text"
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

export default EditUser;
