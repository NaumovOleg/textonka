type Event = {
  methodArn: string;
  headers: { [name: string]: string };
};

export const handler = async (event: Event) => {
  const headers = event.headers || {};
  const incomingToken =
    headers['X-Telegram-Bot-Api-Secret-Token'] ??
    headers['x-telegram-bot-api-secret-token'];
  const isPermitted = incomingToken === process.env.WEBHOOK_SECRET;

  return {
    principalId: isPermitted ? 'telegram-bot' : 'unauthorized',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: isPermitted ? 'Allow' : 'Deny',
          Resource: event.methodArn,
        },
      ],
    },
  };
};
