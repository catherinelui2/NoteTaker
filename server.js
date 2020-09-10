const express = require("express");
const fs = require("fs");
const path = require("path");

const app= express();
const PORT = process.env.PORT || 8080;

//middleware functions to ask server to translate the data back as json. 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//letting the express server know I need to get all the files in public. 
app.use(express.static("public"));
//requiring the routes js
require("./public/apiRoutes")(app);
require("./public/htmlRoutes")(app);

//creating that port for this server
app.listen(PORT, function () {
    console.log("App listening on Port: " + PORT);
});