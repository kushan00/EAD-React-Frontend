import React, { useState, useEffect } from "react";
import { getAllSchedules, deleteSchedule } from "../../services/ScheduleService"; // Import your schedule-related service functions here
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import editIcon from "../../assets/images/pencil.png";
import binIcon from "../../assets/images/bin.png";
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
      sortable: true,
    },
    {
      name: "Start City",
      selector: "startCity",
      sortable: true,
    },
    {
      name: "Cities",
      selector: "cities",
      sortable: true,
    },
    {
      name: "End City",
      selector: "endCity",
      sortable: true,
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
    },
    {
      name: "Train",
      selector: "train",
      sortable: true,
    },
    {
      name: "Start Time",
      selector: "startTime",
      sortable: true,
    },
    {
      name: "End Time",
      selector: "endTime",
      sortable: true,
    },
    {
      name: "Class",
      selector: "class",
      sortable: true,
    },
    {
      name: "Type",
      selector: "type",
      sortable: true,
    },
    {
      name: "Run By",
      selector: "runBy",
      sortable: true,
    },
    {
      name: "Active",
      selector: "isActive",
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
