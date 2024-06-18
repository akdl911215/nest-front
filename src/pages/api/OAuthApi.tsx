import { client } from "./Client";
import { ErrorHandling } from "../../_common/ErrorHandling";

const OAUTH_URL: string = "oauth";
export interface UsersKakaoOAuthRedirectParam {
  readonly code: string;
}

export const UsersKakaoOAuthRedirectAPI = async ({
  code,
}: UsersKakaoOAuthRedirectParam) => {
  try {
    // const URL: string = `${OAUTH_URL}/kakao/callback?code=${code}`;
    const URL: string = `${OAUTH_URL}/kakao/callback`;

    const res = await client.get(URL);
    console.log("UsersKakaoOAuthRedirectAPI res : ", res);

    return res;
  } catch (e: any) {
    ErrorHandling({ text: "UsersKakaoOAuthRedirectAPI", error: e });
  }
};

export const UsersKakaoAuthSignUpAPI = async () => {
  try {
    const URL: string = `${OAUTH_URL}/kakao`;

    const res = await client.get(URL);
    console.log("UsersKakaoAuthSignUpAPI res : ", res);

    return res;
  } catch (e: any) {
    ErrorHandling({ text: "UsersKakaoAuthSignUpAPI", error: e });
  }
};