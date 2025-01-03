import {
  GOOGLE_EVENT_FAILURE,
  GOOGLE_EVENT_REQUEST,
  GOOGLE_EVENT_SUCCESS,
  SINGLE_GOOGLE_EVENT_FAILURE,
  SINGLE_GOOGLE_EVENT_REQUEST,
  SINGLE_GOOGLE_EVENT_SUCCESS,
} from "./actionTypes";

const initialState = {
  googleEventsData: [],
  isLoading: false,
  isError: false,
  singleEventData: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Products
    case GOOGLE_EVENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GOOGLE_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case GOOGLE_EVENT_SUCCESS:
      return {
        ...state,
        googleEventsData: action.payload,
        isLoading: false,
        isError: false,
      };

    case SINGLE_GOOGLE_EVENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case SINGLE_GOOGLE_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case SINGLE_GOOGLE_EVENT_SUCCESS:
      return {
        ...state,
        singleEventData: action.payload,
        isLoading: false,
        isError: false,
      };

    default:
      return state;
  }
};
