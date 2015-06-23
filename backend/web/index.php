<?php
ini_set('memory_limit','500M');
function dpr($var){
  print '<pre>';
  print_r($var);
  print '</pre>';
}
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

  return $html;
}

$app->get('/drug/{med}/{sym}', function ($med,$sym) use ($app) {
    return queryFDA($med,$sym);
});

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
        'url'   => 'mysql://nebula:nebula@mysql:3306/nebula',
    ),
));


/* Try and build our tables */
$platform = $app['db']->getDatabasePlatform();

$schema = new \Doctrine\DBAL\Schema\Schema();

/* Create "Prescriptions Table" */
try {
  $prescribedTable = $schema->createTable("prescribed_medicines");
  /* UNIQUE RX/PRESCRIBED MEDICINE IDENTIFIER */
  $prescribedTable->addColumn("drugidx", "string", array("length"=> 64, ));
  /* RX Name */
  $prescribedTable->addColumn("rx_name", "string", array("length" => 256));
  /* Prescription Year */
  $prescribedTable->addColumn("drugidx_year", "integer");
  
  $queries = $schema->toSql($platform);
  foreach($queries as $query){
    $app['db']->executeQuery($query);
  }
}
catch (Exception $exc) {
}

/* Populate Our prescription Table */

$queryBuilder = $app['db']->createQueryBuilder();

$file = '../build/h152a.dat';
if (file_exists($file)) {
  $data = file($file);
  foreach($data as $row){
    $drugidx = trim(substr($row,27,14)); // UNIQUE RX/PRESCRIBED MEDICINE IDENTIFIER
    $rxname = trim(substr($row,65,49)); // EDICATION NAME (IMPUTED)
    $report_year = '2012'; // Year impmorted report was for
    // Build insert query for each row
    /**
     * 
     */
    $queryBuilder
      ->insert('prescribed_medicines')
      ->setValue('drugidx', "'" . $drugidx . "'")
      ->setValue('rx_name', "'" . $rxname . "'")
      ->setValue('drugidx_year', "'" . $report_year . "'")
      ->execute();
    ;
    dpr($queryBuilder);
    print 'end';
    exit;
  }
}

$schema = new \Doctrine\DBAL\Schema\Schema();

print 'hello';

$app->run();

