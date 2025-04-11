import { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, Grid, Box, Dialog, DialogTitle, DialogContent} from "@mui/material";
import { marked } from "marked";
import { useNavigate } from "react-router-dom";


const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [openPost, setOpenPost] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/posts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Lỗi khi lấy danh sách bài viết");
        }
      } catch (error) {
        console.error("Lỗi kết nối đến API", error);
      }
    };
    fetchPosts();
  }, []);

  const handleOpenPost = (post) => {
    setOpenPost(post);
  };

  const handleClosePost = () => {
    setOpenPost(null);
  };
const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
const postsPerPage = 4;
const [currentPage, setCurrentPage] = useState(1);

const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

const handlePageChange = (newPage) => {
  if (newPage > 0 && newPage <= totalPages) {
    setCurrentPage(newPage);
  }
};



  return (
    <Container maxWidth={false} className="my-0">
      <Typography variant="h2" className="!mb-10 text-center text-xl text-blue-600 !font-bold">
        Trang Blog
      </Typography>
      <Grid container spacing={4} className="mb-8">
        {currentPosts.map((post, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              className="shadow-md hover:shadow-xl transition-shadow duration-300"
              sx={{
                borderRadius: "15px",
                overflow: "hidden",
                cursor: "pointer",
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              onClick={() => handleOpenPost(post)}
            >
              {post.imageUrl && (
                <Box
                  sx={{
                    width: "100%",
                    height: "200px",
                    display: "flex",
                    overflow: "hidden",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <img
                    src={`http://localhost:8080/images/${post.imageUrl}`}
                    alt="Post"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                </Box>
              )}
              <CardContent>
                <Typography variant="h5" className="!font-bold text-[#000000] font-[Poppins]"> {post.title} </Typography>
                <Typography variant="body2" color="textSecondary">
                🕒 {new Date(post.createdAt).toLocaleString("vi-VN")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div className="flex justify-center space-x-4 my-5">
         <button
          className="px-4 py-2 bg-gray-500 text-white  rounded-md hover:bg-gray-400"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          >
          Trang trước
        </button>
      <span className="text-lg font-bold">{currentPage} / {totalPages}</span>

      <button
        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-400"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >Trang sau</button> </div>


      {
        posts.length === 0 && (
          <Typography variant="h6" color="textSecondary" className="text-center mt-10">
            Chưa có bài viết nào!
          </Typography>
        )
      }


      <Dialog open={!!openPost} onClose={handleClosePost} maxWidth="md" fullWidth>
        {openPost && (
          <>
            <DialogTitle>
              {openPost.title}
              <Typography variant="body2" color="textSecondary">
                🕒 {new Date(openPost.createdAt).toLocaleString("vi-VN")}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <div dangerouslySetInnerHTML={{ __html: marked(openPost.content) }} />
            </DialogContent>
          </>
        )}
      </Dialog>
      <div className="text-center my-10">
        <button
          className="px-10 py-2 bg-blue-700 text-xl text-white rounded-md hover:bg-blue-500 cursor-pointer font-bold"
          onClick={() => navigate("/")}
        >
          Trở về
        </button>
      </div>

    </Container >
  );
};

export default BlogPosts;
