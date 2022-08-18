const nodemailer = require("nodemailer");

const sendEmail = async (to,subject,html)=>{

    try {

        let Transport = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            service: 'gmail',
            auth: {
                user:process.env.SENDER,
                pass:process.env.SENDER_PASSWORD,
            }
        });
      
        let info = await Transport.sendMail({
            from: `"👻" <${process.env.SENDER}>`,// sender address
            to:`${to.join(",")}`, // list of receivers
            subject:`${subject}` , // Subject line
            text: "Hello world?", // plain text body
            html:`${html}`, // html body 
            attachments: [{
                filename: 'invoice.pdf',
                path: 'invoice.pdf',
                contentType: 'application/pdf'
              }]
        });
       
        return info;
    } catch (error) {
       return error

    }

}  
module.exports = sendEmail; 