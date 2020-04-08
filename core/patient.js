const pool = require('./pool');

function Patients() {};

Patients.prototype = {
     //find user by id or name
     find: function(user = null,callback){
        //if user = numbe return field = id,
        //if user = string return field = name
        //if user = dob return field = dob
        console.log("find: user: ",user);
        if(user){
            // var field = Number.isInteger(user) ? 'DoctorId' : 'email';
            var num = /^[0-9]{1,5}$/g;
            var emailRe = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g
            var phoneRe = /[0-9]{10}/g;
            var dateRe = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/g;
            if(num.test(user)){
                field = 'PateintID';
            }else if(emailRe.test(user)){
                field = 'email';
            }else if(phoneRe.test(user)){
                field = 'phone'
            }
            else if(dateRe.test(user)){
                field = 'dob';
            }else{
                field = 'name';
            }
        }
        console.log(field);
        if(field != 'name')
        sql = `SELECT * FROM PatientsTable WHERE ${field} = ?`;
        else{
            user = `%${user}%`
            sql = `SELECT * FROM PatientsTable WHERE ${field} LIKE ?`;
        }
        pool.query(sql,user,(err,result)=>{
            if(err)
            console.log("Error in find Function of Doctor",err);
            callback(result);
        });
    },

    /*
        *{
        "name":"Rishav",
        "email":"rishav@gmail.com",
        "dob":"2000-11-15",
        "phone":"1234567890",
        "DoctorAppointed":2,
        "PharamacistAppointed":1,
        "DateOfAppointment":"2020-02-22",
        "Report":"Suffering From Fever"
        }
    *
    */

    create: function(body,callback){
        console.log("body: ",body)
        var bind =[]
        for(key in body){
            if(body.hasOwnProperty(key))
            bind.push(body[key])
        }
        console.log("bind",bind);
        let sql = 'INSERT INTO `PatientsTable` (`PateintID`, `Name`, `email`, `dob`, `phone`, `DoctorAppointed`, `PharmacistAppointed`, `DateOfAppointment`, `Report`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?); '
        pool.query(sql,bind,(err,lastId)=>{
            if(err)
            console.log("Error in creating ",err)
            else{
                lastId.name = body['name'];
                lastId.email = body['email'];
                lastId.DoctorAppointed = body['DoctorAppointed'];
                lastId.DateOfAppointment = body['DateOfAppointment'];
                lastId.PateintID = body
                callback(lastId);
            }
        });
    },

    count: function(callback){
        let sql = `SELECT COUNT(*) FROM PatientsTable`;
        pool.query(sql,(err,number)=>{
            if(err)
            console.log(err);
            else
            callback(number);
        })
    }
    ,

    update: function(body,callback){
        var dateOfAppointment = body.DateOfAppointment;
        var id = body.PateintID;

        this.find(id,(user)=>{
            if(Object.keys(user).length != 0){               
                console.log("not null")
                if(user){
                    let sql = 'UPDATE PatientsTable SET DateOfAppointment = ? WHERE PateintID= ?';
                    pool.query(sql,[dateOfAppointment,id],(err,updated)=>{
                        if(err)
                        console.log("Error",err);
                        console.log(user[0].email)
                        updated.email = user[0].email
                        console.log(updated);
                        callback(updated);
                    })
                }
            }
            callback(null);
        });

    }
}

module.exports = Patients;