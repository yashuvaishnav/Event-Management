import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Toastify, showErrorToast, showSuccessToast } from "../Components/Toast/Toastify";

export const RegistrationForm = () => {
  const [registrationDetails, setRegistrationDetails] = useState({
    name: "",
    companyName: "",
    contact: "",
    email: "",
    companySize: "",
    companyType: "",
    attendance: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationDetails((prevDetails) => ({
      ...prevDetails,
      [name]:
        name === "contact" || name === "companySize" ? Number(value) : value,
    }));
  };

  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/clients/registration",
        registrationDetails
      );
      console.log(res);
      showSuccessToast(res.data.msg);
      setRegistrationDetails({
        name: "",
        companyName: "",
        contact: "",
        email: "",
        companySize: "",
        companyType: "",
      });
    } catch (error) {
      console.log(error);
      showErrorToast("Not Added Client")
    }
  };

  return (
    <MainDiv>
      <Toastify />
      <div className="logoNameAndFormDiv">
        <div className="logoAndName">
          <img
            src="https://ceoitbox.com/wp-content/uploads/2022/04/logo.png.webp"
            alt="logo"
          />
          <h1>CEOITBOX</h1>
        </div>
        <h1>Registration Form</h1>
        <div className="formDiv">
          <form onSubmit={handleFormData}>
            <FormGroup>
              <label htmlFor="name">Name<span>*</span></label>
              <input
                type="text"
                name="name"
                value={registrationDetails.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="companyName">Company Name<span>*</span></label>
              <input
                type="text"
                name="companyName"
                value={registrationDetails.companyName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="contact">Contact<span>*</span></label>
              <input
                type="tel"
                name="contact"
                value={registrationDetails.contact}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">Email<span>*</span></label>
              <input
                type="email"
                name="email"
                value={registrationDetails.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="companySize">Company Size<span>*</span></label>
              <input
                type="number"
                name="companySize"
                value={registrationDetails.companySize}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="companyType">Company Type<span>*</span></label>
              <input
                type="text"
                name="companyType"
                value={registrationDetails.companyType}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <button type="submit" className="registerBtn">
              Register
            </button>
          </form>
        </div>
      </div>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(40deg, #fff 50%, #1e90ff 50%);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .logoNameAndFormDiv {
    h1 {
      text-align: center;
    }
    background-color: #f0eeeecc;
    width: 25%;
    margin: 20px auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .logoAndName {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    img {
      height: 50px;
      margin-right: 10px;
    }

    h1 {
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }
  }

  .formDiv {
    padding: 20px;
    border-radius: 8px;
    .registerBtn {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #2678ec;
      color: #ffff;
      border-radius: 5px;
      border: none;
      outline: none;
      margin-top: 10px;
      /* background: linear-gradient(to bottom, #5ebed8, #2678ec); */
      &:hover{
        cursor: pointer;
        background: #4882d3;
      }
    }
  }

@media (max-width: 1900px) {
  .logoNameAndFormDiv {
    width: 35%;
  }
}
@media (max-width: 1400px) {
  .logoNameAndFormDiv {
    width: 50%;
  }
}
@media (max-width: 900px) {
  .logoNameAndFormDiv {
    width: 60%;
  }
}
@media (max-width: 480px) {
  .logoNameAndFormDiv {
    width: 100%;
  }
}

`;

const FormGroup = styled.div`
  margin-bottom: 10px;
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 18px;
    color: #333;
  }
  input,
  textarea {
    width: 93%;
    padding: 10px;
    border: 1px solid #ccc;
    outline: none;
    border-radius: 4px;
    font-size: 16px;
    color: #555;
    &:hover{
      border: 1px solid black;
    }
  }
`;
