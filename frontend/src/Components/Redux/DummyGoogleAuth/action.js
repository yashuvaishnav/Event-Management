import axios from "axios";
import {
  GOOGLE_EVENT_FAILURE,
  GOOGLE_EVENT_REQUEST,
  GOOGLE_EVENT_SUCCESS,
  SINGLE_GOOGLE_EVENT_SUCCESS,
} from "./actionTypes";
import { showErrorToast, showSuccessToast } from "../../Toast/Toastify";

const getTestimonialRequest = () => {
  return { type: GOOGLE_EVENT_REQUEST };
};
const getTestimonialError = () => {
  return { type: GOOGLE_EVENT_FAILURE };
};

export const fetchGoogleEventsData = (searchQuery) => (dispatch) => {
  dispatch(getTestimonialRequest());
  axios
    .get(`http://localhost:8080/calender/?searchQuery=${searchQuery}`)
    .then((res) => {
      const reverseData = res.data.reverse();
      dispatch({ type: GOOGLE_EVENT_SUCCESS, payload: reverseData});
    })
    .catch((err) => {
      dispatch(getTestimonialError());
    });
};

export const getGoogleEventsDataById = (id) => (dispatch) => {
  axios
    .get(`http://localhost:8080/calender/${id}`)
    .then((res) => {
      dispatch({ type: SINGLE_GOOGLE_EVENT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const patchAttendees = (eventNormalId, updatedEventData,email) => () => {
  axios
    .patch(
      `http://localhost:8080/calender/attendees/${eventNormalId}`,
      updatedEventData
    )
    .then((res) => {
      showSuccessToast(`Invitation send to ${email}`);
    })
    .catch((err) => {
      showErrorToast(err.response.data.msg);
    });
};

export const createGoogleEvent = (obj,navigate) => () => {
  axios
    .post("http://localhost:8080/calender/googleEvent", obj)
    .then((res) => {
      showSuccessToast(res.data.msg);
      const timeOut = setTimeout(()=>{
        navigate("/adminDashboard")
      },2000)

    })
    .catch((err) => {
      showErrorToast(err.response.data.msg);
    });
};

export const deleteGoogleEvent = (eventId) => async (dispatch) => {
  await axios
    .delete(`http://localhost:8080/calender/delete/${eventId}`)
    .then((res) => {
      showSuccessToast(res.data.msg);
      dispatch(fetchGoogleEventsData());
    })
    .catch((err) => {
      showErrorToast(err.response.data.msg);
    });
};

export const updateGoogleEvent = (editEventData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/calender/update/${editEventData._id}`,
      editEventData
    );
    showSuccessToast(response.data.msg);
    dispatch(fetchGoogleEventsData());
  } catch (error) {}
};

export const updateAttedance = (obj,event) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `http://localhost:8080/calender/attendance/${event._id}`,
      obj 
    );
    showSuccessToast(response.data.msg);
    dispatch(fetchGoogleEventsData());
  } catch (error) {
    showErrorToast("Something went wrong.")
  }
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