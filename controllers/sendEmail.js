const nodemailer=require('nodemailer')

const sendEmail = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();
    const transporter =nodemailer.createTransport({
        
        host: 'smtp.ethereal.email' ||process.env.SMTP_HOST,
        port: 587||process.env.SMTP_PORT,
        // secureConnection: process.env.SMTP_SECURE,
        auth: {
            user: 'margarita.schultz@ethereal.email'|| process.env.SMTP_USER,
            pass: 'X8aGA8eKNBghbZNeWx' ||process.env.SMTP_PASSWORD
        },
        // tls: {
        //     ciphers: "SSLv3"
        // },
        
    })

    const info = await transporter.sendMail({
        from: process.env.FROM,
        to: process.env.TO,
        subject: process.env.SUBJECT,
        html:process.env.HTML
    })
    res.json(info);
    console.log("info:",info)
}

module.exports = sendEmail;