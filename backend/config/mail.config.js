const nodemailer = require('nodemailer');

const sendEmail=async(email,subject,text)=>{
    const transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        port: 587,
        secure:false,
        auth:{
            user:process.env.MY_EMAIL,
            pass:process.env.EMAIL_PASSWORD 
        }
    });
    const mailOptions={
        from:process.env.MY_EMAIL, 
        to:email, 
        subject:subject,
        html:text,
    };
    try{
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }catch(error){
        console.error('Error sending email:',error);
    }
};

module.exports=sendEmail;
