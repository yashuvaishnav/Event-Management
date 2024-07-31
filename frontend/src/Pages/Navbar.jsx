
import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Navbar = () => {
    const navigate = useNavigate();
  return (
    <NavbarDiv>
        <div className="logoAndSections">
          <div className="logodiv" onClick={()=>navigate("/")}>
            <img
              src={
                "https://ceoitbox.com/wp-content/uploads/2022/04/logo.png.webp"
              }
              className="App-logo"
              alt="logo"
            />
          </div>
          <div className="sectionsDiv">
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Homepage
            </button>
            <button
              
              onClick={() => {
                navigate("/service");
              }}
            >
              Services
            </button>
            <button
              
              onClick={() => {
                navigate("/testimonial");
              }}
            >
              Testimonial
            </button>
            <button
              
              onClick={() => {
                navigate("/contact");
              }}
            >
              Contacts
            </button>
          </div>
        </div>
        <div className="dashboardDiv">
          <button onClick={()=>navigate("/adminDashboard")}>Dashboard</button>
        </div>
      </NavbarDiv>
  )
}

const NavbarDiv = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .logoAndSections {
    display: flex;
    justify-content: space-evenly;
    /* border : 2px solid black; */
    width: 60%;
    .logodiv {
      width: 10%;
      /* border : 2px solid red; */
      display: flex;
      align-items: center;
      padding: 10px;
      img {
        width: 70%;
      }
      &:hover{
        cursor: pointer;
      }
    }
    .sectionsDiv {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      /* border : 2px solid black; */
      width: 60%;
      button {
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
        display: block;
        font-family: inherit;
        font-size: 24px;
        line-height: 1.5;
        color: inherit;
      }
      button:focus {
        outline: none;
      }
      button:hover {
        color: #2678ec;
      }
    }
  }
  .dashboardDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      padding: 12px 20px;
      font-size: 24px;
      border-radius: 10px;
      background-color: #2678ec;
      color: #ffff;
      border: none;
      cursor: pointer;
    }
  }
`;