import { Duration } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';
import Conf from '../../../src/config';
import { LambdaFactoryConstruct } from './factory';

export class WebhookAuthorizerConstruct extends Construct {
    handler: NodejsFunction;

    constructor(scope: Construct, id: string,) {
        super(scope, id);

        this.handler = LambdaFactoryConstruct(this, `Textonka-authorizer-${Conf.NODE_ENV}`, {
            functionName: `textonka-webhook-authorizer-${Conf.NODE_ENV}`,
            timeout: Duration.seconds(10),
            memorySize: 128,
            entry: join(__dirname, `../../../lambdas/authorizer.js`),
            handler: 'handler',
            environment: {
                WEBHOOK_SECRET: Conf.WEBHOOK_SECRET,
            },
        });
    }

    addEnvironments(envs: { [key: string]: string }) {
        Object.entries(envs).forEach(([key, value]) => this.handler.addEnvironment(key, value));
    }
}