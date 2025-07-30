import { Duration } from 'aws-cdk-lib';
import { FunctionOptions, ILayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

import Conf from '../../../src/config';

type Props = {
    name: string;
    functionName: string;
    entry: string;
    handler: string;
    layers?: ILayerVersion[];
} & FunctionOptions;

export const LambdaFactoryConstruct = (scope: Construct, id: string, props: Partial<Props>) =>
    new NodejsFunction(scope, id, {
        timeout: Duration.minutes(15),
        memorySize: 300,
        retryAttempts: 0,
        runtime: Runtime.NODEJS_22_X,
        environment: {
            BOT_TOKEN: Conf.BOT_TOKEN,
            DATABASE_USER: Conf.DATABASE_USER,
            DATABASE_PASSWORD: Conf.DATABASE_PASSWORD,
            SMART_WIZARD_FREE_GENERATIONS: Conf.SMART_WIZARD_FREE_GENERATIONS+'',
            DATABASE_URL: Conf.DATABASE_URL,
            AI_API_KEY: Conf.AI_API_KEY,
            AI_MODEL: Conf.AI_MODEL,
            NODE_ENV: Conf.NODE_ENV
        },
        ...props,
    });