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

import { getAllTravelers } from "../../services/UserServices";

const ViewAllTravelers = () => {
  const navigate = useNavigate();

  const [UserDetails, setAllUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUserDetails, setFilteredUserDetails] = useState(UserDetails); // Initialize with all data
  const [isActiveFilter, setIsActiveFilter] = useState("all"); // 'all', 'active', or 'inactive'

  const getTravelers = async () => {
    try {
      setLoading(true);
      let data = await getAllTravelers();

      setAllUserDetails(data.data);
      setFilteredUserDetails(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTravelers();
  }, []);

  // Function to handle search input changes
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    applyFilters(query, isActiveFilter);
  };

  // Function to handle radio button changes for active/inactive filtering
  const handleActiveRadioChange = (value) => {
    setIsActiveFilter(value);
    applyFilters(searchQuery, value);
  };

  // Function to filter data based on search query, active/inactive filter, and user role filter
  const applyFilters = (query, isActiveFilter) => {
    const filteredData = UserDetails.filter((user) => {
      const includesQuery =
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.nic.toLowerCase().includes(query.toLowerCase());
      const isActive =
        isActiveFilter === "all" ||
        (isActiveFilter === "active" && user.isActive) ||
        (isActiveFilter === "inactive" && !user.isActive);
      return includesQuery && isActive;
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
          Mobile Number
        </Badge>
      ),
      selector: "userRole",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "20px" }}>
            <b>{data.number}</b>
            <br />
          </Label>
        </div>
      ),
    },
    {
      name: (
        <Badge color="info" style={{ fontSize: "20px" }}>
          Active
        </Badge>
      ),
      selector: "address",
      cell: (data) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Label style={{ fontSize: "20px" }}>
            <b>{data.isActive ? "Active" : "Inactive"}</b>
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
              <b>All Travelers</b>
            </CardTitle>
            <CardTitle
              style={{ color: "black", fontSize: "30px", float: "right" }}
            >
              <a href={`/add-user`} className="btn btn-dark">
                Add Traveler
              </a>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <div>
              <div className="radio-group-horizontal">
                <label className="radio-label">Search:</label>
                <input
                  type="text"
                  placeholder="Search Travelers..."
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
                    id="all"
                    name="isActiveFilter"
                    value="all"
                    checked={isActiveFilter === "all"}
                    onChange={() => handleActiveRadioChange("all")}
                  />
                  <label htmlFor="all">All</label>
                </div>
                <div className="radio-item">
                  <input
                    type="radio"
                    id="active"
                    name="isActiveFilter"
                    value="active"
                    checked={isActiveFilter === "active"}
                    onChange={() => handleActiveRadioChange("active")}
                  />
                  <label htmlFor="active">Active</label>
                </div>
                <div className="radio-item">
                  <input
                    type="radio"
                    id="inactive"
                    name="isActiveFilter"
                    value="Inactive"
                    checked={isActiveFilter === "Inactive"}
                    onChange={() => handleActiveRadioChange("Inactive")}
                  />
                  <label htmlFor="inactive">Inactive</label>
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

export default ViewAllTravelers;
