# tigrbl.com

Standalone MdWrk lander repository for [tigrbl.com](https://tigrbl.com).

## Commands

- `npmctl install`
- `npmctl check`
- `npmctl build`
- `npmctl docker:build`
- `npmctl dns:plan`
- `npmctl deploy:dry-run`

The local npm scripts mirror those npmctl lifecycle commands for CI and Docker workers.

## Deployment

This repo deploys as the `tigrbl-com` self-hosted Docker service. DNS is managed through Namecheap for the `tigrbl.com` zone and is declared in `site.manifest.json`.
