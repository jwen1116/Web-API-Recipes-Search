const express = require("express");
const path = require('path');
require('dotenv').config();
const mongoose = require("mongoose");
const routes = require("./routes");
const apiRoutes = require("./routes/apiRoutes");
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({extended: true}));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}


app.use("/api", apiRoutes);
app.use("/api", routes);
app.use(routes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

mongoose.connect("mongodb+srv://jiawen:test@cluster0-0ugv4.mongodb.net/RecipeDb?retryWrites=true&w=majority")
.then(()=> {
    console.log("Connected to db");

})
.catch(()=> {
    console.log("error");
})


app.listen(PORT, function() {
    console.log("Server is listening on PORT: " + PORT);
});