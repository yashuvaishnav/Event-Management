import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Toastify, showErrorToast, showSuccessToast } from "../Components/Toast/Toastify";

export const FeedbackForm = () => {
  const [feedbackDetails, setFeedbackDetails] = useState({
    clientName: "",
    companyName: "",
    email: "",
    remarks: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackDetails({
      ...feedbackDetails,
      [name]: value,
    });
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    // console.log(feedbackDetails);
    try {
      const res = await axios.post(
        "http://localhost:8080/feedbacks/clientFeedback",
        feedbackDetails
      );
      console.log(res);
      showSuccessToast(res.data.msg)
      setFeedbackDetails({
        clientName: "",
        companyName: "",
        email: "",
        remarks: "",
      });
    } catch (error) {
      showErrorToast("Not Added Feedback")
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
            width={"50px"}
            height={"50px"}
          />
          <h1>CEOITBOX</h1>
        </div>
        <h1>Feedback Form</h1>
        <div className="formDiv">
          <form onSubmit={handleSubmitFeedback}>
            <FormGroup>
              <label htmlFor="name">Name<span>*</span></label>
              <input
                type="text"
                name="clientName"
                value={feedbackDetails.clientName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="companyName">Company Name<span>*</span></label>
              <input
                type="text"
                name="companyName"
                value={feedbackDetails.companyName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">Email<span>*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={feedbackDetails.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="remarks">Remarks<span>*</span></label>
              <textarea
                name="remarks"
                value={feedbackDetails.remarks}
                onChange={handleInputChange}
                required
              ></textarea>
            </FormGroup>
            <button type="submit" className="submitBtn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  /* position: relative; */
  width: 100%;
  height: 100vh;
  background: linear-gradient(40deg, #fff 50%, #1e90ff 50%);
  /* background-size: 100% 100%; */
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
    .submitBtn {
      padding: 8px 10px;
      font-size: 16px;
      /* background: none; */
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
  }
`;
