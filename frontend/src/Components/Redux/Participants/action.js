import axios from "axios";
import {
  GET_PARTICIPANTS_FAILURE,
  GET_PARTICIPANTS_REQUEST,
  GET_PARTICIPANTS_SUCCESS,
  SENDMAIL_FAILURE,
} from "./actionTypes";

const getParticipantsRequest = () => {
  return { type: GET_PARTICIPANTS_REQUEST };
};
const getParticipantsError = () => {
  return { type: GET_PARTICIPANTS_FAILURE };
};

export const getParticipantsData = (searchQuery) => (dispatch) => {
  dispatch(getParticipantsRequest());
  if(searchQuery){
    axios
    .get(`http://localhost:8080/clients/?searchQuery=${searchQuery}`)
    .then((res) => {
      dispatch({ type: GET_PARTICIPANTS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(getParticipantsError());
    });
  }
  else{
    axios
    .get(`http://localhost:8080/clients/`)
    .then((res) => {
      dispatch({ type: GET_PARTICIPANTS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(getParticipantsError());
    });
  }
};

export const postMail =
  (client, parseEventsData, showSuccessToast, showErrorToast) => (dispatch) => {
    let obj = {
      name: client.name,
      email: client.email,
      url: `http://localhost:3000/eventRegistrationForm?id=${parseEventsData._id}`,
    };
    axios
      .post(`http://localhost:8080/mails/registrationMail`, obj)
      .then((res) => {
        showSuccessToast(res.data.msg);
      })
      .catch((err) => {
        dispatch({type : SENDMAIL_FAILURE})
        showErrorToast("Failed to send email");
      });
  };
