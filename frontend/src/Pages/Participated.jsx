import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AdminNavbar } from "./AdminNavbar";
import { Loader } from "../Components/Loader/Loading";
import { SiGmail } from "react-icons/si";
import {
  Toastify,
} from "../Components/Toast/Toastify";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getParticipatedData, sendThankYouMail } from "../Components/Redux/Participated/action";
import { fetchEventsData } from "../Components/Redux/Events/action";

export const Participated = () => {
  const [filteredParticipatedData, setFilteredParticipatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 8;
  const dispatch = useDispatch();
  
const { participatedsData,isLoading, eventsData } = useSelector((store) => {
  return {
    participatedsData: store.participatedReducer.participatedData,
    isLoading: store.participatedReducer.isLoading,
    eventsData: store.eventReducer.eventsData,
  };
}, shallowEqual);
useEffect(()=>{
  dispatch(getParticipatedData(searchQuery));
  dispatch(fetchEventsData());
},[])

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

      // Update the filteredParticipatedData without resetting it
      const updatedFilteredParticipatedData = filteredParticipatedData.map((item) =>
        item._id === id ? { ...item, attendance } : item
      );
      setFilteredParticipatedData(updatedFilteredParticipatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const postThankYouMail = async (client) => {
    dispatch(sendThankYouMail(client))
  };

  return (
    <MainDiv>
      <AdminNavbar />
      <Toastify />
      <div className="allData">
        <div className="heading">
          <p>CLIENTS</p>
          <h1>PARTICIPATED</h1>
        </div>
        <div className="searchAndFilterDiv">
          <div className="searchClient">
            <input
              type="text"
              id="searchClient"
              placeholder="Search Client"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filteredEvent">
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
            >
              <option value="">Select Events</option>
              {eventsData.map((event) => (
                <option key={event._id} value={event._id}>
                  {event._id}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <table className="clientDataTable">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Attendance</th>
                  <th>Name</th>
                  <th>Company Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Mail</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((client, i) => (
                    <tr key={i}>
                      <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
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
                      <td>
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
              currentPage === Math.ceil(filteredParticipatedData.length / itemsPerPage)
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
    /* border: 1px solid black; */
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
  .searchAndFilterDiv {
    width: 60%;
    margin: 30px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .searchClient input {
      padding: 5px 0px 5px 10px;
      font-size: 16px;
      border: 2px solid #868383cc;
      outline: none;
      border-radius: 7px;
    }
    .filteredEvent select {
      padding: 5px;
      border-radius: 10px;
      font-size: 18px;
    }
  }

  .clientDataTable {
    width: 60%;
    margin: auto;
    border-collapse: separate;
    border-spacing: 0 0px; /* Adds space between rows */
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }

  .checkbox {
    width: 16px;
    height: 16px;
  }

  .clientDataTable thead tr {
    font-weight: bold;
    font-size: 22px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
  .clientDataTable tbody tr {
    font-weight: 400;
    font-size: 18px;
    color: black;
    &:hover {
      background-color: #a1bee0;
      /* cursor: pointer; */
    }
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








// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { AdminNavbar } from "./AdminNavbar";
// import { Loader } from "../Components/Loader/Loading";
// import { SiGmail } from "react-icons/si";
// import {
//   showErrorToast,
//   showSuccessToast,
//   Toastify,
// } from "../Components/Toast/Toastify";
// import { shallowEqual, useSelector } from "react-redux";

// export const Participated = () => {
//   const [participatedData, setParticipatedData] = useState([]);
//   const [filteredParticipatedData, setFilteredParticipatedData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [selectedEventId, setSelectedEventId] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const itemsPerPage = 8;

//   const getClientsAndEventsData = async () => {
//     try {
//       setIsLoading(true);
//       const [clientsRes, eventsRes] = await Promise.all([
//         axios.get("http://localhost:8080/clientForEvent/"),
//         axios.get("http://localhost:8080/events"),
//       ]);

//       const initialData = clientsRes.data;
//       const reverseData = eventsRes.data.reverse();

//       setParticipatedData(initialData);
//       setEvents(reverseData);

//       let initialFilteredData = initialData;
//       if (selectedEventId === "" && reverseData.length > 0) {
//         initialFilteredData = initialFilteredData.filter(
//           (item) => item.eventId === reverseData[0]._id
//         );
//       } else if (selectedEventId !== "") {
//         initialFilteredData = initialFilteredData.filter(
//           (item) => item.eventId === selectedEventId
//         );
//       }
//       setFilteredParticipatedData(initialFilteredData);
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getClientsAndEventsData();
//   }, []);

//   useEffect(() => {
//     let filteredData = participatedData;
//     if (selectedEventId === "" && events.length > 0) {
//       filteredData = filteredData.filter(
//         (item) => item.eventId === events[0]._id
//       );
//     } else if (selectedEventId !== "") {
//       filteredData = filteredData.filter(
//         (item) => item.eventId === selectedEventId
//       );
//     }

//     if (searchQuery !== "") {
//       filteredData = filteredData.filter(
//         (item) =>
//           item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           item.companyName.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
//     setFilteredParticipatedData(filteredData);
//     setCurrentPage(1);
//   }, [participatedData, selectedEventId, searchQuery, events]);

//   const handleNextPage = () => {
//     if (
//       currentPage < Math.ceil(filteredParticipatedData.length / itemsPerPage)
//     ) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const currentData = filteredParticipatedData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleAttendance = async (attendance, id) => {
//     try {
//       const res = await axios.put(
//         `http://localhost:8080/clientForEvent/attendance/${id}`,
//         { attendance }
//       );
//       console.log(res);

//       // Update the local state for attendance
//       const updatedParticipatedData = participatedData.map((item) =>
//         item._id === id ? { ...item, attendance } : item
//       );
//       setParticipatedData(updatedParticipatedData);

//       // Update the filteredParticipatedData without resetting it
//       const updatedFilteredParticipatedData = filteredParticipatedData.map((item) =>
//         item._id === id ? { ...item, attendance } : item
//       );
//       setFilteredParticipatedData(updatedFilteredParticipatedData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const sendThankYouMail = async (client) => {
//     let obj = {
//       name: client.name,
//       email: client.email,
//       url: `http://localhost:3000/feedbackForm`,
//     };
//     if (client.attendance) {
//       try {
//         const res = await axios.post(
//           "http://localhost:8080/mails/thankYoumail",
//           obj
//         );
//         showSuccessToast(res.data.msg);
//         console.log(res);
//       } catch (err) {
//         showErrorToast("Failed to send email");
//       }
//     } else {
//       showErrorToast("Failed to send email");
//     }
//   };

//   return (
//     <MainDiv>
//       <AdminNavbar />
//       <Toastify />
//       <div className="allData">
//         <div className="heading">
//           <p>CLIENTS</p>
//           <h1>PARTICIPATED</h1>
//         </div>
//         <div className="searchAndFilterDiv">
//           <div className="searchClient">
//             <input
//               type="text"
//               id="searchClient"
//               placeholder="Search Client"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="filteredEvent">
//             <select
//               value={selectedEventId}
//               onChange={(e) => setSelectedEventId(e.target.value)}
//             >
//               <option value="">Select Events</option>
//               {events.map((event) => (
//                 <option key={event._id} value={event._id}>
//                   {event._id}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="table-container">
//           {isLoading ? (
//             <Loader />
//           ) : (
//             <table className="clientDataTable">
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Attendance</th>
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
//                       <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
//                       <td>
//                         <input
//                           type="checkbox"
//                           className="checkbox"
//                           checked={client.attendance}
//                           onChange={(e) =>
//                             handleAttendance(e.target.checked, client._id)
//                           }
//                         />
//                       </td>
//                       <td>{client.name}</td>
//                       <td>{client.companyName}</td>
//                       <td>{client.email}</td>
//                       <td>{client.contact}</td>
//                       <td>
//                         <button
//                           className="mail-btn"
//                           onClick={() => sendThankYouMail(client)}
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
//             Prev
//           </button>
//           <span>Page {currentPage}</span>
//           <button
//             onClick={handleNextPage}
//             disabled={
//               currentPage === Math.ceil(filteredParticipatedData.length / itemsPerPage)
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
//     /* border: 1px solid black; */
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
//   .searchAndFilterDiv {
//     width: 60%;
//     margin: 30px auto;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     .searchClient input {
//       padding: 5px 0px 5px 10px;
//       font-size: 16px;
//       border: 2px solid #868383cc;
//       outline: none;
//       border-radius: 7px;
//     }
//     .filteredEvent select {
//       padding: 5px;
//       border-radius: 10px;
//       font-size: 18px;
//     }
//   }

//   .clientDataTable {
//     width: 60%;
//     margin: auto;
//     border-collapse: separate;
//     border-spacing: 0 0px; /* Adds space between rows */
//     box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
//       rgba(0, 0, 0, 0.23) 0px 6px 6px;
//   }

//   .checkbox {
//     width: 16px;
//     height: 16px;
//   }

//   .clientDataTable thead tr {
//     font-weight: bold;
//     font-size: 22px;
//     box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
//   }
//   .clientDataTable tbody tr {
//     font-weight: 400;
//     font-size: 18px;
//     color: black;
//     &:hover {
//       background-color: #a1bee0;
//       /* cursor: pointer; */
//     }
//   }

//   .clientDataTable th,
//   .clientDataTable td {
//     padding: 18px;
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
