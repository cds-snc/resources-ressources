default: help

help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##/→/'

apply: 		## Terragrunt apply all resources
	cd terragrunt/env/staging &&\
	terragrunt run-all apply

apply-prod: 		## Terragrunt apply all resources
	cd terragrunt/env/prod &&\
	terragrunt run-all apply

checkov: 	## Checkov security static analysis
	checkov -d terragrunt/aws

fmt: 		## Format all .tf files
	cd terragrunt/aws &&\
	terraform fmt -recursive

hclfmt: 	## Format all .hcl files
	cd terragrunt/env/staging &&\
	terragrunt run-all hclfmt

hclfmt-prod: 	## Format all .hcl files
	cd terragrunt/env/prod &&\
	terragrunt run-all hclfmt

plan: 		## Terragrunt plan all resources
	cd terragrunt/env/staging &&\
	terragrunt run-all plan

plan-prod: 		## Terragrunt plan all resources
	cd terragrunt/env/prod &&\
	terragrunt run-all plan

validate: 	## Terragrunt validate all resources
	cd terragrunt/env/staging &&\
	terragrunt run-all validate

validate-prod: 	## Terragrunt validate all resources
	cd terragrunt/env/prod &&\
	terragrunt run-all validate

.PHONY: \
	apply \
	apply-prod \
	checkov \
	default \	
	fmt \
	hclfmt \
	hclfmt-prod \
	help \	
	plan \
	plan-prod \
	validate \
	validate-prod
