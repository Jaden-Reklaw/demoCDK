import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { Duration } from 'aws-cdk-lib';
import { CfnOutput } from 'aws-cdk-lib';

//L3 Resource
class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id)

    new Bucket(this, 'MyL3Bucket', {
      lifecycleRules: [{
        expiration: Duration.days(expiration)
      }]
    });
  }
}
export class DemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //create an s3 bucket 3 ways

    //L1 Resource
    new CfnBucket(this, 'MyL1Bucket', {
      lifecycleConfiguration: {
        rules: [{
          expirationInDays: 1,
          status: 'Enabled'
        }]
      }
    });

    //L2 Resource
    const myL2Bucket = new Bucket(this, 'MyL2Bucket', {
      lifecycleRules: [{
        expiration: Duration.days(2)
      }]
    });

    //how to send output info to cloudformation using cdk
    //this will list the name of the bucket in cloudformation in the output tab
    new CfnOutput(this, 'MyL2BucketName', {
      value: myL2Bucket.bucketName
    })

    new L3Bucket(this, 'MyL3Bucket', 3)
  }
}
