aws s3 mb s3://com.cuffney.tasks --region us-east-1 --profile cuffney

sam package \
  --template-file template.yaml \
  --output-template-file packaged.yaml \
  --s3-bucket com.cuffney.tasks \
  --profile cuffney

sam deploy \
    --template-file packaged.yaml \
    --stack-name tasks-automation \
    --capabilities CAPABILITY_IAM \
    --profile cuffney