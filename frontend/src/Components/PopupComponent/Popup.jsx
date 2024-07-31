
import React from "react";
import styled from "styled-components";
import { FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Popup = ({show,onClose,event}) => {

  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  const handleMail = () => {
    localStorage.setItem("event",JSON.stringify(event));
    navigate("/participants");
  };
  

  return (
    <MainDiv>
      <div className="popup-overlay">
        <div className="popup">
          <button className="popup-close" onClick={onClose}>
            <FaRegWindowClose />
          </button>
          <div className="dataDiv">
            <div className="imgDiv">
              <img src={event.imageUrl} alt="" />
            </div>
            <div className="titleAndVanue">
              <h3>Event Title : {event.summary}</h3>
              <h3>Event Venue : {event.location}</h3>
            </div>
            <p>Event Date : {event.start}</p>
            <p>Keynote Speaker : {event.keynoteSpeaker}</p>
            <h2>Support Person:</h2>
            <ul>
              {event.supportPerson.map((person, i) => (
                <li key={i}>
                  <strong>Name:</strong> {person.name}, <strong>Task:</strong>{" "}
                  {person.task}
                </li>
              ))}
            </ul>
            <h2>Food Arrangements:</h2>
            <ul>
              {event.foodArrangements.map((food, i) => (
                <li key={i}>{food}</li>
              ))}
            </ul>
            <h2>Equipment List:</h2>
            <ul>
              {event.equipmentList.map((equipment, i) => (
                <li key={i}>{equipment}</li>
              ))}
            </ul>
            <div className="btn">
              <button className="sendMail" onClick={handleMail}>
                Send Mail
              </button>
              <button className="sendMail">
                Edit Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .popup {
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    position: relative;
    width: 500px;
    max-width: 90%;
    color: black;
    text-align: left;
    .popup-close {
      position: absolute;
      top: 15px;
      right: 15px;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #fff;
      background-color: #fff;
      /* border:2px solid red ; */
      svg {
        color: black;
      }
    }
  }
  .dataDiv .titleAndVanue {
    margin: 20px auto;
    h3 {
      margin: 0;
      padding: 0;
      line-height: 1.8;
      /* border: 1px solid red; */
    }
  }
  .dataDiv p {
    font-size: 16px;
    margin: 0;
    padding: 0;
    line-height: 1.3;
  }
  .dataDiv h2 {
    margin: 0;
    padding: 0;
    line-height: 1.9;
    /* border: 1px solid black; */
  }
  .dataDiv ul {
    margin: 0;
    padding: 0;
    line-height: 1.5;
    /* border: 1px solid black; */
  }
  .dataDiv .imgDiv{
    /* border: 1px solid black; */
  }
  .dataDiv > .imgDiv > img {
    border-radius: 20px;
    width: 70%;
  }
  .dataDiv .btn{
    display: flex;
    justify-content: space-between;
    align-items: center;

  }

  .sendMail {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    font-size: 16px;
  }

  .sendMail:hover {
    background-color: #0056b3;
  }
`;
