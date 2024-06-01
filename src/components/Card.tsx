import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/panda_logo.png";
import {
  ReactionAPI,
  ReactionCountAPI,
  ReactionListAPI,
  ReactionParams,
} from "../pages/api/ReactionApi";
import {
  BoardProps,
  ReactionStateTypes,
  ReactionType,
} from "../_common/CollectionTypes";
import Slider from "react-slick";
import YouTube from "react-youtube";

const getYouTubeVideoId = ({ url }: { readonly url: string }): string => {
  try {
    const urlObj: URL = new URL(url);

    return urlObj.searchParams.get("v") || "";
  } catch (e) {
    console.error("Invalid URL", e);
    return "";
  }
};

const Card = ({
  id,
  category,
  content,
  createdAt,
  nickname,
  title,
  type,
}: BoardProps) => {
  const navigate = useNavigate();
  const [isCardCount, setIsCardCount] = useState<number>(0);
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);
  const [isCardUpHovered, setIsCardUpHovered] = useState<boolean>(false);
  const [isCardDownHovered, setIsCardDownHovered] = useState<boolean>(false);
  const [isCardCommentHovered, setIsCardCommentHovered] =
    useState<boolean>(false);
  const [isCardShareHovered, setIsCardShareHovered] = useState<boolean>(false);
  const [isCardSendHovered, setIsCardSendHovered] = useState<boolean>(false);

  const [isReaction, setIsReaction] = useState<ReactionStateTypes>(null);

  const USER_ID: string = localStorage.getItem("id") as string;
  const reactionButton = async (type: ReactionStateTypes) => {
    if (type !== null) {
      const param: ReactionParams = {
        boardId: id,
        userId: USER_ID,
        type,
        reactionTarget: "BOARD",
      };
      ReactionAPI(param)
        .then((res) => {
          const status: number = res.status;

          const type = res.data.response?.type;
          console.log("ReactionAPI type : ", type);

          if (type === undefined) setIsReaction(null);
          if (type === "LIKE") setIsReaction("LIKE");
          if (type === "DISLIKE") setIsReaction("DISLIKE");
        })
        .catch((err) => console.error(err));
    }
  };

  const goBoardRead = () =>
    navigate(`/boards/read?id=${id}&title=${title}&content=${content}`);

  useEffect(() => {
    ReactionListAPI({ boardId: id }).then((res) => {
      const response = res.data.response;
      // console.log("response : ", response);

      response.forEach((el: ReactionType) => {
        if (USER_ID === el.user_id) {
          setIsReaction(el.type);
        }
      });
    });

    ReactionCountAPI({
      boardId: id,
    }).then((res) => {
      const resCount = res.data.response;
      // console.log("ReactionCountAPI resCount : ", resCount.count);

      setIsCardCount(resCount.count);
    });
  }, [isReaction]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "800px",
          minHeight: "200px",
          margin: "10px",
          borderRadius: "10px",
          cursor: "pointer",
          backgroundColor: isCardHovered ? "#f0f0f0" : "white",
        }}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        {/* Card Image */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            padding: "10px",
          }}
        >
          <img
            src={logo}
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              marginRight: "10px", // 이미지와 닉네임 사이의 간격
              borderRadius: "30px",
            }}
          />

          <div
            style={{ fontSize: "15px" }}
            onClick={() => navigate(`/users/inquiry?nickname=${nickname}`)}
          >
            {nickname}
          </div>
        </div>

        {/* Card Content */}
        <div
          style={{
            width: "100%",
            overflow: "visible",
          }}
        >
          <h3
            style={{
              fontWeight: "bold",
              textAlign: "left",
              whiteSpace: "normal",
              fontSize: "30px",
            }}
            onClick={goBoardRead}
          >
            {title}
          </h3>

          {type === "TEXT" ? (
            <p
              style={{
                textAlign: "left",
                whiteSpace: "normal",
                wordBreak: "break-word",
                width: "100%",
                fontSize: "20px",
              }}
            >
              <div>
                {content.map((co, index) => (
                  <>
                    {/*<div dangerouslySetInnerHTML={}>{co}</div>*/}
                    <div dangerouslySetInnerHTML={{ __html: co }} />
                  </>
                ))}
              </div>
            </p>
          ) : type === "MEDIA" ? (
            <Slider
              {...{
                dots: true,
                infinite: content.length > 1,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
              }}
            >
              {content.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Preview image ${index}`}
                    style={{ height: "400px", width: "400px" }}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <>
              {content.map((video: string) => (
                <div key={id}>
                  {video && (
                    <YouTube videoId={getYouTubeVideoId({ url: video })} />
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "800px",
        }}
      >
        <div
          style={{
            backgroundColor:
              isReaction === null
                ? "#e0e0e0"
                : isReaction === "LIKE"
                  ? "red"
                  : "blue",
            padding: "10px",
            marginRight: "10px",
            borderRadius: "20px",
          }}
        >
          <button
            onMouseEnter={() => setIsCardUpHovered(true)}
            onMouseLeave={() => setIsCardUpHovered(false)}
            style={{
              borderColor: isCardUpHovered ? "red" : "#e0e0e0",
              backgroundColor: isCardUpHovered ? "#c9c6c5" : "#e0e0e0",
              // border: "none",
              width: "65px",
              height: "30px",
              borderRadius: "30px",
            }}
            onClick={() => reactionButton("LIKE")}
          >
            좋아요
          </button>
          <span style={{ margin: "10px", width: "10px", height: "10px" }}>
            {isCardCount}
          </span>
          <button
            onMouseEnter={() => setIsCardDownHovered(true)}
            onMouseLeave={() => setIsCardDownHovered(false)}
            style={{
              borderColor: isCardDownHovered ? "blue" : "#e0e0e0",
              backgroundColor: isCardDownHovered ? "#c9c6c5" : "#e0e0e0",
              // border: "none",
              width: "65px",
              height: "30px",
              borderRadius: "30px",
            }}
            onClick={() => reactionButton("DISLIKE")}
          >
            싫어요
          </button>
        </div>
        <div
          style={{
            marginRight: "10px",
            borderRadius: "30px",
            width: "75px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            onMouseEnter={() => setIsCardCommentHovered(true)}
            onMouseLeave={() => setIsCardCommentHovered(false)}
            style={{
              backgroundColor: isCardCommentHovered ? "#c9c6c5" : "#e0e0e0",
              border: "none",
              height: "100%",
              width: "100%",
              borderRadius: "30px",
            }}
            onClick={goBoardRead}
          >
            댓글
          </button>
        </div>
        <div
          style={{
            marginRight: "10px",
            borderRadius: "30px",
            width: "75px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            onMouseEnter={() => setIsCardShareHovered(true)}
            onMouseLeave={() => setIsCardShareHovered(false)}
            style={{
              backgroundColor: isCardShareHovered ? "#c9c6c5" : "#e0e0e0",
              border: "none",
              height: "100%",
              width: "100%",
              borderRadius: "30px",
            }}
          >
            공유
          </button>
        </div>
        <div
          style={{
            marginRight: "10px",
            borderRadius: "30px",
            width: "75px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            onMouseEnter={() => setIsCardSendHovered(true)}
            onMouseLeave={() => setIsCardSendHovered(false)}
            style={{
              backgroundColor: isCardSendHovered ? "#c9c6c5" : "#e0e0e0",
              border: "none",
              height: "100%",
              width: "100%",
              borderRadius: "30px",
            }}
          >
            보내기
          </button>
        </div>
      </div>
      <hr
        style={{
          border: "none",
          height: "2px",
          backgroundColor: "#f0f0f0",
          margin: "16px 0",
          width: "800px",
        }}
      />
    </>
  );
};

export default Card;
