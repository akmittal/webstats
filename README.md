# webstats
WebStats collects data like compression, IP version, HTTP version, Generator used and image formats for [top million site](https://majestic.com/reports/majestic-million)

## Run Node server

``` bash
cd ./bin/images/
npm install
node image.js
```

## Run go crawler on all sites
``` bash
go get ./...
go build -o webstats main.go
webstats crawler
```

## Run client
``` bash
webstats server
cd webapp
npm i
npm run dev
```
client will be rinning on http://localhost:3000