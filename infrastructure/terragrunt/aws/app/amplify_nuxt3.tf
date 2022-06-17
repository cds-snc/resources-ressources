resource "aws_amplify_app" "learning_resources_nuxt3" {
  name       = "learning-app-nuxt3"
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
            - cd frontend 
            - cp .contentful.json.sample .contentful.json
            - nvm use $VERSION_NODE_16
        build:
          commands:
            - nvm use $VERSION_NODE_16
            - node -v
            - npm run generate
      artifacts:
        baseDirectory: frontend/.output/public
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

resource "aws_amplify_branch" "nuxt3" {
  app_id      = aws_amplify_app.learning_resources_nuxt3.id
  branch_name = "nuxt3"

  framework = "Nuxt3"
  stage     = "BETA"

  display_name = "beta"

  enable_pull_request_preview = true

  pull_request_environment_name = "PULL_REQUEST"

  # environment_variables = {
  # }
}

resource "aws_amplify_domain_association" "learning_resources_nuxt3" {
  app_id      = aws_amplify_app.learning_resources_nuxt3.id
  domain_name = "v3.learning-resources.cdssandbox.xyz"

  wait_for_verification = false

  sub_domain {
    branch_name = aws_amplify_branch.nuxt3.branch_name
    prefix      = ""
  }

  sub_domain {
    branch_name = aws_amplify_branch.nuxt3.branch_name
    prefix      = "www"
  }

  sub_domain {
    branch_name = aws_amplify_branch.nuxt3.branch_name
    prefix      = "en"
  }

  sub_domain {
    branch_name = aws_amplify_branch.nuxt3.branch_name
    prefix      = "fr"
  }
}
