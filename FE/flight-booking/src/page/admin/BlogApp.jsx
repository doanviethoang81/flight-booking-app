import { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Card, CardContent, Grid, Box, Dialog, DialogTitle, DialogContent } from "@mui/material";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { marked } from "marked";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BlogApp = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); 
  const [imagePreview, setImagePreview] = useState(null); 
  const [posts, setPosts] = useState([]);
  const [openPost, setOpenPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/posts");
            if (response.ok) {
                const data = await response.json();
                console.log(" Dữ liệu từ backend:", data); 
                setPosts(data);
            } else {
                console.error(" Lỗi khi lấy danh sách bài viết");
            }
        } catch (error) {
            console.error(" Lỗi kết nối đến API", error);
        }
    };
    fetchPosts();
}, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Tạo URL xem trước ảnh
    }
  };

  const handleSubmit = async () => {
    if (title && content.trim()) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }

      try {
        const response = await fetch("http://localhost:8080/api/v1/posts", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          toast.success(" Bài viết đã được đăng thành công!");
          const newPost = await response.json();
          setPosts((prevPosts) => [newPost, ...prevPosts]);
          setTitle("");
          setContent("");
          setImage(null);
          setImagePreview(null);
        } else {
          toast.error(" Lỗi khi gửi bài viết!");
        }
      } catch (error) {
        toast.error(" Lỗi kết nối đến API!",error);
      }
    } else {
      toast.warn(" Vui lòng nhập tiêu đề và nội dung!");
    }
  };
const handleDeletePost = async (postId) => {
  if (!postId) {
      console.error("Không tìm thấy ID bài viết");
      return;
  }
  
  const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa bài viết này?");
  if (!confirmDelete) return;

  try {
      const response = await fetch(`http://localhost:8080/api/v1/admin/post/${postId}`, {
          method: "DELETE",
      });

      if (response.ok) {
        toast.success(" Bài viết đã được xóa thành công!");
          
          // Cập nhật danh sách bài viết sau khi xóa
          setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
      } else {
          console.error("Lỗi khi xóa bài viết");
      }
  } catch (error) {
      console.error("Lỗi kết nối đến API", error);
  }
};


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
        Quản Lý Blog
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
          <div className="flex justify-end">
              <button className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={(e) => { e.stopPropagation(); handleDeletePost(post.id);}}>
                 Xóa
               </button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
       <div className="flex justify-center space-x-4 my-5">
         <button
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          >
          Trang trước
        </button>
      <span className="text-lg font-bold">{currentPage} / {totalPages}</span>

      <button
        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >Trang sau</button> </div>


      {posts.length === 0 && (
        <Typography variant="h6" color="textSecondary" className="text-center !mt-20 !mb-20">
          Chưa có bài viết nào. Hãy viết bài đầu tiên của bạn!
        </Typography>
      )}

      <Card className="mb-12 shadow-lg" style={{ borderRadius: "20px", overflow: "hidden", backgroundColor: "#ffffff" }}>
        <CardContent>
          <Typography variant="h4" className="!mb-9" style={{ fontFamily: "'Poppins', sans-serif", color: "#8E44AD" }}>Tạo Bài Viết Mới</Typography>

          <TextField
            label="Tiêu đề bài viết"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="!mb-6"
            InputLabelProps={{ style: { color: '#8E44AD' } }}
            InputProps={{ style: { borderRadius: '20px' } }}
          />
            <Box>
        {/* Nút chọn ảnh, căn lề trái */}
      <Box sx={{ textAlign: "left" }}>
        <input
          type="file"
          accept="image/*"
          id="image-upload"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <label htmlFor="image-upload">
          <Button className="!mb-6" variant="contained" component="span" color="primary">
            Thêm ảnh
          </Button>
        </label>
      </Box>

      
      {/* Khu vực xem trước ảnh */}
      {imagePreview && (
          <div className="w-[350px] h-[350px] border border-gray-500 rounded-lg mt-2 mb-5 flex items-center justify-center overflow-hidden">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
          </div>
      )}

    </Box>

      <div className="mb-6 bg-white border p-2 rounded-lg">
          <SimpleMDE value={content} onChange={setContent} />
      </div>
          <div className="mt-6 text-right">
                <button className="bg-purple-700 text-white rounded-[10px] px-4 py-2 text-lg"
                  onClick={handleSubmit}>Đăng Bài</button>
          </div>
        </CardContent>
      </Card>

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
      <ToastContainer />
    </Container>
    
  );
};
export default BlogApp;
