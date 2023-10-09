import React, { useState } from "react";
import { createReservation } from "../../services/ReservationService"; // Import your reservation-related service function here
import { CardTitle } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

const AddReservation = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const AddNewReservation = async (e) => {
    e.preventDefault();
    console.log(data);
    let newdata = await createReservation(data); // Replace with your service function to create a reservation
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
                <label style={{ marginTop: "15px" }}>Booking ID</label>
                <input
                  className="form-control"
                  name="bookingId"
                  value={data?.bookingId}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>User</label>
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
                  value={data.schedule}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Booked Time</label>
                <input
                  className="form-control"
                  name="bookedTime"
                  value={data.bookedTime}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Reserve Time</label>
                <input
                  className="form-control"
                  name="reserveTime"
                  value={data.reserveTime}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Start City</label>
                <input
                  className="form-control"
                  name="startCity"
                  value={data.startCity}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>End City</label>
                <input
                  className="form-control"
                  name="endCity"
                  value={data.endCity}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Passenger Count</label>
                <input
                  className="form-control"
                  name="paxCount"
                  value={data.paxCount}
                  type="number"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Status</label>
                <input
                  className="form-control"
                  name="status"
                  value={data.status}
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
