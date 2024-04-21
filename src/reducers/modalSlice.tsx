import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  status: "login" | "signup";
  isModalOpen: boolean;
}

const initialState: ModalState = {
  status: "login",
  isModalOpen: false,
};

const modalStateSlice = createSlice({
  name: "modalState",
  initialState,
  reducers: {
    modalState(state, action: PayloadAction<ModalState>) {
      state.status = action.payload.status;
      state.isModalOpen = action.payload.isModalOpen;
    },
  },
});

export const { modalState } = modalStateSlice.actions;
const modalStateReducer = modalStateSlice.reducer;
export default modalStateReducer;
