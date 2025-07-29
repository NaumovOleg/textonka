import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiGateway } from './apiGateway';
import { WebhookConstruct } from './lambdas';

export class AwsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const webhookLambda = new WebhookConstruct(this, 'textonka-webhook');

    new ApiGateway(
      this,
      'textonka-api',
      'textonaka-api',
      webhookLambda.handler,
    );
  }
}
