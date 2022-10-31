output "zone_id" {
  value = aws_route53_zone.learning_resources.zone_id
}

output "fr_zone_id" {
  value = one(aws_route53_zone.fr_learning_resources[*].zone_id)
}
