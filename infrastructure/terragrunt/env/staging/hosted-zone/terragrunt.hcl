include {
  path = find_in_parent_folders()
}

inputs = {
  zone_name     = "learning-resources.cdssandbox.xyz"
  app_zone_name = "app.learning-resources.cdssandbox.xyz"
}

terraform {
  source = "../../../aws//hosted-zone"
}
