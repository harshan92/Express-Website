const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const nodemailer=require('nodemailer');


var app=express();

app.set('views', path.join(__dirname,"views"));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.render("index", {'title':'Welcome!'});  
});

app.get('/about', (req, res) => {
    res.render("about");  
});

app.get('/contact', (req, res) => {
    res.render("contact");  
});

app.post('/contact/send', (req, res) => {
    var transporter=nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'yourmail@gmail.com',
            pass:'xxxxxxxx'
        }
    }); 
    var mailOptions={
        from:'Harshan Madhuranga <harshanmadhurangaw@gmail.com>',
        to:'yourmail@gmail.com',
        subject:'Website submission',
        text:'You have a submition with following details... Email: '+req.body.email+', Name: '+req.body.name+', Message: '+req.body.message,
        html:'<p>You have a submition with following details... <ul> <li>Email: '+req.body.email+'</li><li>Name: '+req.body.name+'</li><li>Message: '+req.body.message+'</li></u></p>'
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log("Error: "+err);
            res.redirect('/');
        }else{
            console.log("Message: "+info.response);
            res.redirect('/');
        }
    });
});

app.listen(3000, () => {
    console.log(`Server is running on 3000`);
});