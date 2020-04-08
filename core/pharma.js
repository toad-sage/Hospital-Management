const pool = require('./pool');
const bcrypt = require('bcrypt');

function Pharma() {};

Pharma.prototype = {
    //find user by id or name
    find: function(user = null,callback){
        //if user = numbe return field = id,
        //if user = string return field = username
        console.log("find: user: ",user);
        if(user){
            var field = Number.isInteger(user) ? 'PharmacistID' : 'email';
        }
        console.log(field);
        let sql = `SELECT * FROM PharmacistTable WHERE ${field} = ?`;

        pool.query(sql,user,(err,result)=>{
            if(err)
            console.log("Error in find Function of Doctor",err);
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

        let sql = `INSERT INTO PharmacistTable(name,email,password) VALUES (?,?,?)`;

        pool.query(sql,bind,(err,lastId)=>{
            if(err)
            console.log("Error in create Function of Doctor",err);
            console.log(lastId);
            callback(lastId);
        });
    },

    login:function(email,password,callback){
        this.find(email,(user)=>{
            if(Object.keys(user).length!=0){
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
        let sql = `SELECT * FROM PharmacistTable`;

        pool.query(sql,(err,users)=>{
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
                    let sql = 'UPDATE PharmacistTable SET password = ? WHERE email = ? ';
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

module.exports = Pharma;