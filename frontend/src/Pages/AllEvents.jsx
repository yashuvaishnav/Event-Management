import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Popup } from "../Components/PopupComponent/Popup";
import { Loader } from "../Components/Loader/Loading";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchEventsData } from "../Components/Redux/Events/action";
import {
  deleteGoogleEvent,
  fetchGoogleEventsData,
} from "../Components/Redux/DummyGoogleAuth/action";
import { PiWarningCircleLight } from "react-icons/pi";

export const AllEvents = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const dispatch = useDispatch();
  const gapi = window.gapi;

  const { isLoading } = useSelector((store) => {
    return {
      isLoading: store.eventReducer.isLoading,
    };
  }, shallowEqual);
  const { googleEventsData } = useSelector((store) => {
    return {
      googleEventsData: store.googleEventReducer.googleEventsData,
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(fetchEventsData());
    dispatch(fetchGoogleEventsData());
  }, []);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    togglePopup();
  };

  const toggleConfirm = () => {
    setIsConfirmVisible(!isConfirmVisible);
  };

  const handleDeleteEventClick = (event) => {
    setSelectedEvent(event);
    toggleConfirm();
  };

  const confirmDeleteEvent = () => {
    console.log(selectedEvent.key,selectedEvent._id);
    const request = gapi.client.calendar.events.delete({
      calendarId: "primary",
      eventId: selectedEvent.key,
      sendUpdates: "all",
    });

    request.execute(
      (response) => {
        console.log("Event deleted:", response);
        dispatch(deleteGoogleEvent(selectedEvent._id));
        setSelectedEvent(null);
        toggleConfirm();
      },
      (error) => {
        console.error("Error deleting event:", error);
      }
    );
  };

  // const handleDeleteEvent = (event) => {
  //   const request = gapi.client.calendar.events.delete({
  //     calendarId: "primary",
  //     eventId: event.key,
  //     sendUpdates: "all",
  //   });

  //   request.execute(
  //     (response) => {
  //       console.log("Event deleted:", response);
  //       dispatch(deleteGoogleEvent(event._id));
  //     },
  //     (error) => {
  //       console.error("Error deleting event:", error);
  //     }
  //   );
  // };

  return (
    <MainDiv>
      <div className="allEventsData">
        <div className="allEvents">
          <p>ALL UPCOMING</p>
          <h1>EVENTS</h1>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="cardsContainer">
            {googleEventsData.length > 0 ? (
              googleEventsData.length > 0 &&
              googleEventsData.map((event, i) => (
                <Card key={i} $imageurl={event.imageUrl}>
                  <div className="content" key={i}>
                    <h1>{event.summary}</h1>
                    <p>{event.location}</p>
                    <p>{event.start}</p>
                    <div className="ViewAndDeleteEvent">
                      <button
                        className="viewEvent"
                        onClick={() => handleViewDetails(event)}
                      >
                        View Details
                      </button>
                      <button
                        className="deleteEvent"
                        onClick={() => handleDeleteEventClick(event)}
                      >
                        Delete Event
                      </button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <h1>No Events Available</h1>
            )}
          </div>
        )}
        {isPopupVisible && selectedEvent && (
          <Popup
            show={isPopupVisible}
            onClose={togglePopup}
            event={selectedEvent}
          />
        )}
        {isConfirmVisible && (
          <div className="confirmationPopup">
            <PiWarningCircleLight />
            <h1>Are you sure?</h1>
            <p>You won't be able to revert this!</p>
            <div className="deleteAndCancelBtn">
              <button onClick={confirmDeleteEvent} className="deleteBtn">
                Yes, Delete it
              </button>
              <button onClick={toggleConfirm} className="cancelBtn">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  height: auto;
  .allEvents {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0px;
    p {
      line-height: 1.2;
      margin: 0;
      padding: 0;
      font-size: 18px;
      font-weight: 400;
    }
    h1 {
      font-size: 35px;
      margin: 0;
      padding: 0;
      line-height: 1.2;
    }
  }
  .cardsContainer {
    width: 80%;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    justify-content: space-between;
  }
  .confirmationPopup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 0px;
    background: white;
    border-radius: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    text-align: center;
    z-index: 1000;
    max-width: 400px;
    width: 90%;
    svg {
      color: #eaad3c;
      font-size: 70px;
      font-weight: lighter;
    }
    .deleteAndCancelBtn {
      margin-top: 20px;
      .cancelBtn {
        background-color: #ff4d4f;
        color: #fff;
      }
      .deleteBtn {
        color: #fff;
        background-color: #2678ec;
      }
    }
  }

  .confirmationPopup button {
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
`;

const Card = styled.div`
  border: 10px solid #ffffff;
  position: relative;
  width: 90%;
  margin: auto;
  padding: 20px;
  color: white;
  text-align: center;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  transition: all 0.3s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${(props) => `url(${props.$imageurl})`};
    border-radius: 10px;
    background-size: cover;
    background-position: center;
    filter: blur(2px);
    transform: scale(1);
    z-index: -1;
    transition: filter 0.3s ease-in-out, transform 0.3s ease-in-out;
  }
  .content h1 {
    font-size: 40px;
    line-height:1.9;
    margin:0px;
    padding:0px;
  }
  .content p {
    margin: 0px;
    padding: 0px;
    line-height: 1.8;
    font-size: 18px;
  }
  .content .ViewAndDeleteEvent {
    width: 70%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .viewEvent {
      background-color: #2678ec;
    }
    .deleteEvent {
      background-color: red;
    }
    button {
      margin-top: 20px;
      color: #ffff;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 5px;
      font-size: 16px;
    }
  }
`;

// const transformImageUrl = (url) => {
//   const googleDriveRegex = /^https:\/\/drive\.google\.com\/file\/d\/([^/]+)\/view\?usp=sharing$/;
//   const match = url.match(googleDriveRegex);
//   if (match) {
//     const fileId = match[1];
//     console.log("fileId",`https://drive.google.com/uc?export=view&id=${fileId}`);
//     return `https://drive.google.com/uc?export=view&id=${fileId}`;
//   }
//   // console.log("url",url)

//   return url;
// };
