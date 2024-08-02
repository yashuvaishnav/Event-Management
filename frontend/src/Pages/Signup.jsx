import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "react-toastify/ReactToastify.min.css";
import {
  showSuccessToast,
  showErrorToast,
  Toastify,
} from "../Components/Toast/Toastify";
import { useDispatch } from "react-redux";
import { postSignUpData } from "../Components/Redux/Admin/action";

export const Signup = () => {
  const [adminSignup, setAdminSignup] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminSignup((prevDetails) => ({
      ...prevDetails,
      [name]: name === "contact" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      postSignUpData(adminSignup, showErrorToast, showSuccessToast, navigate)
    );
    setAdminSignup({
      name: "",
      contact: "",
      email: "",
      password: "",
    });
  };

  return (
    <MainDiv>
      <Toastify />
      <div className="heading">
        <h1>Signup Form</h1>
      </div>
      <div className="formAndImageDiv">
        <form className="formDiv" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Your Name"
            name="name"
            value={adminSignup.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            placeholder="Contact No"
            name="contact"
            value={adminSignup.contact}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={adminSignup.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            value={adminSignup.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Signup</button>
          <div className="loginBtn">
            <span>Already have account ?</span>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
        </form>
        <div className="imageDiv">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-account-9744687-7969189.png"
            alt=""
          />
        </div>
      </div>
    </MainDiv>
  );
};
const MainDiv = styled.div`
  box-sizing: border-box;
  .heading {
    text-align: center;
    margin: 40px 0px 50px 0px;
    font-size: 25px;
  }
  .formAndImageDiv {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 70%;
    margin: auto;
    margin-bottom: 20px;
  }
  .formDiv {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 0px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  .formDiv > .loginBtn {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    /* border: 1px solid black; */

    span {
      font-weight: bolder;
      margin: 0;
      padding: 0;
    }
    button {
      width: auto;
      padding: 0px;
      margin: 0px 0px 0px 5px;
      border: none;
      font-weight: bolder;
      background: none;
      color: #1b73f0;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        background: none;
        color: #1b437a;
      }
    }
  }
  .formDiv input {
    width: 80%;
    padding: 15px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
    outline: none;
  }
  .formDiv input::placeholder {
    color: #888;
  }
  .formDiv button {
    width: 40%;
    padding: 15px 0px;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    color: #ffff;
    background-color: #1b73f0;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 20px 0px;
  }
  .formDiv button:hover {
    color: #ffff;
    background-color: #1b437a;
  }
  .imageDiv {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .imageDiv img {
    width: 80%;
    height: auto;
  }
`;
