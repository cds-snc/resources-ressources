resource "aws_amplify_app" "learning_resources" {
  name       = "learning-app"
  repository = "https://github.com/cds-snc/resources-ressources"

  # Github personal access token
  # -- needed when setting up amplify for the first time
  # access_token = ""

  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - cd frontend 
            - cp .contentful.json.sample .contentful.json
            - npm install
        build:
          commands:
            - npm run generate
      artifacts:
        baseDirectory: frontend/dist
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
    contentful_cda_access_token = var.contentful_cda_access_token
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

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.learning_resources.id
  branch_name = "main"

  framework = "NuxtJS"
  stage     = "BETA"

  display_name = "beta"

  enable_pull_request_preview = true

  pull_request_environment_name = "PULL_REQUEST"

  # environment_variables = {
  # }
}

resource "aws_amplify_domain_association" "learning_resources" {
  app_id      = aws_amplify_app.learning_resources.id
  domain_name = "learning-resources.cdssandbox.xyz"

  wait_for_verification = false

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = ""
  }

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "www"
  }
}
