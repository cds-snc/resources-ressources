terraform {
  source = "../../../aws//app"
}

include {
  path = find_in_parent_folders()
}