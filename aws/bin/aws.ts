#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AwsStack } from '../lib/aws-stack';

import Conf from '../../src/config';

const app = new cdk.App();
new AwsStack(app, `Textonka-${Conf.NODE_ENV}`, {
  env: { region: Conf.REGION, account: Conf.AWS_ACCOUNT },
});
