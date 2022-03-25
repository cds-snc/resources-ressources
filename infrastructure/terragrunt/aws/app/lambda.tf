resource "aws_lambda_function" "learning_resources" {

  package_type  = "Image"
  image_uri     = "${aws_ecr_repository.learning_resources.repository_url}:latest"
  function_name = "learning-frontend"
  timeout       = 300
  role          = aws_iam_role.app.arn

  environment {
    variables = {
      contentful_cda_access_token = var.contentful_cda_access_token
    }
  }

  lifecycle {
    ignore_changes = [
      image_uri,
    ]
  }

}