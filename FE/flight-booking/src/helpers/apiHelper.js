export const formatVND = (amount) => {
  if (amount === undefined || amount === null) {
    return "0";
  }
  return parseInt(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
export const  formatDuration=(duration)=> {
  const match = duration.match(/PT(\d+H)?(\d+M)?/);
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;

  let result = "";
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m`;
  return result.trim();
}
export const formatDate = (date) => {
  if (!date) return "N/A"; // Trả về "N/A" nếu date không hợp lệ
  
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "N/A"; // Kiểm tra giá trị hợp lệ

  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    dateStyle: "full",
  }).format(parsedDate);
};
export const formatDateTime = (date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      dateStyle: "short",
      timeStyle: "short",

    }).format(new Date(date));
  };
  export const formatTime = (time) => {
    return new Intl.DateTimeFormat("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      timeStyle: "short",
    }).format(new Date(time));
  };