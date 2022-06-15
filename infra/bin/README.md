### Deploy Lambda Function
APP_ENV=dev LAMBDA_ARTIFACT_TAG=dev-v1.0.0 cdk synth --app "npx ts-node bin/lambda.ts" PatikaLambdaStack-dev
APP_ENV=dev LAMBDA_ARTIFACT_TAG=dev-v1.0.0 cdk deploy --app "npx ts-node bin/lambda.ts" PatikaLambdaStack-dev

### Deploy Codebuild Stack Function
APP_ENV=dev cdk synth --app "npx ts-node bin/codebuild.ts" PatikaLambdaFunctionCodebuildStack
APP_ENV=dev cdk deploy --app "npx ts-node bin/codebuild.ts" PatikaLambdaFunctionCodebuildStack

### Start codebuild build project script
aws codebuild start-build --project-name patika-cloud-function --environment-variables-override "[{\"name\":\"LAMBDA_ARTIFACT_TAG\",\"value\":\"dev-v1.0.0\"}]" --source-version main
