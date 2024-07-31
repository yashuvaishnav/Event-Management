
import {
    EVENTS_REQUEST,
    EVENTS_ERROR,
    FETCH_EVENTS_DATA,
  } from "./actionTypes";


const initialState = {
    eventsData : [],
    isLoading: false,
    isError: false,
}
  
 export const reducer = (state = initialState, action) => {
    switch (action.type) {
      // Products
      case EVENTS_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case EVENTS_ERROR:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case FETCH_EVENTS_DATA:
        return {
          ...state,
          eventsData: action.payload,
          isLoading: false,
          isError: false,
        };
        default:
        return state;
    }
};