<?php
/**
 * @file
 * Nebula API endpoint.
 */

// Include libraries.
require_once __DIR__ . '/../vendor/autoload.php';
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use GuzzleHttp\Client;

// Create a Silex instance and connect the database.
$app = new Silex\Application();
$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
  'db.options' => array(
    'url'   => 'mysql://nebula:nebula@mysql:3306/nebula',
  ),
));

// Add CORS headers.
$app->after(function (Request $request, Response $response) {
  $response->headers->set("Access-Control-Allow-Origin", "*");
  $response->headers->set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
});

class ahrq {
  public $ahrq_sample = '';
}

/**
 * Make an FDA lookup for search terms, returning symptoms by incidence. 
 *
 * @param string $search
 *   An FDA API search term for a particular drug or set of drugs.
 *
 * @return object
 *   A Response.
 */
function queryFDA($search) {
  $client = new Client([
      'base_uri' => 'https://api.fda.gov/',
      'timeout'  => 2.0,
  ]);

  $response = $client->get('https://api.fda.gov/drug/event.json', [
    'http_errors' => false,
    'query' => [
      'api_key' => 'rv4OOon6fPJOHBbFHClUOs3BRGSbAEUdg3ACp2pu',
      'search' => $search,
      'count' => 'patient.reaction.reactionmeddrapt.exact'],
  ]);
  return $response;
}

function ahrq($term){
  $app = new Silex\Application();
  $app->register(new Silex\Provider\DoctrineServiceProvider(), array(
      'db.options' => array(
          'url'   => 'mysql://nebula:nebula@mysql:3306/nebula',
      ),
  ));
  $countQuery = "SELECT COUNT(*) FROM prescribed_medicines WHERE rx_name = '$term'";
  $count = $app['db']->fetchAll($countQuery)[0]['COUNT(*)'];
  return $count;
}

// API endpoint that provides a simplified interface to the FCC API,
// returning incidence of different symptoms for a given search term.
$app->get('/rx/{search}', function ($search) use ($app) {
  $fda_response = queryFDA($search);
  return new Response($fda_response->getBody(), $fda_response->getStatusCode(), ['Content-Type' => 'application/json']);
});

$app->get('/rx.json', function () use ($app) {
  $rx_names = array();
  if($app['request']->get('search')){
    $term = $app['request']->get('search');
    return queryFDA($med);
  }
  elseif($app['request']->get('ahrq')){
    $result = new ahrq();
    $term = $app['request']->get('ahrq');
     $result->ahrq_sample = ahrq($term);
     return json_encode($result);
  }
  else{
    $rx_name_sql = "SELECT rx_name FROM rx_names";
    $rx_names_results = $app['db']->fetchAll($rx_name_sql);
    foreach($rx_names_results as $rx_name){
      $rx_names[] = $rx_name['rx_name']; 
    }
    return json_encode($rx_names);
  }
});

/*
 * TO DO.
 * 
  function combinedData($med){
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
        $html .= '<div><b>Term: </b> ' . $result['term'] . '</div>';
        $html .= '<div><b>Reports: </b> ' . $result['count'] . '</div>';
    }

    return $html;
  }

  function normalize($fda_count, $ahrq_count){
    //$normalized = ($ahrq_count / $fda_count);
    return $normalized;
  }
 *
 */

$app->run();
