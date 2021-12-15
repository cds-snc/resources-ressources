resource "aws_acm_certificate" "app" {
  domain_name       = var.domain_name
  validation_method = "DNS"

  tags = {
    Environment = "staging"
  }

  lifecycle {
    create_before_destroy = true
  }
}