import { useState, useEffect } from "react";
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

import { getAllUsers } from "../../services/UserServices";

const ViewAllUsers = () => {
  const navigate = useNavigate();

  const [UserDetails, setAllUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUserDetails, setFilteredUserDetails] = useState(UserDetails); // Initialize with all data
  const [userRoleFilter, setUserRoleFilter] = useState("all"); // 'all', 'Traveler', 'Agent', or 'Back_Office'

  const getUsers = async () => {
    try {
      setLoading(true);
      let data = await getAllUsers();

      setAllUserDetails(data.data);
      setFilteredUserDetails(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Function to handle search input changes
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    applyFilters(query, userRoleFilter);
  };

  // Function to handle radio button changes for user role filtering
  const handleUserRoleRadioChange = (value) => {
    setUserRoleFilter(value);
    applyFilters(searchQuery, value);
  };

  // Function to filter data based on search query, active/inactive filter, and user role filter
  const applyFilters = (query, userRoleFilter) => {
    const filteredData = UserDetails.filter((user) => {
      const includesQuery =
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.nic.toLowerCase().includes(query.toLowerCase());
      const isUserRoleMatch =
        userRoleFilter === "all" || user.userRole === userRoleFilter;
      return includesQuery && isUserRoleMatch;
    });

    setFilteredUserDetails(filteredData);
  };

  const columns = [
    {
      name: (
        <Badge color="info" style={{ fontSize: "20px" }}>
          Full Name
        </Badge>
      ),
      selector: "name",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "20px" }}>
            <b>{data?.name}</b>
            <br />
          </Label>
        </div>
      ),
    },
    {
      name: (
        <Badge color="info" style={{ fontSize: "20px" }}>
          NIC
        </Badge>
      ),
      selector: "nic",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "20px" }}>
            <b>{data?.nic}</b>
            <br />
          </Label>
        </div>
      ),
    },
    {
      name: (
        <Badge color="info" style={{ fontSize: "20px" }}>
          Email
        </Badge>
      ),
      selector: "address",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "20px" }}>
            <b>{data.email}</b>
            <br />
          </Label>
        </div>
      ),
    },
    {
      name: (
        <Badge color="info" style={{ fontSize: "20px" }}>
          User Role
        </Badge>
      ),
      selector: "userRole",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "20px" }}>
            <b>{data.userRole}</b>
            <br />
          </Label>
        </div>
      ),
    },
    {
      name: (
        <Badge color="info" style={{ fontSize: "20px" }}>
          Actions
        </Badge>
      ),
      cell: (data) => (
        <div>
          <a href={`/user-profile/${data?.id}`} className="btn btn-info">
            View
          </a>
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
              style={{ color: "black", fontSize: "35px", float: "left" }}
            >
              <b>All Users</b>
            </CardTitle>
            <CardTitle
              style={{ color: "black", fontSize: "30px", float: "right" }}
            >
              <a href={`/add-user`} className="btn btn-dark">
                Add User
              </a>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <div>
              <div className="radio-group-horizontal">
                <label className="radio-label">Search:</label>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    width: "20%",
                    marginBottom: "10px",
                  }}
                />
                <label className="radio-label">Filter by :</label>
                <div className="radio-item">
                  <input
                    type="radio"
                    id="allRoles"
                    name="userRoleFilter"
                    value="all"
                    checked={userRoleFilter === "all"}
                    onChange={() => handleUserRoleRadioChange("all")}
                  />
                  <label htmlFor="allRoles">All Roles</label>
                </div>
                <div className="radio-item">
                  <input
                    type="radio"
                    id="backOffice"
                    name="userRoleFilter"
                    value="Back_Office"
                    checked={userRoleFilter === "Back_Office"}
                    onChange={() => handleUserRoleRadioChange("Back_Office")}
                  />
                  <label htmlFor="backOffice">Back_Office</label>
                </div>
                <div className="radio-item">
                  <input
                    type="radio"
                    id="agent"
                    name="userRoleFilter"
                    value="Agent"
                    checked={userRoleFilter === "Agent"}
                    onChange={() => handleUserRoleRadioChange("Agent")}
                  />
                  <label htmlFor="agent">Agent</label>
                </div>
              </div>
            </div>
            <DataTable
              data={filteredUserDetails}
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
