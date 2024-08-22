const express = require("express");
require("dotenv").config()
const cors = require("cors");
const { Connection } = require("./Config/db");
const { userRouter } = require("./Routes/userRoute");
const { postRouter } = require("./Routes/postRoute");

const app = express()


app.use(express.json())
app.use(cors())

app.use("/users", userRouter)
app.use("/posts", postRouter)

app.listen(process.env.PORT, async () => {
    try {
        await Connection
        console.log(`Server is running at PORT ${process.env.PORT}`);
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error : ", error.message);
        console.log("Something Went Wrong....!");
    }
})