const express = require('express')
const router = express.Router();
const Medicine = require('../core/medicine');
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

//object for pharma
const medicine = new Medicine();

//for welcome page
router.get('/',(req,res)=>{
    console.log("Welcome to homePage");
    res.send("Welcome on HomePage")
});

router.get('/showAll',(req,res)=>{
    medicine.show((medicines)=>{
       console.log(medicines);
       res.send(medicines); 
    });
});

router.post('/',(req,res)=>{
    console.log(req.body)
    if(req.body.name != null)
    medicineId = req.body.name;
    else if(req.body.id != null)
    medicineId = req.body.id;
    medicine.find(medicineId,(result)=>{
        res.send(result);
    });
});

router.post('/add',(req,res)=>{
    console.log(req.body);
    medicine.create(req.body,(lastId)=>{
        if(lastId){
            console.log(lastId);
            // res.redirect('/medicine/');
        }
    });
});

router.put('/update',(req,res)=>{
    console.log(req.body)
    medicine.update(req.body,(result)=>{
        if(result){
            console.log(result);
        }else{
            console.log(`Not updated`);
        }
    })
})

module.exports = router;