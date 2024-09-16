import axios from "axios";
import { GET_HOTEL_FAILURE, GET_HOTEL_PENDING, GET_HOTEL_SUCCESS } from "./actionTypes";
import { showErrorToast, showSuccessToast } from "../../Toast/Toastify";

const getHotelRequest = () => {
    return { type: GET_HOTEL_PENDING};
  };
  const getHotelError = () => {
    return { type: GET_HOTEL_FAILURE };
  };

export const getHotelData = () => (dispatch) => {
    dispatch(getHotelRequest());
    axios
      .get(`http://localhost:8080/hotel/`)
      .then((res) => {
        dispatch({type : GET_HOTEL_SUCCESS,payload : res.data})
        showSuccessToast(res.data.msg);
      })
      .catch((err) => {
        dispatch(getHotelError());
      });
  };

export const addHotel = (hotelData) => (dispatch) => {
  axios
    .post(`http://localhost:8080/hotel/addHotel`, hotelData)
    .then((res) => {
      console.log(res);
      showSuccessToast(res.data.msg);
      dispatch(getHotelData());
    })
    .catch((err) => {
      showErrorToast("Not Added Hotel");
    });
};
