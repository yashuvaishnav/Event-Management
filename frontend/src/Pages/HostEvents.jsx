import React, { useState } from "react";
import styled from "styled-components";
import { AiFillDelete } from "react-icons/ai";
import { AdminNavbar } from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import {
  Toastify,
  showErrorToast,
  showSuccessToast,
} from "../Components/Toast/Toastify";
import { useDispatch } from "react-redux";
import { postEventData } from "../Components/Redux/HostEvents/action";

export const HostEvents = () => {
  const [personName, setPersonName] = useState("");
  const [task, setTask] = useState("");
  const [equipment, setEquipment] = useState("");
  const [food, setFood] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [eventDetails, setEventDetails] = useState({
    eventTitle: "",
    venue: "",
    date: "",
    imageUrl: "",
    participantsLimit: "",
    organizedBy: "",
    keynoteSpeaker: "",
    breakTime: "",
    foodArrangements: [],
    supportPerson: [{ name: "", task: "" }],
    equipmentList: [],
  });

  const handleAddSupportPerson = () => {
    if (personName.trim() !== "" && task.trim() !== "") {
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        supportPerson: [
          ...prevDetails.supportPerson,
          { name: personName.trim(), task: task.trim() },
        ],
      }));
      setPersonName("");
      setTask("");
    }
  };
  const handleAddEquipment = () => {
    if (equipment.trim() !== "") {
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        equipmentList: [...prevDetails.equipmentList, equipment.trim()],
      }));
      setEquipment("");
    }
  };
  const handleAddFoodArrangements = () => {
    if (food.trim() !== "") {
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        foodArrangements: [...prevDetails.foodArrangements, food.trim()],
      }));
      setFood("");
    }
  };
  const handleRemoveSupportPerson = (person) => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      supportPerson: prevDetails.supportPerson.filter(
        (item) => item !== person
      ),
    }));
  };
  const handleRemoveEquipment = (index) => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      equipmentList: prevDetails.equipmentList.filter((item, i) => i !== index),
    }));
  };
  const handleRemoveFoodArrangements = (index) => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      foodArrangements: prevDetails.foodArrangements.filter(
        (item, i) => i !== index
      ),
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: name === "participantsLimit" ? Number(value) : value,
    });
  };
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${year.slice(2)}/${month}/${day}`;
  };
  const postHostEvents = (e) => {
    e.preventDefault();
    const cleanSupportPerson = eventDetails.supportPerson.filter(
      (person) => person.name && person.task
    );
    const hostEventData = {
      ...eventDetails,
      date: formatDate(eventDetails.date),
      supportPerson: cleanSupportPerson,
    };
    dispatch(
      postEventData(hostEventData, showSuccessToast, showErrorToast, navigate)
    );
  };

  return (
    <MainDiv>
      <Toastify />
      <div className="allData">
        <div className="allEvents">
          <p>HOST</p>
          <h1>EVENTS</h1>
        </div>
        <div className="imageAndFormDiv">
          <div className="imageDiv">
            <img src="https://www.codingspark.in/img/interview.png" alt="" />
          </div>
          <div className="formDiv">
            <h1>Event Details</h1>
            <form onSubmit={postHostEvents}>
              <div className="EventDetails">
                -
                <div style={{ gridArea: "a" }}>
                  <input
                    type="text"
                    placeholder="Event Title"
                    name="eventTitle"
                    value={eventDetails.eventTitle}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div style={{ gridArea: "b" }}>
                  <input
                    type="text"
                    name="venue"
                    placeholder="Venue"
                    value={eventDetails.venue}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div style={{ gridArea: "c" }}>
                  <input
                    type="text"
                    name="organizedBy"
                    placeholder="Organized By"
                    value={eventDetails.organizedBy}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div style={{ gridArea: "d" }}>
                  <input
                    type="text"
                    name="keynoteSpeaker"
                    placeholder="Keynote Speaker"
                    value={eventDetails.keynoteSpeaker}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div style={{ gridArea: "e" }}>
                  <input
                    type="date"
                    name="date"
                    value={eventDetails.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div style={{ gridArea: "f" }}>
                  <input
                    type="text"
                    name="breakTime"
                    placeholder="Break Timing"
                    value={eventDetails.breakTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div style={{ gridArea: "g" }}>
                  <input
                    type="text"
                    name="participantsLimit"
                    placeholder="Participant Limit"
                    value={eventDetails.participantsLimit}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div style={{ gridArea: "h" }}>
                  <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={eventDetails.imageUrl}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="foodArrangements" style={{ gridArea: "i" }}>
                  <div className="foodArrangementsAndBtn">
                    {eventDetails.foodArrangements.map((food, index) => (
                      <div key={index} className="foodArrangementsDiv">
                        <pre>{food}</pre>
                        <AiFillDelete
                          onClick={() => handleRemoveFoodArrangements(index)}
                        />
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                    placeholder="Food Arrangements"
                  />
                  <button
                    type="button"
                    onClick={handleAddFoodArrangements}
                    className="addBtn"
                  >
                    Food
                  </button>
                </div>
                <div className="equipmentList" style={{ gridArea: "j" }}>
                  <div className="equipmentListAndBtn">
                    {eventDetails.equipmentList.map((equipment, index) => (
                      <div key={index} className="equipmentListDiv">
                        <p>{equipment}</p>
                        <AiFillDelete
                          onClick={() => handleRemoveEquipment(index)}
                        />
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                    placeholder="Equipments"
                  />
                  <button
                    type="button"
                    onClick={handleAddEquipment}
                    className="addBtn"
                  >
                    Equipment
                  </button>
                </div>
                <div className="supportPerson" style={{ gridArea: "k" }}>
                  <div className="supportPersonDetailsAndBtn">
                    {eventDetails.supportPerson.map((person, index) =>
                      person.name ? (
                        <div key={index} className="supportPersonDiv">
                          <pre>
                            {person.name} - {person.task}
                          </pre>
                          <AiFillDelete
                            onClick={() => handleRemoveSupportPerson(person)}
                          />
                        </div>
                      ) : (
                        ""
                      )
                    )}
                  </div>
                  <input
                    type="text"
                    className="supportPersonDetails"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    placeholder="Support person name"
                  />
                  <input
                    type="text"
                    className="supportPersonDetails"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Support person task"
                  />
                  <button
                    type="button"
                    onClick={handleAddSupportPerson}
                    className="addBtn"
                  >
                    Person
                  </button>
                </div>
                <div style={{ gridArea: "l" }}>
                  <button className="hostBtn" type="submit">
                    Host
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainDiv>
  );
};
const MainDiv = styled.div`
  .allEvents {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0px;
    p {
      line-height: 1.2;
      margin: 0;
      padding: 0;
      font-size: 20px;
      font-weight: 500;
    }
    h1 {
      font-size: 35px;
      margin: 0;
      padding: 0;
      line-height: 1.2;
    }
  }

  .imageAndFormDiv {
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* border: 1px solid black; */
    .imageDiv {
      width: 30%;
      /* border: 1px solid black; */
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: auto;
      }
    }
    .formDiv {
      width: 60%;
      border-radius: 20px;
      /* border: 1px solid red; */
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      box-sizing: border-box;
      h1 {
        font-size: 40px;
        font-weight: 400;
        width: 100%;
        text-align: center;
      }
      .EventDetails {
        width: 100%;
        padding: 20px;
        display: grid;
        box-sizing: border-box;
        justify-content: center;
        /* border: 1px solid black; */
        align-items: center;
        gap: 20px;
        grid-template-areas:
          "a a b b"
          "c c d d"
          "e e f f"
          "g g h h"
          "i i j j"
          "k k k k"
          "l l l l";
        div {
          /* border: 1px solid black; */
          display: flex;
          justify-content: center;
          input {
            /* border: 1px solid black; */
            width: 400px;
            padding: 15px 0px 15px 15px;
            border: 2px solid #cccc;
            outline: none;
            border-radius: 5px;
            font-size: 16px;
            &:hover {
              border: 2px solid #2678ec;
              cursor: pointer;
            }
          }
        }
        .hostBtn {
          width: 30%;
          color: #fff;
          font-weight: 700;
          background: linear-gradient(to bottom, #5ebed8, #2678ec);
          border: none;
          padding: 10px 20px;
          margin: 30px 0px;
          border-radius: 5px;
          font-size: 20px;
          &:hover {
            cursor: pointer;
            background: linear-gradient(to bottom, #2678ec, #5ebed8);
          }
        }
        .equipmentList,
        .foodArrangements {
          /* margin-top: 10px; */
          box-sizing: border-box;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          /* border: 1px solid black; */

          .equipmentListAndBtn,
          .foodArrangementsAndBtn {
            /* border: 1px solid black; */
            /* box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px; */
            max-width: 300px;
            display: flex;
            width: 50%;
            overflow-x: auto;
            .equipmentListDiv,
            .foodArrangementsDiv {
              border: 1px solid #cccc;
              max-height: 25px;
              display: flex;
              align-items: center;
              justify-content: space-around;
              padding: 5px 10px;
              background-color: #fff;
              color: black;
              margin-left: 10px;
              border-radius: 10px;
              svg {
                cursor: pointer;
                margin-left: 10px;
                font-size: 16px;
                color: red;
              }
            }
          }
          input {
            width: 90%;
            padding: 15px 0px 15px 15px;
            border: 2px solid #cccc;
            outline: none;
            border-radius: 5px;
            margin: 8px 0px;
            font-size: 16px;
          }
          .addBtn {
            width: 60%;
            margin-top: 10px;
            padding: 8px;
            border: none;
            background: linear-gradient(to bottom, #5ebed8, #2678ec);
            color: #fff;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 700;
            &:hover {
              background: linear-gradient(to bottom, #2678ec, #5ebed8);
              cursor: pointer;
            }
          }
        }
        .supportPerson {
          box-sizing: border-box;
          width: 100%;
          display: flex;
          flex-direction: column;
          /* border: 1px solid black; */
          align-items: center;
          /* margin-bottom: 10px; */
          .supportPersonDetailsAndBtn {
            /* border: 1px solid black; */
            display: flex;
            max-width: 550px;
            width: 50%;
            overflow-x: auto;
            .supportPersonDiv {
              max-height: 30px;
              display: flex;
              align-items: center;
              justify-content: space-around;
              padding: 5px 10px;
              background-color: #ffff;
              color: black;
              margin-left: 10px;
              border-radius: 10px;
              svg {
                cursor: pointer;
                margin-left: 10px;
                font-size: 16px;
                color: red;
              }
            }
          }
          input {
            width: 95%;
            padding: 15px 0px 15px 15px;
            border: 2px solid #cccc;
            outline: none;
            border-radius: 5px;
            margin: 8px 0px;
            font-size: 16px;
          }
          .addBtn {
            margin-top: 10px;
            width: 50%;
            padding: 10px;
            border: none;
            background: linear-gradient(to bottom, #5ebed8, #2678ec);
            color: #fff;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 700;
            &:hover {
              cursor: pointer;
              background: linear-gradient(to bottom, #2678ec, #5ebed8);
            }
          }
        }
      }
      .EventDetails > input:nth-child(1) {
        grid-area: a;
      }
      .EventDetails > input:nth-child(2) {
        grid-area: b;
      }
      .EventDetails > input:nth-child(3) {
        grid-area: c;
      }
      .EventDetails > input:nth-child(4) {
        grid-area: d;
      }
      .EventDetails > input:nth-child(5) {
        grid-area: e;
      }
      .EventDetails > input:nth-child(6) {
        grid-area: f;
      }
      .EventDetails > input:nth-child(7) {
        grid-area: g;
      }
      .EventDetails > input:nth-child(8) {
        grid-area: h;
      }
      .EventDetails > input:nth-child(9) {
        grid-area: i;
      }
      .EventDetails > input:nth-child(10) {
        grid-area: j;
      }
      .EventDetails > input:nth-child(11) {
        grid-area: k;
      }
      .EventDetails > input:nth-child(12) {
        grid-area: l;
      }
    }
  }
`;
