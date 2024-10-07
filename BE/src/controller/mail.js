import nodemailer from 'nodemailer';

export const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'ksubi666@gmail.com',
      pass: 'unzdfmcqdjdyxeyo',
    },
  });
  const mailOptions = {
    from: 'ksubi666@gmail.com',
    to: options.to,
    subject: 'Food Delivery',
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:600px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Food Delivery</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Food Delivery. Use the following OTP to complete your forgot password procedures. OTP is valid for 1 minutes</p>
    <h2 style="background: #18BA51;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${options.otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />Food Delivery</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Food delivery Inc</p>
      <p>Ulaanbaatar</p>
      <p>Mongolia</p>
    </div>
  </div>
</div>`,
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (info) {
        return res.status(200).json(info.messageId);
      }
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
