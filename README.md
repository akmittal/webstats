# webstats
WebStats collects data like compression, IP version, HTTP version, Generator used and image formats for(https://majestic.com/reports/majestic-million)[top million site

## Run Node server

``` bash
cd ./bin/images/
npm i
node image.js
```

## Run go crawler
``` bash
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