import nodemailer from 'nodemailer';

import { SMTP } from '../constants.js';

import env from './env.js';

let config = {
  host: env(SMTP.HOST),
  port: Number(env(SMTP.PORT)),
  auth: {
    user: env(SMTP.USER),
    pass: env(SMTP.PASSWORD),
  },
};

let transporter = nodemailer.createTransport(config);

const sendMail = options => transporter.sendMail(options);

export default sendMail;
