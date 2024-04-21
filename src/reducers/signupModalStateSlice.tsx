import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignupModalStateState {
  isModalOpen: boolean;
}

const initialState: SignupModalStateState = {
  isModalOpen: false,
};

const signupModalStateSlice = createSlice({
  name: "signupModalState",
  initialState,
  reducers: {
    signupModalState(state, action: PayloadAction<SignupModalStateState>) {
      state.isModalOpen = action.payload.isModalOpen;
    },
  },
});

export const { signupModalState } = signupModalStateSlice.actions;
const signupModalStateReducer = signupModalStateSlice.reducer;
export default signupModalStateReducer;
