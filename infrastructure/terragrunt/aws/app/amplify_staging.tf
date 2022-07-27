resource "aws_amplify_app" "learning_resources_staging" {
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
    contentful_cda_access_token = var.contentful_cda_access_token_staging
    GOOGLE_ANALYTICS_ID         = var.google_analytics_id_none
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
  app_id      = aws_amplify_app.learning_resources_staging.id
  branch_name = "staging"

  framework = "NuxtJS"
  stage     = "BETA"

  display_name = "beta"

  enable_pull_request_preview = true

  pull_request_environment_name = "PULL_REQUEST"

  # environment_variables = {
  # }
}

resource "aws_amplify_domain_association" "learning_resources_staging" {
  app_id      = aws_amplify_app.learning_resources_staging.id
  domain_name = "staging.learning-resources.cdssandbox.xyz"

  wait_for_verification = false

  sub_domain {
    branch_name = aws_amplify_branch.staging.branch_name
    prefix      = ""
  }

  sub_domain {
    branch_name = aws_amplify_branch.staging.branch_name
    prefix      = "en"
  }

  sub_domain {
    branch_name = aws_amplify_branch.staging.branch_name
    prefix      = "fr"
  }

  sub_domain {
    branch_name = aws_amplify_branch.staging.branch_name
    prefix      = "www"
  }
}
