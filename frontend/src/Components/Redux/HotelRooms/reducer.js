import {
  GET_HOTEL_FAILURE,
  GET_HOTEL_PENDING,
  GET_HOTEL_SUCCESS,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  hotelData: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOTEL_PENDING: {
      return { ...state, isLoading: true, isError: false };
    }
    case GET_HOTEL_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }
    case GET_HOTEL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        hotelData: action.payload,
      };
    }
    default:
      return state;
  }
};
