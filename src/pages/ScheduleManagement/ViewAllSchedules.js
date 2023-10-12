/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import {
  getAllSchedules,
  inactiveSchedule,
  activeSchedule,
} from "../../services/ScheduleService"; // Import your schedule-related service functions here
import DataTable from "react-data-table-component";
import { Card, CardHeader, CardTitle, CardBody, Label } from "reactstrap";
import Swal from "sweetalert2";
import editIcon from "../../assets/images/pencil.png";
import binIcon from "../../assets/images/bin.png";

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

  const deactivateSchedule = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure to deactivate this schedule ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deactivate it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await inactiveSchedule(id); // Replace with your service function to deactivate a schedule
          console.log("deactivate ", response);

          if (response?.status === 404) {
            Swal.fire(
              "Sorry!",
              "This schedule has existing reservations",
              "warning"
            );
            getSchedules();
          }

          if (response?.status === 200) {
            Swal.fire(
              "Deactivated!",
              "The schedule has been deactivated.",
              "success"
            );
            getSchedules();
          }
        } catch (error) {
          console.log(error);
          Swal.fire("Error", "Failed to deactivate the schedule.", "error");
        }
      }
    });
  };

  const activateSchedule = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure activate this schedule ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, active it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await activeSchedule(id); // Replace with your service function to delete a schedule
          console.log("active ", response);

          if (response?.status === 200) {
            Swal.fire("Deleted!", "The schedule has activated.", "success");
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
    // {
    //   name: "ID",
    //   selector: "id",
    //   cell: (data) => (
    //     <div style={{ display: "flex", flexDirection: "column" }}>
    //       <Label style={{ fontSize: "16px" }}>
    //         <b>{data?.id}</b>
    //         <br />
    //       </Label>
    //     </div>
    //   ),
    //   sortable: true,
    // },
    {
      name: "Start City",
      selector: "startCity",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.startCity}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    // {
    //   name: "Cities",
    //   selector: "cities",
    //   cell: (data) => (
    //     <div style={{ display: "flex", flexDirection: "column" }}>
    //       <Label style={{ fontSize: "14px" }}>
    //         <b>{data?.cities?.map((city)=>{return `${city},\n`})}</b>
    //         <br />
    //       </Label>
    //     </div>
    //   ),
    //   sortable: true,
    // },
    {
      name: "End City",
      selector: "endCity",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.endCity}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Price",
      selector: "price",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.price}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    // {
    //   name: "Train",
    //   selector: "train",
    //   cell: (data) => (
    //     <div style={{ display: "flex", flexDirection: "column" }}>
    //       <Label style={{ fontSize: "14px" }}>
    //         <b>{data?.train}</b>
    //         <br />
    //       </Label>
    //     </div>
    //   ),
    //   sortable: true,
    // },
    {
      name: "Start Time",
      selector: "startTime",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.startTime}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    {
      name: "End Time",
      selector: "endTime",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.endTime}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Class",
      selector: "class",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.class}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Type",
      selector: "type",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.type}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Run By",
      selector: "runBy",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.runBy}</b>
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
            <b>{data?.isActive === true ? "Active" : "Not Active"}</b>
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
        </div>
      ),
    },

    {
      cell: (data) => (
        <div className="row">          
          {data?.isActive === true ? (
            <div className="col-auto">
              <button
                className="btn btn-danger"
                onClick={() => deactivateSchedule(data?.id)}
              >
                Deactivate
              </button>
            </div>
          ) : (
            <div className="col-auto">
              <button
                className="btn btn-success"
                onClick={() => activateSchedule(data?.id)}
              >
                Activate
              </button>
            </div>
          )}
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
              <b>Schedules</b>
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
