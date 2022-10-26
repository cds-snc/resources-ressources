resource "aws_route53_zone" "learning_resources" {
  name = var.zone_name
}

#resource "aws_route53_zone" "app_learning_resources" {
#  name = var.app_zone_name
#}
