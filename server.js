const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const userRouts = require('./routes/userRouter');
const GoogleLogInRouts = require('./routes/GoogleLogInRouter');
const itemRouts = require('./routes/itemRouter');
const notFoundHandler = require('./middleware/404');
const dbURI = process.env.MONGODB
const errorHandler = require('./middleware/500')
const Protected = require('./middleware/Protected')
const forgetRouts = require('./routes/forgetRouter');
const relatedItemsRouts = require('./routes/relatedItemRouter');
const app = express();
app.use(cors());

const path = require("path");
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(userRouts);
app.use(GoogleLogInRouts);
app.use(itemRouts);
app.use(forgetRouts);
app.use(relatedItemsRouts);
app.use('*',notFoundHandler);
app.use(errorHandler);
app.use(Protected)


module.exports = {
  server: app,
  start: () => {
    mongoose
      .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Starting server on port ${PORT}`);
        });
      });
  },
};