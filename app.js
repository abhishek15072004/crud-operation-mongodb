const express=require('express');
const app=express();
const path=require('path');
const user=require("./models/user");

app.set("view engine",'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res)=>{
res.render("index");
});

app.get('/read', async(req,res)=>{
    let allusers=await user.find();
    res.render("read",{users:allusers});
});
app.get('/delete/:id',async (req,res)=>{
let deleteduser= await user.findOneAndDelete({_id:req.params.id});
res.redirect('/read');
});

app.get('/edit/:id', async(req,res)=>{
    let updateduser=await user.findOne({_id:req.params.id});
res.render("edit",{updateduser});
});

app.post('/update/:id',async (req,res)=>{
    let {image, email, name}=req.body;
let userupdate=await user.findOneAndUpdate({_id:req.params.id},{image,name,email},{new:true});
res.redirect("/read");
});


app.post('/create',async (req,res)=>{
   let createduser=await user.create({
      name:  req.body.name,
      email:req.body.email,
     image: req.body.image,
    });
    res.redirect('/read');
});

app.listen(8001,()=>console.log("port connected to 8001"));