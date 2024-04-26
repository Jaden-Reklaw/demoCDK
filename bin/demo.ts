#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DemoStack } from '../lib/demo-stack';
import { PhotosStack } from '../lib/photo-stack';
import { PhotosHandlerStack } from '../lib/photo-handler-stack';
import { BucketTagger } from './tags';

const app = new cdk.App();
const photosStack = new PhotosStack(app, 'PhotosStack');
const photosHandlerStack = new PhotosHandlerStack(app, 'PhotosHandlerStack', {
    targetBucketArn: photosStack.photosBucketArn
});

const tagger = new BucketTagger('level', 'test');
cdk.Aspects.of(app).add(tagger);