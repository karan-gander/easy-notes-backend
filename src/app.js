import express from "express"
import cookieParser from "cookie-parser"
import { ApiError } from "./utils/ApiError.js"
import session from "express-session"
import MongoStore from "connect-mongo"
import cors from "cors"
const app = express()

// app.use(cors({
//   origin: 'https://gpcnotes.netlify.app', // Replace with your Netlify URL
//   methods: 'GET,POST,PUT,DELETE',
//   credentials: true
// }));     

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json({ limit: "30mb" }))
app.use(express.urlencoded({ extended: true, limit: "30mb" }))
app.use(express.static("public"))


//  using express session for session based authentication 

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: "adminSessions",
    dbName:"easy-notes"
  }),
  cookie: {
    httpOnly: true,
    secure: false, // true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: "lax"
  }
}))

// Routes calling 
import user from "./routes/user.routes.js"
import admin from "./routes/admin.routes.js"

app.use("/api/v1/user", user)
app.use("/api/v1/admin", admin)

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ statusCode: err.statusCode, message: err.message });
  } else {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
export { app }
