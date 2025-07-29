import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiGateway } from './apiGateway';
import { WebhookAuthorizerConstruct, WebhookConstruct } from './lambdas';

export class AwsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const webhookLambda = new WebhookConstruct(this, 'textonka-webhook');
    const webhookAuthorizerLambda = new WebhookAuthorizerConstruct(
      this,
      'textonka-webhook-authorizer',
    );

    new ApiGateway(
      this,
      'textonka-api',
      'textonka-api',
      webhookLambda.handler,
      webhookAuthorizerLambda.handler,
    );
  }
}
