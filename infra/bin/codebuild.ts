#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PatikaLambdaFunctionCodebuildStack } from '../lib/codebuild';
import { getAppEnv, getConfig } from '../lib/config';

const app = new cdk.App();
const appEnv = getAppEnv();
const conf = getConfig(app, appEnv);
const cdkEnv: cdk.Environment = { account: conf.account, region: conf.region };

new PatikaLambdaFunctionCodebuildStack(app, `PatikaLambdaFunctionCodebuildStack`, { env: cdkEnv });
