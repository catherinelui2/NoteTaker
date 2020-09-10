const path = require("path");

module.exports = function(app){
    //getting the note.html file 
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "./notes.html"));
    });
    //getting the index file and if you put any name that doesn't exist it will redirect to index
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "./index.html"));
    });
}