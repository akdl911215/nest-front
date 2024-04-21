import React, { FormEvent, useEffect, useState } from "react";
import Modal from "./modal";
import { LoginAPI, LoginParams } from "../api/UserApi";
import { HandleChangeType } from "../../_common/HandleChangeType";
import Signup from "./Signup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { loginModalState } from "../../reducers/loginModalStateSlice";
import { signupModalState } from "../../reducers/signupModalStateSlice";
import { modalState } from "../../reducers/modalSlice";

const Login = () => {
  // const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { status, isModalOpen } = useSelector(
    (state: RootState) => state.modalState,
  );
  const dispatch = useDispatch();

  const [login, setLogin] = useState<LoginParams>({
    email: "",
    password: "",
  });

  const handleChange = (event: HandleChangeType): void => {
    const { name, value } = event;

    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();

    LoginAPI(login)
      .then((res): void => {
        const response = res.data.response;

        if (res.status === 201 && response)
          dispatch(modalState({ status: "login", isModalOpen: false }));
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <button
        onClick={() => {
          dispatch(modalState({ status: "login", isModalOpen: true }));
        }}
      >
        Log In
      </button>
      <Modal
        buttonLabel={status === "login" ? "Log in" : ""}
        isOpen={isModalOpen}
        onClose={() =>
          dispatch(modalState({ status: "login", isModalOpen: false }))
        }
        onSubmit={handleSubmit}
      >
        <div
          style={{
            width: "70%",
            height: "100%",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Login</h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              margin: "20px 0",
            }}
          >
            <button
              style={{
                border: "1px solid #ccc",
                backgroundColor: "white",
                minWidth: "100px",
                width: "100%",
                borderRadius: "10px",
                cursor: "pointer",
                height: "4vh",
              }}
              onClick={() => alert("Continue with Google")}
            >
              Continue with Google
            </button>
            <button
              style={{
                border: "1px solid #ccc",
                backgroundColor: "white",
                minWidth: "100px",
                width: "100%",
                borderRadius: "10px",
                cursor: "pointer",
                height: "4vh",
              }}
              onClick={() => alert("Continue with Apple")}
            >
              Continue with Apple
            </button>
            <button
              style={{
                border: "1px solid #ccc",
                backgroundColor: "white",
                minWidth: "100px",
                width: "100%",
                borderRadius: "10px",
                cursor: "pointer",
                height: "4vh",
              }}
              onClick={() => alert("Continue with Naver")}
            >
              Continue with Naver
            </button>
            <button
              style={{
                border: "1px solid #ccc",
                backgroundColor: "white",
                minWidth: "100px",
                width: "100%",
                borderRadius: "10px",
                cursor: "pointer",
                height: "4vh",
              }}
              onClick={() => alert("Continue with Kakao")}
            >
              Continue with Kakao
            </button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              color: "#aaa",
              margin: "20px 0",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "#aaa" }}></div>
            <div
              style={{
                margin: "10px 10px",
              }}
            >
              OR
            </div>
            <div style={{ flex: 1, height: "1px", background: "#aaa" }}></div>
          </div>

          <form>
            <input
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                marginBottom: "10px",
                boxSizing: "border-box",
                width: "100%",
                height: "4vh",
              }}
              placeholder="Email *"
              type="email"
              id="email"
              name={"email"}
              onChange={(value) =>
                handleChange({
                  name: value.target.name,
                  value: value.target.value,
                })
              }
              required
            />

            <input
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                marginBottom: "10px",
                boxSizing: "border-box",
                height: "4vh",
              }}
              onChange={(value) =>
                handleChange({
                  name: value.target.name,
                  value: value.target.value,
                })
              }
              placeholder="Password *"
              type="password"
              id="password"
              name={"password"}
              required
            />

            <div
              style={{
                width: "100%",
                padding: "10px 0",
              }}
            >
              <a href="/forgot-password" style={{ fontSize: "20px" }}>
                Forgot password?
              </a>
            </div>
          </form>
          <div style={{ width: "100%", padding: "10px 0" }}>
            <Signup />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Login;
