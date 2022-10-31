resource "aws_acm_certificate" "main" {
  domain_name               = var.domain_name
  subject_alternative_names = ["*.${var.domain_name}"]
  validation_method         = "DNS"

  tags = {
    Environment = var.env
    # change environment to var.environment
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate" "fr" {
  # only create this resource if the domain name is set
  count = var.fr_domain_name != "" ? 1 : 0

  domain_name               = var.fr_domain_name
  subject_alternative_names = ["*.${var.fr_domain_name}"]
  validation_method         = "DNS"

  tags = {
    Environment = var.env
    # change environment to var.environment
  }

  lifecycle {
    create_before_destroy = true
  }
}

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

resource "aws_route53_record" "validation_fr" {
  zone_id = var.fr_hosted_zone_id

  for_each = {
    for dvo in one(aws_acm_certificate.fr[*].domain_validation_options) : dvo.domain_name => {
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

#resource "aws_route53_record" "validation_app" {
#  zone_id = var.app_hosted_zone_id
#
#  for_each = {
#    for dvo in aws_acm_certificate.app.domain_validation_options : dvo.domain_name => {
#      name   = dvo.resource_record_name
#      type   = dvo.resource_record_type
#      record = dvo.resource_record_value
#    }
#  }
#
#  allow_overwrite = true
#  name            = each.value.name
#  records         = [each.value.record]
#  type            = each.value.type
#
#  ttl = 60
#}

resource "aws_acm_certificate_validation" "main" {
  certificate_arn         = aws_acm_certificate.main.arn
  validation_record_fqdns = [for record in aws_route53_record.validation_main : record.fqdn]
}

resource "aws_acm_certificate_validation" "fr" {
  # only create validation for fr if fr_domain_name is set
  count = var.fr_domain_name != "" ? 1 : 0

  certificate_arn         = one(aws_acm_certificate.fr[*].arn)
  validation_record_fqdns = [for record in aws_route53_record.validation_fr : record.fqdn]
}