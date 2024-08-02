import React, { useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import { Loader } from "../Components/Loader/Loading";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchGoogleEventsData } from "../Components/Redux/DummyGoogleAuth/action";

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { googleEventsData, isLoading } = useSelector((store) => {
    return {
      googleEventsData: store.googleEventReducer.googleEventsData,
    };
  }, shallowEqual);
  console.log(googleEventsData);

  useEffect(() => {
    dispatch(fetchGoogleEventsData());
  }, []);

  return (
    <MainDiv>
      <>
        <div className="celebrationDiv">
          <div className="celebrateDescribe">
            <h1>Welcome to Ceoitbox Event Management </h1>
            <p>
              Boost your productivity to new heights with our intuitive and
              powerful tools. Stay organized, meet deadlines, and achieve your
              goals effortlessly.
            </p>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Get Started
            </button>
          </div>
          <div className="celebrateImage">
            <img
              src="https://bcreactor.com/wp-content/uploads/2018/08/Case-Studies.png"
              width={450}
              height={380}
              alt=""
            />
          </div>
        </div>
        <LatestEvents>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="latestEvents">
                <p>GLIMPSES OF {googleEventsData.length}</p>
                <h1>LATEST EVENTS</h1>
              </div>
              <div className="cards">
                {googleEventsData.length > 0 ? (
                  googleEventsData?.map((item, i) => (
                    <div className="card-description" key={i}>
                      <div className="imageDiv">
                        <img src={item.imageUrl} alt="" />
                      </div>
                      <h1>Title : {item.summary}</h1>
                      <p>Date : {item.start}</p>
                      <p>Venue : {item.location}</p>
                      <p>organizedBy : {item.keynoteSpeaker}</p>
                      <button className="registrationForm">Registration</button>
                    </div>
                  ))
                ) : (
                  <h2>No Events Available</h2>
                )}
              </div>
            </>
          )}
        </LatestEvents>
      </>
      <Footer />
    </MainDiv>
  );
};

const MainDiv = styled.div`
  box-sizing: border-box;
  .celebrationDiv {
    /* border: 1px solid black; */
    padding: 10px;
    width: 85%;
    margin: 70px auto;
    display: flex;
    justify-content: space-evenly;
    gap: 100px;
    // align-items: center;
    .celebrateDescribe {
      // padding: 10px;
      // text-align: center;
      width: 50%;
      h1 {
        font-size: 40px;
        margin-top: 0;
      }
      p {
        font-size: 20px;
        line-height: 1.3;
      }
      button {
        margin-top: 20px;
        padding: 12px 30px;
        font-size: 25px;
        border-radius: 8px;
        background-color: #2678ec;
        color: #ffff;
        border: none;
        cursor: pointer;
      }
    }
    .celebrateImage {
      width: 50%;
      display: flex;
      justify-content: center;
      // align-items: center;
    }
  }
`;
const LatestEvents = styled.div`
  /* border: 2px solid black; */
  margin: 50px 0px 50px 0px;

  .latestEvents {
    text-align: center;
    p {
      margin: 0;
      padding: 0;
      line-height: 1.3;
      font-size: 20px;
    }
    h1 {
      margin: 0;
      padding: 0;
      line-height: 1.3;
    }
  }

  .cards {
    width: 90%;
    margin: 30px auto;
    display: flex;
    justify-content: space-evenly;
    box-sizing: border-box;
    /* border: 1px solid black; */
  }
  .card-description {
    text-align: center;
    width: 24%;
    margin: 10px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    overflow: hidden;
    text-align: center;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    h1 {
      font-size: 22px;
    }
    p {
      font-size: 17px;
      font-weight: 500;
      margin: 3px 0;
      line-height: 1.2;
    }
    .registrationForm {
      width: 50%;
      margin: auto;
      margin-top: 10px;
      padding: 8px;
      font-size: 17px;
      border-radius: 5px;
      background-color: #2678ec;
      color: #ffff;
      border: none;
      cursor: pointer;
      &:hover{
        background-color: #345584;
      }
    }
  }

  .imageDiv {
    width: 100%;
    height: 250px;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
    border-radius: 20px;
  }

  .imageDiv img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
