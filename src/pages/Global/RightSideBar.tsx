import React, { useEffect, useState } from "react";
import { AddSearchAPI, GetTopTenSearchesAPI } from "../api/SearchApi";
import { useNavigate } from "react-router-dom";
import { GetRecentViewedBoardsAPI } from "../api/ViewedBoardsApi";

type SelectTapTypes = "topSearches" | "recentBoards";

type RecentViewedPost = {
  id: string;
  title: string;
};

const RightSideBar = () => {
  const [isTopTenList, setIsTopTenList] = useState([]);
  const [recentViewedList, setRecentViewedList] = useState<RecentViewedPost[]>([]); // State for recent viewed posts with type
  const [selectedTab, setSelectedTab] = useState<SelectTapTypes>("topSearches");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredRecentPostIndex, setHoveredRecentPostIndex] = useState<number | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate
  const isLoggedIn = !!localStorage.getItem("access_token");

  useEffect(() => {
    const fetchTopTenList = async (): Promise<void> => {
      const res = await GetTopTenSearchesAPI();

      if (!res) return;
      const response = res.data.response;
      console.log("response ; ", response);

      setIsTopTenList(response);
    };
    fetchTopTenList();
  }, []);

  useEffect(() => {
    if (selectedTab === "topSearches") {
      const fetchTopTenList = async (): Promise<void> => {
        const res = await GetTopTenSearchesAPI();

        if (!res) return;
        const response = res.data.response;
        console.log("response ; ", response);

        setIsTopTenList(response);
      };
      fetchTopTenList();
    }

    if (selectedTab === "recentBoards" && isLoggedIn) {
      const recentBoardList = async (): Promise<void> => {
        const res = await GetRecentViewedBoardsAPI({
          userId: localStorage.getItem("id") as string,
        });

        if (!res) return;
        const response = res.data.response;
        console.log("response : ", response);

        setRecentViewedList(response); // Update the recent viewed posts state
      };
      recentBoardList();
    }
  }, [selectedTab, isLoggedIn]);

  const handleSearchClick = async (query: string) => {
    await AddSearchAPI({ query });
    navigate(`/search/list?query=${query}`);
  };

  const handleTabClick = (tab: SelectTapTypes) => {
    if (tab === "recentBoards" && !isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }
    setSelectedTab(tab);
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabs}>
        <div
          style={selectedTab === "topSearches" ? styles.activeTab : styles.tab}
          onClick={() => setSelectedTab("topSearches")}
        >
          실시간 검색어
        </div>
        <div
          style={selectedTab === "recentBoards" ? styles.activeTab : styles.tab}
          onClick={() => handleTabClick("recentBoards")}
        >
          최근 본 게시물
        </div>
      </div>
      {selectedTab === "topSearches" ? (
        <div>
          <h3 style={styles.header}>실시간 검색어 TOP 10</h3>
          <ol style={styles.list}>
            {isTopTenList.length > 0 ? (
              isTopTenList.map(
                (
                  search: { readonly query: string; readonly count: number },
                  index: number,
                ) => (
                  <li
                    key={index}
                    style={
                      hoveredIndex === index
                        ? styles.hoveredListItem
                        : styles.listItem
                    }
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleSearchClick(search.query)} // Add onClick event
                  >
                    <div>
                      <span style={styles.rank}>{index + 1}</span>
                      <span style={styles.query}>{search.query}</span>
                    </div>
                    <div style={styles.details}>
                      <span style={styles.count}>{search.count}</span>
                      {/* <span style={styles.source}>{search.source}</span> */}
                    </div>
                  </li>
                ),
              )
            ) : (
              <p>데이터를 불러오는 중...</p>
            )}
          </ol>
        </div>
      ) : (
        isLoggedIn && (
          <div>
            <h3 style={styles.header}>최근 본 게시물</h3>
            <ul style={styles.list}>
              {recentViewedList.length > 0 ? (
                recentViewedList.map((post, index) => (
                  <li
                    key={post.id}
                    style={
                      hoveredRecentPostIndex === index
                        ? styles.hoveredListItem
                        : styles.listItem
                    }
                    onMouseEnter={() => setHoveredRecentPostIndex(index)}
                    onMouseLeave={() => setHoveredRecentPostIndex(null)}
                  >
                    <a
                      href={`/boards/read?id=${post.id}&title=${post.title}`}
                      style={styles.link}
                    >
                      {post.title}
                    </a>
                  </li>
                ))
              ) : (
                <p>최근 본 게시물이 없습니다.</p>
              )}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "250px",
    padding: "20px",
    background: "#fff",
    border: "1px solid #ddd",
    borderTop: "none",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    height: "100vh",
    overflowY: "auto" as "auto",
  },
  tabs: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#f0f0f0",
    fontWeight: "bold" as "bold",
    marginRight: "10px", // Added marginRight to create space between tabs
    fontSize: "14px", // Reduced font size
  },
  activeTab: {
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "8px",
    border: "1px solid #0079D3",
    background: "#0079D3",
    color: "#fff",
    fontWeight: "bold" as "bold",
    fontSize: "14px", // Reduced font size
  },
  header: {
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  list: {
    listStyleType: "none" as "none",
    padding: "0",
    margin: "0",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #f0f0f0",
    background: "white",
    color: "black",
  },
  hoveredListItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #f0f0f0",
    background: "#f0f0f0",
    color: "black",
    borderRadius: "15px",
  },
  rank: {
    fontSize: "18px",
    fontWeight: "bold" as "bold",
    color: "#333",
    marginRight: "15px", // Add margin to create space between rank and query
  },
  query: {
    fontSize: "16px",
    color: "#333",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "5px",
    fontSize: "14px",
    color: "#666",
  },
  count: {
    marginRight: "10px",
    fontWeight: "bold" as "bold",
  },
  source: {
    fontStyle: "italic",
  },
  link: {
    fontSize: "16px",
    color: "#333", // Match the text color with query
    textDecoration: "none" as "none",
  },
};

export default RightSideBar;
