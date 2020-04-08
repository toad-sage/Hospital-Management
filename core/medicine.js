const pool = require('./pool');
const bcrypt = require('bcrypt');

function Medicine() {};

Medicine.prototype = {

    //find medicine by mdicine id or by name
    find: function(user = null,callback){
        console.log("find: user: ",user);
        if(user){
            var field = Number.isInteger(user) ? 'MedicineID' : 'Name';
        }
        console.log(field);
        if(field == 'MedicineID'){
            sql = `SELECT * FROM MedicineTable WHERE ${field} = ?`;
        }else if(field == 'Name'){
            user = `%${user}%`
            sql = `SELECT * FROM MedicineTable WHERE ${field} LIKE ? `;
        }
        pool.query(sql,user,(err,result)=>{
            console.log(sql);
            if(err)
            console.log("Error in find Function of Doctor",err);
            console.log("med : res: ",result);
            callback(result);
        });
    },
    show: function(callback){
        let sql = `SELECT * FROM MedicineTable`;

        pool.query(sql,(err,medicines)=>{
            if(err)
            console.log("error in show function of medicine",err);
            callback(medicines);
        });
    },
    create: function(body,callback){
        var bind = []

        for(key in body){
            if(body.hasOwnProperty(key))
            bind.push(body[key])
        }

        let sql = `INSERT INTO MedicineTable(name,quantity,ExpiryDate) VALUES (?,?,?)`


        console.log(bind)
        pool.query(sql,bind,(err,lastId)=>{
            if(err)
            console.log("Error in creating function",err);
            console.log(lastId);
            callback(lastId);
        });
    },
    update: function(body,callback){
        let name = body.name;
        let quantity = body.quantity;
        let sql = `UPDATE MedicineTable SET quantity = ? WHERE name = ?`;
        console.log(name,quantity);
        pool.query(sql,[quantity,name],(err,result)=>{
            if(err)
            console.log(err);
            console.log(result);
            callback(result);
        });
    }
}

module.exports = Medicine;