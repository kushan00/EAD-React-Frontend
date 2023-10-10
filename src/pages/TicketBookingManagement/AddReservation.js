import React, { useState , useEffect } from "react";
import { createReservation } from "../../services/ReservationService"; // Import your reservation-related service function here
import { CardTitle } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { getAllUsers} from '../../services/UserServices';
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-clock/dist/Clock.css';
import TimePicker from "react-time-picker";

const AddReservation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [UserDetails, setAllUserDetails] = useState([]);
  const [selectedUser, setselectedUser] = useState({});
  const [selectedbookedDate, setSelectedbookedDate] = useState(null);
  const [selectedbookedTime, setSelectedbookedTime] = useState("12:00");
  const [selectedreserveDate, setSelectedreserveDate] = useState(null);
  const [selectedreserveTime, setSelectedreserveTime] = useState("12:00");
  const [totalPrice, settotalPrice] = useState(0);

  const calculatePrice = (psgCount,price) => {
    return parseFloat(psgCount) * parseFloat(price);
  }

  const handlebookedDateChange = (date) => {
    setSelectedbookedDate(date);
  };

  const handlebookedTimeChange = (e) => {
    const { name, value } = e.target;
    setSelectedbookedTime(value);
  };

  const handlereserveDateChange = (date) => {
    setSelectedreserveDate(date);
  };

  const handlereserveTimeChange = (e) => {
    const { name, value } = e.target;
    setSelectedreserveTime(value);
  };

  const formatDate = (date, time) => {
    const formattedDate = date ? date.toISOString().split("T")[0] : "";
    return `${formattedDate}T${time}:00.000Z`;
  };

  const handleUserChange = (selectedOption) => {
    setselectedUser(selectedOption);
    setData((prevData) => ({
      ...prevData,
      "user": selectedOption?.value,
    }));
  };

  const getUsers = async () => {
    try {
        let data = await getAllUsers();
        console.log("all users", data.data);


        let newData = [];
         data?.data?.map((user) => {
          if(user?.userRole === "traveler")
            {
                newData.push({
                  name: user?.name,
                  email: user?.email,
                  gender: user?.gender,
                  address: user?.address,
                  number: user?.number,
                  nic: user?.nic, 
                  id :user?.id,
                  userRole:user?.userRole
                });
            }
        })

        const options = newData?.map((user) => ({
          value: user.id,
          label: user.name,
        }));

        setAllUserDetails(options);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
    setData((prevData) => ({
      ...prevData,
      "startCity": localStorage.getItem("startCity"),
    }));
    setData((prevData) => ({
      ...prevData,
      "endCity": localStorage.getItem("endCity"),
    }));
  }, [])
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if(name === "paxCount")
    {
      console.log(localStorage.getItem("price"));
      console.log(value);
      console.log("total Price",calculatePrice(value,localStorage.getItem("price")))
      settotalPrice(calculatePrice(value,localStorage.getItem("price")))
    }
  };

  const AddNewReservation = async (e) => {
    e.preventDefault();
    console.log(data);
    var bookedTime = formatDate(selectedbookedDate,selectedbookedTime);
    var reserveTime = formatDate(selectedreserveDate,selectedreserveTime);
    let newdata = await createReservation(data,id,bookedTime,reserveTime,totalPrice); // Replace with your service function to create a reservation
    console.log("Add reservation data", newdata);
    if (newdata?.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Successful!",
        text: "Reservation Added Successfully!",
      });

      navigate("/ticket-booking-manage"); // Adjust the route to your reservation management page
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Add Failed!",
      });
    }
  };

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "300px", // Adjust the width as needed
    margin: "0 auto", // Center the content horizontally
  };

  const dateStyle = {
    flex: 1,
    marginRight: "10px", // Adjust the spacing between date and time picker
  };

  const labelStyle = {
    fontWeight: "bold",
  };
 

  return (
    <div>
      <div>
        <div
          className="container"
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
              <CardTitle style={{ color: "black", fontSize: "40px" }}>
                <h3>
                  <b>Add New Reservation</b>
                </h3>
              </CardTitle>
            </center>

            <div className="container" style={{ width: "50%" }}>
              <form className="form-group" onSubmit={AddNewReservation}>

                <label style={{ marginTop: "15px" }}>User</label>

                <Select
                  value={selectedUser}
                  onChange={handleUserChange}
                  options={UserDetails}
                />

                <label style={{ marginTop: "15px" }}>Schedule ID</label>
                <input
                  className="form-control"
                  value={id}
                  type="text"
                  readOnly
                />

                <label style={{ marginTop: "15px" }}>Booked Date & Time</label>
                <div style={divStyle}>
                  <div style={dateStyle}>
                    <label style={labelStyle}>Date:</label>
                    <DatePicker
                     className="form-control"
                      selected={selectedbookedDate}
                      onChange={handlebookedDateChange}
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Time:</label>
                    <input
                      className="form-control"
                      name="startTime"
                      value={selectedbookedTime}
                      type="time"
                      onChange={handlebookedTimeChange}
                    />
                  </div>
                </div>

                <label style={{ marginTop: "15px" }}>Reserve Date & Time</label>
                <div style={divStyle}>
                  <div style={dateStyle}>
                    <label style={labelStyle}>Date:</label>
                    <DatePicker
                      className="form-control"
                      selected={selectedreserveDate}
                      onChange={handlereserveDateChange}
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Time:</label>                    
                    <input
                      className="form-control"
                      name="startTime"
                      value={selectedreserveTime}
                      type="time"
                      onChange={handlereserveTimeChange}
                    />
                  </div>
                </div>

                <label style={{ marginTop: "15px" }}>Start City</label>
                <input
                  className="form-control"
                  name="startCity"
                  value={data.startCity}
                  type="text"
                  readOnly
                />

                <label style={{ marginTop: "15px" }}>End City</label>
                <input
                  className="form-control"
                  name="endCity"
                  value={data.endCity}
                  type="text"
                  readOnly
                />

                <label style={{ marginTop: "15px" }}>Passenger Count</label>
                <input
                  className="form-control"
                  name="paxCount"
                  value={data.paxCount}
                  type="number"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Total Price</label>
                <input
                  className="form-control"
                  value={totalPrice}
                  type="text"
                  readOnly
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
                          Save
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

export default AddReservation;
