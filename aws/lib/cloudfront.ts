import { Stack, StackProps } from 'aws-cdk-lib';
import {
  CachePolicy,
  Distribution,
  experimental,
  IOrigin,
  LambdaEdgeEventType,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { join } from 'path';
import Conf from '../../src/config';

export class CloudFrontConstruct extends Stack {
  edgeFunction: experimental.EdgeFunction;
  distribution: Distribution;

  constructor(
    scope: Construct,
    id: string,
    origin: IOrigin,
    props?: StackProps,
  ) {
    super(scope, id, props);

    this.edgeFunction = new experimental.EdgeFunction(
      this,
      'textonka-validation',
      {
        runtime: lambda.Runtime.NODEJS_22_X,
        handler: 'handler',
        code: lambda.Code.fromAsset(
          join(__dirname, '../../../lambdas/tokenhandler.js'),
        ),
      },
    );

    this.distribution = new Distribution(this, `textonka-${Conf.NODE_ENV}`, {
      defaultBehavior: {
        origin,
        edgeLambdas: [
          {
            functionVersion: this.edgeFunction.currentVersion,
            eventType: LambdaEdgeEventType.VIEWER_REQUEST,
          },
        ],
        cachePolicy: CachePolicy.CACHING_DISABLED,
        viewerProtocolPolicy: ViewerProtocolPolicy.HTTPS_ONLY,
      },
    });
  }
}
