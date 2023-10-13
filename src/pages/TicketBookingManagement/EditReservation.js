import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReservationByID, updateReservation } from "../../services/ReservationService"; // Import your reservation-related service functions here
import { CardTitle } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-clock/dist/Clock.css';

const EditReservation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({});
  const [reserveTime, setreserveTime] = useState("");
  const [bookedTime, setbookedTime] = useState("");
  const [totalPrice, settotalPrice] = useState(0);

  const calculatePrice = (psgCount,price) => {
    return parseFloat(psgCount) * parseFloat(price);
  }



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

  const getSelectedReservation = async () => {
    const response = await getReservationByID(id);
    console.log("Selected reservation data", response.data);

    // Modify the data mapping based on your reservation attributes
    setData({
      bookingId: response?.data?.bookingId,
      user: response?.data?.user,
      schedule: response?.data?.schedule,
      startCity: response?.data?.startCity,
      endCity: response?.data?.endCity,
      paxCount: response?.data?.paxCount,
      status: response?.data?.status,
    });
    settotalPrice(response?.data?.totalPrice);
    setreserveTime(moment(response?.data?.reserveTime).format("YYYY-MM-DD : HH:mm"));
    setbookedTime(moment(response?.data?.bookedTime).format("YYYY-MM-DD : HH:mm"));
  };

  useEffect(() => {
    getSelectedReservation();
  }, []);


  const editReservation = async (e) => {
    e.preventDefault();
    console.log(data);
    let response = await updateReservation(id, data,bookedTime,reserveTime,totalPrice); // Replace with your service function to update a reservation
    console.log("Update reservation data", response);
    if (response?.status === 204) {
      Swal.fire({
        icon: "success",
        title: "Successful!",
        text: "Reservation Update Success!",
      });

      navigate("/reservation-manage"); // Adjust the route to your reservation management page
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Update Failed!",
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
                  <b>Edit Reservation</b>
                </h3>
              </CardTitle>
            </center>

            <div className="container" style={{ width: "50%" }}>
              <form className="form-group" onSubmit={editReservation}>
                <label style={{ marginTop: "15px" }}>Booking ID</label>
                <input
                  className="form-control"
                  name="bookingId"
                  value={data?.bookingId}
                  type="text"
                  onChange={handleChange}
                  readOnly
                />

                {/* <label style={{ marginTop: "15px" }}>User</label>
                <input
                  className="form-control"
                  name="user"
                  value={data?.user}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Schedule</label>
                <input
                  className="form-control"
                  name="schedule"
                  value={data?.schedule}
                  type="text"
                  onChange={handleChange}
                /> */}

                <label style={{ marginTop: "15px" }}>Booked Date & Time</label>
                <input
                  className="form-control"
                  value={bookedTime}
                  type="text"
                  readOnly
                />

                <label style={{ marginTop: "15px" }}>Reserve Date & Time</label>
                <input
                  className="form-control"
                  value={reserveTime}
                  type="text"
                  readOnly
                />

                <label style={{ marginTop: "15px" }}>Start City</label>
                <input
                  className="form-control"
                  name="startCity"
                  value={data?.startCity}
                  type="text"
                  onChange={handleChange}
                  readOnly
                />

                <label style={{ marginTop: "15px" }}>End City</label>
                <input
                  className="form-control"
                  name="endCity"
                  value={data?.endCity}
                  type="text"
                  onChange={handleChange}
                  readOnly
                />

                <label style={{ marginTop: "15px" }}>Passenger Count</label>
                <input
                  className="form-control"
                  name="paxCount"
                  value={data?.paxCount}
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

                {/* <label style={{ marginTop: "15px" }}>Status</label>
                <input
                  className="form-control"
                  name="status"
                  value={data?.status}
                  type="text"
                  onChange={handleChange}
                /> */}

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

export default EditReservation;
