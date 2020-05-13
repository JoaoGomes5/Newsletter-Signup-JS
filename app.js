//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();



const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , function (req,res) { 
    
    res.sendFile(__dirname + "/signup.html");

});

app.post("/" , function (req,res) { 

    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const email = req.body.email;

    var data = {
            
        members : [
            {
                email_address: email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us18.api.mailchimp.com/3.0/lists/f6294206ef";

    const options = {

        method : "POST",
        auth: "JoaoGomes5:ed1824ff58850ee79892bd12478218e8-us18"

    };

   const request =  https.request(url,options, function (response) { 

        if (response.statusCode === 200){

            res.sendFile(__dirname + "/success.html");

        }else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data" , function (data) { 

            console.log(JSON.parse(data));
            
    });


    });

    request.write(jsonData);
    request.end();
    


});

app.post("/success" , function (req, res) {

    res.redirect("/");
    
});

app.post("/failure" , function (req, res) {

    res.redirect("/");
    
});






app.listen(port, function() {
    
    console.log("Server on port: " + port);
    
});

//API KEY
//ed1824ff58850ee79892bd12478218e8-us18
//LIST ID
//f6294206ef