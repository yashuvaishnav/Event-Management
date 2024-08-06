import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Toastify,
  showErrorToast,
  showSuccessToast,
} from "../Components/Toast/Toastify";
import { useDispatch } from "react-redux";
import { postLoginData } from "../Components/Redux/Admin/action";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adminLogin, setAdminLogin] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminLogin((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      postLoginData(adminLogin, showErrorToast, showSuccessToast, navigate)
    );
  };

  return (
    <MainDiv>
      <Toastify />
      <div className="imageDiv">
        <img
          src="https://img.freepik.com/premium-vector/sign-page-illustration-design-template_559664-156.jpg?w=2000"
          alt=""
        />
      </div>
      <form className="formDiv" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          value={adminLogin.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          name="password"
          value={adminLogin.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="signupBtn">
        <span>Dont have account?</span>
        <button
          onClick={() => {
            navigate("/signup");
          }}
        >
          Signup
        </button>
      </div>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;

  .imageDiv {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .imageDiv img {
    width: 80%;
    height: auto;
  }
  .formDiv {
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  .formDiv input {
    width: 30%;
    padding: 13px;
    font-size: 16px;
    outline: none;
    border: 2px solid #ccc;
    border-radius: 10px;
    &:hover {
      border: 2px solid #2678ec;
    }
  }
  
  .formDiv button {
    width: 20%;
    padding: 15px;
    border: none;
    border-radius: 8px;
    font-weight: bolder;
    background-color: #2678ec;
    color: white;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #0056b3;
    }
  }
  .signupBtn {
    margin: 5px;
    button {
    border: none;
    font-weight: bolder;
    background: none;
    color: #2678ec;
    font-size: 18px;
    cursor: pointer;
  }
  }
`;
