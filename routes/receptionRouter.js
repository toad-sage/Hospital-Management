const express = require('express')
const router = express.Router();
const Reception = require('../core/reception');
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

//object for reception
const reception = new Reception();

//for welcome page
router.get('/login',(req,res)=>{
    let rec = req.session.rec;
    if(rec){
        res.redirect('/reception/home')
        return;
    }
    console.log("Welcome to homePage");
    res.render('reception/login',{success : 0})
});

//for homepage
router.get('/home',(req,res)=>{
    if(req.session.rec){
        res.render('navbar',{person : "reception"});
    }else{
        res.redirect('/reception/login');
    }
})

router.get('/showAll',(req,res)=>{
    let rec = req.session.rec;
    if(rec){
        reception.show((users)=>{
            console.log(users);
            res.send(users);
        })
    }else
    res.redirect('/reception/login');
});

router.post('/register',(req,res)=>{
    res.send(req.body);
    reception.create(req.body,(lastId)=>{
        console.log(req.body);
        if(lastId){
            req.session.rec = lastId;
            console.log("lastId",lastId);
        }else{
            console.log("Error in creating new reception");
        }
    })
});

router.post('/login',(req,res)=>{
    if(req.body.email != undefined ){
        userId = req.body.email;
    }else if(req.body.id != undefined){
        userId = req.body.id;
    }
    reception.login(userId,req.body.password,(result)=>{
        if(result){
            req.session.rec = result;
            console.log("result: login: ",result);
            res.redirect('/reception/login');
        }else{
            res.render('reception/login',{success: 1});
        }
    });
});

router.get('/forgot',(req,res)=>{
    res.render('forgot',{people : 'reception'});
})

router.put('/update',(req,res)=>{
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    reception.update(email,password,(updated)=>{
        console.log(updated)
        if(updated != null){
            console.log("updated profile");
            res.send(updated)
        }else{
            console.log('pata nhi');
        }
    })
})

router.get('/logout',(req,res)=>{
    if(req.session.rec){
        req.session.destroy(()=>{
            res.redirect('/');
        })
    }
})


module.exports = router;