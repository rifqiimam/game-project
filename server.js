const express = require("express")
const cors =require("cors")

const app = express();

const corsOption = {
    origin:"*"
}

app.use(cors(corsOption))
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({message:'hello'});
});

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=> console.log(`server stater on port ${PORT}`));