const Products = require("../models/Products");
const Addresss = require("../address.json");
const Orders = require("../models/Orders");
const CryptoJS = require("crypto-js");
const moment = require("moment");
const nodemailer = require("nodemailer");
require("dotenv").config();
const sender = process.env.EMAIL;
const password = process.env.PASSWORD;
let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secureConnection: false,
  auth: {
    user: `${sender}`, // generated ethereal user
    pass: `${password}`, // generated ethereal password
  },
  tls: {
    ciphers: "SSLv3",
  },
});
function sendMail(desMail, Message, subject = "Chào Mừng Đến Với Avacado") {
  transporter.sendMail({
    from: `${sender}`, // sender address
    to: `${desMail}`, // list of receivers
    subject: `${subject}`, // Subject line
    text: `${Message}`, // plain text body
  });
}

function route(app) {
  app.post("/api/email", (req, res) => {
    sendMail(
      req.body.email,
      "Avocado đã nhận được yêu cầu của bạn. Chúng tôi rất hân hạnh được đồng hành cùng với bạn"
    );
    res.status(200).json({
      message: "success",
    });
  });
  app.get("/api/product", (req, res, next) => {
    Products.find({})
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  });
  app.get("/api/product/:id", (req, res, next) => {
    Products.findById(req.params.id)
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  });
  app.post("/api/order", (req, res, next) => {
    const { products, ...rest } = req.body;
    let data = {};
    data.customerInfo = { ...rest };
    data.products = products;
    if (!data.customerInfo || !data.products)
      res.status(500).json("Saved Failed");
    else {
      const newOrder = new Orders(data);
      newOrder.save();
      sendMail(
        req.body.email,
        `
       Avocado Cảm Ơn Bạn Đã Mua Sản Phẩm Của Chúng Tôi.
       Thông Tin Hóa Đơn:
       Họ và Tên: ${req.body.name}
       Số Điện thoại: ${req.body.phoneNumber}
       Email: ${req.body.email}
       Địa Chỉ Nhận Hàng: ${req.body.addressdetail}, ${req.body.ward}, ${req.body.district}, ${req.body.province}
       Tổng Thanh Toán: ${req.body.Total}
      `,
        "Xác Nhận Đơn Hàng"
      );
      res.json("Saved Successful");
    }
  });

  app.post("/api/vnpay-create-payment-url", (req, res, next) => {
    console.log(req.body);
    var ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    var tmnCode = process.env.vnp_TmnCode;
    var secretKey = process.env.vnp_HashSecret;
    var vnpUrl = process.env.vnp_Url;
    var returnUrl = process.env.vnp_ReturnUrl;

    var date = new Date();

    var createDate = moment(date).format("YYYYMMDDHHmmss");
    var orderId = moment(date).format("HHmmss");

    var amount = req.body.amount;
    var bankCode = req.body.bankCode;
    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if (!locale) locale = "vn";
    var currCode = "VND";

    var vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode) vnp_Params["vnp_BankCode"] = bankCode;

    vnp_Params = sortObject(vnp_Params);

    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var signed = CryptoJS.HmacSHA512(signData, secretKey).toString(
      CryptoJS.enc.Hex
    );
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

    res.json(vnpUrl);
  });

  app.get("/api/vnpay-return", (req, res, next) => {
    console.log(req.body);
    var vnp_Params = req.query;

    var secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    var secretKey = process.env.vnp_HashSecret;

    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var signed = CryptoJS.HmacSHA512(signData, secretKey).toString(
      CryptoJS.enc.Hex
    );

    if (secureHash === signed) {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

      res
        .status(200)
        .json({ message: "Success", code: vnp_Params["vnp_ResponseCode"] });
    } else {
      res.status(200).json({ message: "Fail checksum", code: "97" });
    }
  });

  app.get("/api", (req, res) => {
    res.send("API");
  });
}
function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
module.exports = route;
