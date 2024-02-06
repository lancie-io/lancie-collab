export async function sendToMake({
  webhookUrl,
  data,
}: {
  webhookUrl: string;
  data: any;
}) {
  await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

const MAKE_WEBHOOK_URL_SIGNIN =
  'https://hook.eu2.make.com/uu72d595wg3zt5kvpla2j1mw28n1i94l';

export async function sendSignIn(data: any) {
  await sendToMake({ webhookUrl: MAKE_WEBHOOK_URL_SIGNIN, data });
}

const MAKE_WEBHOOK_URL_PROJECTCREATED =
  'https://hook.eu2.make.com/9wa33ly2o1e29uwozmix8p87eocdde33';

export async function sendProjectCreated(data: any) {
  await sendToMake({ webhookUrl: MAKE_WEBHOOK_URL_PROJECTCREATED, data });
}
