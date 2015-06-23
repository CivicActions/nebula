# Nebula

URL to our product: TBD

This is our application to 18F's Agile BPA RFQ.  However, it is all freely sharable, and we aim to make a product 
truly valuable. Feel free to fork this code.

## Licence

For licence details, including licences of third-party free and open source software incorporated into this repository please see the LICENSE.md file.

## Development environment setup

The development environment is fully self-contained, and is based on Docker and Docker Compose.

### Requirements
1. [Docker](https://www.docker.com/)
1. [Docker Compose](https://docs.docker.com/compose/)

### Instructions

Clone the repository, and change to the project directory:
```bash
git clone git@github.com:CivicActions/nebula.git
cd nebula
```

If you are using boot2docker, make sure it is started up and it's shell environment variable are available before continuing.

To start docker containers, initiate database schemas and import:
```
./bin/build
```
The first run will take a while. Use this command to restart containers if you reboot your workstation.

* The frontend component will be available on port 2086 http://localhost:2086 (if on boot2docker it will be on your boot2docker IP).
* The backend component will be available on port 2095 http://localhost:2095 (if on boot2docker it will be on your boot2docker IP).
* To view logs run `docker-compose logs`.
* To stop the containers run `docker-compose stop`.
* If the backendphp container is modified, rebuild the containers using `docker-compose rm` followed by `./bin/build`.

## Testing

There is a PHPUnit test framework available in the "testing" directory, with tests in the "testing/tests" directory. Guzzle is available for convenient testing of http endpoints.

To execute the tests run:
```bash
./bin/run-tests
```

A JUnit format report.xml is available in the "testing" directory. You can include additional PHPUnit arguments after the above command, as needed.

### Automated Testing

A sample Jenkins configuration is available in the devops/jenkins/testing/config.xml directory. This will, upon each git push to github:
* Bootstrap docker-compose and start the containers.
* Run the tests and record the results.
* Report the result to a Slack channel.

## Deployment

### Requirements
1. [Docker](https://www.docker.com/)
1. [Docker Compose](https://docs.docker.com/compose/)
1. [Docker Machine](https://docs.docker.com/machine/)
