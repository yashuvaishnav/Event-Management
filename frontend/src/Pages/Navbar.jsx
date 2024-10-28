
import React from "react";
import { useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from '../assets/GatherPro.jpeg';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedInToken = localStorage.getItem("token");
  return (
    <NavbarDiv>
      <div className="logoAndSections">
        <div className="logodiv" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className="App-logo" />
        </div>

        <div className="sectionsDiv">
          <button
            onClick={() => {
              navigate("/");
            }}
            style={{
              color: location.pathname === "/" ? "#2678ec" : "",
            }}
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate("/service");
            }}
            style={{
              color: location.pathname === "/service" ? "#2678ec" : "",
            }}
          >
            Services
          </button>
          <button
            onClick={() => {
              navigate("/testimonial");
            }}
            style={{
              color: location.pathname === "/testimonial" ? "#2678ec" : "",
            }}
          >
            Testimonial
          </button>
          <button
            onClick={() => {
              navigate("/contact");
            }}
            style={{
              color: location.pathname === "/contact" ? "#2678ec" : "",
            }}
          >
            Contact us
          </button>
        </div>

        <div className="dashboardDiv">
          {isLoggedInToken ? (
            <button onClick={() => navigate("/adminDashboard")}>
              Dashboard
            </button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </div>
      </div>
    </NavbarDiv>
  );
};

const NavbarDiv = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  // width: 100%;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 999;
  .logoAndSections {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .logodiv {
      display: flex;
      align-items: center;
      &:hover {
        cursor: pointer;
      }
    }
    .App-logo {
      width: 50px;
      height: 50px;
      object-fit: contain;
    }
    .sectionsDiv {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      /* border : 2px solid black; */
      width: 50%;
      button {
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
        display: block;
        font-family: inherit;
        font-size: 18px;
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
      font-size: 18px;
      border-radius: 10px;
      background-color: #2678ec;
      color: #ffff;
      border: none;
      cursor: pointer;
    }
  }
`;
