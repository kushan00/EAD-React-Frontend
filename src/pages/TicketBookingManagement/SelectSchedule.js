import React, { useState, useEffect } from "react";
import { getAllSchedules, } from "../../services/ScheduleService"; 
import DataTable from "react-data-table-component";
import reseveIcon from "../../assets/images/reserve.png";
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Label,
  } from "reactstrap";



const SelectSchedule = () => {
  const [schedules, setSchedules] = useState([
    // {
    //     id:"1",
    //     Class:"aswdasd",
    //     EndCity:"AGBOPURA",
    //     EndTime:"20:38",
    //     Price:"123123",
    //     RunBy:"asdasd",
    //     StartCity:"ADAGALA",
    //     StartTime:"10:38",
    //     Train:"f1b31ab1-b460-4431-9060-4c675d420aa6",
    //     Type:"asdasd",
    //     Cities:['ABANPOLA', 'ADAGALA', 'AGBOPURA', 'AHANGAMA'],
    //     isActive:"1"
    // },
    // {
    //     id:"2",
    //     Class:"aswdasd",
    //     EndCity:"AGBOPURA",
    //     EndTime:"20:38",
    //     Price:"123123",
    //     RunBy:"asdasd",
    //     StartCity:"ADAGALA",
    //     StartTime:"10:38",
    //     Train:"f1b31ab1-b460-4431-9060-4c675d420aa6",
    //     Type:"asdasd",
    //     Cities:['ABANPOLA', 'ADAGALA', 'AGBOPURA', 'AHANGAMA'],
    //     isActive:"1"
    // }
  ]);
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



  const columns = [
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
            <a href={`/add-reservation/${data?.id}`}>
              {" "}
              <img
                src={reseveIcon}
                style={{ height: "40px", width: "40px", cursor: "pointer" }}
                alt="Add Resevation"
              />{" "}
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
              <b>Select Schedule to Reservation</b>
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


export default SelectSchedule;
