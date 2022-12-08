let nodemailer = require('nodemailer');
const emailTemplate = require('../../util/emailTemplate');

export default async function (req, res) {
  const members = req.body;
  try {
    const transporter = nodemailer.createTransport({
      port: 465,
      service: 'Yandex',
      auth: {
        user: 'jayas-secret-santa@yandex.com',
        pass: 'hafhktyajwkwsoes',
      },
    });

    for (let x = 0; x < members.length; x++) {
      const mailData = generateMailData(members[x]);
      transporter.sendMail(mailData);
    }
    res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(500).json(err);
  }
}

function generateMailData(member) {
  return {
    from: 'jayas-secret-santa@yandex.com',
    to: member.email,
    subject: `Your Secret Santa`,
    text: `You are buying a present for ${member.santa}`,
  };
}
