import React from "react";
import styled from "styled-components";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEvent, MdEventAvailable } from "react-icons/md";

export const Dashboard = () => {
  return (
    <MainDiv>
      <div className="clients">
        <FaRegUserCircle />
        <h1>50</h1>
        <h1>Total Clients</h1>
      </div>
      <div className="clients">
      <MdEvent />
        <h1>120</h1>
        <h1>Total Events</h1>
      </div>
      <div className="clients">
      <MdEventAvailable />
        <h1>23</h1>
        <h1>Completed Events</h1>
      </div>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  margin: auto;
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  .clients {
    width: 28%;
    height: 180px;
    border-radius: 15px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 1.5rem;
    svg{
      font-size: 45px;
      color: #2678ec;
    }
    h1{
      margin-top: 30px;
    }
    &:hover{
      background-color: #2678ec;
      color: #fff;
      svg{
        color :#fff;
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
`;
