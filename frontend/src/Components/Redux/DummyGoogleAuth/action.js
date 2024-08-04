import axios from "axios";
import {
  GOOGLE_EVENT_FAILURE,
  GOOGLE_EVENT_REQUEST,
  GOOGLE_EVENT_SUCCESS,
} from "./actionTypes";
import { showErrorToast, showSuccessToast } from "../../Toast/Toastify";

const getTestimonialRequest = () => {
  return { type: GOOGLE_EVENT_REQUEST };
};
const getTestimonialError = () => {
  return { type: GOOGLE_EVENT_FAILURE };
};

export const fetchGoogleEventsData = () => (dispatch) => {
  dispatch(getTestimonialRequest());
  axios
    .get(`http://localhost:8080/calender`)
    .then((res) => {
      const reverseData = res.data.reverse();
      dispatch({ type: GOOGLE_EVENT_SUCCESS, payload: reverseData });
      // console.log(res);
    })
    .catch((err) => {
      dispatch(getTestimonialError());
    });
};

export const patchAttendees =
  (eventNormalId, updatedEventData) => () => {
    axios
      .patch(
        `http://localhost:8080/calender/update/${eventNormalId}`,
        updatedEventData
      )
      .then((res) => {
        console.log(res.data);
        showSuccessToast(res.data);
      })
      .catch((err) => {
        showErrorToast(err.response.data.msg);
      });
  };

export const createGoogleEvent = (obj) => () => {
  axios
    .post("http://localhost:8080/calender/googleEvent", obj)
    .then((res) => {
      console.log("res", res.data);
      showSuccessToast("Event created successfully");
    })
    .catch((err) => {
      showErrorToast(err.response.data.msg);
    });
};

export const deleteGoogleEvent = (eventId) => async() => {
 await axios
    .delete(`http://localhost:8080/calender/delete/${eventId}`)
    .then((res) => {
      console.log("res",res);
      showSuccessToast("Event Deleted successfully");
    })
    .catch((err) => {
      showErrorToast(err.response.data.msg);
    });
};
