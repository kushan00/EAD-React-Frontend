/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Label,
} from "reactstrap";
import Swal from "sweetalert2";

import { getAllReservations } from "../../services/ReservationService";
import { deleteReservation } from "../../services/ReservationService";

import editIcon from "../../assets/images/pencil.png";
import binIcon from "../../assets/images/bin.png";
import moment from "moment/moment";

const ViewAllReservations = () => {

  const [reservationDetails, setReservationDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const getReservations = async () => {
    try {
      setLoading(true);
      let data = await getAllReservations(); // Replace with your service function to fetch reservations
      console.log(data);

      // Modify the data mapping based on your reservation attributes
      let newData = data?.data?.map((reservation) => {
        return {
          id: reservation?.id,
          bookingId: reservation?.bookingId,
          user: reservation?.user,
          schedule: reservation?.schedule,
          bookedTime: reservation?.bookedTime,
          reserveTime: reservation?.reserveTime,
          startCity: reservation?.startCity,
          endCity: reservation?.endCity,
          paxCount: reservation?.paxCount,
          status: reservation?.status,
          totalPrice:reservation?.totalPrice
        };
      });
      setReservationDetails(newData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);


  const removeReservation = async (id) => {
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
        let response = await deleteReservation(id); // Replace with your service function to delete a reservation
        console.log("Delete ", response);
        if (response.status === 200) {
          Swal.fire("Deleted!", "Your reservation has been deleted.", "success");
          getReservations();
        } else {
          Swal.fire("Error", "Failed to delete reservation", "error");
        }
      }
    });
  };

  const columns = [
    {
      name: (
        <Badge color="info" style={{ fontSize: "16px" }}>
          bookingId
        </Badge>
      ),
      selector: "id",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "16px" }}>
            <b>{data?.bookingId}</b>
            <br />
          </Label>
        </div>
      ),
    },
    {
      name: (
        <Badge color="info" style={{ fontSize: "16px" }}>
          booked Time
        </Badge>
      ),
      selector: "bookingId",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "16px" }}>
            <b>{moment(data?.bookedTime).format('YYYY-MMM-DD')}</b>
            <br />
          </Label>
        </div>
      ),
    },
    {
      name: (
        <Badge color="info" style={{ fontSize: "16px" }}>
          reserve Time
        </Badge>
      ),
      selector: "user",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "16px" }}>
            <b>{moment(data?.reserveTime).format('YYYY-MMM-DD')}</b>
            <br />
          </Label>
        </div>
      ),
    },
    {
      name: (
        <Badge color="info" style={{ fontSize: "16px" }}>
          startCity
        </Badge>
      ),
      selector: "status",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "16px" }}>
            <b>{data?.startCity}</b>
            <br />
          </Label>
        </div>
      ),
    },
    {
      name: (
        <Badge color="info" style={{ fontSize: "16px" }}>
          endCity
        </Badge>
      ),
      selector: "status",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "16px" }}>
            <b>{data?.endCity}</b>
            <br />
          </Label>
        </div>
      ),
    },
    {
      name: (
        <Badge color="info" style={{ fontSize: "16px" }}>
          Total Price
        </Badge>
      ),
      selector: "status",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "16px" }}>
            <b>{data?.totalPrice}</b>
            <br />
          </Label>
        </div>
      ),
    },
    {
      cell: (data) => (
        <div className="row">
          <div className="col">
            <a href={`/edit-reservation/${data?.id}`}>
              {" "}
              <img
                src={editIcon}
                style={{ height: "25px", width: "25px", cursor: "pointer" }}
              />{" "}
            </a>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="col">
            <a onClick={() => removeReservation(data?.id)}>
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
              <b>Reservations</b>
            </CardTitle>
            <CardTitle
              style={{ color: "black", fontSize: "30px", float: "right" }}
            >
              <a href={`/select-schedule`} className="btn btn-dark">
                Add New Reservation
              </a>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <DataTable
              data={reservationDetails}
              columns={columns}
              progressPending={loading}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ViewAllReservations;
