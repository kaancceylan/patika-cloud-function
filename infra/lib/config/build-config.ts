import { App } from 'aws-cdk-lib';
import { Construct } from 'constructs';

interface Config {
  account: string;
  region: string;
  virginiaACMCertArn: string;
  memorySizeInMb: number;
  timeoutInSec: number;
}

enum APP_ENV {
  DEV = 'dev',
  PROD = 'prod',
}

const getConfig = (scope: App | Construct, appEnv: string) => {
  const context = scope.node.tryGetContext(appEnv);

  const conf: Config = {
    account: context.account,
    region: context.region,
    virginiaACMCertArn: context.virginiaACMCertArn,
    memorySizeInMb: context.memorySizeInMb,
    timeoutInSec: context.timeoutInSec,
  };

  return conf;
}

const getAppEnv = (): string => {
  const appEnv = process.env.APP_ENV || 'dev';

  if (Object.values(APP_ENV).includes(appEnv as APP_ENV)) {
    return appEnv;
  } else {
    throw new Error(`
      Unrecognized application environment stage supplied. \n
      Please supply ${APP_ENV.PROD}]
    `);
  }
}


export {
  getConfig,
  getAppEnv,
}
