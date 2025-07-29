import { Duration } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';
import Conf from '../../../src/config';
import { LambdaFactoryConstruct } from './factory';

export class WebhookConstruct extends Construct {
    handler: NodejsFunction;

    constructor(scope: Construct, id: string,) {
        super(scope, id);

        this.handler = LambdaFactoryConstruct(this, 'DentalBoxChat', {
            functionName: `textonka-webhook-${Conf.NODE_ENV}`,
            timeout: Duration.seconds(20),
            memorySize: 200,
            entry: join(__dirname, `../../../lambdas/handler.js`),
            handler: 'handler',
        });
    }

    addEnvironments(envs: { [key: string]: string }) {
        Object.entries(envs).forEach(([key, value]) => this.handler.addEnvironment(key, value));
    }
}