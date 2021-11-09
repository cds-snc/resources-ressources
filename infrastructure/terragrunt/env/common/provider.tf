
terraform {
  required_version = "= 1.0.7"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region              = var.region
  allowed_account_ids = [var.account_id]
}

provider "aws" {
  alias  = "ca-central-1"
  region = "ca-central-1"
}
