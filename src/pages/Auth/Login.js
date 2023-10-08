import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUsers } from "../../services/AuthServices.js";
import Swal from 'sweetalert2';
import "./responsive.css";
import Cookies from "js-cookie";

const Login = () => {

	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		nic : "123456789",
		password : "12345678",
	});

	const {nic, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {

		e.preventDefault();
        
        let data = await LoginUsers(formData);
        console.log("data",data?.data?.token)
        if(data?.data?.token != null )
        {
			Cookies.set('Train', data?.data?.token, { expires: 1 / 24 }); 
			Swal.fire({
                icon: 'success',
                title: 'Login success..!',
                text: `Login success`,
            })
			navigate("/");
			window.location.reload();
 
        }
        else
        {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed..!',
                text: `${data?.data?.message}`,
            })
        }

	};


	return (
		<div style={{padding:"100px"}}>
			<center>
				<br></br>
			<h1 className="heading" style={{ fontWeight: "bold"}}>Sign In</h1>
			<p className="lead">
				Login To Your Account
			</p>
			<br />
			<form className="form" onSubmit={(e) => onSubmit(e)} >
				
				<div className="form-group">
					<input
                       id='responsive'
                        className="form-control"
						type="text"
						placeholder="NIC"
						name="nic"
						value={nic}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<input
                       id='responsive'
                        className="form-control"
						type="password"
						placeholder="Password"
						name="password"
						minLength="6"
						value={password}
						onChange={(e) => onChange(e)}
					/>
				</div>
				
				<input 
                    type="submit" 
                    className="btn btn-dark" 
                   id='responsive'
				    value="Login" 
                />
			</form>
            <br/>
			{/* <p className="lead">
				Create new account?&nbsp;&nbsp;<Link to="/register" style={{color:"green" , textDecoration:"none"}}>Sign Up</Link>
				<br></br>
			</p> */}
			</center>
		</div>
	);
};

export default Login;
