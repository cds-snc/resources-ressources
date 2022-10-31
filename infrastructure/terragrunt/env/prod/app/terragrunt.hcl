terraform {
  source = "../../../aws//app"
}

dependencies {
  paths = ["../hosted-zone"]
}

dependency "hosted_zone" {
  config_path = "../hosted-zone"

  mock_outputs_allowed_terraform_commands = ["init", "fmt", "validate", "plan", "show"]
  mock_outputs = {
    hosted_zone_id = ""
  }
}
inputs = {
  hosted_zone_id     = dependency.hosted_zone.outputs.zone_id
  domain_name        = "resources.alpha.canada.ca"
  fr_hosted_zone_id = dependency.hosted_zone.outputs.fr_zone_id
  fr_domain_name = "ressources.alpha.canada.ca"
}

include {
  path = find_in_parent_folders()
}