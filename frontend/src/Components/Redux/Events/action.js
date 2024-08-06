  
  import axios from "axios";
import { EVENTS_ERROR, EVENTS_REQUEST, FETCH_EVENTS_DATA } from "./actionTypes";
  
  const getEvensRequest = () => {
    return { type: EVENTS_REQUEST };
  };
  const getEventsError = () => {
    return { type: EVENTS_ERROR };
  };
  
  // FETCH ALL DATA
  export const fetchEventsData = () => (dispatch) => {
    dispatch(getEvensRequest());
    axios
      .get(`http://localhost:8080/events`)
      .then((res) => {
        const reverseData = res.data.reverse();
        dispatch({ type: FETCH_EVENTS_DATA, payload: reverseData });
      })
      .catch((err) => {
        dispatch(getEventsError());
      });
  };