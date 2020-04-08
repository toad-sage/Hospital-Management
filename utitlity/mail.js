const nodemailer = require('nodemailer');
const password = require('./secret');

function Mail() {};

const senderPassword = password.key;

Mail.prototype = {

    sendMail: function(senderEmail,recieverEmail,subject,text,callback){

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${senderEmail}`,
                pass: `${senderPassword}`
            }
        });

        var mailOptions = {
            from: `${senderEmail}`,
            to: `${recieverEmail}`,
            subject: `${subject}`,
            text: `${text}`
        };

        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                callback("Error in Sending Mail: ",err);
            }else{
                callback('Email.sent: '+info.response);
            }
        });

    }

}

module.exports = Mail;