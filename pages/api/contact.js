let nodemailer = require('nodemailer');
const emailTemplate = require('../../util/emailTemplate');

export default function (req, res) {
  const members = req.body;
  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: 'jayas.secret.santa.email.bot@gmail.com',
      pass: 'ngcvpzyfghswvsov',
    },
    secure: true,
  });
  members.forEach((member) => {
    const mailData = generateMailData(member);
    transporter.sendMail(mailData);
  });
  res.status(200);
}

function generateMailData(member) {
  const html = emailTemplate(member);
  return {
    from: 'jayas.secret.santa.email.bot@gmail.com',
    to: member.email,
    subject: `Your Secret Santa`,
    text: `You are buying a present for ${member.santa}`,
    html: html,
  };
}
