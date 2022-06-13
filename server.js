const express =require('express');
const cors = require('cors');
const router=require('./router/router.api')
const Port =4000;
const app=express();
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("<h1 style='justify-content: center;display: flex;height: 100%; align-items: center;'>Welcome To Api Zone</h1>")
});

app.use("/api/foods", router)
app.listen(Port,()=>{
    console.log(`server is running on port no : ${Port}`);
});