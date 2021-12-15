resource "aws_lambda_function" "learning_resources" {

  package_type  = "Image"
  image_uri     = "${aws_ecr_repository.learning_resources.repository_url}:latest"
  function_name = "learning-frontend"
  timeout       = 30
  role          = aws_iam_role.app.arn
  # role          = aws_iam_role.learning.arn
  #   handler = "index.test?"

  environment {
    variables = {
      ctf_cda_access_token = var.contentful_cda_access_token
    }
  }

  #   runtime = "nodejs12.x"
}