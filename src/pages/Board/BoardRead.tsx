import React, { useEffect, useState } from "react";
import GlobalBar from "../Global/GlobalBar";
import GlobalSideBar from "../Global/GlobalSideBar";
import Card from "../../components/Card";
import { ReadAPI } from "../api/BoardApi";
import { useSearchParams } from "react-router-dom";
import logo from "../../assets/img/panda_logo.png";

interface CardType {
  readonly id: string;
  readonly identifier_id: string;
  readonly category: string;
  readonly content: string;
  readonly title: string;
  readonly nickname: string;
  readonly comments: CommentType[];
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly deleted_at?: Date | null;
}

interface CommentType {
  readonly id: string;
  readonly board_id: string;
  readonly content: string;
  readonly nickname: string;
  readonly category: string;
  readonly replies: ReplyType[];
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly deleted_at: null | Date;
}

interface ReplyType {
  readonly id: string;
  readonly comment_id: string;
  readonly content: string;
  readonly nickname: string;
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly deleted_at: null;
}

const Reply = (re: ReplyType) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isCommentHovered, setIsCommentHovered] = useState<boolean>(false);
  const [isCancelHovered, setIsCancelHovered] = useState<boolean>(false);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          fontFamily: "Arial, sans-serif",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "18px" }}>
            <img
              src={logo}
              alt={`${re.nickname}'s avatar`}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "30%",
              }}
            />
          </div>
          <div style={{ fontWeight: "bold", color: "#333" }}>{re.nickname}</div>
        </div>
        <div
          style={{
            backgroundColor: isHovered ? "#f0f0f0" : "white",
            borderRadius: "10px",
            padding: "8px",
            width: "100%",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={{ marginTop: "4px" }}>{re.content}</div>
        </div>
      </div>
    </>
  );
};

const Comment = (co: CommentType) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "18px" }}>
            <img
              src={logo}
              alt={`${co.nickname}'s avatar`}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "30%",
              }}
            />
          </div>
          <div style={{ fontWeight: "bold", color: "#333" }}>{co.nickname}</div>
        </div>
        <div
          style={{
            backgroundColor: isHovered ? "#f0f0f0" : "white",
            borderRadius: "10px",
            padding: "8px",
            width: "100%",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={{ marginTop: "4px" }}>{co.content}</div>
        </div>
      </div>
    </>
  );
};
const BoardRead = () => {
  const [params, setParams] = useSearchParams();
  const [board, setBoard] = useState<CardType>({
    id: params.get("id") as string,
    identifier_id: "",
    category: "",
    content: params.get("content") as string,
    title: params.get("title") as string,
    nickname: "",
    comments: [],
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  });

  useEffect(() => {
    const ID: string = board.id;
    const TITLE: string = board.title;

    ReadAPI({
      id: ID,
      title: TITLE,
    })
      .then((res) => {
        const response = res.data.response;

        console.log("response : ", response);
        setBoard(response);
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    console.log("board : ", board);
  }, [board]);

  const renderComments = (comments: CommentType[]) => {
    return (
      <div>
        {comments.map((co) => {
          return (
            <>
              <Comment
                id={co.id}
                board_id={co.board_id}
                content={co.content}
                nickname={co.nickname}
                category={co.category}
                replies={co.replies}
                created_at={co.created_at}
                updated_at={co.updated_at}
                deleted_at={co.deleted_at}
              />
              <div style={{ marginLeft: "40px" }}>
                {co.replies.length > 0 ? renderReplies(co.replies) : []}
              </div>
            </>
          );
        })}
      </div>
    );
  };
  const renderReplies = (replies: ReplyType[]) => {
    return (
      <div>
        {replies.map((re) => (
          <Reply
            id={re.id}
            comment_id={re.comment_id}
            content={re.content}
            nickname={re.nickname}
            created_at={re.created_at}
            updated_at={re.updated_at}
            deleted_at={re.deleted_at}
          />
        ))}
      </div>
    );
  };
  return (
    <>
      <GlobalBar />
      <div style={{ display: "flex" }}>
        <GlobalSideBar />
        <div>
          <Card
            id={board.id}
            category={board.category}
            title={board.title}
            nickname={board.nickname}
            createdAt={board.created_at}
            content={board.content}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              margin: "10px",
            }}
          >
            <textarea
              style={{
                width: "100%",
                padding: "8px",
                border: "3px solid #ccc",
                borderRadius: "14px",
                resize: "vertical",
                boxSizing: "border-box",
              }}
            ></textarea>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <button
                style={{
                  padding: "6px 12px",
                  marginLeft: "5px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  backgroundColor: "#f5f5f5",
                  color: "#333",
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: "6px 12px",
                  marginLeft: "5px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  backgroundColor: "#007BFF",
                  color: "white",
                }}
              >
                Comment
              </button>
            </div>
          </div>
          {board.comments?.length > 0 ? renderComments(board.comments) : []}
        </div>
      </div>
    </>
  );
};
export default BoardRead;
