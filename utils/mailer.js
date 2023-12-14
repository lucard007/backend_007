const nodemailer = require("nodemailer")

const sendMail = async (email, userName) =>{
    const contactTemplate = `
    <div>
        <p>
            Dear ${userName}, you're welcome to lord universe limited. Thank you for applying to be a member. THE LORD_TEAM
        </p>
    </div>`

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL,
            pass: process.env.PASS,
        },
    })

    const mailOptions = {
        from: process.env.GMAIL,
        to: email,
        subject: "LORD_TEAM ---- Welcome Message",
        text: "LORD",
        html: contactTemplate,
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log("email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

module.exports = {sendMail}