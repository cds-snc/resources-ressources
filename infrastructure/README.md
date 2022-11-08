### Learning Resources AWS Infrastructure Diagram
![AWS infrastructure diagram.  Full text description follows.](docs/architecture-aws-lr.png)

The frontend application is hosted on AWS on the AWS Amplify service. Amplify is currently setup to watch for changes on the corresponding branch and deploy those new changes immediately.

There are currently two Amplify applications, one for each environment/branch.
The production environment is linked to the `main` branch
The staging environment is linked to the `staging` branch which is the default development branch.

There is currently only one Contentful environment, which is `master`. Both staging and prod pull content from the `master` environment on Contentful.

All new pull requests on `staging` will spin up a Preview; Amplify deploys the code and generates a preview URL where you can test the code in a PR environment.

### Environment variables
- `contentful_cda_access_token`: Access token for connecting to contenful

### Deployment strategy
```mermaid
flowchart TD
  subgraph AmplifyStaging[Amplify Staging]
    direction LR
    Provision([Provision]) --> Build([Build]) --> Deploy([Deploy])
  end
  subgraph AmplifyProduction[Amplify Production]
    direction LR
    ProvisionProd([Provision]) --> BuildProd([Build]) --> DeployProd([Deploy])
  end
  subgraph staging[Staging]
    direction LR
    PR([Create Pull Request]) --> AmplifyPreview{{Amplify Preview}}--> Merge([Merge to staging]) --> AmplifyStaging
  end
  subgraph prod[Production]
    direction LR
    Release([Create Release PR from staging]) --> MergeToMain([Merge to main]) --> AmplifyProduction
  end
staging --> prod
```
