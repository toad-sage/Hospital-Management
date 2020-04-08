const express = require('express')
const router = express.Router();
const Patient = require('../core/patient');
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

const patient = new Patient();

//for node-mailer
const Mail = require('../utitlity/mail'); 
const mail = new Mail();

//for welcome page
router.get('/',(req,res)=>{
    console.log("Welcome to homePage");
    res.send("Welcome on HomePage")
});

router.post('/find',(req,res)=>{
    console.log(req.body)
    let findValue = req.body.findValue;
    patient.find(findValue,(results)=>{
        if(results){
            console.log("results is : ",results);
            const x = results;
            res.send(x);
        }else{
            console.log("Error Retrieving Info");
        }
    });
});

router.post('/add',(req,res)=>{
    console.log(req.body);
    patient.create(req.body,(lastId)=>{
        if(lastId){
            tex = `Dear ${lastId.name},Your Patient Id is ${lastId.insertId},Your Appointment is fixed on ${lastId.DateOfAppointment} with Doctor having id ${lastId.DoctorAppointed}`
            mail.sendMail('mailmeforgot@gmail.com',`${lastId.email}`,'Appointment Confirmation',tex,(response)=>{
                console.log(response);
            });
            res.send(lastId)
        }else{
            console.log("Error in creating user");
        }
    })
})

// {
// 	"PateintID":2,
// 	"DateOfAppointment":"2020-03-22"
// }

router.put('/update',(req,res)=>{
    console.log(req.body);
    patient.update(req.body,(result)=>{
        if(result){
            mail.sendMail('mailmeforgot@gmail.com',`${result.email}`,'New AppointMent Date',`${req.body.DateOfAppointment}`,(response)=>{
                console.log(response);
            });
            res.send(result)
            console.log(result)
        }else{
            console.log("Eror upadating time of appointment")
        }
    })
})

module.exports = router;