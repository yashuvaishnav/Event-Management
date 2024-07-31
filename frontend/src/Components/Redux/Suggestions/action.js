import axios from "axios";
import {
  TESTIMONIAL_ERROR,
  FETCH_TESTIMONIAL_DATA,
  TESTIMONIAL_REQUEST,
} from "./actionTypes";

const getTestimonialRequest = () => {
  return { type: TESTIMONIAL_REQUEST };
};
const getTestimonialError = () => {
  return { type: TESTIMONIAL_ERROR };
};

// FETCH ALL DATA
export const fetchTestimonialData = () => (dispatch) => {
  dispatch(getTestimonialRequest());
  axios
    .get(`http://localhost:8080/clientsuggestions`)
    .then((res) => {
      dispatch({ type: FETCH_TESTIMONIAL_DATA, payload: res.data });
      // console.log(res);
    })
    .catch((err) => {
      dispatch(getTestimonialError());
    });
};

export const postTestimonialData =
  (clientSuggestionDetails, showErrorToast, showSuccessToast, navigate) =>
  (dispatch) => {
    axios
      .post(
        `http://localhost:8080/clientsuggestions/clientsuggestion`,
        clientSuggestionDetails
      )
      .then((res) => {
        showSuccessToast(res.data.msg);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        showErrorToast("Not Added Suggestion");
      });
  };
