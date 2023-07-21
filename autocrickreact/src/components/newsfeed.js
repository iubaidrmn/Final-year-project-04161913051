import React, { Component } from "react";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import { FaUserCircle } from "react-icons/fa";
import { getPosts } from "../services/api";
import moment from "moment";

export default class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  async componentDidMount() {
    try {
      const posts = await getPosts();
      this.setState({ posts });
    } catch (error) {}
  }

  render() {
    const { posts, userNames } = this.state;
    return (
      <div>
        <HeaderBar />
        <div style={styles.container}>
          <Sidebar />
          <div style={styles.containerMain}>
            <div className="news-feed">
              <div className="content">
                <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
                  News Feeds
                </h1>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {posts.map((post, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "#FFFFFF",
                        padding: "20px",
                        boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
                        borderRadius: "10px",
                        marginBottom: "20px",
                        width: "100%",
                        maxWidth: "500px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "10px",
                          }}
                        >
						{post.user_profile_picture !== null ? 
							<img style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                            }} src={`${post.user_profile_picture.substring(post.user_profile_picture.lastIndexOf("posts/"))}`} alt="Profile" />
						:
                          <FaUserCircle
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                            }}
                          />
						}
                        </div>
                        <div>
                          <h2
                            style={{
                              fontWeight: "bold",
                              fontSize: "20px",
                              margin: 0,
                            }}
                          >
							{post.created_by}
                          </h2>
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#888",
                              margin: 0,
                            }}
                          >
                            {moment(post.created_at).format(
                              "MMMM DD, YYYY h:mm A"
                            )}
                          </p>
                        </div>
                      </div>
                      <h4
                        style={{
                          fontWeight: "bold",
                          fontSize: "20px",
                          margin: 0,
                        }}
                      >
                        {post.title}
                      </h4>
                      {post.description && (
                        <div>
                          <p>{post.description}</p>
                        </div>
                      )}
                      {post.file_path && post.file_path.length > 0 && (
                        <div>
                          {(() => {
                            post.file_path = post.file_path.substring(
                              post.file_path.lastIndexOf("posts/")
                            );
                            if (
                              post.file_path.endsWith(".png") ||
                              post.file_path.endsWith(".jpg") ||
                              post.file_path.endsWith(".jpeg")
                            ) {
                              return (
                                <img
                                  style={{
                                    width: "100%",
                                    height: "auto",
                                    marginBottom: "10px",
                                    borderRadius: "5px",
                                  }}
                                  src={`${post.file_path}`}
                                  alt="Newsfeed"
                                />
                              );
                            } else if (post.file_path.endsWith(".mp4")) {
                              return (
                                <video
                                  style={{
                                    width: "100%",
                                    height: "auto",
                                    marginBottom: "10px",
                                    borderRadius: "5px",
                                  }}
                                  controls
                                >
                                  <source
                                    src={`${post.file_path}`}
                                    type="video/mp4"
                                  />
                                </video>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  containerMain: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};
