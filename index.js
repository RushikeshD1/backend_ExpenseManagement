const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongooses = require("mongoose");
const userRoute = require("./routes/userRoute");
const authenticate = require("./middleware/authMiddleware");
const expRoute = require("./routes/expenseRoute");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

dotenv.config({path : "./utils/.env"});

const port = process.env.PORT || 10000

app.use("/v1/api/user", userRoute)
app.use("/v1/api/expense", expRoute)

mongooses.connect(process.env.DATABASE_URL)
    .then(() => console.log("Database is connected successfully"))
    .catch((err) => console.log("Database connected error occured", err))

app.listen(port, () => console.log(`Server is running at port ${port}`))
