import { POST_EVENT_FAILURE, POST_EVENT_REQUEST } from "./actionTypes"


const initialState = {
isLoading: false,
isError: false,
}

export const reducer = (state = initialState,action) => {
    switch(action.type) {
        case POST_EVENT_REQUEST : {
            return {...state,isLoading: true,isError : false}
        }
        case POST_EVENT_FAILURE : {
            return {...state,isLoading: false,isError : true}
        }
    }

}