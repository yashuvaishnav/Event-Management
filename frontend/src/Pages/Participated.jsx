import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Loader } from "../Components/Loader/Loading";
import { SiGmail } from "react-icons/si";
import { Toastify } from "../Components/Toast/Toastify";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  fetchGoogleEventsData,
  sendThankYouMail,
  updateAttedance,
} from "../Components/Redux/DummyGoogleAuth/action";
import { GoInfo } from "react-icons/go";
import { LuRefreshCcw } from "react-icons/lu";

export const Participated = () => {
  const [filteredParticipatedData, setFilteredParticipatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const itemsPerPage = 5;
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();

  const { googleEventsData, isLoading } = useSelector((store) => {
    return {
      googleEventsData: store.googleEventReducer.googleEventsData,
      isLoading: store.googleEventReducer.isLoading,
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(fetchGoogleEventsData());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    let filteredData = [];
    if (selectedEventId === "" && googleEventsData.length > 0) {
      filteredData = googleEventsData[0].attendees || [];
    } else if (selectedEventId !== "") {
      const selectedEvent = googleEventsData.find(
        (event) => event._id === selectedEventId
      );
      if (selectedEvent) {
        filteredData = selectedEvent.attendees || [];
      }
    }
    if (debouncedSearchQuery) {
      filteredData = filteredData.filter((attendee) =>
        // attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // attendee.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attendee.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredParticipatedData(filteredData);
  }, [selectedEventId, debouncedSearchQuery, googleEventsData]);

  const handleNextPage = () => {
    if (
      currentPage < Math.ceil(filteredParticipatedData.length / itemsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentData = filteredParticipatedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAttendance = async (attendance, client) => {
    const selectedEvent = googleEventsData.find(
      (event) =>
        event._id ===
        (selectedEventId === "" ? googleEventsData[0]._id : selectedEventId)
    );
    let obj = {
      attendance: attendance,
      client: client,
    };
    try {
      dispatch(updateAttedance(obj, selectedEvent));
    } catch (error) {
      console.log(error);
    }
  };

  const postThankYouMail = async (client) => {
    dispatch(sendThankYouMail(client));
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedEventId("");
  };
  console.log(Math.ceil(filteredParticipatedData.length / itemsPerPage));

  return (
    <MainDiv>
      <Toastify />
      <div className="allData">
        <div className="heading">
          <p>CLIENTS PARTICIPATED</p>
          <div className="searchClient">
            <input
              type="text"
              placeholder="Search Client"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
            >
              <option value="">Select Events</option>
              {googleEventsData.map((event) => (
                <option
                  key={event._id}
                  value={event._id}
                  className="selectedOption"
                >
                  {event.summary}
                </option>
              ))}
            </select>
            <div onClick={handleReset}>
              <LuRefreshCcw />
            </div>
          </div>
        </div>
        <div className="table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <TableContainer>
              <table className="clientDataTable">
                <thead>
                  <tr>
                    <th className="selectAllInput">Attandance</th>
                    <th>Name</th>
                    <th>Company Name</th>
                    <th>Designation</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Company Type</th>
                    <th className="sendMailHead">
                      Send Email{" "}
                      <GoInfo
                        size={18}
                        onMouseEnter={() => setShowPopup(true)}
                        onMouseLeave={() => setShowPopup(false)}
                      />
                      <ShowInfo visible={showPopup}>
                        For sending invitations click the send mail button.
                      </ShowInfo>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.length > 0 ? (
                    currentData.map((client, i) => (
                      <tr key={i}>
                        <td className="selectAllInput">
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={client.attendance}
                            onChange={(e) =>
                              handleAttendance(e.target.checked, client)
                            }
                            readOnly
                          />
                        </td>
                        <td>{client.name}</td>
                        <td>{client.companyName}</td>
                        <td>{client.designation}</td>
                        <td>{client.email}</td>
                        <td>{client.contact}</td>
                        <td>{client.companyType}</td>
                        <td className="send-mail">
                          <button
                            className="mail-btn"
                            onClick={() => postThankYouMail(client)}
                          >
                            <SiGmail />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="noDataAvailable">
                        No Data Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </TableContainer>
          )}
        </div>
        <PaginationContainer>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={
              currentPage ===
                Math.ceil(filteredParticipatedData.length / itemsPerPage) ||
              currentData.length == 0
            }
          >
            Next
          </button>
        </PaginationContainer>
      </div>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  .heading {
    display: flex;
    width: 90%;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    margin-top: 10px;
    p {
      font-size: 1.5rem;
      font-weight: 500;
      color: #868686;
    }

    .searchClient {
      display: flex;
      align-items: center;
      justify-content: end;
      gap: 20px;
      width: 50%;
      input {
        background-color: #f8fafb;
        border: none;
        border-radius: 5px;
        outline: none;
        padding: 10px;
        font-weight: 500;
        width: 30%;
      }
      select {
        font-weight: 520;
        color: #868686;
        background-color: #f8fafb;
        width: 30%;
        padding: 8px;
        border-radius: 5px;
        outline: none;
        border: none;
        cursor: pointer;
        option {
          margin: 10px;
        }
      }
      div {
        background-color: #f8fafb;
        padding: 10px;
        border-radius: 5px;
        &:hover {
          cursor: pointer;
        }
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
      }
      .sendMailHead {
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          margin-left: 5px;
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
      tr {
        &:hover {
          background: #e4e3e3cc;
        }
      }
      tr:nth-child(odd) {
        background-color: #fbfcfb;
        &:hover {
          background: #e4e3e3cc;
        }
      }
      .selectAllInput {
        text-align: center;
        input {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      }
      .send-mail {
        display: flex;
        justify-content: center;
        align-items: center;
        .mail-btn {
          padding: 6px 12px;
          color: black;
          background: none;
          font-size: 18px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
          svg {
            font-size: 20px;
          }
        }
      }
      td {
        border-right: 1px solid #cccc;
        padding: 8px 12px;
        text-align: left;
      }
      td:last-child {
        border-right: none;
      }
      tr {
        .noDataAvailable {
          text-align: center;
          padding: 16px 0px;
        }
      }
    }
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  button {
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
  span {
    font-size: 18px;
  }
`;

const ShowInfo = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 5px 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.3s;
  white-space: nowrap;
  left: 80%;
  top: 20%;
  transform: translate(-50%, -50%);
`;
