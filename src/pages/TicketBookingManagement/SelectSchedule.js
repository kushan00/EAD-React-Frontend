import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSchedules = async () => {
    try {
      setLoading(true);
      const response = await getAllSchedules(); 
      console.log(response);

      if (response?.status === 200) {
        var data = [];
        response.data.map((item)=>{
          if(item.isActive == true)
          {
            data.push(item);
          }
        })
        setSchedules(data); 
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

  const gotoAddSchedule = (id,startCity,endCity,price)=>{
    localStorage.setItem("startCity",startCity);
    localStorage.setItem("endCity",endCity);
    localStorage.setItem("price",price);
    navigate(`/add-reservation/${id}`);
  }


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
    {
      name: "Cities",
      selector: "cities",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.cities?.map((city)=>{return `${city},\n`})}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
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
    {
      name: "Train",
      selector: "train",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "14px" }}>
            <b>{data?.train}</b>
            <br />
          </Label>
        </div>
      ),
      sortable: true,
    },
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
            <button onClick={()=>{gotoAddSchedule(data?.id,data?.startCity,data?.endCity,data?.price)}}>
              {" "}
              <img
                src={reseveIcon}
                style={{ height: "40px", width: "40px", cursor: "pointer" }}
                alt="Add Resevation"
              />{" "}
            </button>
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
