import express from 'express'
import connectionDB from './connection/connect.js';
import dotenv from 'dotenv'

const app = express();

dotenv.config();
connectionDB();

app.use("/", (req, res)=>{
    res.send("Start coding")
});

const port = 5000;

app.listen(port, ()=>{
    console.log(`Server running the port is ${port}`)
});