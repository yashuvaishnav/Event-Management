import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Loader } from "../Components/Loader/Loading";
import { SiGmail } from "react-icons/si";
import { showSuccessToast, Toastify } from "../Components/Toast/Toastify";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getParticipatedData,
  sendThankYouMail,
} from "../Components/Redux/Participated/action";
import { fetchEventsData } from "../Components/Redux/Events/action";
import { fetchGoogleEventsData } from "../Components/Redux/DummyGoogleAuth/action";
import { GoInfo } from "react-icons/go";


export const Participated = () => {
  const [filteredParticipatedData, setFilteredParticipatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 8;
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();

  const { participatedsData, isLoading, eventsData } = useSelector((store) => {
    return {
      participatedsData: store.participatedReducer.participatedData,
      isLoading: store.participatedReducer.isLoading,
      eventsData: store.eventReducer.eventsData,
    };
  }, shallowEqual);
  useEffect(() => {
    dispatch(getParticipatedData(searchQuery));
    dispatch(fetchEventsData());
  }, []);

  // const { googleEventsData } = useSelector((store) => {
  //   return {
  //     googleEventsData: store.googleEventReducer.googleEventsData,
  //     isLoading: store.googleEventReducer.isLoading,
  //   };
  // }, shallowEqual);

  // useEffect(() => {
  //   dispatch(fetchGoogleEventsData());
  // }, []);

  useEffect(() => {
    let initialFilteredData2 = participatedsData;
    if (selectedEventId === "" && eventsData.length > 0) {
      initialFilteredData2 = initialFilteredData2.filter(
        (item) => item.eventId === eventsData[0]._id
      );
    } else if (selectedEventId !== "") {
      initialFilteredData2 = initialFilteredData2.filter(
        (item) => item.eventId === selectedEventId
      );
    }
    setFilteredParticipatedData(initialFilteredData2);
  }, [participatedsData, selectedEventId, eventsData]);

  useEffect(() => {
    let filteredData = participatedsData;
    if (selectedEventId === "" && eventsData.length > 0) {
      filteredData = filteredData.filter(
        (item) => item.eventId === eventsData[0]._id
      );
    } else if (selectedEventId !== "") {
      filteredData = filteredData.filter(
        (item) => item.eventId === selectedEventId
      );
    }

    if (searchQuery !== "") {
      filteredData = filteredData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredParticipatedData(filteredData);
    setCurrentPage(1);
  }, [participatedsData, selectedEventId, searchQuery, eventsData]);

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

  const handleAttendance = async (attendance, id) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/clientForEvent/attendance/${id}`,
        { attendance }
      );
      console.log(res);
      showSuccessToast("Attendance update successfully")

      const updatedFilteredParticipatedData = filteredParticipatedData.map(
        (item) => (item._id === id ? { ...item, attendance } : item)
      );
      setFilteredParticipatedData(updatedFilteredParticipatedData);
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
              {eventsData.map((event) => (
                <option
                  key={event._id}
                  value={event._id}
                  className="selectedOption"
                >
                  {event.eventTitle}
                </option>
              ))}
            </select>
            <button className="resetBtn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
        <div className="table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <table className="clientDataTable">
              <thead>
                <tr>
                  <th className="serialNo">S.No</th>
                  <th>Attendance</th>
                  <th>Name</th>
                  <th>Company Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th className="sendMailHead">
                    Send Mail
                    <GoInfo
                      size={18}
                      onMouseEnter={() => setShowPopup(true)}
                      onMouseLeave={() => setShowPopup(false)}
                    />
                    <ShowInfo visible={showPopup}>
                      For sending thank you and feedback form click the send mail button.
                    </ShowInfo>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((client, i) => (
                    <tr key={i}>
                      <td className="serialNo">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={client.attendance}
                          onChange={(e) =>
                            handleAttendance(e.target.checked, client._id)
                          }
                        />
                      </td>
                      <td>{client.name}</td>
                      <td>{client.companyName}</td>
                      <td>{client.email}</td>
                      <td>{client.contact}</td>
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
                    <td colSpan={7}>No Data Available</td>
                  </tr>
                )}
              </tbody>
            </table>
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
              Math.ceil(filteredParticipatedData.length / itemsPerPage)
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
    width: 80%;
    align-items: center;
    justify-content: space-between;
    margin: 10px auto;
    /* border: 1px solid black; */
    p {
      font-size: 1.5rem;
      font-weight: 500;
      color: #868686;
    }

    .searchClient {
      display: flex;
      justify-content: end;
      align-items: center;
      gap: 20px;
      /* border: 1px solid black; */
      width: 50%;
      input {
        width: 40%;
        padding: 8px 0px 8px 10px;
        font-size: 16px;
        border: 1px solid #868383cc;
        outline: none;
        border-radius: 5px;
      }
      select {
        width: 30%;
        padding: 8px;
        border-radius: 5px;
        font-size: 16px;
        outline: none;
        border: 2px solid #cccc;
        cursor: pointer;
      }
      .resetBtn {
        padding: 8px 15px;
        font-size: 16px;
        font-weight: 400;
        border: 2px solid #cccc;
        border-radius: 5px;
        background: none;
        cursor: pointer;
        &:hover {
          background-color: #cccc;
        }
      }
    }
  }

  .clientDataTable {
    width: 80%;
    margin: auto;
    border-collapse: separate;
    border-spacing: 0 0px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }

  .checkbox {
    width: 16px;
    height: 16px;
  }

  .clientDataTable thead tr {
    font-weight: bold;
    font-size: 18px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    .sendMailHead{
      display: flex;
      justify-content: center;
      align-items: center;
      svg{
        margin-left: 5px;
      }
    }
  }
  .clientDataTable tbody tr {
    font-weight: 400;
    font-size: 16px;
    color: black;
    &:hover {
      background-color: #a1bee0;
    }
    td,
    th {
      padding: 5px;
    }
    .send-mail {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .client-table thead .serialNo{
    text-align: center;
  }
  .client-table tbody .serialNo{
    text-align: center;
  }

  .clientDataTable th,
  .clientDataTable td {
    padding: 18px;
    text-align: left;
    border-bottom: 2px solid #cccc;
  }
  .mail-btn {
    padding: 6px 12px;
    color: black;
    background: none;
    font-size: 18px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    svg{
      font-size: 20px;
    }
    &:hover {
      text-decoration: underline;
    }
    svg {
      font-size: 20px;
      &:hover{
        color:#5bef4a ;
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
  top:20% ;
  transform: translate(-50%, -50%);
`;