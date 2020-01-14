# README

## Setup

1) To setup add a config/config.json file like this one: 

```
{
    "development": {
      "PORT": 3000,
      "MONGODB_URI": "mongodb://localhost:27017/SMSBackend"
    },
    "test": {
      "PORT": 3000,
      "MONGODB_URI": "mongodb://localhost:27017/SMSBackend"
    }
}
```

2) Install dependencies

```
npm install
```

## Start 

1) Start a (local) mongodb database

```
cd mongo/bin
./mongod --dbpath ~/mongo-data
```

2) Start server

```
node server.js
```