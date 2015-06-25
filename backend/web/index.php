<?php
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header("access-control-allow-origin: *");

// web/index.php
require_once __DIR__.'/../vendor/autoload.php';
use GuzzleHttp\Client;

$app = new Silex\Application();


function queryFDA($med){
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
      $html .= '<div><b>Term:</b> ' . $result['term'] . '</div>';
      $html .= '<div><b>Reports:</b> ' . $result['count'] . '</div>';
  }

  return $html;
}

$app->get('/rx/{med}', function ($med) use ($app) {
    return queryFDA($med);
});

$app->get('/rx.json', function () use ($app) {
  $rx_names = array();
  if($app['request']->get('search')){
    dpr($app['request']->get('search'));
    $json = array($app['request']->get('search'));
  }
  else{
    $app->register(new Silex\Provider\DoctrineServiceProvider(), array(
      'db.options' => array(
          'url'   => 'mysql://nebula:nebula@mysql:3306/nebula',
      ),
    ));

    $rx_name_sql = "SELECT rx_name FROM rx_names";
    $rx_names_results = $app['db']->fetchAll($rx_name_sql);
    foreach($rx_names_results as $rx_name){
      $rx_names[] = $rx_name['rx_name']; 
    }
    $json = $rx_names;
  }
  return json_encode($json);
});

$app->run();

