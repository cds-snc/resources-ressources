locals {
  vars = read_terragrunt_config("./staging/env_vars.hcl")
}

inputs = {
  account_id        = "${local.vars.inputs.account_id}"
  env               = "${local.vars.inputs.env}"
  region            = "ca-central-1"
  product_name      = "${local.vars.inputs.product_name}" 
}

remote_state {
  backend = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
  config = {
    encrypt        = true
    bucket         = "learning-resources-${local.vars.inputs.env}-tfstate"
    dynamodb_table = "terraform-state-lock-dynamo"
    region         = "ca-central-1"
    key            = "${path_relative_to_include()}/terraform.tfstate"
  }
}

generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite"
  contents  = file("./common/provider.tf")
}

generate "common_variables" {
  path      = "common_variables.tf"
  if_exists = "overwrite"
  contents  = file("./common/common_variables.tf")
}
