import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTrainByID } from "../../services/TrainService";
import { updateTrain } from "../../services/TrainService";
import { CardTitle } from "reactstrap";
import Select from "react-select";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

const EditTrain = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const id = useParams();

  const getSelectedTrain = async () => {
    const data = await getTrainByID(id.id);

    console.log("selected train data", data.data);

    setData({
      TrainId: data?.data?.trainId,
      Name: data?.data?.name,
      SeatingCapacity: data?.data?.seatingCapacity,
      FuelType: data?.data?.fuelType,
      Model: data?.data?.model,
      _id: data?.data?.id,
    });
  };

  useEffect(() => {
    getSelectedTrain();
  }, []);

  const EditTrain = async (e) => {
    e.preventDefault();
    console.log(data);
    let newdata = await updateTrain(id.id, data);
    console.log(" addUser data ", newdata);
    if (newdata?.status === 204) {
      Swal.fire({
        icon: "success",
        title: "Successful!",
        text: "Train Update Success!",
      });

      navigate("/train-manage");
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
              <CardTitle style={{ color: "black", fontSize: "40px" }}>
                <h3>
                  <b>Edit Train</b>
                </h3>
              </CardTitle>
            </center>

            <div className="container" style={{ width: "50%" }}>
              <form className="form-group" onSubmit={EditTrain}>
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

export default EditTrain;
