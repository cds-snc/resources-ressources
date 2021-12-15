resource "aws_apigatewayv2_api" "app" {
  name          = "learning-gateway"
  protocol_type = "HTTP"
  description   = "Proxy to handle requests to our learning app lambda"

  #   endpoint_configuration {
  #     types = ["REGIONAL"]
  #   }
}

resource "aws_apigatewayv2_domain_name" "app" {
  #   regional_certificate_arn = aws_acm_certificate_validation.list_manager_certificate_validation.certificate_arn
  domain_name = var.domain_name

  domain_name_configuration {
    certificate_arn = aws_acm_certificate.app.arn
    security_policy = "TLS_1_2"

    endpoint_type = "REGIONAL"
  }

  #   endpoint_configuration {
  #     types = ["REGIONAL"]
  #   }
}

resource "aws_route53_record" "app" {
  name    = aws_apigatewayv2_domain_name.app.domain_name
  type    = "A"
  zone_id = var.hosted_zone_id
  #   zone_id = aws_route53_zone.learning_resources.zone_id

  alias {
    name                   = aws_apigatewayv2_domain_name.app.domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.app.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_apigatewayv2_integration" "app" {
  api_id           = aws_apigatewayv2_api.app.id
  integration_type = "AWS_PROXY"

  connection_type = "INTERNET"
  #   content_handling_strategy = "CONVERT_TO_TEXT"
  description        = "Learning app lambda integration"
  integration_method = "POST"
  integration_uri    = aws_lambda_function.learning_resources.invoke_arn
  #   passthrough_behavior      = "WHEN_NO_MATCH"
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

  auto_deploy = true

  #   access_log_settings {
  #     destination_arn = aws_cloudwatch_log_group.api_access.arn
  #     format          = "{\"requestId\":\"$context.requestId\", \"ip\": \"$context.identity.sourceIp\", \"caller\":\"$context.identity.caller\", \"requestTime\":\"$context.requestTime\", \"httpMethod\":\"$context.httpMethod\", \"resourcePath\":\"$context.resourcePath\", \"status\":\"$context.status\", \"responseLength\":\"$context.responseLength\"}"
  #   }
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