import React from "react";
import styled from "styled-components";
import { FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Popup = ({ show, onClose, event }) => {
  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  const handleMail = () => {
    localStorage.setItem("event", JSON.stringify(event));
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
            <p className="eventDateAndKeyNoteSpeaker">
              Event Date : {event.start}
            </p>
            <p className="eventDateAndKeyNoteSpeaker">
              Keynote Speaker : {event.keynoteSpeaker}
            </p>
            <div className="allOlAndUlList">
              <p>Support Person:</p>
              <ol>
                {event.supportPerson.map((person, i) => (
                  <li key={i}>
                    <strong>Name:</strong> {person.name}, <strong>Task:</strong>{" "}
                    {person.task}
                  </li>
                ))}
              </ol>
            </div>
            <div className="allOlAndUlList">
              <p>Food Arrangements:</p>
              <ul className="foodAndEquipmentManaga">
                {event.foodArrangements.map((food, i) => (
                  <li key={i}>{food}</li>
                ))}
              </ul>
            </div>
            <div className="allOlAndUlList">
              <p>Equipment List:</p>
              <ul className="foodAndEquipmentManaga">
                {event.equipmentList.map((equipment, i) => (
                  <li key={i}>{equipment}</li>
                ))}
              </ul>
            </div>
            <div className="btn">
              <button className="sendMailAndEditBtn" onClick={handleMail}>
                Send Mail
              </button>
              <button className="sendMailAndEditBtn" id="editBtn">
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
    overflow-y: scroll;
  }

  .popup {
    
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    position: relative;
    width: 400px;
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
      svg {
        color: black;
      }
    }
  }
  .dataDiv {
    .imgDiv {
      width: 80%;
    }
    .imgDiv > img {
      border-radius: 15px;
      width: 90%;
    }
    .titleAndVanue {
      margin: 10px auto;
      h3 {
        margin: 0;
        padding: 0;
        line-height: 1.4;
      }
    }
    .eventDateAndKeyNoteSpeaker {
      font-size: 16px;
      margin: 0;
      padding: 0;
      line-height: 1.3;
    }
    .allOlAndUlList {
      width: 90%;
      margin-top: 10px;
      p {
        font-size: 20px;
        font-weight: 800;
        margin: 0;
        padding: 0;
        line-height: 1.3;
      }
      ol {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin: 5px 0px 0px 18px;
        padding: 0px;
      }
      .foodAndEquipmentManaga {
        margin: 10px 0px 0px 18px;
        padding: 0px;
        display: flex;
        flex-wrap: wrap;
        li {
          margin-right: 20px;
        }
      }
    }
    .btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .sendMailAndEditBtn {
        background-color: #04aa6d;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px;
        font-size: 16px;
        &:hover {
          background-color: #218b64;
        }
      }
      #editBtn {
        background-color: #007bff;
        &:hover{
        background-color: #2b68a9;
        }
      }
    }
  }
`;
