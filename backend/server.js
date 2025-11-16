const express = require('express');
const cors = require('cors');
const driversRouter = require('./routes/drivers.js');
const taxisRouter   = require('./routes/taxis.js');
const rideLogsRouter = require('./routes/ridelogs.js');
const dashboardRoutes = require('./routes/dashboard.js');
const authRoutes = require("./routes/auth.js");
require('dotenv').config();

const app = express();

/*app.use(cors({
  origin: "http://localhost:5175", // your React dev server
  credentials: true                // allow cookies/auth headers
}));*/


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(express.json());

// mount your existing APIs
app.use('/api/drivers', driversRouter);
app.use('/api/taxis',   taxisRouter);

// Mount ride logs routes under /api
app.use('/api/ridelogs', rideLogsRouter);
app.use('/api/dashboard', dashboardRoutes);

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
  console.log(`Server running on http://localhost:${PORT}`)
);
