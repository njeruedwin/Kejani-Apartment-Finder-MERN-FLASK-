const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//import routes
const adminSignInRoute = require("./routes/api/adminsignin");
const housingCooperatveSignInRoute = require("./routes/api/housingcooperativesignin");
const customerSignUpRoute = require("./routes/api/customersignup");
const customerSignInRoute = require("./routes/api/customersignin");
const createAdminRoute = require("./routes/api/createadmin");
const verifyRoute = require("./routes/api/verify");
const logOutRoute = require("./routes/api/logout");
const addHousingCooperativeRoute = require("./routes/api/addHousingCooperative");
const getHousingCooperativesRoute = require("./routes/api/getHousingCooperatives");
const postRoomRoute = require("./routes/api/postRoom");
const getSpecificRoomsRoute = require("./routes/api/getspecificrooms");
const getRoomsRoute = require("./routes/api/getRooms");
const deleteRoomRoute = require("./routes/api/deleteRoom");
const addUserCommentRoute = require("./routes/api/addUserComment");
const addAnalysisRoute = require("./routes/api/addAnalysis");
const getWaterAnalysisRoute = require("./routes/api/getwateranalysis");
const getElectricityAnalysisRoute = require("./routes/api/getelectricityanalysis");
const { verify } = require("jsonwebtoken");

//set routes
app.use("/api/admin/createadmin", createAdminRoute);
app.use("/api/admin/adminsignin", adminSignInRoute);
app.use("/api/admin/housingcooperativesignin", housingCooperatveSignInRoute);
app.use("/api/admin/customersignup", customerSignUpRoute);
app.use("/api/admin/customersignin", customerSignInRoute);
app.use("/api/admin/logout", logOutRoute);
app.use("/api/admin/verify", verifyRoute);
app.use("/api/admin/addhousingcooperative", addHousingCooperativeRoute);
app.use("/api/admin/gethousingcooperatives", getHousingCooperativesRoute);
app.use("/api/admin/postroom", postRoomRoute);
app.use("/api/admin/getrooms", getRoomsRoute);
app.use("/api/admin/getspecificrooms", getSpecificRoomsRoute);
app.use("/api/admin/deleteroom", deleteRoomRoute);
app.use("/api/admin/addusercomment", addUserCommentRoute);
app.use("/api/admin/addanalysis", addAnalysisRoute);
app.use("/api/admin/getwateranalysis", getWaterAnalysisRoute);
app.use("/api/admin/getelectricityanalysis", getElectricityAnalysisRoute);

//connect to the database
mongoose.connect(
  "mongodb://localhost/kejaniwebapp",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Successfuly conneted to mongoDB");
  }
);

//listen to port
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
