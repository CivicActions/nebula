# Continuous Monitoring

> Continuous Monitoring is a risk management approach to cybersecurity that maintains an accurate picture of an agency’s security risk posture, provides visibility into assets, and leverages use of automated data feeds to quantify risk, ensure effectiveness of security controls, and implement prioritized remedies. - [https://cio.gov/protect/continuous-monitoring](https://cio.gov/protect/continuous-monitoring/)

## Summary
CivicActions has validated the deployment of the nebula application in a configuration that includes continuous monitoring. 

This configuration includes:
* deploying the application onto 18F's FISMA-READY Ubuntu LTS (See: https://github.com/fisma-ready/ubuntu-lts)
* automated SCAP scanning of the server
* identification of vulnerability feeds
* monitoring of server status

The purpose of this document is to provide evidence of integrating security and continuous monitoring into the agile delivery of IT services. 

## 18F's FISMA-READY Ubuntu LTS 
[18F's FISMA-READY Ubuntu LTS](https://github.com/fisma-ready/ubuntu-lts), provides guidance for a "hardened, FISMA Ready Ubuntu LTS Amazon Machine Instances (AMIs) that are suitable for use in Amazon Web Services (AWS)" that "inherit AWS controls assessed by the FedRAMP program" when instantitated in AWS's  US-East or US-West regions.

We cloned the FISMA-Ready LTS Ubuntu repository and ran the `ami.sh` script to generate the publicly available FISMA-Ready LTS Ubuntu 14.04 AMI (`ami-b7393887`) in AWS region `us-west-2`.

We then tested our deployment scripts using `ami-b7393887` instead of the default Docker Ubuntu 14.04 AMI through configuration settings of AWS environmental variables:
```bash
export AWS_DEFAULT_REGION="us-west-2"
export AWS_AMI=ami-b7393887
export AWS_ROOT_SIZE=30
```





## Evidence
