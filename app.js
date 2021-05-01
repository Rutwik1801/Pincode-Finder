const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
const { response } = require("express");
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render("pin");
});

app.post("/",(req,res)=>{
    const city=req.body.city;
const url=`https://api.postalpincode.in/postoffice/${city}`;
https.get(url,response=>{
    console.log(response.statusCode);
    response.on("data",(data)=>{
      const pinData=JSON.parse(data);
      const resu=pinData[0].Status;
      console.log(resu);
      if(resu==="Error"){
          res.render("error");
      } else{
        const pinArray=pinData[0].PostOffice;
          res.render("result" ,{pinArray:pinArray});
      }
    });
});

});

app.post("/failure",(req,res)=>{
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("setup done");
})