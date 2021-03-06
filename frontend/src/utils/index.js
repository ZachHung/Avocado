import axios from "axios";

export const currentChange = (price) => {
  price = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
  return price;
};
export function isValid(str) {
  if (!str) {
    return false;
  }
  str = str.replace(/^0+/, "") || "0";
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n > 0;
}
export const Request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
