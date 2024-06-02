var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sequelize = require("./models/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var categoriesRouter = require("./routes/categories");
var authRouter = require("./routes/auth");
var employeeRouter = require("./routes/employee")

var customerRouter = require("./routes/customer");

var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use("/uploads", express.static("uploads")); 
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/customer", customerRouter);
app.use("/employee", employeeRouter);

app.listen(5000, async () => {
  await sequelize
    .sync({
      force: true,
    })
    .then(() => {
      console.log("Database Connect");
    })
    .catch((err) => {
      console.error("Error synchronizing database:", err);
    });
  console.info("Server Running");
});