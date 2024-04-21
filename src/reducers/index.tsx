import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import profileReducer from "./profileSlice";
import loginModalStateReducer from "./loginModalStateSlice";

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  loginModalState: loginModalStateReducer,
});

export default rootReducer;
