import { BACK_URL, client } from "./Client";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

export interface ProfileParams {
  readonly id: string;
}
// export const ProfileAPI = async ({ id }: ProfileParams) => {
//   const URL: string = `${BACK_URL}/users/profile/${id}`;
//
//   const res = await client.get(URL);
//   console.log("ProfileAPI res : ", res);
//
//   return res;
// };
export const ProfileAPI = createAsyncThunk(
  "ProfileAPI",
  async ({ id }: ProfileParams, thunkAPI) => {
    try {
      const URL: string = `${BACK_URL}/users/profile/${id}`;

      const res = await client.get(URL);
      console.log("ProfileAPI res : ", res);
      console.log("ProfileAPI res.data : ", res.data);

      return res.data;
    } catch (e: any) {
      if (!e.response) {
        throw error;
      }
      return isRejectedWithValue(e.response.data);
    }
  },
);

export interface LoginParams {
  readonly email: string;
  readonly password: string;
}

export const LoginAPI = async (params: LoginParams) => {
  const URL: string = `${BACK_URL}/users/login`;

  const res = await client.post(URL, params);
  return res;
};

export interface SignupParams {
  readonly email: string;
  readonly nickname: string;
  readonly password: string;
  readonly phone: string;
}
