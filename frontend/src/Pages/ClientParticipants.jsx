import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SiGmail } from "react-icons/si";
import { Loader } from "../Components/Loader/Loading";
import { showErrorToast, Toastify } from "../Components/Toast/Toastify";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getParticipantsData } from "../Components/Redux/Participants/action";
import {
  getGoogleEventsDataById,
  patchAttendees,
} from "../Components/Redux/DummyGoogleAuth/action";
import { GoInfo } from "react-icons/go";
import { LuRefreshCcw } from "react-icons/lu";

export const ClientParticipants = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const eventsData = localStorage.getItem("event");
  const googleEventsData = JSON.parse(eventsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();
  const gapi = window.gapi;

  const { participantsData, isLoading, singleEventData } = useSelector(
    (store) => {
      return {
        participantsData: store.participantsReducer.participantsData,
        isLoading: store.participantsReducer.isLoading,
        singleEventData: store.googleEventReducer.singleEventData,
      };
    },
    shallowEqual
  );

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      dispatch(getParticipantsData(searchQuery));
    }, 1000);
    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(participantsData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentData = participantsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const sendMail = async (client) => {
    const clientDataEmail = client.email;
    const eventId = googleEventsData.key;
    const eventNormalId = googleEventsData._id;
    const clientDataName = client.name;
    const clientDataContact = client.contact;
    const clientDataCompanyName = client.companyName;
    const clientDataDesignation = client.designation;
    const clientDataCompanyType = client.companyType;

    try {
      const response = await gapi.client.calendar.events.get({
        calendarId: "primary",
        eventId: eventId,
      });
      const event = response.result;
      const attendees = event.attendees || [];
      attendees.push({
        email: clientDataEmail,
        responseStatus: "needsAction",
      });

      await gapi.client.calendar.events.patch({
        calendarId: "primary",
        eventId: eventId,
        resource: { attendees },
        sendUpdates: "all",
      });
      dispatch(getGoogleEventsDataById(eventNormalId));
      const updatedEventData = {
        ...singleEventData,
        attendees: [
          ...singleEventData.attendees,
          {
            email: clientDataEmail,
            responseStatus: "needsAction",
            attendance: false,
            name: clientDataName,
            contact: clientDataContact,
            companyName: clientDataCompanyName,
            companyType: clientDataCompanyType,
            designation: clientDataDesignation,
          },
        ],
      };
      dispatch(
        patchAttendees(eventNormalId, updatedEventData, clientDataEmail)
      );
    } catch (error) {
      console.error("Error sending invitation or updating event", error);
      showErrorToast("Error sending invitation or updating event");
    }
  };

  const handleReset = () => {
    setSearchQuery("");
  };

  return (
    <MainDiv>
      <Toastify />
      <div className="clientDataAndPagination">
        <div className="heading">
          <p> For Events Participants</p>
          <div className="searchAndReset">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div>
              <LuRefreshCcw onClick={handleReset} />
            </div>
          </div>
        </div>

        <div className="table-container">
          {isLoading ? (
            <Loader />
          ) : (
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
                          <input type="checkbox" />
                        </td>
                        <td>{client.name}</td>
                        <td>{client.companyName}</td>
                        <td>
                          {client.designation != "" ? client.designation : ""}
                        </td>
                        <td>{client.email}</td>
                        <td>{client.contact}</td>
                        <td>
                          {client.companyType != "" ? client.companyType : ""}
                        </td>
                        <td className="send-mail">
                          <button
                            className="mail-btn"
                            onClick={() => sendMail(client)}
                          >
                            <SiGmail />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="noDataAvailable">No Data Available</td>
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
              currentPage === Math.ceil(participantsData.length / itemsPerPage)
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
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: auto;
    margin-top: 10px;
    p {
      font-size: 1.5rem;
      font-weight: bold;
      color: #868686;
    }
    .searchAndReset {
      display: flex;
      align-items: center;
      gap: 10px;
      input {
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
        button {
          background: none;
          outline: none;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 16px;
        }
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
  left: 82%;
  top: 20%;
  transform: translate(-50%, -50%);
`;
