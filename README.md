# README

Note: for simplicity reasons the database is wiped and reseeded every time the server starts.

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

## Usage

### POST /add

Add a new entry by posting a json like this:
```
{
	"id": 1234,
	"city": "New City",
	"start_date": "10/10/2010",
	"end_date": "10/11/2010",
	"price": "3.4",
	"status": "Weekly",
	"color": "#ababab"
}
```

Returns the added object.

### POST /update/:id

Updates an entry by id and returns the updated object.
Post a json like for `POST /add`

### GET /delete/:id

Deletes an object by id and returns the deleted object.
