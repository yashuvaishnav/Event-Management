import React, { useState } from "react";
import styled from "styled-components";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { postClientsData } from "../Components/Redux/Participants/action";
import { Toastify } from "../Components/Toast/Toastify";

export const ClientRegistrationForm = () => {
  const [registrationDetails, setRegistrationDetails] = useState({
    name: "",
    lastName: "",
    companyName: "",
    contact: "",
    email: "",
    companySize: "",
    companyType: "",
    designation: "",
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "contact" ? Number(value) : value,
    }));
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    console.log(registrationDetails);
    dispatch(postClientsData(registrationDetails));
    setRegistrationDetails({
      name: "",
      lastName: "",
      companyName: "",
      contact: "",
      email: "",
      companySize: "",
      companyType: "",
      designation: "",
    });
  };

  return (
    <MainDiv>
      <Toastify />
      <div className="HeadingAndSvg">
        <p>Registration Form</p>
        <RxCross1 />
      </div>
      <form onSubmit={handleRegistration}>
        <div className="clientNameParent">
          <p className="clientName">Name</p>
          <div className="clientNameDiv">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={registrationDetails.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={registrationDetails.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="clientDetails">
          <div className="commonDiv">
            <p>Company name</p>
            <input
              type="text"
              placeholder="Enter your company name"
              name="companyName"
              value={registrationDetails.companyName}
              onChange={handleInputChange}
            />
          </div>
          <div className="commonDiv">
            <p>Designation</p>
            <input
              type="text"
              placeholder="Enter your designation"
              name="designation"
              value={registrationDetails.designation}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="clientDetails">
          <div className="commonDiv">
            <p>Email</p>
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              value={registrationDetails.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="commonDiv">
            <p>Phone</p>
            <input
              type="text"
              placeholder="Enter phone number"
              name="contact"
              value={registrationDetails.contact}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="clientDetails">
          <div className="commonDiv">
            <p>Company size</p>
            <select
              name="companySize"
              value={registrationDetails.companySize}
              onChange={handleInputChange}
            >
              <option value="">select</option>
              <option value="Micro">Micro</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="commonDiv">
            <p>Company Type</p>
            <input
              type="text"
              placeholder="Enter your company type"
              name="companyType"
              value={registrationDetails.companyType}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="submitBtn">
          <button>Register</button>
        </div>
      </form>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  width: 45%;
  height: auto;
  flex-shrink: 0;
  border-radius: 10px;
  background: #f8f9fb;
  margin: 50px auto;
  padding: 20px;
  .HeadingAndSvg {
    display: flex;
    width: 98.5%;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    margin-bottom: 20px;
    margin-top: 15px;
    p {
      color: #457eac;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      margin: 0px;
      padding: 0px;
    }
    svg {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      &:hover {
        cursor: pointer;
      }
    }
  }

  form {
    width: 98%;
    height: auto;
    flex-shrink: 0;
    border-radius: 8px;
    background: none;
    margin-left: 6px;
    .clientNameParent {
      .clientName {
        margin: 7px 0px;
        font-weight: 400;
        color: #000;
      }
      .clientNameDiv {
        display: flex;
        justify-content: space-between;
        input {
          width: 45.7%;
          padding: 10px 8px;
          border: 1px solid #e8e5e5;
          border-radius: 5px;
          outline: none;
          background-color: #f8f9fb;
        }
      }
    }
    .clientDetails {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .commonDiv {
        width: 48.3%;
        input {
          width: 95.3%;
          padding: 10px 7px;
          outline: none;
          border: 1px solid #e8e5e5;
          background-color: #f8f9fb;
          border-radius: 5px;
        }
        select {
          width: 100%;
          padding: 8px 7px;
          outline: none;
          font-size: 17px;
          color: #000;
          border: 1px solid #e8e5e5;
          background-color: #f8f9fb;
          border-radius: 5px;
          cursor: pointer;
        }
        p {
          margin: 25px 0px 7px 0px;
          color: #000;
        }
      }
    }
    .submitBtn {
      margin-top: 25px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      button {
        padding: 7px 25px;
        border: none;
        outline: none;
        border-radius: 5px;
        background-color: #457eac;
        color: #fff;
        cursor: pointer;
      }
    }
  }
`;
