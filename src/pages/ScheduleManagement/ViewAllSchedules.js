/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { getAllSchedules, deleteSchedule } from "../../services/ScheduleService"; // Import your schedule-related service functions here
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import editIcon from "../../assets/images/pencil.png";
import binIcon from "../../assets/images/bin.png";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Label,
} from "reactstrap";



const ViewAllSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSchedules = async () => {
    try {
      setLoading(true);
      const response = await getAllSchedules(); // Replace with your service function to get all schedules
      console.log(response);

      if (response?.status === 200) {
        setSchedules(response.data); // Assuming response.data contains the list of schedules
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSchedules();
  }, []);

  const removeSchedule = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteSchedule(id); // Replace with your service function to delete a schedule
          console.log("Delete ", response);

          if (response?.status === 200) {
            Swal.fire("Deleted!", "The schedule has been deleted.", "success");
            getSchedules();
          }
        } catch (error) {
          console.log(error);
          Swal.fire("Error", "Failed to delete the schedule.", "error");
        }
      }
    });
  };

  const columns = [
    {
      name: "ID",
      selector: "id",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "16px" }}>
            <b>{data?.id}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Start City",
      selector: "StartCity",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.StartCity}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Cities",
      selector: "Cities",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.Cities.map((city)=>{return `${city},\n`})}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    {
      name: "End City",
      selector: "EndCity",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.EndCity}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Price",
      selector: "Price",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.Price}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Train",
      selector: "Train",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.Train}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Start Time",
      selector: "StartTime",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.StartTime}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    {
      name: "End Time",
      selector: "EndTime",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.EndTime}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Class",
      selector: "Class",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.Class}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Type",
      selector: "Type",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.Type}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Run By",
      selector: "RunBy",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.RunBy}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Active",
      selector: "isActive",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.isActive === "1" ? "Active" : "Not Active"}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    {
      cell: (data) => (
        <div className="row">
          <div className="col">
            <a href={`/edit-schedule/${data?.id}`}>
              {" "}
              <img
                src={editIcon}
                style={{ height: "25px", width: "25px", cursor: "pointer" }}
                alt="Edit"
              />{" "}
            </a>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="col">
            <a onClick={() => removeSchedule(data?.id)}>
              <img
                src={binIcon}
                style={{ height: "25px", width: "25px", cursor: "pointer" }}
                alt="Delete"
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
              <b>Reservations</b>
            </CardTitle>
            <CardTitle
              style={{ color: "black", fontSize: "30px", float: "right" }}
            >
              <a href={`/add-schedule`} className="btn btn-dark">
                Add New Schedule
              </a>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <DataTable
              data={schedules}
              columns={columns}
              progressPending={loading}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};


export default ViewAllSchedules;
