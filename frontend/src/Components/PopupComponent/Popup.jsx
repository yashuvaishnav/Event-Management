import React, { useState } from "react";
import styled from "styled-components";
import { FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import { updateGoogleEvent } from "../Redux/DummyGoogleAuth/action";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: "15px 20px",
  outline: "none",
};

export const Popup = ({ show, onClose, event, gapi }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState(event);
  const dispatch = useDispatch();

  if (!show) {
    return null;
  }

  const handleMail = () => {
    localStorage.setItem("event", JSON.stringify(event));
    navigate("/participants");
  };
  const openEditModal = () => {
    setOpen(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "participantsLimit" ? Number(value) : value,
    }));
  };

  const handleSupportPersonChange = (index, field, value) => {
    const updatedSupportPersons = [...eventDetails.supportPerson];
    updatedSupportPersons[index][field] = value;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      supportPerson: updatedSupportPersons,
    }));
  };

  const handleArrayChange = (index, arrayName, value) => {
    const updatedArray = [...eventDetails[arrayName]];
    updatedArray[index] = value;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [arrayName]: updatedArray,
    }));
  };

  const editHostEvent = (e) => {
    e.preventDefault();
    const cleanSupportPerson = eventDetails.supportPerson.filter(
      (person) => person.name && person.task
    );
    const editEventData = {
      ...eventDetails,
      supportPerson: cleanSupportPerson,
      location: `${eventDetails.location}`,
      summary: `${eventDetails.summary}`,
      description: `${eventDetails.description}`,
      start: {
        dateTime: new Date(`${eventDetails.start}T19:00:00+05:30`),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: new Date(`${eventDetails.end}T20:00:00+05:30`),
        timeZone: "Asia/Kolkata",
      },
    };

    let obj = {
      ...eventDetails,
      supportPerson : cleanSupportPerson
    }

    const request = gapi.client.calendar.events.patch({
      calendarId: "primary",
      eventId: eventDetails.key,
      resource: editEventData,
      sendUpdates: "all",
    });
    request.execute(
      (response) => {
        console.log("response", response);
        dispatch(updateGoogleEvent(obj));
      },
      (error) => {
        console.error("Error updating event:", error);
      }
    );
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
              <button
                className="sendMailAndEditBtn"
                id="editBtn"
                onClick={openEditModal}
              >
                Edit Event
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="delete-confirmation-modal"
      >
        <Box sx={style}>
          <form onSubmit={editHostEvent}>
            <input
              type="text"
              placeholder="Event Title"
              name="summary"
              value={eventDetails.summary}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={eventDetails.location}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={eventDetails.description}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="keynoteSpeaker"
              placeholder="Keynote Speaker"
              value={eventDetails.keynoteSpeaker}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="start"
              placeholder="Start Date And Time"
              value={eventDetails.start}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="end"
              placeholder="End Date And Time"
              value={eventDetails.end}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="participantsLimit"
              placeholder="Participant Limit"
              value={eventDetails.participantsLimit}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={eventDetails.imageUrl}
              onChange={handleInputChange}
              required
            />
            <div>
              <h2>Food Arrangements</h2>
              {eventDetails.foodArrangements.map((food, i) => (
                <input
                  key={i}
                  type="text"
                  value={food}
                  onChange={(e) =>
                    handleArrayChange(i, "foodArrangements", e.target.value)
                  }
                  placeholder="Food Arrangements"
                />
              ))}
            </div>
            <div>
              <h2>Equipments List</h2>
              {eventDetails.equipmentList.map((equipment, i) => (
                <input
                  key={i}
                  type="text"
                  value={equipment}
                  onChange={(e) =>
                    handleArrayChange(i, "equipmentList", e.target.value)
                  }
                  placeholder="Equipments"
                />
              ))}
            </div>
            <div>
              <h2>Support Person List</h2>
              {eventDetails.supportPerson.map((person, i) => (
                <div key={i}>
                  <input
                    type="text"
                    className="supportPersonDetails"
                    value={person.name}
                    onChange={(e) =>
                      handleSupportPersonChange(i, "name", e.target.value)
                    }
                    placeholder="Support person name"
                  />
                  <input
                    type="text"
                    className="supportPersonDetails"
                    value={person.task}
                    onChange={(e) =>
                      handleSupportPersonChange(i, "task", e.target.value)
                    }
                    placeholder="Support person task"
                  />
                </div>
              ))}
            </div>
            <button type="submit">Submit</button>
          </form>
        </Box>
      </Modal>
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
        &:hover {
          background-color: #2b68a9;
        }
      }
    }
  }
`;
