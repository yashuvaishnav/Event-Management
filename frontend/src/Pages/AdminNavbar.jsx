
import React, { useEffect, useState } from "react";
import { TbLogout } from "react-icons/tb";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Toastify,
  showErrorToast,
  showSuccessToast,
} from "../Components/Toast/Toastify";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAdminData, Logout } from "../Components/Redux/Admin/action";
import { Loader } from "../Components/Loader/Loading";


export const AdminNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { adminData, isLoading } = useSelector((store) => {
    return {
      adminData: store.adminReducer.adminData,
      isLoading: store.adminReducer.isLoading,
    };
  }, shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminData());
  }, []);

  const handleClick = (tab) => {
    navigate(tab);
    setDropdownOpen(!dropdownOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("event");
    dispatch(Logout(showSuccessToast, showErrorToast, navigate));
  };

  return (
    <Navbar>
      <Toastify />
      <div className="logoAndSections">
        <div className="logodiv" onClick={() => navigate("/")}>
          <img
            src={
              "https://ceoitbox.com/wp-content/uploads/2022/04/logo.png.webp"
            }
            className="App-logo"
            alt="logo"
          />
        </div>
        <div className="profileAndLogoutBtn">
          <div className="profileContainer">
            <div className="profilePicture">
              <img
                src={
                  "https://th.bing.com/th/id/OIP.CMQW9r9kxtUEDvQTZ6tZPAHaHa?w=667&h=667&rs=1&pid=ImgDetMain"
                }
                alt="Profile"
              />
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="userInfo">
                <h1 className="userName">{adminData.name}</h1>
                <p className="userEmail">{adminData.email}</p>
                <div className="dropdownButton" onClick={toggleDropdown}>
                  {dropdownOpen ? (
                    <TiArrowSortedUp
                      style={{ fontSize: "30px", margin: "auto", width: "20%" }}
                    />
                  ) : (
                    <TiArrowSortedDown
                      style={{ fontSize: "30px", margin: "auto", width: "20%" }}
                    />
                  )}
                </div>
                {dropdownOpen && (
                  <div className="dropdownMenu">
                    <button onClick={() => handleClick("/adminDashboard")}>
                      DASHBOARD
                    </button>
                    <button onClick={() => handleClick("/allEvents")}>
                      ALL EVENTS
                    </button>
                    <button onClick={() => handleClick("/participants")}>
                      PARTICIPANTS
                    </button>
                    <button onClick={() => handleClick("/participated")}>
                      PARTICIPATED
                    </button>
                    <button onClick={() => handleClick("/dummyHostEvent")}>
                      HOST EVENT
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="logoutLogo" onClick={handleLogout}>
            <TbLogout
              style={{
                background: "none",
                color: "#2678ec",
                fontSize: "50px",
              }}
            />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

const Navbar = styled.div`
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 10px;
  /* border: 1px solid black; */
  .logoAndSections {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border : 2px solid black; */
    width: 75%;
    margin: auto;
    .logodiv {
      width: 10%;
      /* border : 2px solid red; */
      display: flex;
      align-items: center;
      /* padding: 10px; */
      img {
        width: 60%;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .profileAndLogoutBtn {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    /* padding: 10px; */
    width: 35%;
    .profileContainer {
      width: 70%;
      /* border: 1px solid black; */
      display: flex;
      /* justify-content: space-evenly; */
      align-items: center;
      .profilePicture img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 0px 10px 20px 0px;
      }
      .userInfo {
        /* border: 1px solid black; */
        display: flex;
        flex-direction: column;
        text-align: start;
        p,
        h1 {
          margin: 0px;
          padding: 0px;
          line-height: 1.5;
        }
        .dropdownButton {
          display: flex;
          align-items: center;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .logoutLogo {
      &:hover {
        cursor: pointer;
      }
    }
  }

  .dropdownMenu {
    position: absolute;
    top: 12%;
    left: 66%;
    background: linear-gradient(to bottom, #5ebed8, #2678ec);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    z-index: 1;
    width: 12.5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    padding: 10px 0px;
    button {
      padding: 10px;
      width: 80%;
      margin: 10px;
      background-color: #ffff;
      border: none;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      cursor: pointer;
      border-radius: 5px;
      color: #1a1a56;
      font-weight: bold;
      font-size: 18px;
      &:hover {
        background: linear-gradient(to bottom, #5ebed8, #82c9f3);
      }
    }
  }
`;
