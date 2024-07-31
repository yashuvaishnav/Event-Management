import axios from "axios";
// import { baseURL } from "../store";
import {
  GET_PARTICIPATED_FAILURE,
  GET_PARTICIPATED_REQUEST,
  GET_PARTICIPATED_SUCCESS,
} from "./actionTypes";
import { showErrorToast, showSuccessToast } from "../../Toast/Toastify";

const getParticipatedRequest = () => {
  return { type: GET_PARTICIPATED_REQUEST };
};
const getParticipatedError = () => {
  return { type: GET_PARTICIPATED_FAILURE };
};

export const getParticipatedData = (searchQuery) => (dispatch) => {
  dispatch(getParticipatedRequest());
  axios
    .get(`http://localhost:8080/clientForEvent/?searchQuery=${searchQuery}`)
    .then((res) => {
      dispatch({ type: GET_PARTICIPATED_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(getParticipatedError());
    });
};
export const sendThankYouMail = (client) => (dispatch) => {
    let obj = {
      name: client.name,
      email: client.email,
      url: `http://localhost:3000/feedbackForm`,
    };
    if (client.attendance) {
      axios.post(
          "http://localhost:8080/mails/thankYoumail",
          obj
        ).then((res) => {
          showSuccessToast(res.data.msg);
        })
       .catch ((err)=> {
        showErrorToast("Failed to send email");
      })
    } else {
      showErrorToast("Failed to send email");
    }
};



