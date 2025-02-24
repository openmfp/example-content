## Overview

# Contributing to openMFP
We want to make contributing to this project as easy and transparent as possible.

## Our development process
We use GitHub to track issues and feature requests, as well as accept pull requests.

## Pull requests
You are welcome to contribute with your pull requests. These steps explain the contribution process:

1. Fork the repository and create your branch from `main`.
1. [Add tests](#testing) for your code.
1. If you've changed APIs, update the documentation. 
1. Make sure the tests pass. Our GitHub actions pipeline is running the unit and e2e tests for your PR and will indicate any issues.
1. Sign the Developer Certificate of Origin (DCO).

### Starting the frontend locally

Run `npm start` to run the frontend locally.
The backend is not required to be run locally, as the frontend has a development server and the backend only serves the static ui resources.

### Building

Run `npm build` to build the project.
The build artifacts will be stored in the `dist/` directory.

## Testing

> **NOTE:** You should always add tests, if you are adding code to our repository.

Run `npm test` to execute the unit tests via [Jest](https://jestjs.io/) in the root directory of the repository.

### Test your change in a locally running OpenMFP instance

- Build your docker container using
- Load the docker image into your kind
- Modify the deployment to always pull the latest image
- Modify the deployment to use the `example-content:latest`
- restart the deployment and wait for its completion
- Patch Content Configurations to trigger a reconciliation

This can be achieved in a single command:
```bash
docker build -t example-content:latest . && \
kind load docker-image example-content:latest --name=openmfp && \
kubectl patch deployment openmfp-example-content -n openmfp-system --type='json' -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/imagePullPolicy", "value": "IfNotPresent"}]' && \
kubectl patch deployment openmfp-example-content -n openmfp-system --type='json' -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/image", "value": "example-content:latest"}]' && \
kubectl rollout restart deployment openmfp-example-content -n openmfp-system && \
kubectl rollout status deployment openmfp-example-content -n openmfp-system && \
kubectl patch contentconfiguration openmfp-example-content-ui -n openmfp-system --type='json' -p='[{"op": "replace", "path": "/spec/remoteConfiguration/internalUrl", "value": "http://openmfp-example-content.openmfp-system.svc.cluster.local:8080/ui/example-content/ui/assets/config.json?r='$(date +%s%3N)'"}]' && \
kubectl patch contentconfiguration openmfp-example-content-wc -n openmfp-system --type='json' -p='[{"op": "replace", "path": "/spec/remoteConfiguration/internalUrl", "value": "http://openmfp-example-content.openmfp-system.svc.cluster.local:8080/ui/example-content/wc/assets/config.json?r='$(date +%s%3N)'"}]'
```

**Troubleshooting**
- If you encounter error like this: 
```
    ERROR: command "docker save -o /tmp/images-tar1234567890/images.tar example-content:latest" failed with error: exit status 1
```
   Use this two commands and try again
```sh
    mkdir $HOME/tmp/
    export TMPDIR=$HOME/tmp/ 
```

- If you encounter issues when starting the pod with the loaded image you [this issue](https://github.com/kubernetes-sigs/kind/issues?q=is%3Aissue%20state%3Aopen%20load%20image). A way to circumnvent this is to disable `Use containerd for pulling and storing images` in the docker settings.

## Issues
We use GitHub issues to track bugs. Please ensure your description is
clear and includes sufficient instructions to reproduce the issue.

## License
By contributing to openMFP, you agree that your contributions will be licensed
under its [Apache-2.0 license](LICENSE).
