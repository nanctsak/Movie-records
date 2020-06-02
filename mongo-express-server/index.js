var express = require("express");
var cors = require("cors");
var mongoose = require('mongoose')
const bodyParser = require("body-parser");
mongoose.connect('mongodb://localhost:27017/node-api-01', { useNewUrlParser: true })
// สร้าง express เพื่อทำ path
var app = express();

// ทำให้ดึง uri ไปใช้งานได้
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// สร้าง server port
var port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log("[success] task 1 : listening on port " + port);
});

// ข้อความสำหรับ path หน้าแรกของ express เรา (localhost:9000/)
app.get("/", (req, res) => {
  res.status(200).send("หน้าแรกของ api express");
});

// path สำหรับ MongoDB ของเรา
var Movie = require("./movierouter");
app.use("/api/movie", Movie);



// ข้อความสำหรับใส่ path ผิด (localhost:9000/asdfghjkl;)
app.use((req, res, next) => {
  var err = new Error("ไม่พบ path ที่คุณต้องการ");
  err.status = 404;
  next(err);
});

// // สร้าง database schema
// const Cat = mongoose.model('Cat', { name: String })

// // สร้าง instance จาก model
// const kitty = new Cat({ name: 'JavaScript' })

// // save ลง database (return เป็น Promise)
// kitty.save().then(() => console.log('meow'))