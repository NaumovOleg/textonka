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
            NODE_ENV: Conf.NODE_ENV,
            BOT_TOKEN: Conf.BOT_TOKEN,
            DATABASE_USER: Conf.DATABASE_USER,
            DATABASE_PASSWORD: Conf.DATABASE_PASSWORD,
            DATABASE_URL: Conf.DATABASE_URL,
            SMART_WIZARD_FREE_GENERATIONS: Conf.SMART_WIZARD_FREE_GENERATIONS+'',
            QUICK_WIZARD_FREE_GENERATIONS: Conf.QUICK_WIZARD_FREE_GENERATIONS+'',
            WEBHOOK_SECRET: Conf.WEBHOOK_SECRET,
            PAYMENT_TOKEN: Conf.PAYMENT_TOKEN,
            MAX_AVAILABLE_VIDEO_SIZE: Conf.MAX_AVAILABLE_VIDEO_SIZE+'',
            AI_API_KEY: Conf.AI_API_KEY,
            IMAGE_AI_MODEL: Conf.IMAGE_AI_MODEL,
            TEXT_AI_MODEL: Conf.TEXT_AI_MODEL,
            AI_URL: Conf.AI_API_KEY,
            OFFER_LINK: Conf.OFFER_LINK,
            PRIVACY_LINK: Conf.PRIVACY_LINK,   
        },
        ...props,
    });