const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const resepRoutes = require("./routes/resepRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api", resepRoutes); 

app.listen(3000, () => {
    
    console.log("Server jalan di port 3000");
});