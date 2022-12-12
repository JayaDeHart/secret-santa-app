let nodemailer = require('nodemailer');
const emailTemplate = require('../../util/emailTemplate');

export default async function contact(req, res) {
  const members = req.body;
  try {
    const transporter = nodemailer.createTransport({
      port: 465,
      service: '"FastMail"',
      auth: {
        user: 'secretsantastupidthing@fastmail.com',
        pass: 'm6penblmldfdpj4e',
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
    from: 'secretsantastupidthing@fastmail.com',
    to: member.email,
    subject: `Your Secret Santa`,
    text: `Hello ${member.name}. You are buying a present for ${member.santa}.
            If its Jaya, get me something nice.
            Sent automatically via:https://secret-santa-app-9b3g.vercel.app/`,
  };
}
