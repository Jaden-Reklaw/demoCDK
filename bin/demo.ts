#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DemoStack } from '../lib/demo-stack';
import { PhotosStack } from '../lib/photo-stack';
import { PhotosHandlerStack } from '../lib/photo-handler-stack';

const app = new cdk.App();
const photosStack = new PhotosStack(app, 'PhotosStack');
const photosHandlerStack = new PhotosHandlerStack(app, 'PhotosHandlerStack', {
    targetBucketArn: photosStack.photosBucketArn
})