

import {
    GET_PARTICIPANTS_SUCCESS,
    GET_PARTICIPANTS_REQUEST,
    GET_PARTICIPANTS_FAILURE,
  } from "./actionTypes";


const initialState = {
    participantsData : [],
    isLoading: false,
    isError: false,
}
  
 export const reducer = (state = initialState, action) => {
    switch (action.type) {
      // Products
      case GET_PARTICIPANTS_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case GET_PARTICIPANTS_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case GET_PARTICIPANTS_SUCCESS:
        return {
          ...state,
          participantsData: action.payload,
          isLoading: false,
          isError: false,
        };
        

        default:
        return state;
    }
};