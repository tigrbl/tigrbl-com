[![Managed with wyrmctl](https://img.shields.io/badge/managed%20with-wyrmctl-2f6f4e.svg)](https://github.com/groupsum/wyrmctl)

# tigrbl.com

Product website for [tigrbl.com](https://tigrbl.com).

## Commands

- `npm ci`
- `npm run check`
- `npm run build`
- `npm run docker:build`
- `uv sync --dev`
- `npm run routing:validate`
- `npm run routing:plan` (read-only; requires Portwyrm credentials)

The repository pins `wyrmctl==0.4.6` through uv. CI validates the schema-v3 desired state in `.wyrmctl/`, and deployment delegates immutable plan/apply/verify operations to the shared Portwyrm workflow.

## Deployment

This repo owns the `tigrbl-com` application desired state and release. Pushes to the default `master` branch run CI and automatically deploy the verified commit after CI succeeds. The `Deploy` workflow also supports manual recovery runs.

The shared `cobycloud/actions` deployment workflow runs on the protected `portwyrm-deployment` runner group. It builds the Compose service, creates an immutable `wyrmctl` plan bound to the repository and commit, applies that exact artifact under the VM104 mutation lock, and verifies public HTTPS. Portwyrm itself remains shared infrastructure; this repository remains the owner of the application and its route.
