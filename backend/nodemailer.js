const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'anujyadav9081anu@gmail.com',
      pass: 'arfz ysnz kvbp awpt',
    },
  });

  const mailOptions = {
    from: 'anujyadav9081anu@gmail.com',
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };