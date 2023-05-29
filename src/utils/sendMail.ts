import { render } from '@react-email/render';
import nodemailer from 'nodemailer';

const sendRegisterEmail = async (userData:any) => {
  // Configurar el transporte de correo electrónico
  const transporter = nodemailer.createTransport({
    service: "Outlook",
    auth: {
      user: "steverova0594@outlook.com",
      pass: "Um/W^22hEb*%)6M",
    },
  });

  const mailOptions = {
    from: "steverova0594@outlook.com",
    to: userData.email,
    subject: "Welcomw to explora",
    text: "Su contraseña de acceso es: "+ userData.password,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("A message register sent to email address");
    return true;
  } catch (error) {
    console.error("An error occurred while sending the e-mail");
    console.log(error);
    return false;
  }
};