const express = require('express');
const bodyParser = require('body-parser');
const { spawnSync } = require('child_process');
const port = 8080;
const app = express();

app.use(express.json());
app.use(express.static("public"))
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set("view engine","ejs");

app.get("/",(req,res) => {
    res.render("index.ejs")
});

app.post("/makeqr",(req,res) => {
    let data = req.body;
    let filepath = __dirname + "/public/previous/" + data["txt"].substring(0,4) + ".svg";
    let svg_data = spawnSync("py",["gen.py",data["txt"],data["fgcolor"],data["bgcolor"],filepath]).stdout.toString();
    res.send({data:svg_data})
});
app.listen((port),() => {
    console.log(`Serving at http://127.0.0.1:${port}`);
});