const express = require("express")
const cors =require("cors")
const mainRoutes = require("./src/routes/mainRoutes.js")
require('dotenv').config();


const app = express();

const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: 'Hello' });
});

// Use user routes
app.use("/api", mainRoutes); // Assuming your user routes are prefixed with "/api"

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));