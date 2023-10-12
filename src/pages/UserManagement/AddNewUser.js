import { useState } from "react";
import { addUser } from "../../services/UserServices";
import { CardTitle } from "reactstrap";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Adduser = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    nic: "",
    address: "",
    number: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    userRole: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const AddNewUser = async (e) => {
    e.preventDefault();
    console.log(data);
    if (
      data.name === "" ||
      data.nic === "" ||
      data.address === "" ||
      data.number === "" ||
      data.email === "" ||
      data.password === "" ||
      data.dob === "" ||
      data.gender === "" ||
      data.userRole === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill all the fields!",
      });
    } else {
      let newdata = await addUser(data);
      console.log(" addUser data ", newdata);
      if (newdata?.status === 200) {
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
    }
  };

  const optionUserRole = [
    { value: "Back_Office", label: "Back office" },
    { value: "Traveler", label: "Traveler" },
    { value: "Agent", label: "Travel Agent" },
  ];
  const optionGender = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const [selectedUserRole, setSelectedUserRole] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  const handleUserRoleChange = (selectedOption) => {
    setSelectedUserRole(selectedOption);
    setData((prevData) => ({
      ...prevData,
      userRole: selectedOption?.value,
    }));
  };
  const handleUserGender = (selectedOption) => {
    setSelectedGender(selectedOption);
    setData((prevData) => ({
      ...prevData,
      gender: selectedOption?.value,
    }));
  };

  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <center>
            <br></br>
            <CardTitle style={{ color: "black", fontSize: "40px" }}>
              <h2>
                <b>Add New User Details</b>
              </h2>
            </CardTitle>
          </center>
          <hr />
          <div className="container" style={{ width: "70%" }}>
            <form className="form-group" onSubmit={AddNewUser}>
              <label style={{ marginTop: "15px" }}>Full Name*</label>
              <input
                className="form-control"
                name="name"
                value={data?.name}
                type="text"
                onChange={handleChange}
              />

              <label style={{ marginTop: "15px" }}>NIC*</label>
              <input
                className="form-control"
                name="nic"
                value={data.nic}
                type="text"
                onChange={handleChange}
              />

              <label style={{ marginTop: "15px" }}>Email*</label>
              <input
                className="form-control"
                name="email"
                value={data?.email}
                type="text"
                onChange={handleChange}
              />

              <label style={{ marginTop: "15px" }}>Password*</label>
              <input
                className="form-control"
                name="password"
                minLength="6"
                value={data.password}
                type="password"
                onChange={handleChange}
              />

              <div className="row">
                <div className="col">
                  <label style={{ marginTop: "15px" }}>Address*</label>
                  <textarea
                    className="form-control"
                    name="address"
                    value={data.address}
                    type="text"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <label style={{ marginTop: "15px" }}>Number*</label>
              <input
                className="form-control"
                name="number"
                maxLength="10"
                minLength="9"
                value={data.number}
                type="Number"
                onChange={handleChange}
              />

              <label style={{ marginTop: "15px" }}>Date Of Birth*</label>
              <input
                className="form-control"
                name="dob"
                value={data.dob}
                type="date"
                onChange={handleChange}
              />

              <label style={{ marginTop: "15px" }}>Gender*</label>
              <Select
                value={selectedGender}
                onChange={handleUserGender}
                options={optionGender}
              />

              <label style={{ marginTop: "15px" }}>User Role</label>
              <Select
                value={selectedUserRole}
                onChange={handleUserRoleChange}
                options={optionUserRole}
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
                          borderRadius: "10px",
                          fontSize: "20px",
                        }}
                        type="submit"
                        className="btn btn-dark"
                      >
                        Add Confirm
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
  );
};

export default Adduser;
