const client = require('@sendgrid/mail');

client.setApiKey(process.env.NEXT_PUBLIC_EMAIL_SENDGRID_API_KEY);

const INVITE_EMAIL_TEMPLATE_ID = 'd-88693e3118c64e8582c776b069507998';

export const sendInviteEmail = (email: string, sendGridProjectData: any) => {
  const templateId = INVITE_EMAIL_TEMPLATE_ID;

  const msg = {
    to: email,
    from: {
      email: 'contact@lancie.com',
      name: 'Lancie',
    },
    replyTo: 'contact@lancie.com',
    personalizations: [
      {
        to: [
          {
            email,
          },
        ],
        dynamic_template_data: sendGridProjectData,
      },
    ],
    templateId,
  };
  sendEmailWithSendGrid(msg);
};

const sendEmailWithSendGrid = (msg: object) => {
  client
    .send(msg)
    .then(() => console.log('Mail with the following data:', msg))
    .catch((error: any) => {
      console.error(error);
    });
};
