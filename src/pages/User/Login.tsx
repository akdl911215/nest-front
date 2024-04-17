import React, { useState } from "react";
import Modal from "../../components/Modal";

const Login = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setModalOpen(true)}>Log In</button>
      <Modal
        buttonLabel={"Log In"}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div
          style={{
            width: "70%",
            height: "100%",
            // margin: "auto",
            // border: "1px solid #ccc",
            // padding: "20px",
            // boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            // borderRadius: "4px",
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
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
              placeholder="Email *"
              type="email"
              id="email"
              name="email"
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
              }}
              placeholder="Password *"
              type="password"
              id="password"
              name="password"
              required
            />

            <div
              style={{
                width: "100%",
              }}
            >
              <a href="/forgot-password">Forgot password?</a>
            </div>
            <div style={{ width: "100%" }}>
              <a href="/sign-up">Sign Up</a>
            </div>
            {/*<button type="submit">Log In</button>*/}
          </form>
        </div>
      </Modal>
    </>
  );
};
export default Login;
