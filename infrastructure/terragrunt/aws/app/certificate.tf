resource "aws_acm_certificate" "main" {
  domain_name               = var.domain_name
  subject_alternative_names = ["*.${var.domain_name}"]
  validation_method         = "DNS"

  tags = {
    Environment = "staging"
    # change environment to var.environment
  }

  lifecycle {
    create_before_destroy = true
  }
}

#resource "aws_acm_certificate" "app" {
#  domain_name               = var.app_domain_name
#  subject_alternative_names = ["*.${var.app_domain_name}"]
#  validation_method         = "DNS"
#
#  tags = {
#    Environment = "staging"
#  }
#
#  lifecycle {
#    create_before_destroy = true
#  }
#}

resource "aws_route53_record" "validation_main" {
  zone_id = var.hosted_zone_id

  for_each = {
    for dvo in aws_acm_certificate.main.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  type            = each.value.type

  ttl = 60
}

resource "aws_route53_record" "validation_app" {
  zone_id = var.app_hosted_zone_id

  for_each = {
    for dvo in aws_acm_certificate.app.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  type            = each.value.type

  ttl = 60
}

resource "aws_acm_certificate_validation" "main" {
  certificate_arn         = aws_acm_certificate.main.arn
  validation_record_fqdns = [for record in aws_route53_record.validation_main : record.fqdn]
}

resource "aws_acm_certificate_validation" "app" {
  certificate_arn         = aws_acm_certificate.app.arn
  validation_record_fqdns = [for record in aws_route53_record.validation_app : record.fqdn]
}