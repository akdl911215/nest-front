import React, { MouseEventHandler, useEffect, useState } from "react";
import { LoginAPI, LoginParams, RefreshTokenAPI } from "../api/UserApi";
import { CollectionTypes } from "../../_common/CollectionTypes";
import { isValidPasswordFormat } from "../../_common/PasswordRegex";
import { FaGoogle, FaApple, FaComment } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import Alert from "../../components/Alert";
import {
  UsersKakaoOAuthSignUpAPI,
  UsersKakaoOAuthLoginAPI,
  UsersNaverOAuthSignUpAPI,
} from "../api/OAuthApi";
import ErrorModal from "../../_common/ErrorModal";

interface Props {
  readonly onSwitchView: () => void;
  readonly modalIsOpen: (state: boolean) => void;
}
type OAuthReturnType = "NEW_USER" | "EXITING_USER";

const Login = ({ onSwitchView, modalIsOpen }: Props) => {
  const [login, setLogin] = useState<LoginParams>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false); // State for ErrorModal


  const setLoginProcess = ({
    id,
    nickname,
    access_token,
    refresh_token,
  }: {
    readonly id: string;
    readonly nickname: string;
    readonly access_token: string;
    readonly refresh_token: string;
  }) => {
    modalIsOpen(false);
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("id", id);
    localStorage.setItem("nickname", nickname);
    setShowAlert(true); // 알람 표시
    setShowAlert(false); // 알람 숨기기
    window.location.reload();
  };

  const handleChange = (event: CollectionTypes): void => {
    const { name, value } = event;

    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    processLogin();
  };

  const processLogin = async () => {
    const isPasswordValid: boolean = isValidPasswordFormat(login.password);
    const isEmailValid: boolean = /\S+@\S+\.\S+/.test(login.email);
    if (!isEmailValid) {
      setErrorMessage("유효한 이메일 주소를 입력하세요.");
      return;
    }

    if (isPasswordValid) {
      try {
        const res = await LoginAPI(login);
        const response = res.data.response;
        console.log("response ", response);
        const { id, nickname, access_token, refresh_token } = response;

        if (res.status === 201 && response) {
          setLoginProcess({
            id,
            nickname,
            access_token,
            refresh_token,
          });
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          try {
            const refreshRes = await RefreshTokenAPI();
            const refreshResponse = refreshRes.data.response;
            const { access_token, refresh_token } = refreshResponse;

            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);

            // Retry the original request
            const retryRes = await LoginAPI(login);
            const retryResponse = retryRes.data.response;
            const { id, nickname } = retryResponse;

            setLoginProcess({
              id,
              nickname,
              access_token,
              refresh_token,
            });
          } catch (refreshErr) {
            setErrorMessage("세션이 만료되었습니다. 다시 로그인해 주세요.");
            console.error(refreshErr);
            localStorage.clear();
            modalIsOpen(true);
          }
        } else {
          setErrorMessage("로그인 실패. 이메일과 비밀번호를 확인하세요.");
          console.error(err);
        }
      }
    } else {
      setErrorMessage(
        "비밀번호는 최소 8자, 하나 이상의 문자, 하나의 숫자 및 하나의 특수문자입니다.",
      );
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 동작 방지
      processLogin();
    }
  };

  const naverOauthLogin = async () => {
    console.log("naverOauthLogin check");
    // alert("naverOauthLogin check");

    const res = await UsersNaverOAuthSignUpAPI();
    if (!res) return;

    console.log("naverAuthLogin res : ", res);
    const TYPE: OAuthReturnType = res.data.response.type;

    if (TYPE === "NEW_USER") {
      // 이메일 가지고 있고, 회원가입시 해당 이메일이 회원가입창에 입력될 수 있도록
      console.log(
        " res.data.response.profile.email : ",
        res.data.response.profile.email,
      );
      const EMAIL: string = res.data.response.profile.email as string;
      console.log("EMAIL : ", EMAIL);

      // onSwitchView();
    } else if (TYPE === "EXITING_USER") {
      const loginProfile = await UsersKakaoOAuthLoginAPI();
      if (!loginProfile) return;
      console.log("loginProfile : ", loginProfile);
      const { id, nickname, access_token, refresh_token } =
        loginProfile.data.response;

      setLoginProcess({
        id,
        nickname,
        access_token,
        refresh_token,
      });
    }
  };

  const kakaoOauthLogin = () => {
    const KAKAO_CLIENT_ID = "05fd707ffee9942bacd1630d5c05bb4f"; // Your actual Kakao REST API key
    const REDIRECT_URI = "http://127.0.0.1:9898/users/kakao/callback"; // Use the appropriate redirect URI
  
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div style={styles.container}>
      {showAlert && (
        <Alert
          message="로그인이 완료되었습니다."
          onClose={() => setShowAlert(false)}
          type="success"
        />
      )}
      <div>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2>로그인</h2>
        </div>
        <div style={styles.socialButtonsContainer}>
          <button
            style={styles.socialButton}
            onClick={() => alert("Continue with Google")}
          >
            <FaGoogle style={styles.socialLogo} />
            구글로 로그인
          </button>
          <button
            style={styles.socialButton}
            onClick={() => alert("Continue with Apple")}
          >
            <FaApple style={styles.socialLogo} />
            애플로 로그인
          </button>
          <button style={styles.socialButton} onClick={naverOauthLogin}>
            <SiNaver style={styles.socialLogo} />
            네이버로 로그인
          </button>
          <button style={styles.socialButton} onClick={kakaoOauthLogin}>
            <FaComment style={styles.socialLogo} />
            카카오로 로그인
          </button>
        </div>
        <div style={styles.orContainer}>
          <div style={styles.orLine}></div>
          <div style={styles.orText}>OR</div>
          <div style={styles.orLine}></div>
        </div>
        <form>
          <input
            style={styles.input}
            placeholder="이메일 *"
            type="email"
            id="email"
            name="email"
            onChange={(value) =>
              handleChange({
                name: value.target.name,
                value: value.target.value,
              })
            }
            onKeyDown={handleKeyDown}
            required
          />
          <input
            style={styles.input}
            onChange={(value) =>
              handleChange({
                name: value.target.name,
                value: value.target.value,
              })
            }
            placeholder="비밀번호 *"
            type="password"
            id="password"
            name="password"
            onKeyDown={handleKeyDown}
            required
          />
          {errorMessage && <div style={styles.errorText}>{errorMessage}</div>}
          <div style={styles.forgotPasswordContainer}>
            <a href="/forgot-password" style={styles.forgotPasswordLink}>
              비밀번호를 잊으셨나요?
            </a>
          </div>
        </form>

        <div style={{ width: "100%", padding: "10px 0", textAlign: "center" }}>
          <button
            type="submit"
            style={styles.submitButton}
            onClick={handleSubmit}
          >
            로그인
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "0px",
          }}
        >
          <button onClick={onSwitchView} style={styles.switchButton}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff",
    borderRadius: "25px",
    padding: "20px",
    minWidth: "400px",
    maxWidth: "600px",
    width: "80%",
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "space-between",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    height: "736px", // 높이를 회원가입과 맞춤
  },
  header: {
    textAlign: "center" as "center",
    marginBottom: "20px",
  },
  socialButtonsContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "10px",
  },
  socialButton: {
    display: "flex",
    alignItems: "center" as "center",
    justifyContent: "center" as "center",
    padding: "10px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    borderRadius: "10px",
    cursor: "pointer",
    height: "40px",
  },
  socialLogo: {
    width: "20px",
    height: "20px",
    marginRight: "10px",
  },
  orContainer: {
    display: "flex",
    alignItems: "center" as "center",
    textAlign: "center" as "center",
    color: "#aaa",
    margin: "20px 0",
  },
  orLine: {
    flex: 1,
    height: "1px",
    background: "#aaa",
  },
  orText: {
    margin: "0 10px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginBottom: "10px",
    boxSizing: "border-box" as "border-box",
    width: "100%",
    height: "40px",
  },
  forgotPasswordContainer: {
    width: "100%",
    padding: "10px 0",
    textAlign: "right" as "right",
  },
  forgotPasswordLink: {
    fontSize: "14px",
    color: "#007BFF",
  },
  submitContainer: {
    display: "flex",
    justifyContent: "center" as "center",
    marginTop: "20px",
  },
  submitButton: {
    padding: "10px 20px",
    width: "200px",
    borderRadius: "25px",
    border: "none",
    backgroundColor: "#84d7fb",
    color: "white",
    cursor: "pointer",
  },
  switchContainer: {
    width: "100%",
    padding: "10px 0",
    textAlign: "center" as "center",
  },
  switchButton: {
    padding: "10px 20px",
    width: "200px",
    borderRadius: "25px",
    border: "none",
    backgroundColor: "red",
    color: "white",
    cursor: "pointer",
  },
  errorText: {
    color: "red",
    textAlign: "center" as "center",
    marginTop: "10px",
    marginBottom: "10px",
  },
};

export default Login;
