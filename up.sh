#!/bin/bash
# Always enable Docker BuildKit and Compose CLI build
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

docker compose -f docker-compose.staging.yml up --build -d
