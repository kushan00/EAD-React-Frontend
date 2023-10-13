import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth, DeleteProfile } from "../../services/AuthServices";
import Swal from "sweetalert2";
import "./responsive.css";
import Cookies from "js-cookie";

const Profile = () => {
  const navigate = useNavigate();

  const [User, setUser] = useState({});

  const getUser = async () => {
    const data = await Auth();
    setUser(data?.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  async function updateUser() {
    navigate("/edit-user/" + User.id, { state: User });
  }

  async function deleteProfile() {
    Swal.fire({
      title: "Are you sure you want to deactivate your account?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, deactivate!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          var result = await DeleteProfile(User._id);

          if (result?.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Successful!",
              text: "Account deactivated...!",
            });
            Cookies.remove("TrainLogin");
            navigate("/");
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
                    <h3>User Type</h3>
                  </td>
                  <td>
                    <h3>{User?.userRole}</h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
        <div className="main-center">
          <button
            className="btn btn-warning account-button"
            onClick={updateUser}
          >
            Edit
          </button>
          <button
            className="btn btn-danger account-button"
            onClick={deleteProfile}
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
