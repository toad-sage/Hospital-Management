const express = require('express')
const router = express.Router();
const Doctor = require('../core/doctor');
const bodyParser = require('body-parser')
const colors = require('colors/safe')

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());


//object for doctor
const doctor = new Doctor();

//for login page
router.get('/login',(req,res)=>{
    let doc = req.session.doc;
    if(doc){
        res.redirect('/doctor/home')
        return;
    }
    console.log("Welcome to homePage");
    res.render('doctor/login',{success : 0})
});

//for homepage
router.get('/home',(req,res)=>{
    if(req.session.doc){
        res.render('navbar',{person : "doctor"});
    }else{
        res.redirect('/doctor/login');
    }
})

//to show all the doctors

router.get('/showAll',(req,res)=>{
    let doc = req.session.doc;
    console.log(colors.red(doc));
    if(doc){
        doctor.show((users)=>{
            console.log(users);
            res.send(users);
        })
    }
    else
    res.redirect('/doctor/login');
});

router.get('/showPatients',(req,res)=>{
    let doc= req.session.doc;
    console.log(doc)
    doctor.showPatients(doc[0].DoctorID,(patients)=>{
        if(patients){
            res.send(patients);
        }else{
            console.log("Some Error");
        }
    })
    console.log(doc[0].DoctorID)

})

//to register doctors

router.post('/register',(req,res)=>{
    res.send(req.body);
    doctor.create(req.body,(lastId)=>{
        console.log(req.body);
        if(lastId){
            req.session.doc = lastId;
            console.log("lastId",lastId);
        }else{
            console.log("Error in creating new Doctor");
        }
    })
});

//to login doctor

router.post('/login',(req,res)=>{
    console.log(req.body);
    if(req.body.email != undefined ){
        userId = req.body.email;
    }else if(req.body.id != undefined){
        userId = req.body.id;
    }
    doctor.login(userId,req.body.password,(result)=>{
        if(result){
            req.session.doc = result;
            // console.log("result: login: ",result);
            res.redirect('/doctor/login');
        }else{
            res.render('doctor/login',{success: 1});
        }
    });
});

router.get('/forgot',(req,res)=>{
    res.render('forgot',{people : 'doctor'});
})

//for password updation

// {
// 	"email":"ritikraj7255@gmail.com",
// 	"password":"faulty"
// }

router.put('/update',(req,res)=>{
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    doctor.update(email,password,(updated)=>{
        console.log(updated)
        if(updated != null){
            console.log("updated profile");
            res.send(updated)
        }else{
            console.log('pata nhi');
        }
    })
})

// to logout doctor

router.get('/logout',(req,res)=>{
    if(req.session.doc){
        req.session.destroy(()=>{
            res.redirect('/');
        })
    }
})


module.exports = router;