resource "aws_route53_zone" "learning_resources" {
  name = var.zone_name
}

#resource "aws_route53_zone" "app_learning_resources" {
#  name = var.app_zone_name
#}
resource "aws_route53_zone" "fr_learning_resources" {
  # only create the zone if the zone name is not empty
  count = var.fr_zone_name != "" ? 1 : 0
  name = var.fr_zone_name
}
