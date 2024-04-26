import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { CfnOutput, Fn } from "aws-cdk-lib";


export class PhotosStack extends cdk.Stack {
    
    private stackSuffix: string;    
    private initializeSuffix() {
        const shortStackId = Fn.select(2, Fn.split('/', this.stackId));
        this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId));
    }

    public readonly photosBucketArn: string;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.initializeSuffix()
        //logical id is PhotoBucket
        //physical name is photobucket-123abc
        const photosBucket = new Bucket(this, 'PhotosBucket2', {
            bucketName: `photos-bucket-${this.stackSuffix}`
        });

        //Assign the an internal resource to a public value to be used on other stack
        this.photosBucketArn = photosBucket.bucketArn;

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
