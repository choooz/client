echo "start jurumarble ..."

docker compose -f "./scripts/docker/docker-compose.yaml" build --no-cache

docker compose -f "./scripts/docker/docker-compose.yaml" up -d
