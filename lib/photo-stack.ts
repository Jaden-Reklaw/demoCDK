import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { Fn } from 'aws-cdk-lib';


export class PhotoStack extends cdk.Stack {
    
    private stackSuffix: string;    
    private initializeSuffix() {
        const shortStackId = Fn.select(2, Fn.split('/', this.stackId));
        this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId));
    }

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.initializeSuffix()
        //logical id is PhotoBucket
        //physical name is photobucket-123abc
        new Bucket(this, 'PhotoBucket', {
            bucketName: `photos-bucket-${this.stackSuffix}`
        });

        // if you check the logical id it will
        // create a new resource
        // delete the old resource
        // don't mess with the logical id but if you have to

        // const myBucket = new Bucket(this, 'PhotoBucket2', {
        //     bucketName: 'photobucket-aj7d8m'
        // });

        // (myBucket.node.defaultChild as CfnBucket).overrideLogicalId('photobucket-123abc')
  }
}
