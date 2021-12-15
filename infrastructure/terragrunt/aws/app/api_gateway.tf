resource "aws_apigatewayv2_api" "app" {
  name        = "learning-gateway"
  protocol_type = "HTTP"
  description = "Proxy to handle requests to our learning app lambda"

#   endpoint_configuration {
#     types = ["REGIONAL"]
#   }
}

resource "aws_apigatewayv2_domain_name" "app" {
#   regional_certificate_arn = aws_acm_certificate_validation.list_manager_certificate_validation.certificate_arn
  domain_name              = "${var.domain_name}"

  domain_name_configuration {
    certificate_arn         = aws_acm_certificate.app.arn
    security_policy          = "TLS_1_2"

    endpoint_type   = "REGIONAL"
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
  api_id                   = aws_apigatewayv2_api.app.id
  integration_type          = "AWS_PROXY"

  connection_type           = "INTERNET"
#   content_handling_strategy = "CONVERT_TO_TEXT"
  description               = "Learning app lambda integration"
  integration_method        = "POST"
  integration_uri           = aws_lambda_function.learning_resources.invoke_arn
#   passthrough_behavior      = "WHEN_NO_MATCH"
}

resource "aws_apigatewayv2_route" "app" {
  api_id    = aws_apigatewayv2_api.app.id
  route_key = "ANY /"

  target = "integrations/${aws_apigatewayv2_integration.app.id}"
}

# resource "aws_api_gateway_base_path_mapping" "app" {
#   api_id      = aws_api_gateway_rest_api.api.id
#   stage_name  = aws_api_gateway_stage.api.stage_name
#   domain_name = aws_api_gateway_domain_name.api.domain_name
# }

# resource "aws_api_gateway_resource" "resource" {
#   rest_api_id = aws_api_gateway_rest_api.api.id
#   parent_id   = aws_api_gateway_rest_api.api.root_resource_id
#   path_part   = "{proxy+}"
# }

# resource "aws_api_gateway_method" "method" {
#   # checkov:skip=CKV_AWS_59: Public access is required for this API.  Sensitive methods are protected by an API auth key.
#   rest_api_id   = aws_api_gateway_rest_api.api.id
#   resource_id   = aws_api_gateway_resource.resource.id
#   http_method   = "ANY"
#   authorization = "NONE"
#   request_parameters = {
#     "method.request.path.proxy" = true
#   }
# }

# resource "aws_api_gateway_method_settings" "all" {
#   rest_api_id = aws_api_gateway_rest_api.api.id
#   stage_name  = aws_api_gateway_stage.api.stage_name
#   method_path = "*/*"

#   settings {
#     metrics_enabled = true
#     logging_level   = "ERROR"
#   }
# }

# resource "aws_api_gateway_method_response" "api_response_200" {
#   rest_api_id = aws_api_gateway_rest_api.api.id
#   resource_id = aws_api_gateway_resource.resource.id
#   http_method = aws_api_gateway_method.method.http_method
#   status_code = "200"

#   response_models = {
#     "application/json" = "Empty"
#   }
# }

# resource "aws_api_gateway_integration" "integration" {
#   rest_api_id = aws_api_gateway_rest_api.api.id
#   resource_id = aws_api_gateway_resource.resource.id
#   http_method = aws_api_gateway_method.method.http_method

#   integration_http_method = "POST"
#   type                    = "AWS_PROXY"
#   uri                     = aws_lambda_function.api.invoke_arn

#   request_parameters = {
#     "integration.request.path.proxy" = "method.request.path.proxy"
#   }
# }

# resource "aws_api_gateway_integration_response" "integration_response" {
#   rest_api_id = aws_api_gateway_rest_api.api.id
#   resource_id = aws_api_gateway_resource.resource.id
#   http_method = aws_api_gateway_method.method.http_method
#   status_code = aws_api_gateway_method_response.api_response_200.status_code

#   response_templates = {
#     "application/json" = ""
#   }
# }

# resource "aws_api_gateway_deployment" "api" {
#   rest_api_id = aws_api_gateway_rest_api.api.id

#   lifecycle {
#     create_before_destroy = true
#   }
# }

# resource "aws_api_gateway_stage" "api" {
#   # checkov:skip=CKV_AWS_120: Caching is not wanted for this API
#   # checkov:skip=CKV2_AWS_29: False-positive, stage is associated in waf.tf
#   deployment_id        = aws_api_gateway_deployment.api.id
#   rest_api_id          = aws_api_gateway_rest_api.api.id
#   stage_name           = "v1"
#   xray_tracing_enabled = true

#   access_log_settings {
#     destination_arn = aws_cloudwatch_log_group.api_access.arn
#     format          = "{\"requestId\":\"$context.requestId\", \"ip\": \"$context.identity.sourceIp\", \"caller\":\"$context.identity.caller\", \"requestTime\":\"$context.requestTime\", \"httpMethod\":\"$context.httpMethod\", \"resourcePath\":\"$context.resourcePath\", \"status\":\"$context.status\", \"responseLength\":\"$context.responseLength\"}"
#   }
# }