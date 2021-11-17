resource "aws_ecr_repository" "learning_resources" {
  name                 = "${var.product_name}/frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}