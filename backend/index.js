const express = require("express");
const cors = require("cors");
require("./db/config");
const Users = require("./db/User");
const app = express();
const Product = require("./db/Product");
const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';

app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  let user = new Users(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({result},jwtkey,{expiresIn:"1h"},(err,token)=>{
    if (err) {
      res.send({result:"Bhag Bhosdike,Ghus hi jao insan ke bhitar"})
    }
    res.send({result ,auth:token});
  });
});
app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await Users.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({user},jwtkey,{expiresIn:"1h"},(err,token)=>{
        if (err) {
          res.send({result:"Bhag Bhosdike,Ghus hi jao insan ke bhitar"})
        }
        res.send({user,auth:token});
      });
      
    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "No user found" });
  }
});

app.post('/add-product', async (req, res)=> {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});
app.get("/products", async(req, res)=>{
  let products = await Product.find();
  if(products.length>0){
    res.send(products);
  }else{
    res.send({result:"Kya re bhikhmangya no result found"});
  }
});
app.delete('/product/:id', async(req, res) => {
  
  const result = await Product.deleteOne({_id:req.params.id});
  res.send(result);
});
app.get("/product/:id", async(req, res) => {
  let result = await Product.findOne({_id:req.params.id});
  if (result){
    res.send(result);
  } else {
    res.send({result:"No Results Found"});
  }
});
app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    {_id:req.params.id},
    {$set:req.body}
  )
  res.send(result);
});

app.get("/search/:key", async(req, res)=>{
  let result = await Product.find({
    "$or":[
      {name:{$regex:req.params.key},},
      {company:{$regex:req.params.key},},
      {category:{$regex:req.params.key},},
      {price:{$regex:req.params.key},}
    ]
  });
  res.send(result);
});
app.listen(5000);
