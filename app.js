//jshint esversion: 6
const express = require("express");
const bodyParser=require("body-parser");
const request= require("request");
const https=require("https");
// const { request } = require("http");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/Signup.html");
});

app.post("/",function(req, res){
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
    
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FName: firstName,
                    LName:lastName
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);
const url="https://us21.api.mailchimp.com/3.0/lists/ac677fe8e";
const option={
    method: "POST",
    auth: "faisal1:c98d16415f5497f920fd34b7d727f918-us21"
}

const request=https.request(url,option, function(response){

    if(response.statusCode===200)
    {
        res.sendFile(__dirname + "/Success.html");
    }else{
        res.sendFile(__dirname + "/failure.html");
    }

})

request.write(jsonData);
request.end();

});

app.post("/failure", function(req,res){
    res.redirect("/");
})



app.listen(3000, function(){
    console.log("server is running on port 3000");
})





// c98d16415f5497f920fd34b7d727f918-us21
//ac677fe8ee.
//https://us21.api.mailchimp.com/3.0/lists/ac677fe8ee