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
    'http_errors' => FALSE,
    'query' => [
      'api_key' => $_ENV['FDA_API_KEY'],
      'search' => $search,
      'count' => 'patient.reaction.reactionmeddrapt.exact'],
  ]);
  return $response;
}

/**
 * Lookup the stored AHRA data for a drug, returning the count.
 *
 * @param string $drug
 *   A standard prescription drug name.
 * 
 * @return int
 *   Count of total prescriptions in data set.
 */
function ahrqCount($app, $drug) {
  $queryBuilder = $app['db']->createQueryBuilder();
  $result = $queryBuilder
    ->select('COUNT(*) AS total')
    ->from('prescribed_medicines')
    ->where('rx_name = ?')
    ->setParameter(0, $drug)
    ->execute();
  return $result->fetchAll()[0]['total'];
}

// API endpoint that provides a simplified interface to the FDA API,
// returning incidence of different symptoms for a given search term.
$app->get('/v1/fda/{search}', function ($search) use ($app) {
  $fda_response = queryFDA($search);
  return new Response($fda_response->getBody(), $fda_response->getStatusCode(), ['Content-Type' => 'application/json']);
});

// API endpoint that provides a listing of all drugs present in the AHRQ survey
// sample.
$app->get('/v1/ahrq', function () use ($app) {
  $rx_names = array();
  $rx_name_sql = "SELECT rx_name FROM rx_names";
  $rx_names_results = $app['db']->fetchAll($rx_name_sql);
  foreach ($rx_names_results as $rx_name) {
    $rx_names[] = $rx_name['rx_name'];
  }
  return json_encode($rx_names);
});

// API endpoint that provides the number of prescriptions of a specific drug
// in the AHRQ survey sample.
$app->get('/v1/ahrq/{drug}', function ($drug) use ($app) {
  $result = new stdClass();
  $term = $app['request']->get('ahrq');
  $result->ahrq_sample = ahrqCount($app, $drug);
  return json_encode($result);
});

// API endpoint that combines data from FDA and AHRQ in a single request.
$app->get('/v1/combined/{drugs}', function ($drugs) use ($app) {
  $data = array();

  // Process FDA data.
  foreach ($drugs as $drug) {
    // TODO: Investigate using Guzzle parallel capabilities here.
    $fda_response = queryFDA('"' . $drug . '"');
    // Store the response code, so caller can check for 404 etc.
    $data['fda']['status'][$drug] = $fda_response->getStatusCode();
    if ($fda_response->getStatusCode() == 200) {
      $fda_response_data = json_decode((string)$fda_response->getBody(), TRUE);
      // Build an intermediate list of symptoms.
      foreach ($fda_response_data['results'] as $symptom) {
        $symptom_name = $symptom['term'];
        $symptom_count = $symptom['count'];
        $symptoms[$symptom_name][$drug] = $symptom_count;
      }
    }
  }
  // Calulate totals for each symptom, and sort the list.
  $data['fda']['totals'] = array_map('array_sum', $symptoms);
  arsort($data['fda']['totals'], SORT_NUMERIC);
  // Build a data list including drug details, sorted in the same order as
  // the totals.
  foreach ($data['fda']['totals'] as $symptom_name => $symptom_count) {
    $data['fda']['data'][$symptom_name] = $symptoms[$symptom_name];
  }

  // Process AHRQ data.
  foreach ($drugs as $drug) {
    $data['ahrq'][$drug] = ahrqCount($app, $drug);
  }

  return new Response(json_encode($data), 200, ['Content-Type' => 'application/json']);
})
// Break path arguments into drugs.
->assert('drugs', '.*')
->convert('drugs', function ($drugs) {
    return explode('/', $drugs);
});

$documentation = function() use ($app) {
  return <<<EOF
<!doctype html>
<title>SideEffect.io API documentation</title>
See <a href="https://www.sideeffect.io">sideeffect.io</a> for important disclaimers, data sources and notes.
<ul><li>/v1/fda/{search}
  <br>wrapper on the fda api to return incidence of different adverse effect symptoms given a search term. See an <a href='/v1/fda/CRESTOR+BENICAR+ASPIRIN'>example query</a>.
<li>/v1/ahrq
  <br>Listing of all drugs present in the AHRQ survey sample. See an <a href='/v1/ahrq'>example query</a>.
<li>/v1/ahrq/{drug}
  <br>Number of prescriptions of a specific drug in the AHRQ survey sample. See an <a href='/v1/ahrq/BENICAR'>example query</a>.
<li>/v1/combined/{drug}/{drug}/{drug}...
  <br>Combines data from FDA dataset (including http status, cross-drug totals and drug specific reports by symptom) as well as AHRQ number of prescriptions for each drug. See an <a href='/v1/combined/CRESTOR/BENICAR/ASPIRIN'>example query</a>.
EOF;
};

// API documentation endpoints.
$app->get('/', $documentation);
$app->get('/v1', $documentation);
$app->get('/v1/', $documentation);

$app->run();
