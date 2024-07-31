import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Toastify, showErrorToast, showSuccessToast } from "../Components/Toast/Toastify";

export const EventRegistrationForm = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  const [registrationDetails, setRegistrationDetails] = useState({
    eventId: id,
    name: "",
    companyName: "",
    contact: "",
    email: "",
    companySize: "",
    companyType: "",
    attendance: false,
  });
  const [eventData, setEventData] = useState({});
  // console.log(id);

  const findeventsDetailsById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/events/${id}`);
      // console.log(res);
      setEventData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findeventsDetailsById(id);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationDetails((prevDetails) => ({
      ...prevDetails,
      [name]:
        name === "contact" && name === "companySize" ? Number(value) : value,
    }));
  };

  const handleFormData = async (e) => {
    e.preventDefault();
    console.log(registrationDetails);
    try {
      const res = await axios.post(
        "http://localhost:8080/clientForEvent/eventRegistration",
        registrationDetails
      );
      console.log(res);
      showSuccessToast(res.data.msg);
      setRegistrationDetails({
        eventId: eventData._id,
        name: "",
        companyName: "",
        contact: "",
        email: "",
        companySize: "",
        companyType: "",
        attendance: false,
      });
    } catch (error) {
      console.log(error);
      showErrorToast("Not Registered Event")
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
        <div className="formDiv">
          <div className="eventDetails">
            <h3>Venue: {eventData.venue}</h3>
            <h3>Event Title: {eventData.eventTitle}</h3>
            <h3>Event Date : {eventData.date}</h3>
          </div>
          <form action="" onSubmit={handleFormData}>
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
                type="number"
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
    .eventDetails {
      margin-bottom: 20px;
      h3 {
        margin: 0;
        padding: 0;
        line-height: 1.5;
      }
    }
    .registerBtn {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #2678ec;
      color: #ffff;
      border-radius: 5px;
      border: none;
      outline: none;
      cursor: pointer;
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
  margin-bottom: 15px;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 18px;
    color: #333;
  }

  input,
  select {
    width: 97%;
    padding: 10px;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    color: #555;
  }
`;
