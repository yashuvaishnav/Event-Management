import React from 'react'
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
import styled from 'styled-components';

export const Footer = () => {
  return (
    <FooterDiv>
          <div className="menuDiv">
            <h1>MENU</h1>
            <p>Home</p>
            <p>Testimonial</p>
            <p>Services</p>
            <p>Contact Us</p>
          </div>
          <div className="contactDiv">
            <h1>Contact Us</h1>
            <div className="allLogo">
              <a href="https://www.linkedin.com/feed/">
                <FaInstagram style={{ fontSize: "40px" }} />
              </a>
              <a href="https://www.linkedin.com/feed/">
                <FaLinkedin style={{ fontSize: "40px" }} />
              </a>
              <a href="https://www.linkedin.com/feed/">
                <IoLogoYoutube style={{ fontSize: "40px" }} />
              </a>
            </div>
          </div>
          <div className="logoDiv">
            <img
              src={
                "https://ceoitbox.com/wp-content/uploads/2022/04/logo.png.webp"
              }
              className="App-logo"
              alt="logo"
            />
            <p className="fontInc">Reowned brand to incoperate</p>
            <p>happiness to your life</p>
            <p className="copyright">copyright@2022 | All rights reserved</p>
          </div>
        </FooterDiv>
  )
}


const FooterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 30px;
  background: linear-gradient(to right, #2678ec, #333);
  color: white;
  flex-wrap: wrap;
  .menuDiv,
  .contactDiv,
  .logoDiv {
    flex: 1;
    margin: 10px;
    text-align: center;
  }
  .logoDiv img {
    width: 100px;
    height: auto;
    margin-bottom: 10px;
  }

  .menuDiv h1 {
    font-size: 40px;
    margin-bottom: 10px;
  }
  .contactDiv h1 {
    font-size: 40px;
    margin-bottom: 50px;
  }
  .contactDiv .allLogo {
    display: flex;
    width: 40%;
    margin: auto;
    justify-content: space-between;
    align-items: center;
  }
  .logoDiv p {
    line-height: 0.8;
  }

  .menuDiv p,
  .logoDiv .fontInc {
    line-height: 0.8;
    font-size: x-large;
  }

  .contactDiv a {
    margin: 0 10px;
    font-size: 24px;
    color: white;
    text-decoration: none;
  }
  .logoDiv .copyright {
    margin-bottom: 35px;
  }

  .contactDiv a:hover {
    color: #ddd;
  }

  @media (max-width: 768px) {
    .mainDiv {
      flex-direction: column;
      align-items: center;
    }

    .menuDiv,
    .contactDiv,
    .logoDiv {
      text-align: center;
    }
  }
`;