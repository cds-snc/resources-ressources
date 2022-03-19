variable "contentful_cda_access_token" {
  type      = string
  sensitive = true
}

variable "domain_name" {
  type = string
}

variable "app_domain_name" {
  type = string
}

variable "hosted_zone_id" {
  type = string
}

variable "app_hosted_zone_id" {
  type = string
}
