### Learning Resources AWS Infrastructure Diagram
![AWS infrastructure diagram.  Full text description follows.](docs/architecture-aws-lr.png)

The frontend application is hosted on AWS on the AWS Amplify service. Amplify is currently setup to watch for changes on the `main` branch and deploy those new changes immediately.

### Environment variables
- `contentful_cda_access_token`: Access token for connecting to contenful

### Deployment strategy
```mermaid
flowchart LR
  subgraph Amplify
    direction LR
    Provision([Provision]) --> Build([Build]) --> Deploy([Deploy])
  end
  PR([Create Pull Request]) --> Merge([Merge to main]) --> Amplify
```
