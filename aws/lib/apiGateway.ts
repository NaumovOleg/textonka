import { Duration } from 'aws-cdk-lib';
import {
  IdentitySource,
  LambdaIntegration,
  RequestAuthorizer,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import Conf from '../../src/config';
export class ApiGateway extends Construct {
  restApi: RestApi;

  constructor(
    scope: Construct,
    id: string,
    restApiName: string,
    handler: NodejsFunction,
    authorizerFn: NodejsFunction,
  ) {
    super(scope, id);

    this.restApi = new RestApi(this, 'textonka', {
      restApiName,
      deployOptions: { stageName: Conf.NODE_ENV },
      binaryMediaTypes: ['*/*'],
    });

    const integration = new LambdaIntegration(handler, {
      proxy: true,
      allowTestInvoke: false,
    });

    const authorizer = new RequestAuthorizer(this, 'HeaderAuthorizer', {
      handler: authorizerFn,
      identitySources: [
        IdentitySource.header('x-telegram-bot-api-secret-token'),
      ],
      resultsCacheTtl: Duration.seconds(0),
    });

    const resource = this.restApi.root.addResource('telegraf');
    resource.addMethod('ANY', integration, { authorizer });
    resource.addProxy({ defaultIntegration: integration, anyMethod: true });
  }
}
