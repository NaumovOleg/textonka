exports.handler = async (event) => {
  const secret = process.env.TELEGRAM_SECRET_TOKEN;
  const headers = event.headers || {};
  const incomingToken = headers['x-telegram-bot-api-secret-token'];

  if (incomingToken === secret) {
    return {
      principalId: 'telegram-bot',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: event.methodArn,
          },
        ],
      },
    };
  }

  return {
    principalId: 'unauthorized',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Deny',
          Resource: event.methodArn,
        },
      ],
    },
  };
};
