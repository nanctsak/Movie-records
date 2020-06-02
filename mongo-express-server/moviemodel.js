var mongoose = require("mongoose");

var movieSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา
    name: {
      type: String
    },
    yearreleased: {
      type: Number
    },
    rating: {
      type: String  
    }
  },
  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "MOVIES"
  }
);

// ถ้าไม่ได้กำหนด collection ข้างบน default จะเป็น "foods"
var Movie = mongoose.model("movies", movieSchema);
module.exports = Movie;