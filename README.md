# Installation

Download the Internet:
```
docker-compose run --rm app npm install
```

# Development

Watch your code in real time:
```
docker-compose run --rm -p 8080:8080 app npm run watch 
```

# Build (production)

First build your app:
```
docker-compose run --rm app npm run build
```
Generated code will be in `dist` folder.
To test it locally, you can run a server locally with:
```
docker-compose run --rm -p 8080:8080 app npm run start
```
