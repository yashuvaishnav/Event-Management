import React from "react";
import styled from "styled-components";
import { LuRefreshCcw } from "react-icons/lu";

export const ClientsTable = () => {
  return (
    <MainDiv>
      <div className="filterAndSearch">
        <input type="text" placeholder="Search..." />
        <div>
          <LuRefreshCcw />
        </div>
      </div>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th className="selectAllInput">
                <button>Select All</button>
              </th>
              <th>Name</th>
              <th>Company Name</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Company Size</th>
              <th>Company Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="selectAllInput">
                <input type="checkbox" />
              </td>
              <td>Aakancha Bhardwaj</td>
              <td>ABC ltd.</td>
              <td>Sr. Manager</td>
              <td>aakanchha@tnsppil.in</td>
              <td>9587462148</td>
              <td>Micro</td>
              <td>Listed</td>
            </tr>
            <tr>
              <td className="selectAllInput">
                <input type="checkbox" />
              </td>
              <td>Abhishek Kumar</td>
              <td>BCD ltd.</td>
              <td>Director</td>
              <td>abhishek@tnsppil.in</td>
              <td>9587462148</td>
              <td>Large</td>
              <td>Unlisted</td>
            </tr>
            <tr>
              <td className="selectAllInput">
                <input type="checkbox" />
              </td>
              <td>Aakanchha Bhardwaj</td>
              <td>ABC ltd.</td>
              <td>Sr. Manager</td>
              <td>aakanchha@tnsppil.in</td>
              <td>9587462148</td>
              <td>Micro</td>
              <td>Listed</td>
            </tr>
            <tr>
              <td className="selectAllInput">
                <input type="checkbox" />
              </td>
              <td>Abhishek Kumar</td>
              <td>BCD ltd.</td>
              <td>Director</td>
              <td>abhishek@tnsppil.in</td>
              <td>9587462148</td>
              <td>Large</td>
              <td>Unlisted</td>
            </tr>
          </tbody>
        </table>
      </TableContainer>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  padding: 20px;
  margin: 20px;
  .filterAndSearch {
    display: flex;
    align-items: center;
    width: 90%;
    margin: 10px auto;
    gap: 10px;
    input {
      cursor: pointer;
      background-color: #f8fafb;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 10px;
      font-weight: 500;
    }
    div {
      background-color: #f8fafb;
      padding: 10px;
      border-radius: 5px;
      svg {
        cursor: pointer;
      }
    }
  }
`;

const TableContainer = styled.div`
  width: 90%;
  margin: auto;
  table {
    width: 100%;
    background-color: #f8fafb;
    border-radius: 8px;
    border-collapse: collapse;
    thead {
      .selectAllInput {
        text-align: center;
        button {
          background: none;
          outline: none;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 16px;
        }
      }
      th {
        border-right: 1px solid #cccc;
        padding: 12px;
        text-align: left;
      }
      th:nth-child(2) {
        width: 150px;
      }

      th:nth-child(3) {
        width: 200px;
      }
      th:last-child {
        border-right: none;
      }
    }
    tbody {
      tr:nth-child(odd) {
        background-color: #fbfcfd;
      }
      .selectAllInput {
        text-align: center;
        input {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      }
      td {
        border-right: 1px solid #cccc;
        padding: 12px;
        text-align: left;
      }
      td:last-child {
        border-right: none;
      }
    }
  }
`;
