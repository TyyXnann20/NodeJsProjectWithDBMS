import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";
import {message} from 'antd'
export default function RegisterPage() {
  const [emailReg, setEmail] = useState("");
  const [passwordReg, setPassword] = useState("");
  const [genderReg, setGender] = useState(0);
  const [dobReg, setDob] = useState("");
  const [telReg, setTel] = useState("");
  const [firstnameReg, setFirstname] = useState("");
  const [lastnameReg, setLastname] = useState("");
  const [activeReg, setActive] = useState(1);

  const create = () => {
    axios
      .post("http://localhost:8070/api/register/customer", {
        firstname: firstnameReg,
        lastname: lastnameReg,
        gender: genderReg,
        dob: dobReg,
        tel: telReg,
        email: emailReg,
        password: passwordReg,
        isActive: 1,
      })
      .then((res) => {
        
        console.log(res);
        message.success(res.data.message);
        navigate('/customerlogin')
      });
  };
  const navigate = useNavigate();
  return (
    <div className="main">
      <form className="form">
        <h2>Register</h2>
        <input
          className="box"
          type="text"
          placeholder="Input your FirstName"
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        />
        <input
          className="box"
          type="text"
          placeholder="Input your Lastname"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        />
        <input
          className="box"
          type="text"
          placeholder="Input your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          className="box"
          type="text"
          placeholder="Input your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          className="box"
          type="date"
          placeholder="Input your Date of Birth"
          onChange={(e) => {
            setDob(e.target.value);
          }}
        />

        <input
          className="box"
          type="text"
          placeholder="Input your Phone Number"
          onChange={(e) => {
            setTel(e.target.value);
          }}
        />
        <input
          type="submit"
          id="submit"
          value="Register Now!"
          onClick={create}
        />
      </form>
      {/* <div className="side">
        <img src="https://th.bing.com/th/id/OIP.jRIHz3Smk5L0XhzUKTjXVAHaE8?pid=ImgDet&rs=1" />
      </div> */}
    </div>

    // <div className="register">
    //   <label>Email</label>
    //   <input
    //     type="text"
    //     placeholder="Input your email"
    //     onChange={(e) => {
    //       setEmail(e.target.value);
    //     }}
    //   />

    //   <label>password</label>
    //   <input
    //     type="text"
    //     placeholder="Input your password"
    //     onChange={(e) => {
    //       setPassword(e.target.value);
    //     }}
    //   />
    //   <button onClick={create}>Register Now</button>
    // </div>
  );
}
