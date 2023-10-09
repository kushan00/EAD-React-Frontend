import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReservationByID, updateReservation } from "../../services/ReservationService"; // Import your reservation-related service functions here
import { CardTitle } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

const EditReservation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getSelectedReservation = async () => {
    const response = await getReservationByID(id);
    console.log("Selected reservation data", response.data);

    // Modify the data mapping based on your reservation attributes
    setData({
      bookingId: response?.data?.bookingId,
      user: response?.data?.user,
      schedule: response?.data?.schedule,
      bookedTime: response?.data?.bookedTime,
      reserveTime: response?.data?.reserveTime,
      startCity: response?.data?.startCity,
      endCity: response?.data?.endCity,
      paxCount: response?.data?.paxCount,
      status: response?.data?.status,
    });
  };

  useEffect(() => {
    getSelectedReservation();
  }, []);

  const editReservation = async (e) => {
    e.preventDefault();
    console.log(data);
    let response = await updateReservation(id, data); // Replace with your service function to update a reservation
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
                  value={data?.schedule}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Booked Time</label>
                <input
                  className="form-control"
                  name="bookedTime"
                  value={data?.bookedTime}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Reserve Time</label>
                <input
                  className="form-control"
                  name="reserveTime"
                  value={data?.reserveTime}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Start City</label>
                <input
                  className="form-control"
                  name="startCity"
                  value={data?.startCity}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>End City</label>
                <input
                  className="form-control"
                  name="endCity"
                  value={data?.endCity}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Passenger Count</label>
                <input
                  className="form-control"
                  name="paxCount"
                  value={data?.paxCount}
                  type="number"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Status</label>
                <input
                  className="form-control"
                  name="status"
                  value={data?.status}
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

export default EditReservation;
