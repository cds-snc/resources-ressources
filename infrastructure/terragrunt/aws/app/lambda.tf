resource "aws_lambda_function" "learning_resources" {

    package_type  = "Image"
    image_uri     = "${aws_ecr_repository.learning_resources.repository_url}:latest"
    function_name = "frontend"
    role          = aws_iam_role.app.arn
    # role          = aws_iam_role.learning.arn
    handler       = "index.test"
  
    runtime = "nodejs12.x"
}