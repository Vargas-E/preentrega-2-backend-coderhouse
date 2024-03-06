const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const PORT = 8080;
const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");
const helper = require("./helpers/helper.js");
const path = require("path");

// app.use(express.static(path.join(__dirname, 'public')));

// initiate db
require("./dababase.js");

// Middlewares
// app.use(express.static("./src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Server init
const httpServer = app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});


// Handlebars config
app.engine("handlebars", exphbs.engine({
  helpers: helper
}));

app.set("view engine", "handlebars");
app.set("views", "src/views");

// Routes
// Se separo el router de vistas de products y de CRUD de products.
app.use("/api/products", productsRouter);

app.use("/api/cart", cartsRouter);
