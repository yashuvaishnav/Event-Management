import React, { useEffect } from "react";
import styled from "styled-components";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEvent, MdEventAvailable } from "react-icons/md";
import { GoInfo } from "react-icons/go";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getParticipantsData } from "../Components/Redux/Participants/action";
import { fetchGoogleEventsData } from "../Components/Redux/DummyGoogleAuth/action";

export const Dashboard = ({
  isAuthorized,
  handleAuthClick,
  handleSignoutClick,
}) => {
  
  const dispatch = useDispatch();
  const { googleEventsData,participantsData } = useSelector((store) => {
    return {
      googleEventsData: store.googleEventReducer.googleEventsData,
      participantsData : store.participantsReducer.participantsData
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(fetchGoogleEventsData());
    dispatch(getParticipantsData());
  }, []);

  const storedAccessToken = localStorage.getItem('access_token');
  return (
    <MainDiv>
      <Authorize>
        {isAuthorized && storedAccessToken ? (
          <div className="signoutDiv">
            <button id="signoutButton" onClick={handleSignoutClick}>
              Sign Out
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <GoInfo size={18} />
              <p>
                After signing out you will not be able to Create, update and
                delete events.
              </p>
            </div>
          </div>
        ) : (
          <div className="authorizeDiv">
            <button id="authorizeButton" onClick={handleAuthClick}>
              Authorize
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <GoInfo size={18} />
              <p>
                For Creating, updating and deleting events. you need to
                authorize first.
              </p>
            </div>
          </div>
        )}
      </Authorize>
      <div className="allClients">
        <div className="clients">
          <FaRegUserCircle />
          <h2>{participantsData.length}</h2>
          <h1>Total Clients</h1>
        </div>
        <div className="clients">
          <MdEvent />
          <h2>{googleEventsData.length}</h2>
          <h1>Total Events</h1>
        </div>
        <div className="clients">
          <MdEventAvailable />
          <h2>0</h2>
          <h1>Completed Events</h1>
        </div>
      </div>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  .allClients {
    width: 90%;
    margin: auto;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    /* border: 1px solid black; */
    .clients {
      width: 25%;
      height: 150px;
      border-radius: 15px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      padding: 1.5rem;
      svg {
        font-size: 45px;
        color: #2678ec;
      }
      h1 {
        margin-top: 15px;
      }
      &:hover {
        background-color: #2678ec;
        color: #fff;
        svg {
          color: #fff;
        }
      }
    }
    .totalEvents {
      width: 30%;
      height: 250px;
      border-radius: 15px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .totalEvents {
      width: 30%;
      height: 250px;
      border-radius: 15px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  }
`;

const Authorize = styled.div`
  padding: 20px 20px 0px 20px;
  display: flex;
  /* border: 1px solid black; */
  .signoutDiv,
  .authorizeDiv {
    width: 40%;
    padding: 20px 20px 0px 20px;
    margin: auto;
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  #signoutButton,
  #authorizeButton {
    width: 60%;
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    background-color: #2678ec;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  }
`;
