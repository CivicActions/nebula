# Nebula

URL to our product: TBD

This is our application to 18F's Agile BPA RFQ.  However, it is all freely sharable, and we aim to make a product 
truly valuable. Feel free to fork this code.

## Licence

For licence details, including licences of third-party free and open source software incorporated into this repository please see the LICENSE.md file.

## Development environment setup

### Requirements
1. [Docker](https://www.docker.com/)
1. [Docker Compose](http://docs.docker.com/compose/)

### Instructions

Clone the repository, and change to the project directory:
```bash
git clone git@github.com:CivicActions/nebula.git
cd nebula
```

Start docker containers:
```
docker-compose up
```
The first run will take a while. Leave this terminal running so you can review server logs as you develop.

The frontend component will be available on port 2086 http://localhost:2086
The backend component will be available on port 2095 http://localhost:2095

## Testing

There is a PHPUnit test framework available in the "testing" directory, with tests in the "testing/tests" directory. Guzzle is available for convenient testing of http endpoints.

To execute the tests run:
```bash
./bin/run-tests
```

A JUnit format report.xml is available in the "testing" directory. You can include additional PHPUnit arguments after the above command, as needed.
