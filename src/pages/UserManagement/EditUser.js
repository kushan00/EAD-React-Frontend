import { useState, useEffect } from "react";
import { getUserByID, editUser } from "../../services/UserServices";
import { CardTitle } from "reactstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import Select from "react-select";

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
    userRole: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      userRole: data.data?.userRole,
    });
  };

  useEffect(() => {
    getSelectedUser();
  }, []);

  const EditUserFunc = async (e) => {
    e.preventDefault();
    console.log(id.id, data);
    if (
      data.name === "" ||
      data.nic === "" ||
      data.address === "" ||
      data.number === "" ||
      data.email === "" ||
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
      let newdata = await editUser(id.id, data);
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
    }
  };

  return (
    <div className="main">
      <div className="sub-main">
        <center>
          <br></br>
          <CardTitle style={{ color: "black", fontSize: "40px" }}>
            <h2>
              <b>Edit User Details</b>
            </h2>
          </CardTitle>
        </center>
        <hr />
        <div className="container" style={{ width: "70%" }}>
          <form className="form-group" onSubmit={EditUserFunc}>
            <label style={{ marginTop: "15px" }}>Full Name</label>
            <input
              className="form-control-user"
              name="name"
              value={data?.name}
              type="text"
              onChange={handleChange}
            />

            <label style={{ marginTop: "15px" }}>Email</label>
            <input
              className="form-control-user"
              name="email"
              value={data?.email}
              type="text"
              onChange={handleChange}
            />

            <label style={{ marginTop: "15px" }}>NIC</label>
            <input
              className="form-control-user"
              name="nic"
              value={data.nic}
              type="text"
              onChange={handleChange}
            />

            <div className="row">
              <div className="col">
                <label style={{ marginTop: "15px" }}>Address</label>
                <textarea
                  className="form-control-user"
                  name="address"
                  value={data.address}
                  type="text"
                  onChange={handleChange}
                />
              </div>
            </div>

            <label style={{ marginTop: "15px" }}>Number</label>
            <input
              className="form-control-user"
              name="number"
              value={data.number}
              type="text"
              onChange={handleChange}
            />

            <label style={{ marginTop: "15px" }}>Date Of Birth</label>
            <input
              className="form-control-user"
              name="dob"
              value={data.dob?.toString()?.substring(0, 10)}
              type="date"
              onChange={handleChange}
            />

            <label style={{ marginTop: "15px" }}>Gender</label>
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

            <div className="row">
              <div className="col">
                <label style={{ marginTop: "15px" }}>
                  Password (Only for Change password)
                </label>
                <input
                  className="form-control-user"
                  name="password"
                  value={data.password}
                  type="password"
                  onChange={handleChange}
                />
              </div>
            </div>

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
                      Edit Confirm
                    </button>
                  </div>
                </div>
              </center>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
