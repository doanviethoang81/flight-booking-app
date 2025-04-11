import axios from "axios";

const TOKEN_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";
const CLIENT_ID = "46PRRIGypYPwTRIMvzu3GiXh9DZFbA0r";
const CLIENT_SECRET = "gT1vx8QaEX6ftSmq";

const axiosClient = axios.create({
  baseURL: "https://test.api.amadeus.com",
  headers: { "Content-Type": "application/json" },
});

// Hàm lấy token mới
const fetchToken = async () => {
  try {
    const response = await axios.post(
      TOKEN_URL,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const data = response.data;

    if (data.access_token) {
      const expiresAt = Date.now() + (data.expires_in - 60) * 1000; // Giảm 60s để tránh lỗi token hết hạn bất ngờ
      localStorage.setItem("api_token", data.access_token);
      localStorage.setItem("token_expires_at", expiresAt);
      return data.access_token;
    }
  } catch (error) {
    console.error("Lỗi khi lấy token:", error);
    return null;
  }
};

// Hàm kiểm tra token còn hạn hay không
const getToken = async () => {
  const token = localStorage.getItem("api_token");
  const expiresAt = localStorage.getItem("token_expires_at");

  if (token && expiresAt && Date.now() < expiresAt) {
    return token; // Token còn hạn, trả về luôn
  }

  return await fetchToken(); // Token hết hạn, lấy mới
};

// Interceptor để thêm token vào request
axiosClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor để xử lý lỗi 401 (token hết hạn)
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const newToken = await fetchToken();
      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axiosClient(error.config); // Gọi lại request bị lỗi
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
