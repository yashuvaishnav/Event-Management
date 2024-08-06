import React from "react";
import styled from "styled-components";

export const Service = () => {
  return (
    <MainDiv>
      <div className="heading">
        <p>THIS IS WHAT WE SERVE</p>
      </div>
      <div className="cardsContainer">
        <div className="cardDiv">
          <h1>Attend</h1>
          <h3>Events</h3>
          <p>
            We ensures smooth rollout of onboarding passes to the event atendees
            include secure payment options
          </p>
        </div>
        <div className="cardDiv">
          <h1>Hoisting</h1>
          <h3>Events</h3>
          <p>
            FusionEvents provides service to host your event and allows users to
            get registered and avail passes to your event
          </p>
        </div>
        <div className="cardDiv">
          <h1>Organizers</h1>
          <h3>for Events</h3>
          <p>
            FusionEvents gives a common platform for Event organizers and
            clients to coordinate for organizing events
          </p>
        </div>
        <div className="cardDiv">
          <h1>Professional</h1>
          <h3>Planners</h3>
          <p>
            We bridges the gap between professional event planners and clients
            to carry out systematic event plans
          </p>
        </div>
        <div className="cardDiv">
          <h1>Venue</h1>
          <h3>Partners</h3>
          <p>
            FusionEvents also gives an option to user to naviagte different
            venues whereas venue owners can also make there property visible to
            clients
          </p>
        </div>
        <div className="cardDiv">
          <h1>Dashboard</h1>
          <h3>view</h3>
          <p>
            FusionEvents provides feature rich dashboard to manage all
            activities at one spot with a seamless experience
          </p>
        </div>
      </div>
      
    </MainDiv>
  );
};

const MainDiv = styled.div`
  .heading {
    width: 80%;
    margin: auto;
    p {
      font-size: 25px;
      color: #868686;
      font-weight: 500;
      text-align: start;
    }
  }
  div {
    text-align: center;
  }

  .cardsContainer {
    width: 80%;
    margin: auto auto 50px auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    justify-content: center;
  }

  .cardDiv {
    position: relative;
    width: 80%;
    padding: 30px;
    color: white;
    text-align: center;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
  }

  .cardDiv::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("https://th.bing.com/th/id/OIP.bfXGR_2kE5legWu3CGUsOAHaE8?rs=1&pid=ImgDetMain");
    background-size: cover;
    background-position: center;
    filter: blur(2px);
    transform: scale(1);
    z-index: -1;
    transition: filter 0.3s ease-in-out, transform 0.3s ease-in-out;
  }
  .cardDiv:nth-child(2)::before {
    background-image: url("https://images.squarespace-cdn.com/content/v1/53b734d4e4b0f632e72beb43/1442175327430-JA8SYN64V6RCS1ZSP54Q/22.jpg");
  }
  .cardDiv:nth-child(3)::before {
    background-image: url("https://www.siww.com.sg/qql/slot/u143/2021/Landing%20Page/SIWW%202018/Photos/Open%20Address%20DPM%20Tharman%20Shanmugaratnam/Open%20Address%20DPM%20Tharman%20Shanmugaratnam/img_6781.jpg");
  }
  .cardDiv:nth-child(4)::before {
    background-image: url("https://th.bing.com/th/id/OIP.93VBmwcwNUZ8VYmljHMUXwAAAA?rs=1&pid=ImgDetMain");
  }
  .cardDiv:nth-child(5)::before {
    background-image: url("https://mirageparties.co.uk/wp-content/uploads/2019/05/Essex-Luxury-Marquee-Party.jpg");
  }
  .cardDiv:nth-child(6)::before {
    background-image: url("https://th.bing.com/th/id/OIP.Nu_rhhf2OW1JKYUdwrjOwAAAAA?rs=1&pid=ImgDetMain");
  }

  .cardDiv:hover::before {
    filter: blur(0);
    transform: scale(1.1);
  }

  .cardDiv h1 {
    font-size: 50px;
    margin: 10px 0;
  }

  .cardDiv h3 {
    font-size: 40px;
    margin: 10px 0;
  }

  .cardDiv p {
    font-size: 18px;
    margin: 10px 0;
    text-align: start;
  }
`;
