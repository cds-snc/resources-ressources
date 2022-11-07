resource "aws_amplify_app" "learning_resources_staging" {
  # Legacy -- keep this in old aws account only
  count      = var.env == "staging" ? 1 : 0
  name       = "Learning Resources (Staging)"
  repository = "https://github.com/cds-snc/resources-ressources"

  # Github personal access token
  # -- needed when setting up amplify or making changes
  access_token = var.gh_access_token

  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - cd app
            - cp .contentful.json.sample .contentful.json
            - npm install
        build:
          commands:
            - npm run generate
      artifacts:
        baseDirectory: app/dist
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  EOT

  # The default rewrites and redirects added by the Amplify Console.
  custom_rule {
    source = "/<*>"
    status = "404"
    target = "/index.html"
  }

  environment_variables = {
    ENV                         = "staging"
    DOMAIN_EN                   = "en.staging.learning-resources.cdssandbox.xyz"
    DOMAIN_FR                   = "fr.staging.learning-resources.cdssandbox.xyz"
    contentful_cda_access_token = var.contentful_cda_access_token
    GOOGLE_ANALYTICS_ID         = "" # Do not collect data
    GOOGLE_TAG_MANAGER_ID       = var.google_tag_manager_id
    SENTRY_DSN                  = var.sentry_dsn
  }


  enable_auto_branch_creation = true
  enable_branch_auto_deletion = true

  # The default patterns added by the Amplify Console.
  auto_branch_creation_patterns = [
    "feature*/",
    "release*",
    "fix*",
    "ci*"
  ]

  auto_branch_creation_config {
    # Enable auto build for the created branch.
    enable_auto_build             = true
    enable_pull_request_preview   = true
    pull_request_environment_name = "pr"
    stage                         = "PULL_REQUEST"
  }
}

resource "aws_amplify_branch" "staging" {
  count = var.env == "staging" ? 1 : 0

  app_id      = one(aws_amplify_app.learning_resources_staging[*].id)
  branch_name = "staging"

  framework = "NuxtJS"

  # Could be one of: PRODUCTION, BETA, DEVELOPMENT, EXPERIMENTAL, PULL_REQUEST
  stage = "BETA"

  display_name = "staging"

  enable_pull_request_preview = true

  pull_request_environment_name = "PULL_REQUEST"

  # environment_variables = {
  # }
}

resource "aws_amplify_domain_association" "learning_resources_staging" {
  count = var.env == "staging" ? 1 : 0

  app_id      = one(aws_amplify_app.learning_resources_staging[*].id)
  domain_name = "staging.learning-resources.cdssandbox.xyz"

  wait_for_verification = false

  sub_domain {
    branch_name = one(aws_amplify_branch.staging[*].branch_name)
    prefix      = ""
  }

  sub_domain {
    branch_name = one(aws_amplify_branch.staging[*].branch_name)
    prefix      = "en"
  }

  sub_domain {
    branch_name = one(aws_amplify_branch.staging[*].branch_name)
    prefix      = "fr"
  }

  sub_domain {
    branch_name = one(aws_amplify_branch.staging[*].branch_name)
    prefix      = "www"
  }
}
