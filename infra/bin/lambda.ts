#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PatikaLambdaStack } from '../lib/lambda';
import { getAppEnv, getConfig } from '../lib/config';

const app = new cdk.App();
const appEnv = getAppEnv();
const conf = getConfig(app, appEnv);
const cdkEnv: cdk.Environment = { account: conf.account, region: conf.region };

new PatikaLambdaStack(app, `PatikaLambdaStack-${appEnv}`, { env: cdkEnv });
