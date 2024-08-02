import React, { useState } from "react";
import styled from "styled-components";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";
import {
  Toastify,
  showErrorToast,
  showSuccessToast,
} from "../Components/Toast/Toastify";
import { useDispatch } from "react-redux";
import { postTestimonialData } from "../Components/Redux/Suggestions/action";

export const Contact = () => {
  const [selectedTab, setSelectedTab] = useState("clientSuggestion");
  const [clientSuggestionDetails, setCLientSuggestionDetails] = useState({
    clientName: "",
    companyName: "",
    toolName: "",
    suggestion: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTab = (tab) => {
    setCLientSuggestionDetails({
      clientName: "",
      companyName: "",
      toolName: "",
      suggestion: "",
    });
    setSelectedTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCLientSuggestionDetails({
      ...clientSuggestionDetails,
      [name]: value,
    });
  };

  const handleSubmitClientSuggestion = (e) => {
    e.preventDefault();
    dispatch(
      postTestimonialData(
        clientSuggestionDetails,
        showErrorToast,
        showSuccessToast,
        navigate
      )
    );
    setCLientSuggestionDetails({
      clientName: "",
      companyName: "",
      toolName: "",
      suggestion: "",
    });
  };

  return (
    <MainDiv>
      <Toastify />
      <div className="bodyDiv">
        <div className="heading">
          <h3>DROP US A </h3>
          <h1>SUGGESTION</h1>
        </div>
        {selectedTab === "clientSuggestion" ? (
          <div className="formAndImageDiv">
            <div className="ImageDiv">
              <img
                src="https://static.wixstatic.com/media/88265b_41e9fe540e854034a3337f08bccd9b8c~mv2.png/v1/crop/x_64,y_0,w_952,h_1080/fill/w_252,h_286,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/1.png"
                alt=""
              />
            </div>
            <form className="formDiv" onSubmit={handleSubmitClientSuggestion}>
              <input
                type="text"
                placeholder="CLIENT NAME"
                name="clientName"
                value={clientSuggestionDetails.clientName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                placeholder="COMPANY NAME"
                name="companyName"
                value={clientSuggestionDetails.companyName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                placeholder="TOOL NAME"
                name="toolName"
                value={clientSuggestionDetails.toolName}
                onChange={handleInputChange}
                required
              />
              <textarea
                placeholder="SUGGESTION"
                name="suggestion"
                value={clientSuggestionDetails.suggestion}
                onChange={handleInputChange}
                required
              ></textarea>
              <div className="clientAndSupportBtn">
                <button type="aubmit" className="sendSuggestionBtn">
                  Send
                </button>
                <button
                  className="supportPersonBtn"
                  onClick={() => {
                    handleTab("supportPerson");
                  }}
                >
                  Support Person
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="formAndImageDiv">
            <form className="formDiv" onSubmit={handleSubmitClientSuggestion}>
              <input
                type="text"
                placeholder="CLIENT NAME"
                name="clientName"
                value={clientSuggestionDetails.clientName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                placeholder="COMPANY NAME"
                name="companyName"
                value={clientSuggestionDetails.companyName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                placeholder="TOOL NAME"
                name="toolName"
                value={clientSuggestionDetails.toolName}
                onChange={handleInputChange}
                required
              />
              <textarea
                placeholder="SUGGESTION"
                name="suggestion"
                value={clientSuggestionDetails.suggestion}
                onChange={handleInputChange}
                required
              ></textarea>
              <div className="clientAndSupportBtn">
                <button
                  className="backBtn"
                  onClick={() => handleTab("clientSuggestion")}
                >
                  Back
                </button>
                <button type="submit" className="sendSuggestionBtn">
                  Send
                </button>
              </div>
            </form>
            <div className="ImageDiv">
              <img
                src="https://cdn.vectorstock.com/i/preview-1x/75/51/online-chat-messages-text-notification-on-mobile-vector-31367551.jpg"
                alt=""
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </MainDiv>
  );
};

const MainDiv = styled.div`
  .heading {
    text-align: center;
    margin: 50px 0 20px 0px;
    h3 {
      margin: 0;
      padding: 0;
      line-height: 1;
      color: #4b4a4a;
      font-weight: 500;
    }
    h1 {
      margin: 0;
      padding: 0;
      line-height: 1.5;
      font-size: 40px;
    }
  }
  .formAndImageDiv {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 20px;
    width: 70%;
    margin: auto;
    border-radius: 8px;
    overflow: hidden;
  }
  .ImageDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 40%;
  }
  .ImageDiv img {
    width: 70%;
  }
  .formDiv {
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 40%;
    .clientAndSupportBtn {
      display: flex;
    }
  }
  .formDiv .clientAndSupportBtn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .backBtn {
      width: 30%;
      padding: 10px;
      font-size: 18px;
      border-radius: 8px;
      background-color: #2678ec;
      color: #ffff;
      border: none;
      cursor: pointer;
    }
  }
  .formDiv .clientAndSupportBtn .sendSuggestionBtn,
  .formDiv .clientAndSupportBtn .supportPersonBtn {
    width: 40%;
    padding: 10px;
    font-size: 18px;
    border-radius: 8px;
    background-color: #2678ec;
    color: #ffff;
    border: none;
    cursor: pointer;
  }
  .formDiv .clientAndSupportBtn .supportPersonBtn {
    width: 50%;
  }

  .formDiv input,
  .formDiv textarea {
    width: 90%;
    padding: 20px;
    margin-bottom: 10px;
    border: 2px solid #ccc;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 10px;
    font-size: 18px;
    outline: none;
    &:hover {
      border: 2px solid #2678ec;
    }
  }
  .formDiv textarea {
    font-size: 20px;
  }

  .formDiv input::placeholder,
  .formDiv textarea::placeholder {
    color: #727171;
  }
`;
