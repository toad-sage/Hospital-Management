const express = require('express')
const router = express.Router();
const Pharma = require('../core/pharma');
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

//object for pharma
const pharma = new Pharma();

//for welcome page
router.get('/login',(req,res)=>{
    let pharm = req.session.pharm;
    if(pharm){
        res.redirect('/pharma/home');
        return;
    }
    console.log("Welcome to homePage");
    res.render('pharma/login',{success : 0})
});

//for homepage
router.get('/home',(req,res)=>{
    if(req.session.pharm){
        res.render('navbar',{person : "pharma"});
    }else{
        res.redirect('/pharma/login');
    }
})

router.get('/showAll',(req,res)=>{
    let pharm = req.session.pharm;
    if(pharm){
        pharma.show((users)=>{
            console.log(users);
            res.send(users);
        })
    }else{
        res.redirect('/pharma/login');
    }
});

router.post('/register',(req,res)=>{
    res.send(req.body);
    pharma.create(req.body,(lastId)=>{
        console.log(req.body);
        if(lastId){
            req.session.pharm = lastId;
            console.log("lastId",lastId);
        }else{
            console.log("Error in creating new pharma");
        }
    })
});

router.post('/login',(req,res)=>{
    if(req.body.email != undefined ){
        userId = req.body.email;
    }else if(req.body.id != undefined){
        userId = req.body.id;
    }
    pharma.login(userId,req.body.password,(result)=>{
        if(result){
            req.session.pharm = result;
            console.log("result: login: ",result);
            res.redirect('/pharma/login');
        }else{
            res.render('pharma/login',{success: 1});
        }
    });
});

router.put('/update',(req,res)=>{
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    pharma.update(email,password,(updated)=>{
        console.log(updated)
        if(updated != null){
            console.log("updated profile");
            res.send(updated)
        }else{
            console.log('pata nhi');
        }
    })
})

router.get('/forgot',(req,res)=>{
    res.render('forgot',{people : 'pharma'});
})

router.get('/logout',(req,res)=>{
    if(req.session.pharm){
        req.session.destroy(()=>{
            res.redirect('/');
        })
    }
})


module.exports = router;