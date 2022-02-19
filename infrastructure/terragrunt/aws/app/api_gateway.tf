resource "aws_apigatewayv2_api" "app" {
  name          = "learning-gateway"
  protocol_type = "HTTP"
  description   = "Proxy to handle requests to our learning app lambda"

}

resource "aws_apigatewayv2_domain_name" "app" {
  domain_name = var.domain_name

  domain_name_configuration {
    certificate_arn = aws_acm_certificate.app.arn
    security_policy = "TLS_1_2"

    endpoint_type = "REGIONAL"
  }

}


resource "aws_apigatewayv2_integration" "app" {
  api_id           = aws_apigatewayv2_api.app.id
  integration_type = "AWS_PROXY"

  connection_type    = "INTERNET"
  description        = "Learning app lambda integration"
  integration_method = "POST"
  integration_uri    = aws_lambda_function.learning_resources.invoke_arn
}

resource "aws_apigatewayv2_route" "app" {
  api_id    = aws_apigatewayv2_api.app.id
  route_key = "ANY /"

  target = "integrations/${aws_apigatewayv2_integration.app.id}"
}

resource "aws_apigatewayv2_deployment" "app" {
  api_id      = aws_apigatewayv2_route.app.api_id
  description = "App deployment"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_apigatewayv2_stage" "app" {
  api_id = aws_apigatewayv2_api.app.id

  deployment_id = aws_apigatewayv2_deployment.app.id
  name          = "$default"

  #   auto_deploy = true

}

resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "AllowLambdaInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.learning_resources.function_name
  principal     = "apigateway.amazonaws.com"

  # The /*/*/* part allows invocation from any stage, method and resource path
  # within API Gateway REST API.
  source_arn = "${aws_apigatewayv2_api.app.execution_arn}/*/*/"
}

resource "aws_apigatewayv2_api_mapping" "app" {
  api_id      = aws_apigatewayv2_api.app.id
  domain_name = aws_apigatewayv2_domain_name.app.id
  stage       = aws_apigatewayv2_stage.app.id
}