import { Request, Response, NextFunction } from 'express';

import twilio from 'twilio';

const { MessagingResponse } = require('twilio').twiml;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twClient = twilio(accountSid, authToken);

export const smsController = {
  createMessage: async (req: Request, res: Response, next: NextFunction) => {
    const message = await twClient.messages.create({
      body: req.body.message,
      from: `${process.env.TWILIO_PHONE_NUMBER}`,
      to: `+1${req.body.phone}`,
    });
    console.log('Message sent successfully:', message.body);
    res.locals!.message = message;
    return next();
  },
  smsResponse: async (req: Request, res: Response, next: NextFunction) => {
    const twiml = new MessagingResponse();
    twiml.message('The Robots are coming! Head for the hills!');
    res.type('text/xml').send(twiml.toString());
    next();
  },
};
