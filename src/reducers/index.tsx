import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import profileReducer from "./profileSlice";
import loginModalStateReducer from "./loginModalStateSlice";
import signupModalStateReducer from "./signupModalStateSlice";
import modalStateReducer from "./modalSlice";

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  loginModalState: loginModalStateReducer,
  signupModalState: signupModalStateReducer,
  modalState: modalStateReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
