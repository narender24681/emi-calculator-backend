const express = require("express");
const { dbConnection } = require("./db");
const { userRouter } = require("./routes/User.route");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
var cors = require('cors');

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);

app.listen(port, async () => {
    try {
        await dbConnection;
        console.log(`Connected to the database`);
    }
    catch(err) {
        console.log(err);
        console.log(`Cannot connect to the database`);
    }

    console.log(`Server is running on the port: ${port}`)
});
