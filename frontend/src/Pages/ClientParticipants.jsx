import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SiGmail } from "react-icons/si";
import { Loader } from "../Components/Loader/Loading";
import {
  Toastify,
  showErrorToast,
  showSuccessToast,
} from "../Components/Toast/Toastify";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getParticipantsData } from "../Components/Redux/Participants/action";
import { patchAttendees } from "../Components/Redux/DummyGoogleAuth/action";
import axios from "axios";

export const ClientParticipants = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const eventsData = localStorage.getItem("event");
  const googleEventsData = JSON.parse(eventsData);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const gapi = window.gapi;

  const { participantsData, isLoading } = useSelector((store) => {
    return {
      participantsData: store.participantsReducer.participantsData,
      isLoading: store.participantsReducer.isLoading,
    };
  }, shallowEqual);

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

      console.log("Invitation sent to", clientDataEmail);
      showSuccessToast("Invitation sent successfully");

      const localEventResponse = await axios.get(
        `http://localhost:8080/calender/${eventNormalId}`
      );
      const localEventData = localEventResponse.data;

      const updatedEventData = {
        ...localEventData,
        attendees: [
          ...(localEventData.attendees || []),
          {
            email: clientDataEmail,
            responseStatus: "needsAction",
            attendance: false,
          },
        ],
      };
      dispatch(patchAttendees(eventNormalId, updatedEventData));
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
        <div
          style={{
            display: "flex",
            width: "80%",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "auto",
            padding: "5px 0px",
          }}
        >
          <p
            style={{ fontSize: "1.5rem", fontWeight: "500", color: "#868686" }}
          >
            {" "}
            For Events Participants{" "}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <input
              type="text"
              id="searchClient"
              placeholder="Search by email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>

        <div className="table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <table className="client-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Company Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Send Email</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((client, i) => (
                    <tr key={i}>
                      <td>{(currentPage - 1) * itemsPerPage + i + 1})</td>
                      <td>{client.name}</td>
                      <td>{client.companyName}</td>
                      <td>{client.email}</td>
                      <td>{client.contact}</td>
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
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;

    p {
      line-height: 1.2;
      margin: 0;
      padding: 0;
      font-size: 20px;
      font-weight: 500;
    }
    h1 {
      font-size: 35px;
      margin: 0;
      padding: 0;
      line-height: 1.2;
    }
  }
  .searchClient {
    display: flex;
    /* border: 1px solid black; */
    width: 60%;
    margin: 50px auto;
    input {
      padding: 5px 0px 5px 10px;
      font-size: 16px;
      border: 2px solid #868383cc;
      outline: none;
      border-radius: 7px;
    }
  }
  .client-table {
    width: 80%;
    margin: auto;
    border-collapse: separate;
    border-spacing: 0 0px; // Adds space between rows
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }

  .client-table thead tr {
    font-weight: bold;
    font-size: 16px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
  .client-table tbody tr {
    font-weight: 400;
    font-size: 15px;
    color: black;
    &:hover {
      background-color: #a1bee0;
      /* cursor: pointer; */
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
  .client-table th,
  .client-table td {
    padding: 12px;
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
    &:hover {
      text-decoration: underline;
    }
    svg {
      font-size: 20px;
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

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { SiGmail } from "react-icons/si";
// import { AdminNavbar } from "./AdminNavbar";
// import { Loader } from "../Components/Loader/Loading";
// import {
//   Toastify,
//   showErrorToast,
//   showSuccessToast,
// } from "../Components/Toast/Toastify";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { getParticipantsData,postMail } from "../Components/Redux/Participants/action";

// export const ClientParticipants = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;
//   const eventsData = localStorage.getItem("event");
//   const parseEventsData = JSON.parse(eventsData);
//   const [searchQuery, setSearchQuery] = useState("");
//   const dispatch = useDispatch();

//   const { participantsData, isLoading } = useSelector((store) => {
//     return {
//       participantsData: store.participantsReducer.participantsData,
//       isLoading: store.participantsReducer.isLoading,
//     };
//   }, shallowEqual);

//   useEffect(() => {
//     const delaySearch = setTimeout(() => {
//       dispatch(getParticipantsData(searchQuery));
//     }, 1000);
//     return () => clearTimeout(delaySearch);
//   }, [searchQuery]);

//   const handleNextPage = () => {
//     if (currentPage < Math.ceil(participantsData.length / itemsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const currentData = participantsData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const sendMail = (client) => {
//     dispatch(
//       postMail(
//         client,
//         parseEventsData,
//         showSuccessToast,
//         showErrorToast
//       )
//     );
//   };

//   return (
//     <MainDiv>
//       <AdminNavbar />
//       <Toastify />
//       <div className="clientDataAndPagination">
//         <div className="heading">
//           <p>FOR EVENTS</p>
//           <h1>PARTICIPANTS</h1>
//         </div>
//         <div className="searchClient">
//           <input
//             type="text"
//             id="searchClient"
//             placeholder="Search Client"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <div className="table-container">
//           {isLoading ? (
//             <Loader />
//           ) : (
//             <table className="client-table">
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Name</th>
//                   <th>Company Name</th>
//                   <th>Email</th>
//                   <th>Contact</th>
//                   <th>Mail</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentData.length > 0 ? (
//                   currentData.map((client, i) => (
//                     <tr key={i}>
//                       <td>{(currentPage - 1) * itemsPerPage + i + 1})</td>
//                       <td>{client.name}</td>
//                       <td>{client.companyName}</td>
//                       <td>{client.email}</td>
//                       <td>{client.contact}</td>
//                       <td>
//                         <button
//                           className="mail-btn"
//                           onClick={() => sendMail(client)}
//                         >
//                           <SiGmail />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={7}>No Data Available</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>
//         <PaginationContainer>
//           <button onClick={handlePreviousPage} disabled={currentPage === 1}>
//             Back
//           </button>
//           <span>Page {currentPage}</span>
//           <button
//             onClick={handleNextPage}
//             disabled={
//               currentPage === Math.ceil(participantsData.length / itemsPerPage)
//             }
//           >
//             Next
//           </button>
//         </PaginationContainer>
//       </div>
//     </MainDiv>
//   );
// };

// const MainDiv = styled.div`
//   .heading {
//     text-align: center;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     margin-top: 50px;
//     p {
//       line-height: 1.2;
//       margin: 0;
//       padding: 0;
//       font-size: 20px;
//       font-weight: 500;
//     }
//     h1 {
//       font-size: 35px;
//       margin: 0;
//       padding: 0;
//       line-height: 1.2;
//     }
//   }
//   .searchClient {
//     display: flex;
//     /* border: 1px solid black; */
//     width: 60%;
//     margin: 50px auto;
//     input {
//       padding: 5px 0px 5px 10px;
//       font-size: 16px;
//       border: 2px solid #868383cc;
//       outline: none;
//       border-radius: 7px;
//     }
//   }
//   .client-table {
//     width: 60%;
//     margin: auto;
//     border-collapse: separate;
//     border-spacing: 0 0px; // Adds space between rows
//     box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
//       rgba(0, 0, 0, 0.23) 0px 6px 6px;
//   }

//   .client-table thead tr {
//     font-weight: bold;
//     font-size: 22px;
//     box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
//   }
//   .client-table tbody tr {
//     font-weight: 400;
//     font-size: 18px;
//     color: black;
//     &:hover {
//       background-color: #a1bee0;
//       /* cursor: pointer; */
//     }
//   }
//   .client-table th,
//   .client-table td {
//     padding: 12px;
//     text-align: left;
//     border-bottom: 2px solid #cccc;
//   }
//   .mail-btn {
//     padding: 6px 12px;
//     color: black;
//     background: none;
//     font-size: 18px;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//     &:hover {
//       text-decoration: underline;
//     }
//     svg {
//       font-size: 20px;
//     }
//   }
// `;

// const PaginationContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 20px;
//   button {
//     padding: 10px 20px;
//     margin: 0 10px;
//     border: none;
//     background-color: #2678ec;
//     color: white;
//     cursor: pointer;
//     border-radius: 5px;
//     &:disabled {
//       background-color: #cccccc;
//       cursor: not-allowed;
//     }
//   }
//   span {
//     font-size: 18px;
//   }
// `;
