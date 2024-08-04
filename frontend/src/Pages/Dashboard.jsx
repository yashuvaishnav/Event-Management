import React from "react";
import styled from "styled-components";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEvent, MdEventAvailable } from "react-icons/md";

export const Dashboard = ({
  isAuthorized,
  handleAuthClick,
  handleSignoutClick,
}) => {
  return (
    <MainDiv>
      <Authorize>
        {isAuthorized ? (
          <div className="signoutDiv">
            <button id="signoutButton" onClick={handleSignoutClick}>
              Sign Out
            </button>
            <p>
              After signing out you will not be able to Create, update and delete events.
            </p>
          </div>
        ) : (
          <div className="authorizeDiv">
            <button id="authorizeButton" onClick={handleAuthClick}>
              Authorize
            </button>
            <p>
              For Creating, updating and deleting events. you need to authorize
              first.
            </p>
          </div>
        )}
      </Authorize>
      <div className="allClients">
        <div className="clients">
          <FaRegUserCircle />
          <h2>50</h2>
          <h1>Total Clients</h1>
        </div>
        <div className="clients">
          <MdEvent />
          <h2>120</h2>
          <h1>Total Events</h1>
        </div>
        <div className="clients">
          <MdEventAvailable />
          <h2>23</h2>
          <h1>Completed Events</h1>
        </div>
      </div>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  .allClients {
    margin: auto;
    margin-top: 50px;
    display: flex;
    justify-content: space-evenly;
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
  .signoutDiv, .authorizeDiv {
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
