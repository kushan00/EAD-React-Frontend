import React, { useState } from "react";
import { createSchedule } from "../../services/ScheduleService"; // Import your schedule-related service function here
import { CardTitle } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddSchedule = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const AddNewSchedule = async (e) => {
    e.preventDefault();
    console.log(data);
    let newdata = await createSchedule(data); // Replace with your service function to create a schedule
    console.log("Add schedule data", newdata);
    if (newdata?.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Successful!",
        text: "Schedule Added Successfully!",
      });

      navigate("/schedule-manage"); // Adjust the route to your schedule management page
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
                  <b>Add New Schedule</b>
                </h3>
              </CardTitle>
            </center>

            <div className="container" style={{ width: "50%" }}>
              <form className="form-group" onSubmit={AddNewSchedule}>
                <label style={{ marginTop: "15px" }}>Start City</label>
                <input
                  className="form-control"
                  name="startCity"
                  value={data?.startCity}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Cities</label>
                <input
                  className="form-control"
                  name="cities"
                  value={data?.cities}
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

                <label style={{ marginTop: "15px" }}>Price</label>
                <input
                  className="form-control"
                  name="price"
                  value={data?.price}
                  type="number"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Train</label>
                <input
                  className="form-control"
                  name="train"
                  value={data?.train}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Start Time</label>
                <input
                  className="form-control"
                  name="startTime"
                  value={data?.startTime}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>End Time</label>
                <input
                  className="form-control"
                  name="endTime"
                  value={data?.endTime}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Class</label>
                <input
                  className="form-control"
                  name="class"
                  value={data?.class}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Type</label>
                <input
                  className="form-control"
                  name="type"
                  value={data?.type}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Run By</label>
                <input
                  className="form-control"
                  name="runBy"
                  value={data?.runBy}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Is Active</label>
                <input
                  className="form-control"
                  name="isActive"
                  value={data?.isActive}
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

export default AddSchedule;
