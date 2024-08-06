import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Toastify,
  showErrorToast,
  showSuccessToast,
} from "../Components/Toast/Toastify";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAdminData, Logout } from "../Components/Redux/Admin/action";
import { MdLogout, MdDashboard } from "react-icons/md";
import { Menu, MenuItem, Avatar, Button } from "@mui/material";
import { MdEvent } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

export const AdminNavbar = ({isAuthorized,setIsAuthorized}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(null);
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

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("event");
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_in")
    setIsAuthorized(false);
    dispatch(Logout(showSuccessToast, showErrorToast, navigate));
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleClickDashMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseDashMenu = () => {
    setOpen(null);
  };

  return (
    <Navbar>
      <Toastify />
      <div className="logoAndSections">
        <div onClick={() => navigate("/")}>
          <img
            src={
              "https://ceoitbox.com/wp-content/uploads/2022/04/logo.png.webp"
            }
            className="App-logo"
            alt="logo"
          />
        </div>

        <div className="profileAndLogoutBtn">
          <div>
            {isAuthorized && (
              <Button
                onClick={handleClickDashMenu}
                startIcon={<MdDashboard size={18} />}
              >
                Dashboard
              </Button>
            )}
            <Menu
              id="simple-menu"
              anchorEl={open}
              keepMounted
              open={Boolean(open)}
              onClose={handleCloseDashMenu}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: "19px",
                  padding: "10px 10px",
                  border: "1px solid rgba(183, 175, 208, 0.16)",
                  boxShadow: "27px 10px 74px 0px rgba(167, 175, 193, 0.26)",
                },
              }}
            >
              <MenuItem
                sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                onClick={() => handleClick("/adminDashboard")}
              >
                <MdDashboard /> Dashboard
              </MenuItem>
              <MenuItem
                sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                onClick={() => handleClick("/allEvents")}
              >
                <MdEvent /> All Events
              </MenuItem>
              <MenuItem
                sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                onClick={() => handleClick("/participants")}
              >
                <FaUserTie /> Participants
              </MenuItem>
              <MenuItem
                sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                onClick={() => handleClick("/participated")}
              >
                <FaUsers /> Participated
              </MenuItem>
              <MenuItem
                sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                onClick={() => handleClick("/dummyHostEvent")}
              >
                <MdEventAvailable /> Host Event
              </MenuItem>
            </Menu>
          </div>

          <div>
            <Avatar
              onClick={handleClickMenu}
              sx={{ cursor: "pointer", width: "30px", height: "30px" }}
            />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: "19px",
                  padding: "10px 10px",
                  border: "1px solid rgba(183, 175, 208, 0.16)",
                  boxShadow: "27px 10px 74px 0px rgba(167, 175, 193, 0.26)",
                },
              }}
            >
              <MenuItem>{adminData.name}</MenuItem>{" "}
              <MenuItem>{adminData.email}</MenuItem>{" "}
              <MenuItem
                sx={{
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "18px",
                }}
                onClick={handleLogout}
              >
                <MdLogout size={18} style={{ color: "#00bce0" }} />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

const Navbar = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 5px 20px;
  .logoAndSections {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .App-logo {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
  .profileAndLogoutBtn {
    display: flex;
    gap: 20px;
    align-items: center;
  }
`;
