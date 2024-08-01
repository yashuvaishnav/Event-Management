import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Popup } from "../Components/PopupComponent/Popup";
import { AdminNavbar } from "./AdminNavbar";
import { Loader } from "../Components/Loader/Loading";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchEventsData } from "../Components/Redux/Events/action";
import {
  deleteGoogleEvent,
  fetchGoogleEventsData,
} from "../Components/Redux/DummyGoogleAuth/action";

export const AllEvents = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const dispatch = useDispatch();
  const gapi = window.gapi;

  const { eventsData, isLoading } = useSelector((store) => {
    return {
      eventsData: store.eventReducer.eventsData,
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

  const handleDeleteEvent = (event) => {
    const request = gapi.client.calendar.events.delete({
      calendarId: "primary",
      eventId: event.key,
      sendUpdates: "all",
    });

    request.execute(
      (response) => {
        console.log("Event deleted:", response);
        dispatch(deleteGoogleEvent(event._id));
      },
      (error) => {
        console.error("Error deleting event:", error);
      }
    );
  };

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
                        onClick={() => handleDeleteEvent(event)}
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
    padding: 50px 0px;
    p {
      line-height: 1.5;
      margin: 0;
      padding: 0;
      font-size: 20px;
      font-weight: 500;
    }
    h1 {
      font-size: 35px;
      margin: 0;
      padding: 0;
      line-height: 1.5;
    }
  }
  /* .loding{
    display: flex;
    justify-content: center;
    align-items: center;
  } */
  .cardsContainer {
    /* border: 2px solid black; */
    width: 80%;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    justify-content: space-between;
    /* align-items: center; */
  }
`;

const Card = styled.div`
  border: 10px solid #ffffff;
  position: relative;
  width: 90%;
  margin: auto;
  padding: 30px;
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
  }
  .content p {
    margin: 0px;
    padding: 0px;
    line-height: 1.5;
    font-size: 20px;
  }
  .content .ViewAndDeleteEvent {
    width: 50%;
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
  }
  .content button {
    margin: 30px 0px 10px 0px;
    color: #ffff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
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
