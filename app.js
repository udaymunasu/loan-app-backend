var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var cors = require("cors");

var app = express();

app.use(cors());

app.use(express.static("assets"));
app.use(express.json());
app.use(bodyparser.json({limit:'50mb'}));
app.use(bodyparser.urlencoded({limit:'50mb', extended: true}));

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if(req.method == "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});


mongoose.connect("mongodb://localhost:27017/LoansManagerProj");
let db = mongoose.connection;
db.on("error", error=> console.log(error));
db.on("open", ()=> console.log("Connection Established"));

app.get("/", function(req,res){
    res.send("Welcome to Uday Server");
    res.end()
});

app.use("/customers", require("./routes/customers"));


// const PORT = process.env.PORT || 8081;
app.listen(8081, (err) => {
    if(!err) {
        console.log(`Server is running on  http://localhost:3000/.`);
    } else {
        console.log("App crashed")
    }
});

