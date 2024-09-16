import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styled from "styled-components";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addHotel, getHotelData } from "../Components/Redux/HotelRooms/action";
import { Toastify } from "../Components/Toast/Toastify";

export const EventCreateForm = () => {
  const [showDesc, setShowDesc] = useState(false);
  const [showEquipmentList, setShowEquipmentList] = useState(false);
  const [showAddHotelForm, setShowAddHotelForm] = useState(false);
  const [showVenue, setShowVenue] = useState(false);
  const [showHotelDetails, setShowHotelDetails] = useState(false);
  const [viewDetailsVisible, setViewDetailsVisible] = useState(false);
  const [tempHotel, setTempHotel] = useState({});
  const [addHotelData, setAddHotelData] = useState({
    hotelName: "",
    hotelAddress: "",
    managerName: "",
    managerContact: "",
    pricePerPlate: "",
  });
  const dispatch = useDispatch();

  const { hotelData, isLoading } = useSelector((store) => {
    return {
      hotelData: store.hotelReducer.hotelData,
      isLoading: store.hotelReducer.isLoading,
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(getHotelData());
  }, []);

  const handleHotel = (hotel, i) => {
    setViewDetailsVisible(true);
    setTempHotel(hotel);
    setShowVenue(false);
  };

  const hotelDataChange = (e) => {
    const { name, value } = e.target;
    setAddHotelData({
      ...addHotelData,
      [name]: name === "pricePerPlate" ? Number(value) : value,
    });
  };
  const handleHotelSubmit = (e) => {
    e.preventDefault();
    dispatch(addHotel(addHotelData));
    setShowAddHotelForm(false);
  };

  const handleAddHotel = () => {
    setShowAddHotelForm(true);
    setShowVenue(false);
  };

  return (
    <>
      <MainDiv
        isFormVisible={showAddHotelForm}
        isHotelVisible={showHotelDetails}
        isHotelListVisible={showVenue}
        isEquipmentListVisible={showEquipmentList}
      >
        <Toastify />
        <div className="HeadingAndSvg">
          <p>Create New Event</p>
          <RxCross1 />
        </div>
        <div className="formDiv">
          <div className="eventDetailsDiv">
            <p className="eventPTag">Event Name</p>
            <div className="inputAndBtn">
              <input type="text" placeholder="Enter event name" />
              <button
                style={{ backgroundColor: showDesc ? "#cccc" : "#2d5d7b" }}
                disabled={showDesc ? true : false}
                onClick={() => setShowDesc(!showDesc)}
              >
                Add description
              </button>
            </div>
          </div>
          {showDesc ? (
            <div className="descriptiopn">
              <div className="inputAndBtn">
                <textarea placeholder="Enter description"></textarea>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="eventDetailsDiv">
            <p>Event topic</p>
            <div className="inputAndBtn">
              <input
                type="text"
                placeholder="Enter event topic"
                className="eventInput"
              />
            </div>
          </div>
          <div className="timeAndDateDiv">
            <div className="singleTimeAndDateDiv">
              <p className="dateAndTime">Date</p>
              <div className="inputAndBtnDiv">
                <input
                  type="text"
                  placeholder="Oct 15, 2024"
                  className="dateInput"
                />
                <FaRegCalendarAlt />
              </div>
            </div>
            <div className="singleTimeAndDateDiv">
              <p className="dateAndTime">Time</p>
              <div className="inputAndBtnDiv">
                <input
                  type="text"
                  placeholder="02:00 PM"
                  className="eventDate"
                />
                {/* <IoMdTime /> */}
                <FaRegClock />
              </div>
            </div>
            <div className="singleTimeAndDateDiv">
              <p className="dateAndTime">Duration</p>
              <div className="inputAndBtnDiv">
                <input type="text" placeholder="3h 45m" className="eventDate" />
              </div>
            </div>
          </div>
          <div className="eventDetailsDiv">
            <p>Venue</p>
            <div className="inputAndBtn">
              <input
                type="text"
                placeholder={
                  tempHotel.hotelName
                    ? tempHotel.hotelName
                    : "Enter event Venue"
                }
              />
              {viewDetailsVisible ? (
                <button
                  className="viewDetails"
                  onClick={() => setShowHotelDetails(!showHotelDetails)}
                >
                  View Details
                </button>
              ) : (
                ""
              )}
              <button
                className="showVenueBtn"
                onClick={() => setShowVenue(true)}
              >
                Select previous
              </button>
            </div>
          </div>
          <div className="eventDetailsDiv">
            <p>Keynote Speaker</p>
            <div className="inputAndBtn">
              <input type="text" placeholder="Enter speaker name" />
              <button>Select previous</button>
            </div>
          </div>
          <div className="timeAndDateDiv">
            <div className="singleTimeAndDateDiv">
              <p className="dateAndTime">Expected attendees</p>
              <div className="inputAndBtnDiv">
                <input type="text" placeholder="eg. 25" className="dateInput" />
              </div>
            </div>
            <div className="singleTimeAndDateDiv">
              <p className="dateAndTime">Break time</p>
              <div className="inputAndBtnDiv">
                <select name="" id="selectBreakTime">
                  <option value="">select</option>
                  <option value="">12pm to 1pm</option>
                  <option value="">1pm to 2pm</option>
                  <option value="">2pm to 3pm</option>
                  <option value="">1pm to 1.30pm</option>
                  <option value="">1.30pm to 2pm</option>
                </select>
              </div>
            </div>
            <div className="singleTimeAndDateDiv">
              <p className="dateAndTime">Equipment's needed</p>
              <div
                className="inputAndBtnDiv"
                onClick={() => setShowEquipmentList(!showEquipmentList)}
              >
                <button className="selectBtn">select</button>
                <MdOutlineKeyboardArrowDown />
              </div>
            </div>
          </div>
          <div className="saveBtnDiv">
            <button>Submit</button>
          </div>
        </div>
      </MainDiv>
      <HotelList isHotelListVisible={showVenue} isVisible={showAddHotelForm}>
        <div className="closeHotelList">
          <RxCross1 onClick={() => setShowVenue(false)} />
        </div>
        {hotelData.map((hotel, i) => (
          <p onClick={() => handleHotel(hotel, i)}>{hotel.hotelName}</p>
        ))}
        <div className="addMoreHotels" onClick={handleAddHotel}>
          <button>Add</button>
          <FaPlus />
        </div>
      </HotelList>
      <ShowAddHotelForm isVisible={showAddHotelForm}>
        <div className="HeadingAndSvg">
          <p>Add Venue</p>
          <RxCross1 onClick={() => setShowAddHotelForm(false)} />
        </div>
        <form onSubmit={handleHotelSubmit}>
          <div className="eventDetailsDiv">
            <p className="hotelNamePTag">Hotel Name</p>
            <div className="inputAndBtn">
              <input
                type="text"
                placeholder="Hotel name"
                name="hotelName"
                value={addHotelData.hotelName}
                onChange={hotelDataChange}
              />
            </div>
          </div>
          <div className="eventDetailsDiv">
            <p>Address</p>
            <div className="inputAndBtn">
              <input
                type="text"
                placeholder="Hotel address"
                name="hotelAddress"
                value={addHotelData.hotelAddress}
                onChange={hotelDataChange}
              />
            </div>
          </div>
          <div className="managerAndFoodDetails">
            <div className="commonManagerAndFood">
              <p>Manager Name</p>
              <input
                className="inputAndBtn"
                type="text"
                placeholder="Manager name"
                name="managerName"
                value={addHotelData.managerName}
                onChange={hotelDataChange}
              />
            </div>
            <div className="commonManagerAndFood">
              <p>Contact Details</p>
              <input
                className="inputAndBtn"
                type="number"
                placeholder="Manager contact"
              />
            </div>
          </div>
          <div className="managerAndFoodDetails">
            <div className="commonManagerAndFood">
              <p>Price Per Plate</p>
              <input
                type="number"
                className="inputAndBtn"
                placeholder="eg. 300-400"
                name="pricePerPlate"
                value={addHotelData.pricePerPlate}
                onChange={hotelDataChange}
              />
            </div>
            <div className="saveAddHotel">
              <input type="submit" value={"Save"} />
            </div>
          </div>
        </form>
      </ShowAddHotelForm>
      <ShowHotelDetails isHotelVisible={showHotelDetails}>
        <div className="closeHotelList">
          <RxCross1 onClick={() => setShowHotelDetails(false)} />
        </div>
        <div className="contentDiv">
          <div className="commonDiv">
            <p>Name</p>
            <span>:</span>
          </div>
          <div className="value">
            <p>{tempHotel.hotelName}</p>
          </div>
        </div>
        <div className="contentDiv">
          <div className="commonDiv">
            <p>Address</p>
            <span>:</span>
          </div>
          <div className="value">
            <p>{tempHotel.hotelAddress}</p>
          </div>
        </div>
        <div className="contentDiv">
          <div className="commonDiv">
            <p>Manager Name</p>
            <span>:</span>
          </div>
          <div className="value">
            <p>Mr. {tempHotel.managerName}</p>
          </div>
        </div>
        <div className="contentDiv">
          <div className="commonDiv">
            <p>Manager Contact</p>
            <span>:</span>
          </div>
          <div className="value">
            <p>{tempHotel.managerContact}</p>
          </div>
        </div>
        <div className="contentDiv">
          <div className="commonDiv">
            <p>Price Per Plate</p>
            <span>:</span>
          </div>
          <div className="value">
            <p>{tempHotel.pricePerPlate}</p>
          </div>
        </div>
      </ShowHotelDetails>
      <EquipmentList isEquipmentListVisible={showEquipmentList}>
        <div className="equipmentList">
          <div className="closeEuipmentList">
            <RxCross1 onClick={() => setShowEquipmentList(false)} />
          </div>
          <div>
            <input type="checkbox" />
            <span>Projector</span>
          </div>
          <div>
            <input type="checkbox" />
            <span>Extension cords</span>
          </div>
          <div>
            <input type="checkbox" />
            <span>Microphone</span>
          </div>
          <div>
            <input type="checkbox" />
            <span>Speakers</span>
          </div>
          <div>
            <input type="checkbox" />
            <span>Backup Microphone</span>
          </div>
          <div>
            <input type="checkbox" />
            <span>Electricity Backup</span>
          </div>
          <div>
            <input type="checkbox" />
            <span>Laptop/ Computer</span>
          </div>
          <div>
            <input type="checkbox" />
            <span>Gifts</span>
          </div>
          <div>
            <input type="checkbox" />
            <span>Awards</span>
          </div>
        </div>
      </EquipmentList>
    </>
  );
};

const MainDiv = styled.div`
  width: 45%;
  height: auto;
  flex-shrink: 0;
  border-radius: 19px;
  background: #f8f9fb;
  margin: 50px auto;
  border: 19px solid #f8f9fb;
  ${({ isHotelListVisible }) =>
    isHotelListVisible &&
    `
    filter: blur(5px);
    pointer-events: none;
  `}
  ${({ isFormVisible }) =>
    isFormVisible &&
    `
    filter: blur(5px);
    pointer-events: none;
  `}
  ${({ isHotelVisible }) =>
    isHotelVisible &&
    `
    filter: blur(5px);
    pointer-events: none;
  `}
  ${({ isEquipmentListVisible }) =>
    isEquipmentListVisible &&
    `
    filter: blur(5px);
    pointer-events: none;
  `}

  .HeadingAndSvg {
    display: flex;
    width: 98.5%;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    margin-bottom: 20px;
    margin-top: 15px;
    p {
      color: #457eac;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      margin: 0px;
      padding: 0px;
    }
    svg {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .formDiv {
    width: 93%;
    height: auto;
    flex-shrink: 0;
    border-radius: 8px;
    background: #fff;
    margin: auto;
    padding: 19px;
    .eventDetailsDiv {
      position: relative;
      p {
        margin: 18px 0px 5px 3px;
      }
      .eventPTag {
        margin-top: 5px;
      }
      .inputAndBtn {
        display: flex;
        align-items: center;
        gap: 10.369px;
        flex-shrink: 0;
        border-radius: 10px;
        background: #f9fafc;
        border: 10px solid #f9fafc;
        justify-content: space-between;
        button {
          width: 167px;
          padding: 10px;
          flex-shrink: 0;
          border-radius: 8.295px;
          background: #2d5d7b;
          color: #fff;
          font-size: 16.59px;
          font-weight: 400;
          border: none;
          outline: none;
          &:hover {
            cursor: pointer;
          }
        }
        input {
          color: #bfbbbb;
          font-size: 18.664px;
          font-weight: 400;
          background-color: #f9fafc;
          border: none;
          outline: none;
        }
        .eventInput {
          margin: 7.8px 0px;
        }
      }
    }
    .descriptiopn {
      margin-top: 10px;
      width: 100%;
      .inputAndBtn {
        display: flex;
        align-items: center;
        border-radius: 10px;
        textarea {
          width: 100%;
          background: #f9fafc;
          color: #bfbbbb;
          font-family: Poppins;
          padding: 10px;
          font-size: 17.664px;
          font-weight: 400;
          outline: none;
          border: none;
        }
      }
    }
    .timeAndDateDiv {
      display: flex;
      justify-content: space-between;
      .singleTimeAndDateDiv {
        width: 32%;
        position: relative;
        p {
          margin: 18px 0px 5px 3px;
        }
        .inputAndBtnDiv {
          display: flex;
          align-items: center;
          border-radius: 10px;
          background: #f9fafc;
          border: 10px solid #f9fafc;
          justify-content: space-between;
          padding: 9px;
          svg {
            cursor: pointer;
          }
          #selectBreakTime {
            width: 90%;
            border: none;
            outline: none;
            font-size: 18.664px;
            font-weight: 400;
            background-color: #f9fafc;
            color: #484646;
            &:hover {
              cursor: pointer;
            }
          }
          button {
            width: 167px;
            padding: 10px;
            border-radius: 8.295px;
            background: #2d5d7b;
            color: #fff;
            font-size: 16.59px;
            font-weight: 400;
            border: none;
            outline: none;
          }
          input {
            color: #bfbbbb;
            font-size: 18.664px;
            font-weight: 400;
            background-color: #f9fafc;
            outline: none;
            width: 80%;
            border: none;
          }
          .dateInput {
            width: 100%;
          }
          .selectBtn {
            text-align: left;
            width: 130px;
            margin-left: 10px;
            font-weight: 400;
            padding: 0px;
            background-color: #f9fafc;
            color: #484646;
            outline: none;
            cursor: pointer;
          }
        }
      }
    }
    .saveBtnDiv {
      width: 100%;
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      button {
        width: 116px;
        padding: 9px 28px;
        border-radius: 5px;
        border: none;
        outline: none;
        color: #fff;
        background-color: #2d5d7b;
        cursor: pointer;
      }
    }
  }
`;

const HotelList = styled.div`
  display: ${({ isHotelListVisible }) =>
    isHotelListVisible ? "block" : "none"};
  position: fixed;
  top: 30%;
  left: 70%;
  transform: translateX(-50%, -50%);
  z-index: 1000;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  padding: 15px;
  width: max-content;
  border-radius: 10.369px;
  background: #f8f9fb;
  .closeHotelList {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    svg {
      cursor: pointer;
    }
  }
  p {
    margin: 10px 0px;
    &:hover {
      background-color: #e6e1e1;
      cursor: pointer;
    }
  }
  .addMoreHotels {
    width: 50%;
    display: flex;
    padding: 6px;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 7px;
    background: #457eac;

    button {
      border: none;
      color: #ffff;
      background: none;
      font-size: 16px;
      &:hover {
        cursor: pointer;
      }
    }
    svg {
      color: #ffff;
      cursor: pointer;
    }
  }
`;

const ShowAddHotelForm = styled.div`
  width: 45%;
  height: auto;
  border-radius: 19px;
  background: #f8f9fb;
  margin: auto;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
  padding: 20px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  .HeadingAndSvg {
    display: flex;
    width: 98.5%;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    margin-bottom: 20px;
    p {
      color: #457eac;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      margin: 0px;
      padding: 0px;
    }
    svg {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      &:hover {
        cursor: pointer;
      }
    }
  }

  form {
    width: 93%;
    height: auto;
    flex-shrink: 0;
    border-radius: 8px;
    background: #fff;
    margin: auto;
    padding: 25px 19px;
    .eventDetailsDiv {
      p {
        margin: 15px 0px 7px 3px;
      }
      .hotelNamePTag {
        margin-top: 0px;
      }
      .inputAndBtn {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        border-radius: 10px;
        background: #f9fafc;
        padding: 15px 0px 15px 15px;
        justify-content: space-between;
        input {
          color: #bfbbbb;
          font-size: 18.664px;
          font-weight: 400;
          background-color: #f9fafc;
          border: none;
          outline: none;
        }
      }
    }
    .managerAndFoodDetails {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .commonManagerAndFood {
        width: 45%;
        p {
          margin: 15px 0px 7px 3px;
        }
        .inputAndBtn {
          width: 94%;
          border-radius: 10px;
          background: #f9fafc;
          padding: 15px 0px 15px 15px;
          border: none;
          outline: none;
          color: #bfbbbb;
          font-size: 18.664px;
          font-weight: 400;
        }
      }
      .saveAddHotel {
        width: 54%;
        margin: auto;
        display: flex;
        justify-content: end;
        align-items: center;
        input {
          margin-top: 60px;
          padding: 7px 30px;
          color: #fff;
          font-size: 16.59px;
          font-style: normal;
          font-weight: 400;
          background-color: #457eac;
          border-radius: 8px;
          border: none;
          outline: none;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
`;
const EquipmentList = styled.div`
  display: ${({ isEquipmentListVisible }) =>
    isEquipmentListVisible ? "block" : "none"};
  position: fixed;
  top: 39%;
  left: 68%;
  transform: translateX(-50%, -50%);
  z-index: 1000;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  padding: 15px;
  width: max-content;
  border-radius: 10.369px;
  background: #f8f9fb;

  .equipmentList {
    .closeEuipmentList {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      svg{
        cursor: pointer;
      }
    }
    div {
      display: flex;
      align-items: center;
      padding: 5px 0;
      input {
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
`;

const ShowHotelDetails = styled.div`
  width: 37%;
  height: auto;
  border-radius: 19px;
  background: #f8f9fb;
  margin: auto;
  display: ${({ isHotelVisible }) => (isHotelVisible ? "block" : "none")};
  position: fixed;
  top: 41%;
  left: 78.5%;
  transform: translate(-50%, -50%);
  z-index: 2000;
  padding: 30px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  .closeHotelList {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    svg {
      cursor: pointer;
    }
  }
  .contentDiv {
    width: 90%;
    display: flex;
    text-align: start;
    justify-content: space-around;
    align-items: baseline;
    /* border: 1px solid red; */
    .commonDiv {
      display: flex;
      justify-content: space-between;
      align-items: center;
      /* border: 1px solid black; */
      width: 30%;
      p {
        margin: 5px 0px;
        font-size: 18px;
        font-weight: 800;
        /* border: 1px solid black; */
      }
    }
    .value {
      display: flex;
      align-items: center;
      width: 65%;
      p {
        margin: 0px;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
`;



// http://api.qrserver.com/v1/create-qr-code/?data={name:Yash Vaishnav,email:yashurishu22@gmail.com}!&size=150x150