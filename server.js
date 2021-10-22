const express=require("express")
const app=express()
const cors=require("cors")
app.use(cors({
    origin:"*"
}))

const mongodb=require("mongodb")
const mongoclient=mongodb.MongoClient;
console.log(mongoclient);
const url="mongodb+srv://sahaja:sahaja12@cluster0.8s2tb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
app.use(express.json())

app.post("/usercreate",async function(req,res)
{ 
    try{
       
        let conn=await mongoclient.connect(url);
        const db=conn.db("StudentsDB");
        await db.collection("students").insertOne(req.body)
        await conn.close()
        res.json({
            message:"Student added successfully"
        })

    }
    catch(err)
    {
        res.status(500).json({
            message:"error"
        })
    }
   
})
app.get("/userlist",async function(req,res){
    try{
        let conn=await mongoclient.connect(url);
        const db=conn.db("StudentsDB");
        let s=await db.collection("students").find().toArray()
        await conn.close()
        res.json(s)

    }
    catch(err)
    {
        res.status(500).json({
            message:"error"
        })
    }
})
app.delete("/userdelete/:id",async function(req,res){
    try{
        let conn=await mongoclient.connect(url);
        let db=conn.db("StudentsDB");
        var id=mongodb.ObjectId(req.params.id)
        await db.collection("stud").deleteOne({_id:id})
        await conn.close()
        res.json({
            message:"Student deleted successfully"
        })

    }
    catch(err)
    {
        res.status(500).json({
            msg:"error"
        })
    }
})
const port=process.env.PORT||'3000'
app.listen(port,()=>{
   console.log(`server running at ${port}`);

});