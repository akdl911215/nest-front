import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { ReduxProfileAPI } from "../api/UserApi";
import { ProfileState } from "../../reducers/profileSlice";
import GlobalSideBar from "../Global/GlobalSideBar";
import RightSideBar from "../Global/RightSideBar";
import GlobalBar from "../Global/GlobalBar";
import { CardType } from "../../_common/CollectionTypes";
import Card from "../../components/Card";
import BoardComment, { CommentType } from "../Board/BoardComment";
import { BoardInquiryAPI } from "../api/BoardApi";

type ACTIVE_SECTION_TYPES = "POSTS" | "COMMENTS" | "PROFILE";
const Profile = () => {
  const user: ProfileState = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  const [myPosts, setMyPosts] = useState<CardType[]>([]);
  const [myComments, setMyComments] = useState<CommentType[]>([]);
  const [activeSection, setActiveSection] =
    useState<ACTIVE_SECTION_TYPES>("POSTS");
  const ID: string = (localStorage.getItem("id") as string) || "";

  useEffect(() => {
    console.log("user ::: ", user);
  }, [user]);

  // useEffect(() => {
  //   dispatch(ReduxProfileAPI({ id: ID })).then((res) => {
  //     console.log("Profile API response:", res);
  //   });
  // }, [dispatch]);

  useEffect(() => {
    // if (user.data.id) {
    // Fetch my posts
    // MyPostsAPI(user.data.id).then((res) => {
    //   setMyPosts(Array.isArray(res) ? res : []);
    // });
    if (activeSection === "POSTS") {
      BoardInquiryAPI({ id: ID })
        .then((res) => {
          const response = res.data.response;
          console.log("profile board inquiry api response : ", response);

          setMyPosts(response);
        })
        .catch((err) => console.error("PROFILE BOARD INQUIRY ERROR : ", err));
    }

    // Fetch my comments
    if (activeSection === "COMMENTS") {
      // MyCommentsAPI(user.data.id).then((res) => {
      //   setMyComments(Array.isArray(res) ? res : []);
      // });
    }
    // }
  }, [activeSection]);

  const handleReplySubmit = (reply: any) => {
    // Implement reply submit logic here
  };

  return (
    <>
      <GlobalBar />
      <div style={{ display: "flex", width: "100%" }}>
        <GlobalSideBar />
        <div style={{ flex: 2, padding: "20px" }}>
          <div style={styles.buttonContainer}>
            <button
              style={
                activeSection === "POSTS" ? styles.activeButton : styles.button
              }
              onClick={() => setActiveSection("POSTS")}
            >
              내가 등록한 게시글
            </button>
            <button
              style={
                activeSection === "COMMENTS"
                  ? styles.activeButton
                  : styles.button
              }
              onClick={() => setActiveSection("COMMENTS")}
            >
              내가 단 댓글
            </button>
            <button
              style={
                activeSection === "PROFILE"
                  ? styles.activeButton
                  : styles.button
              }
              onClick={() => setActiveSection("PROFILE")}
            >
              기본 정보 변경
            </button>
          </div>

          {activeSection === "POSTS" && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>내가 등록한 게시글</h2>
              {myPosts.length > 0 ? (
                myPosts.map((post) => (
                  <Card key={post.id} {...post} createdAt={post.created_at} />
                ))
              ) : (
                <p>등록된 포스트가 없습니다.</p>
              )}
            </div>
          )}

          {activeSection === "COMMENTS" && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>내가 단 댓글</h2>
              {myComments.length > 0 ? (
                myComments.map((comment) => (
                  <BoardComment
                    key={comment.id}
                    {...comment}
                    onReplySubmit={handleReplySubmit}
                  />
                ))
              ) : (
                <p>작성된 댓글이 없습니다.</p>
              )}
            </div>
          )}

          {activeSection === "PROFILE" && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>기본 정보 변경</h2>
              <div style={styles.card}>
                <h1 style={styles.title}>프로필</h1>
                <div style={styles.info}>
                  <label style={styles.label}>닉네임:</label>
                  <span style={styles.value}>
                    {user.data.nickname || "닉네임을 입력하세요"}
                  </span>
                </div>
                <div style={styles.info}>
                  <label style={styles.label}>이메일:</label>
                  <span style={styles.value}>
                    {user.data.email ? user.data.email : "이메일을 입력하세요"}
                  </span>
                </div>
                <div style={styles.info}>
                  <label style={styles.label}>전화번호:</label>
                  <span style={styles.value}>
                    {user.data.phone
                      ? user.data.phone
                      : "전화번호를 입력하세요"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <RightSideBar />
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    margin: "0 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "white",
    color: "#007BFF",
    fontWeight: "bold",
    transition: "background-color 0.3s, color 0.3s",
  },
  activeButton: {
    padding: "10px 20px",
    margin: "0 10px",
    borderBottom: "2px solid #007BFF",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    borderRadius: "4px",
    cursor: "pointer",
    // backgroundColor: "#007BFF",
    color: "#007BFF",
    fontWeight: "bold",
    transition: "background-color 0.3s, color 0.3s",
  },
  section: {
    marginBottom: "20px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "24px",
    marginBottom: "10px",
    borderBottom: "2px solid #007BFF",
    paddingBottom: "5px",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    width: "100%",
  },
  title: {
    fontSize: "30px",
    marginBottom: "20px",
    borderBottom: "2px solid #007BFF",
    paddingBottom: "10px",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  label: {
    fontWeight: "bold",
    marginRight: "10px",
    color: "#333",
    fontSize: "18px",
  },
  value: {
    flexGrow: 1,
    textAlign: "right",
    color: "#555",
    fontSize: "18px",
  },
};

export default Profile;
