import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Footer } from "./Footer";
import { Loader } from "../Components/Loader/Loading";
import { fetchTestimonialData } from "../Components/Redux/Suggestions/action";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const avatars = [
  "/avatars/Asian Man.png",
  "/avatars/College Student.png",
  "/avatars/Western Man.png",
  "/avatars/Young Lady.png",
];

export const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  const { testimonialData, isLoading } = useSelector((store) => {
    return {
      testimonialData: store.testimonialReducer.testimonialData,
      isLoading: store.testimonialReducer.isLoading,
    };
  }, shallowEqual);
  let letestData = testimonialData.slice(-4);

  useEffect(() => {
    dispatch(fetchTestimonialData());
  }, []);

  useEffect(() => {
    if (letestData.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === letestData.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [letestData]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? letestData.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === letestData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <MainDiv>
      <div className="bodyDiv">
        <div className="heading">
          <h3>WHAT CUSTOMERS SAY</h3>
          <h1>RECENT TESTIMONIAL</h1>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="testimonialsDiv">
            {letestData.length > 0 ? (
              <>
                <div
                  className="slider"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {letestData.map((suggestion, index) => (
                    <div
                      className={`card ${
                        index === currentIndex ? "visible" : ""
                      }`}
                      key={index}
                    >
                      <img src={avatars[index]} alt={"avtars"} />
                      <h1>{suggestion.clientName}</h1>
                      <h3>{suggestion.companyName}</h3>
                      <h3>{suggestion.toolName}</h3>
                      <p>{suggestion.suggestion}</p>
                    </div>
                  ))}
                </div>
                <div className="navigation">
                  <button onClick={goToPrevious}>
                    <IoIosArrowBack />
                  </button>
                  <button onClick={goToNext}>
                    <IoIosArrowForward />
                  </button>
                </div>
                <div className="pagination">
                  {letestData.map((_, index) => (
                    <div
                      key={index}
                      className={index === currentIndex ? "active" : ""}
                      onClick={() => setCurrentIndex(index)}
                    ></div>
                  ))}
                </div>
              </>
            ) : (
              <h1>No Data Available</h1>
            )}
          </div>
        )}
      </div>
      
    </MainDiv>
  );
};

const MainDiv = styled.div`
  .bodyDiv {
    width: 100%;
    text-align: center;
    margin: 30px 0px;
  }
  .heading {
    h3 {
      font-size: 18px;
      color: #333;
      font-weight: 500;
    }
    h1 {
      font-size: 30px;
      font-weight: 500;
      color: #444141;
      margin-bottom: 40px;
      line-height: 0.2;
    }
  }

  .testimonialsDiv {
    position: relative;
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
  }

  .slider {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }

  .card {
    min-width: 100%;
    box-sizing: border-box;
    padding: 20px 20px;
    text-align: center;
    background-color: #f0f4f8;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    opacity: 0;
    transform: scale(0.9);
  }

  .card.visible {
    opacity: 1;
    transform: scale(1);
  }

  .card img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-bottom: 20px;
  }

  .card h1 {
    font-size: 32px;
    color: #111;
    margin: 10px 0 0 0;
    line-height: 0.1;
  }

  .card h3 {
    font-size: 20px;
    color: #555;
  }
  .card p {
    font-size: 18px;
    color: #555;
    width: 50%;
    margin: auto;
    text-align: center;
  }

  .navigation {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }

  .navigation button {
    background: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    padding: 10px;
    margin: 0 10px;
    transition: background 0.3s ease-in-out;
  }

  .navigation button:hover {
    background: rgba(255, 255, 255, 1);
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .pagination div {
    width: 12px;
    height: 12px;
    background: #ccc;
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
  }

  .pagination div.active {
    background: #333;
  }
`;
