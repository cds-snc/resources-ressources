resource "aws_amplify_app" "learning_resources_storybook" {
  name       = "learning-storybook"
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
            - npm install
        build:
          commands:
            - npm run build-storybook
      artifacts:
        baseDirectory: frontend/storybook-static
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

}

resource "aws_amplify_branch" "main_storybook" {
  app_id      = aws_amplify_app.learning_resources_storybook.id
  branch_name = "main"

  stage = "PRODUCTION"

  display_name = "storybook"

}

resource "aws_amplify_domain_association" "learning_resources_storybook" {
  app_id      = aws_amplify_app.learning_resources_storybook.id
  domain_name = "storybook.learning-resources.cdssandbox.xyz"

  wait_for_verification = false

  sub_domain {
    branch_name = aws_amplify_branch.main_storybook.branch_name
    prefix      = ""
  }

  sub_domain {
    branch_name = aws_amplify_branch.main_storybook.branch_name
    prefix      = "www"
  }
}
