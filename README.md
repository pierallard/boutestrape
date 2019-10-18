docker-compose run --rm app npm install
docker-compose run --rm app npm run build
docker-compose run --rm -p 8080:8080 app npm run start
docker-compose run --rm -p 8080:8080 app npm run watch
