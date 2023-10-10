import React, { useState, } from "react";
import { createTrain } from "../../services/TrainService";
import { CardTitle } from "reactstrap";


import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const AddTrain = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const AddNewTrain = async (e) => {
    e.preventDefault();
    console.log(data);
    let newdata = await createTrain(data);
    console.log(" addUser data ", newdata);
    if (newdata?.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Successful!",
        text: "Train Added Success!",
      });

      navigate("/train-manage");
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
              <CardTitle style={{ color: "black", fontSize: "40px" }}>
                <h3>
                  <b>Add New Train</b>
                </h3>
              </CardTitle>
            </center>

            <div className="container" style={{ width: "50%" }}>
              <form className="form-group" onSubmit={AddNewTrain}>
                <label style={{ marginTop: "15px" }}>Train Id</label>
                <input
                  className="form-control"
                  name="TrainId"
                  value={data?.TrainId}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Name</label>
                <input
                  className="form-control"
                  name="Name"
                  value={data?.Name}
                  type="text"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}>Seating Capacity</label>
                <input
                  className="form-control"
                  name="SeatingCapacity"
                  value={data.SeatingCapacity}
                  type="number"
                  onChange={handleChange}
                />

                <label style={{ marginTop: "15px" }}> Fuel Type</label>
                <input
                  className="form-control"
                  name="FuelType"
                  value={data.FuelType}
                  type="text"
                  onChange={handleChange}
                />

                <div className="row">
                  <div className="col">
                    <label style={{ marginTop: "15px" }}>Model</label>
                    <textarea
                      className="form-control"
                      name="Model"
                      value={data.Model}
                      type="text"
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

export default AddTrain;
