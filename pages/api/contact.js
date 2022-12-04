let nodemailer = require('nodemailer');
const emailTemplate = require('../../util/emailTemplate');

export default async function (req, res) {
  const members = req.body;
  try {
    const transporter = nodemailer.createTransport({
      port: 465,
      host: 'smtp.gmail.com',
      service: 'gmail',
      auth: {
        user: 'jayas.secret.santa.email.bot@gmail.com',
        pass: 'yzweqvfcgwyddopf',
      },
    });
    members.forEach((member) => {
      const mailData = generateMailData(member);
      transporter.sendMail(mailData);
    });
    res.status(200);
  } catch (err) {
    res.status(500).json(err);
  }
}

function generateMailData(member) {
  return {
    from: 'jayas.secret.santa.email.bot@gmail.com',
    to: member.email,
    subject: `Your Secret Santa`,
    text: `You are buying a present for ${member.santa}`,
  };
}
