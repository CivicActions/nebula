<?php

// web/index.php
require_once __DIR__.'/../vendor/autoload.php';
use GuzzleHttp\Client;

$app = new Silex\Application();


function queryFDA($med,$sym){
  $client = new Client([
      // Base URI is used with relative requests
      'base_uri' => 'https://api.fda.gov/',
      // You can set any number of default request options.
      'timeout'  => 2.0,
  ]);

  $response = $client->get('https://api.fda.gov/drug/event.json', [
    'query' => [
      'search' => $med,
      'count' => 'patient.reaction.reactionmeddrapt.exact']
  ]);
  $data = json_decode((string) $response->getBody(), TRUE);
  
  foreach($data['results'] as $result){
    if(strtolower($result['term']) == strtolower($sym)){
      $html .= '<div><b>Symptom:</b> ' . ucwords(strtolower($result['term'])) . '</div>';
      $html .= '<div><b>Reports:</b> ' . $result['count'] . '</div>';
    }
  }

  // Test MYSQL
  $db = new PDO('mysql:host=mysql;dbname=nebula;charset=utf8', 'nebula', 'nebula');

  return $html;
}

$app->get('/drug/{med}/{sym}', function ($med,$sym) use ($app) {
    return queryFDA($med,$sym);
});

$app->run();
