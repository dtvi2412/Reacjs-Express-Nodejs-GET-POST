var express = require("express");
var router = express.Router();

//PG INSTALL
const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sanpham",
  password: "nao018852952196",
  port: 5432,
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/getData", function (req, res, next) {
  //pg
  pool.query("select * from product_info", (err, responese) => {
    res.setHeader("Access-Control-Allow-Credentials", true);
    if (err) {
      console.log(err);
    } else {
      console.log(responese.rows);
      res.send(responese.rows);
    }

    // pool.end();
  });
});

router.post("/add", function (req, res, next) {
  let product_name = req.body.product_name,
    product_price = req.body.product_price,
    image = req.body.image;
  // let arr = [];
  // arr.product_name = product_name;
  // arr.product_price = product_price;
  // arr.image = image;
  // console.log(arr);
  console.log(product_name, product_price, image);
  pool.query(
    "INSERT INTO PRODUCT_INFO (product_name,product_price,image) values ($1,$2,$3)",
    [product_name, product_price, image],
    (err, response) => {
      if (err) {
        res.send(err);
        console.log("THEM SAI ROI");
      } else {
        res.send(
          "Đã Insert dữ liệu thành công" + product_name + product_price + image
        );
      }
    }
  );
});

module.exports = router;
