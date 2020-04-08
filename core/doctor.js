const pool = require('./pool');
const bcrypt = require('bcrypt');

function Doctor() {};

Doctor.prototype = {
    //find user by id or name
    find: function(user = null,callback){
        //if user = numbe return field = id,
        //if user = string return field = username
        console.log("find: user: ",user);
        if(user){
            var field = Number.isInteger(user) ? 'DoctorId' : 'email';
        }
        console.log(field);
        let sql = `SELECT * FROM DoctorTable WHERE ${field} = ?`;

        pool.query(sql,user,(err,result)=>{
            if(err)
            console.log("Error in find Function of Doctor",err);
            // console.log("result:",result)
            callback(result);
        });
    },

    create: function(body,callback){
        let pwd = body.password;
        body.password = bcrypt.hashSync(pwd,10);

        var bind = [];

        for(key in body){
            if(body.hasOwnProperty(key))
            bind.push(body[key])
        }

        let sql = `INSERT INTO DoctorTable(name,email,password) VALUES (?,?,?)`;

        pool.query(sql,bind,(err,lastId)=>{
            if(err)
            console.log("Error in create Function of Doctor",err);
            console.log(lastId);
            callback(lastId);
        });
    },

    login:function(email,password,callback){
        this.find(email,(user)=>{
            if(Object.keys(user).length != 0){
                console.log(user);                
                console.log("not null")
                if(email){
                    if(bcrypt.compareSync(password,user[0].password)){
                        console.log("user",user);
                        callback(user);
                        return;
                    }
                }
            }
            callback(null);
        });
    },

    show:function(callback){
        let sql = `SELECT * FROM DoctorTable`;

        pool.query(sql,(err,users)=>{
            if(err)
            console.log("error in show function of doctor",err);
            callback(users);
        });
    },
    
    showPatients:function(id,callback){
        let sql = `SELECT * FROM PatientsTable WHERE DoctorAppointed = ?`;
        console.log("id",id);
        pool.query(sql,[id],(err,users)=>{
            if(err)
            console.log("error in show function of doctor",err);
            callback(users);
        });
    },

    update:function(email,password,callback){
        this.find(email,(user)=>{
            if(Object.keys(user).length != 0){               
                console.log("not null")
                if(user){
                    console.log(email,password + user)
                    password = bcrypt.hashSync(password,10);
                    let sql = 'UPDATE DoctorTable SET password = ? WHERE email = ? ';
                    pool.query(sql,[password,email],(err,updated)=>{
                        if(err)
                        console.log("Error",err);
                        console.log(updated);
                        callback(updated);
                    })
                }
            }
            callback(null);
        });
    }


}

module.exports = Doctor;