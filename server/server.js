const express = require('express')
const app = express()
const mongo = require('mongoose')
const cors = require('cors')
const dotEnv = require('dotenv')
dotEnv.config()
const cookieParser = require('cookie-parser')
const authRouter = require('./server/routes/auth-route')

app.use(cookieParser())
// app.use(cors())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        "Content-Type",
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials: true
}))
app.use(express.json())

app.use("/api/auth", authRouter)



mongo.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDb");
    }).catch((error) => {
        console.log(error);
    })


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Connection Established at Port : " + PORT);
})