import React from "react";
import styled from "styled-components";


import { AdminNavbar } from "./AdminNavbar";

export const Dashboard = () => {

  return (
    <MainDiv>
      <AdminNavbar />
      <h1>Admin Dashboard </h1>
    </MainDiv>
  );
};

const MainDiv = styled.div``;
