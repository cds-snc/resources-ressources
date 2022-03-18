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
  domain_name        = "learning-resources.cdssandbox.xyz"
  app_hosted_zone_id = dependency.hosted_zone.outputs.app_zone_id
  app_domain_name    = "app.learning-resources.cdssandbox.xyz"

}

include {
  path = find_in_parent_folders()
}