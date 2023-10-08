import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
    Badge,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Label,
} from "reactstrap";

import moment from 'moment';

import { getAllUsers , deleteUserByID} from '../../services/UserServices';
import Swal from "sweetalert2";



const ViewAllUsers = () => {
    const navigate = useNavigate();

    const [UserDetails, setAllUserDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        try {
            setLoading(true);
            let data = await getAllUsers();
            console.log("all users", data.data);

   
            let newData = data?.data?.map((user) => {
                return {
                    name: user?.name,
                    email: user?.email,
                    gender: user?.gender,
                    address: user?.address,
                    number: user?.number,
                    nic: user?.nic, 
                    id :user?.id,
                    userRole:user?.userRole
                }
            })
            setAllUserDetails(newData);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])




    const deletUser = async (id) => {
        const newdata = await deleteUserByID(id);
        if (newdata?.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Successful!",
              text: "User De;ete Success!",
            });
            getUsers();
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Delete Failed!",
            });
          }
      };


    const columns = [

        {
            name: (<Badge color="info" style={{ fontSize: "16px" }} >Full Name</Badge>),
            selector: "name",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data?.name}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="info" style={{ fontSize: "16px" }} >NIC</Badge>),
            selector: "nic",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data?.nic}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="info" style={{ fontSize: "16px" }} >Email</Badge>),
            selector: "email",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data.email}</b><br /></Label>
                </div>
            ),
        },
        {
            name: (<Badge color="info" style={{ fontSize: "16px" }} >Number</Badge>),
            selector: "number",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data.number}</b><br /></Label>
                </div>
            ),
        },
       
        {
            name: (<Badge color="info" style={{ fontSize: "16px" }} >Address</Badge>),
            selector: "address",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data.address}</b><br /></Label>
                </div>
            ),
        },     
        {
            name: (<Badge color="info" style={{ fontSize: "16px" }} >User Role</Badge>),
            selector: "userRole",
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ fontSize: "16px" }}><b>{data.userRole}</b><br /></Label>
                </div>
            ),
        },    
        {
            name: (<Badge color="info" style={{ fontSize: "16px" }} >Actions</Badge>),
            cell: (data) => (
                <div>
                    <a href={`/edit-user/${data?.id}`} className="btn btn-dark">Edit</a>   
                    &nbsp;&nbsp;&nbsp;&nbsp;   
                    <button onClick={()=>{deletUser(data?.id)}}className="btn btn-danger">Delete</button>               
                </div>
            ),
        },
    ];


    return (
        <div style={{ marginTop: "70px", marginBottom: "70px" }}>
            <div style={{ margin: "10px" }}>
                <Card >
                    <CardHeader >
                        <CardTitle style={{ color: "black", fontSize: "30px", float: "left" }}><b>All users</b></CardTitle>
                        <CardTitle style={{ color: "black", fontSize: "30px", float: "right" }}><a href={`/add-user`} className="btn btn-dark">Add User</a></CardTitle>
                    </CardHeader>
                    <CardBody >
                        <DataTable
                            data={UserDetails}
                            columns={columns}
                            progressPending={loading}
                        />
                    </CardBody>
                </Card>
            </div>

        </div>

    );

};

export default ViewAllUsers;
