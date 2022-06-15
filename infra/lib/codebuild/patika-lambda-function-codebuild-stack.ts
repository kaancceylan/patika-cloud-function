import {
  Stack,
  StackProps,
  aws_s3,
  aws_codebuild,
  Fn
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class PatikaLambdaFunctionCodebuildStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const artifactsBucket = aws_s3.Bucket.fromBucketAttributes(this, 'PatikaLambdaFunctionArtifactsBucket', {
      bucketArn: Fn.importValue('PatikaFunctionArtifactsBucketARN'),
      bucketName: Fn.importValue('PatikaFunctionArtifactsBucketName'),
    });

    const project = new aws_codebuild.Project(this, 'PatikaLambdaFunctionCodebuildProject', {
      projectName: 'patika-cloud-function',
      source: aws_codebuild.Source.gitHub({
        owner: 'azmimengu',
        repo: 'patika-cloud-function',
        branchOrRef: 'main',
      }),
      environment: {
        buildImage: aws_codebuild.LinuxBuildImage.STANDARD_5_0,
      },
      buildSpec: aws_codebuild.BuildSpec.fromSourceFilename('buildspec.yml'),
      artifacts: aws_codebuild.Artifacts.s3({
        bucket: artifactsBucket,
        includeBuildId: false,
        packageZip: true,
        path: 'patika-cloud-function',
      }),
    });

  }
}
