import {
  TESTIMONIAL_REQUEST,
  TESTIMONIAL_ERROR,
  FETCH_TESTIMONIAL_DATA,
} from "./actionTypes";

const initialState = {
  testimonialData: [],
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TESTIMONIAL_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case TESTIMONIAL_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case FETCH_TESTIMONIAL_DATA:
      return {
        ...state,
        testimonialData: action.payload,
        isLoading: false,
        isError: false,
      };
    default:
      return state;
  }
};
