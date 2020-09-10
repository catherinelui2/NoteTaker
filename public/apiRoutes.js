const path = require("path");
const fs = require("fs");

let noteData = [];

module.exports = function (app) {
    app.get("/api/notes", function (err, res) {
        try {
            //read existing db file before rendering
            noteData = fs.readFileSync("./db/db.json", "utf8");
            //parse noteData to turn it into an array of objects
            noteData = JSON.parse(noteData);
        } catch (err) {
            console.log("\n error (in app.get.catch):");
            console.log("err");
        }
        //return objects to the broswer
        res.json(noteData);
    });

    //post a new object to db.json file
    app.post("/api/notes", function (req, res) {
        try {
            //asking the server to read json file
            noteData = fs.readFileSync("./db/db.json", "utf8");
            console.log(noteData);

            //parse the data to get an array of objects
            noteData = JSON.parse(noteData);
            //set id for each entry
            req.body.id = noteData.length;
            //push user input to the arrary
            noteData.push(req.body);
            //stringify before writting it to the JSON file
            noteData = JSON.stringify(noteData);
            //write the new note to the file
            fs.writeFile("./db/db.json", noteData, "utf8", function(err) {
                if (err) throw err;
            });
            //change to to an array of objects and render it to the broswer
            res.json(JSON.parse(noteData));
        } catch (err) {
            throw err;
            console.log(err);
        }
    });

    // to allow user to delete a note by id
    app.delete("/api/notes/:id", function (req, res) {
        try {
            noteData = fs.readFileSync("./db/db.json", "utf8");

            noteData = JSON.parse(noteData);
            noteData = noteData.filter(function (note) {
                return note.id != req.params.id;
            });

            noteData = JSON.stringify(noteData);

            fs.writeFile("./db/db.json", noteData, "utf8", function (err) {
                if (err) throw err;
            });

            res.send(JSON.parse(noteData));
        } catch (err) {
            throw err;
            console.log(err);
        }
    });
};
