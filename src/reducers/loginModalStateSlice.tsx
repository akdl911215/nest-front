import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginModalStateState {
  isModalOpen: boolean;
}

const initialState: LoginModalStateState = {
  isModalOpen: false,
};

const loginModalStateSlice = createSlice({
  name: "loginModalState",
  initialState,
  reducers: {
    loginModalState(state, action: PayloadAction<LoginModalStateState>) {
      state.isModalOpen = action.payload.isModalOpen;
    },
  },
});

export const { loginModalState } = loginModalStateSlice.actions;
const loginModalStateReducer = loginModalStateSlice.reducer;
export default loginModalStateReducer;
