import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MainListTypes } from "../../_common/CollectionTypes";
import { AppDispatch } from "../../store/store";
import {
  allButton,
  homeButton,
  popularButton,
} from "../../reducers/mainListTypeSlice";

const GlobalSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [isSideHovered, setIsSideHovered] = useState<MainListTypes | "CREATE_COMMUNITY" | null>(null);
  // const [isSideHovered, setIsSideHovered] = useState<MainListTypes | null>(null);
  // CREATE_COMMUNITY 만들고 나중에 다시 변경
  const [selectedButton, setSelectedButton] = useState<MainListTypes>("HOME");

  const handleClick = (button: MainListTypes) => {
    setSelectedButton(button);

    if (button === "HOME") dispatch(homeButton());
    if (button === "POPULAR") dispatch(popularButton());
    if (button === "ALL") dispatch(allButton());

    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "40vh",
        height: "200vh",
        background: "#fff",
        marginRight: "20px",
        border: "2px solid #D3D3D3",
        borderTop: "none" // 홈 위에 상단 보더라인 삭제
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px 0",
          backgroundColor:
            selectedButton === "HOME" || isSideHovered === "HOME"
              ? "#f0f0f0"
              : "white",
          borderRadius: "5px",
          margin: "5px",
        }}
        onMouseEnter={() => setIsSideHovered("HOME")}
        onMouseLeave={() => setIsSideHovered(null)}
      >
        <span
          onClick={() => handleClick("HOME")}
          style={{ fontSize: "24px", cursor: "pointer" }}
        >
          🏠
        </span>
        <span
          onClick={() => handleClick("HOME")}
          style={{ marginLeft: "8px", cursor: "pointer", fontSize: "24px" }}
        >
          홈
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px 0",
          backgroundColor:
            selectedButton === "POPULAR" || isSideHovered === "POPULAR"
              ? "#f0f0f0"
              : "white",
          borderRadius: "5px",
          margin: "5px",
        }}
        onMouseEnter={() => setIsSideHovered("POPULAR")}
        onMouseLeave={() => setIsSideHovered(null)}
      >
        <span
          onClick={() => handleClick("POPULAR")}
          style={{ fontSize: "24px", cursor: "pointer" }}
        >
          🔥
        </span>
        <span
          onClick={() => handleClick("POPULAR")}
          style={{ marginLeft: "8px", cursor: "pointer", fontSize: "24px" }}
        >
          실시간
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px 0",
          backgroundColor:
            selectedButton === "ALL" || isSideHovered === "ALL"
              ? "#f0f0f0"
              : "white",
          borderRadius: "5px",
          margin: "5px",
        }}
        onMouseEnter={() => setIsSideHovered("ALL")}
        onMouseLeave={() => setIsSideHovered(null)}
      >
        <span
          onClick={() => handleClick("ALL")}
          style={{ fontSize: "24px", cursor: "pointer" }}
        >
          🌐
        </span>
        <span
          onClick={() => handleClick("ALL")}
          style={{ marginLeft: "8px", cursor: "pointer", fontSize: "24px" }}
        >
          게시글
        </span>
      </div>
      {/* <div style={{ borderBottom: "1px solid #ccc", margin: "20px 0" }}></div> */}
      <div style={{ fontWeight: "bold", paddingLeft: "10px" }}>RECENT</div>
      <div style={{ padding: "10px 0 20px 10px" }}>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <span style={{ fontSize: "24px" }}>🇰🇷</span>
          <span style={{ marginLeft: "8px" }}>r/korea</span>
        </div>
      </div>
      <div style={{ fontWeight: "bold", paddingLeft: "10px" }}>COMMUNITIES</div>
      <div style={{ padding: "10px 0 20px 10px" }}>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <span style={{ fontSize: "24px" }}>📢</span>
          <span style={{ marginLeft: "8px" }}>r/announcements</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <span style={{ fontSize: "24px" }}>🎮</span>
          <span style={{ marginLeft: "8px" }}>r/gaming</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <span style={{ fontSize: "24px" }}>🎥</span>
          <span style={{ marginLeft: "8px" }}>r/movies</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <span style={{ fontSize: "24px" }}>📚</span>
          <span style={{ marginLeft: "8px" }}>r/books</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <span style={{ fontSize: "24px" }}>🎨</span>
          <span style={{ marginLeft: "8px" }}>r/art</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px 0",
          backgroundColor: isSideHovered === "CREATE_COMMUNITY"
              ? "#f0f0f0"
              : "white",
          borderRadius: "5px",
          margin: "5px",
        }}
        onMouseEnter={() => setIsSideHovered("CREATE_COMMUNITY")}
        onMouseLeave={() => setIsSideHovered(null)}
        onClick={() => alert("Create a community")}
      >
        <span style={{ fontSize: "24px", marginRight: "8px" }}>➕</span>
        <span style={{ fontSize: "17px", cursor: "pointer" }}>커뮤니티 만들기</span>
      </div>
    </div>
  );
};

export default GlobalSideBar;
