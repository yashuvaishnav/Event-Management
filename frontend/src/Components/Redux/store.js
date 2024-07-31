
  import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { reducer as eventReducer } from "./Events/reducer";
import {reducer as testimonialReducer} from "./Suggestions/reducer"
import {reducer as adminReducer} from "./Admin/reducer"
import {reducer as participantsReducer} from "./Participants/reducer"
import { reducer as participatedReducer } from "./Participated/reducer";
import { reducer as googleEventReducer } from "./DummyGoogleAuth/reducer";


import {thunk} from "redux-thunk"

export const baseURL = `http://localhost:8080/`;

const rootReducer = combineReducers({
  eventReducer,
  testimonialReducer,
  adminReducer,
  participantsReducer,
  participatedReducer,
  googleEventReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

