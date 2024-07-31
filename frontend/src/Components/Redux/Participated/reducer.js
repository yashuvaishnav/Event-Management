import {
  GET_PARTICIPATED_FAILURE,
  GET_PARTICIPATED_REQUEST,
  GET_PARTICIPATED_SUCCESS,
} from "./actionTypes";

const initialState = {
  participatedData: [],
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Products
    case GET_PARTICIPATED_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_PARTICIPATED_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case GET_PARTICIPATED_SUCCESS:
      return {
        ...state,
        participatedData: action.payload,
        isLoading: false,
        isError: false,
      };
    default:
      return state;
  }
};
