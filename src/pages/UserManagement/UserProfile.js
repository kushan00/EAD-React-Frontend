import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteUserByID,
  disableUserByID,
  enableUserByID,
  getUserByID,
} from "../../services/UserServices";

const UserProfile = () => {
  const navigate = useNavigate();
  const id = useParams();

  const [User, setUser] = useState({});

  const getUser = async () => {
    const data = await getUserByID(id.id);
    console.log("Auth data", data.data);
    setUser(data?.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  async function updateUser() {
    navigate("/edit-user/" + User?.id, { state: User });
  }

  async function deleteProfile() {
    Swal.fire({
      title: "Are you sure want to delete this account?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          var result = await deleteUserByID(User.id);

          if (result?.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Successful!",
              text: "Account deleted...!",
            });
            navigate("/user-manage");
            window.location.reload();
          }
        } catch (err) {
          console.error(err);
          alert(err);
        }
      }
    });
  }

  async function enableProfile() {
    Swal.fire({
      title: "Are you sure you want to activate this account?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#117a2d",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, activate!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          var result = await enableUserByID(User.id);

          if (result?.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Successful!",
              text: "Account activated...!",
            });
            window.location.reload();
          }
        } catch (err) {
          console.error(err);
          alert(err);
        }
      }
    });
  }
  async function disableProfile() {
    Swal.fire({
      title: "Are you sure you want to deactivate this account?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, deactivate!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          var result = await disableUserByID(User.id);

          if (result?.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Successful!",
              text: "Account deactivated...!",
            });
            window.location.reload();
          }
        } catch (err) {
          console.error(err);
          alert(err);
        }
      }
    });
  }

  return (
    <div className="main-profile">
      <div className="sub-main-profile">
        {User ? (
          <>
            {" "}
            <h1
              style={{
                fontSize: "40px",
                marginBottom: "30px",
                width: "800px",
              }}
            >
              <b>
                {User?.name
                  ? User.name.charAt(0).toUpperCase() + User.name.slice(1)
                  : ""}
              </b>
              <hr />
            </h1>
            <table className="table table-bordered">
              <tbody>
                <tr key={1}>
                  <td>
                    <h3>NIC</h3>
                  </td>
                  <td>
                    <h3>{User?.nic}</h3>
                  </td>
                </tr>
                <tr key={2}>
                  <td>
                    <h3>Email</h3>
                  </td>
                  <td>
                    <h3>{User?.email}</h3>
                  </td>
                </tr>
                <tr key={3}>
                  <td>
                    <h3>Date of birth</h3>
                  </td>
                  <td>
                    <h3>{User?.dob?.toString()?.substring(0, 10)}</h3>
                  </td>
                </tr>
                <tr key={4}>
                  <td>
                    <h3>Mobile Number</h3>
                  </td>
                  <td>
                    <h3>{User?.number}</h3>
                  </td>
                </tr>
                <tr key={5}>
                  <td>
                    <h3>Address</h3>
                  </td>
                  <td>
                    <h3>{User?.address}</h3>
                  </td>
                </tr>
                <tr key={6}>
                  <td>
                    <h3>Gender</h3>
                  </td>
                  <td>
                    <h3>{User?.gender}</h3>
                  </td>
                </tr>
                <tr key={7}>
                  <td>
                    <h3>Active</h3>
                  </td>
                  <td>
                    <h3>{User?.isActive ? "Active" : "Inactive"}</h3>
                  </td>
                </tr>
                <tr key={8}>
                  <td>
                    <h3>User Type</h3>
                  </td>
                  <td>
                    <h3>{User?.userRole}</h3>
                  </td>
                </tr>
                <tr key={9}>
                  <td>
                    <h3>Created at</h3>
                  </td>
                  <td>
                    <h3>{User?.createdTime}</h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
        <div className="main-center">
          <button className="btn btn-info account-button" onClick={updateUser}>
            Edit
          </button>
          {User?.userRole === "Traveler" ? (
            <>
              {User?.isActive ? (
                <button
                  className="btn btn-warning account-button"
                  onClick={disableProfile}
                >
                  Deactivate
                </button>
              ) : (
                <button
                  className="btn btn-success account-button"
                  onClick={enableProfile}
                >
                  Activate
                </button>
              )}
            </>
          ) : (
            ""
          )}
          <button
            className="btn btn-danger account-button"
            onClick={deleteProfile}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
