const express = require('express')
//for Session
const session = require('express-session')

const path = require('path')
const app = express()
const cors = require('cors')

//testing for body-parser
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


//for node-mailer
const Mail = require('./utitlity/mail'); 
const mail = new Mail();

//for routes
const doctorRouter = require('./routes/doctorRouter');
const pharmaRouter = require('./routes/pharmaRouter');
const receptionRouter = require('./routes/receptionRouter');
const medicineRouter = require('./routes/medicineRouter');
const patientRouter = require('./routes/patientRouter');


//allow cors
app.use(cors())

//Session Creation
app.use(session({
    secret:'auth_practice',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

//for body parsing
app.use(express.urlencoded({extended : false}));

//serve static files
app.use(express.static(path.join(__dirname,'public')));

//tempelate engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//routes
app.use('/doctor/',doctorRouter);
app.use('/pharma/',pharmaRouter);
app.use('/reception/',receptionRouter);
app.use('/medicine/',medicineRouter);
app.use('/patient/',patientRouter);

//testing purpose
app.get('/',(req,res)=> {
    res.render('loginAs');
});


//test purpose
app.post('/mail',(req,res)=>{
    console.log(req.body);

    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 

    const otp = {
        OTP: OTP 
    }

    mail.sendMail('mailmeforgot@gmail.com',`${req.body.mailId}`,'OTP for password Change',`${OTP}`,(response)=>{
        console.log(OTP);
        res.send(otp);
    });
})

app.get('/forgot',(req,res)=>{
    res.render('forgot',{people : undefined});
})


//errors : page not found
app.use((req,res,next)=>{
    var err = new Error('Page not Found');
    err.status = 404;
    next(err);
});

//handling errors
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send(err.message);
});



app.listen(8000,()=>{
    console.log(`listening on port 8000...`);
});
