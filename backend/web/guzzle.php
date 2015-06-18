<?php
require_once __DIR__.'/../vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client([
    // Base URI is used with relative requests
    'base_uri' => 'https://api.fda.gov/',
    // You can set any number of default request options.
    'timeout'  => 2.0,
]);
/*
$response = $client->get('https://api.fda.gov/drug/event.json?search=patient.drug.openfda.pharm_class_epc:"nonsteroidal+anti-inflammatory+drug"&count=patient.reaction.reactionmeddrapt.exact');
 * 
 */

$response = $client->get('https://api.fda.gov/drug/event.json', [
  'query' => [
    'search' => 'patient.drug.openfda.pharm_class_epc:"nonsteroidal+anti-inflammatory+drug"',
    'count' => 'patient.reaction.reactionmeddrapt.exact']
]);
//print $response;
print $response->getStatusCode();
print_r($response->json());

