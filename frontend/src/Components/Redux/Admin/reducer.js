import {
  GET_ADMIN_FAILURE,
  GET_ADMIN_REQUEST,
  GET_ADMIN_SUCCESS,
} from "./actionTypes";

const initialState = {
  adminData: {},
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case GET_ADMIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_ADMIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case GET_ADMIN_SUCCESS:
      return {
        ...state,
        adminData: action.payload,
        isLoading: false,
        isError: false,
      };
    default:
      return state;
  }
};
