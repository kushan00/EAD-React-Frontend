import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Form,
} from "reactstrap";

import moment from "moment";
import Swal from "sweetalert2";
import { getAllTrains } from "../../services/TrainService";
import { deleteTrain } from "../../services/TrainService";
import editIcon from "../../assets/images/pencil.png";
import binIcon from "../../assets/images/bin.png";

const ViewAllTrains = () => {
  const navigate = useNavigate();

  const [PRDetails, setTrainDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setopenModal] = useState(false);

  const getTrains = async () => {
    try {
      setLoading(true);
      let data = await getAllTrains();
      console.log(data);
      let array = [];
      data?.data?.data?.Requsition?.map((item) => {
        if (item?.status == "pending") {
          array.push(item);
        }
      });

      let newData = data?.data?.map((pr) => {
        return {
          trainId: pr?.trainId,
          name: pr?.name,
          seatingCapacity: pr?.seatingCapacity,
          fuelType: pr?.fuelType,
          model: pr?.model,
          _id: pr?.id,
        };
      });
      setTrainDetails(newData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrains();
  }, []);

  const routeToViewPage = (e) => {
    e.preventDefault();
    navigate("/add-item");
  };

  const removeTrain = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let data = deleteTrain(id);
        console.log("Delete ", data);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getTrains();
      }
    });
  };

  const columns = [
    {
      name: (
        <Badge color="info" style={{ fontSize: "16px" }}>
          Train Id
        </Badge>
      ),
      selector: "trainId",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "16px" }}>
            <b>{data?.trainId}</b>
            <br />
          </Label>
        </div>
      ),
    },
    {
      name: (
        <Badge color="info" style={{ fontSize: "16px" }}>
          Train Name
        </Badge>
      ),
      selector: "name",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "16px" }}>
            <b>{data?.name}</b>
            <br />
          </Label>
        </div>
      ),
    },
    {
      name: (
        <Badge color="info" style={{ fontSize: "16px" }}>
          Delivery Details
        </Badge>
      ),
      selector: "seatingCapacity",

      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "16px" }}>
            <b>{data.seatingCapacity}</b>
            <br />
          </Label>
        </div>
      ),
    },
    {
      name: (
        <Badge color="info" style={{ fontSize: "16px" }}>
          Delivery Details
        </Badge>
      ),
      selector: "fuelType",

      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "16px" }}>
            <b>{data.fuelType}</b>
            <br />
          </Label>
        </div>
      ),
    },
    {
      name: (
        <Badge color="info" style={{ fontSize: "16px" }}>
          Delivery Details
        </Badge>
      ),
      selector: "model",

      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "16px" }}>
            <b>{data.model}</b>
            <br />
          </Label>
        </div>
      ),
    },

    {
      cell: (data) => (
        <div className="row">
          <div className="col">
            <a href={`/edit-train/${data?._id}`}>
              {" "}
              <img
                src={editIcon}
                style={{ height: "25px", width: "25px", cursor: "pointer" }}
              />{" "}
            </a>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="col">
            <a onClick={() => removeTrain(data?._id)}>
              <img
                src={binIcon}
                style={{ height: "25px", width: "25px", cursor: "pointer" }}
              />
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ marginTop: "70px", marginBottom: "70px" }}>
      <div style={{ margin: "10px" }}>
        <Card>
          <CardHeader>
            <CardTitle
              style={{ color: "black", fontSize: "30px", float: "left" }}
            >
              <b>Trains</b>
            </CardTitle>
            <CardTitle
              style={{ color: "black", fontSize: "30px", float: "right" }}
            >
              <a href={`/add-train`} className="btn btn-dark">
                Add New Train
              </a>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <DataTable
              data={PRDetails}
              columns={columns}
              progressPending={loading}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ViewAllTrains;
