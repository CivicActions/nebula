<?php
/**
 * @file
 * Creates database schema, downloads and imports AHRQ data files.
 */

ini_set('memory_limit', '500M');

require_once __DIR__ . '/../vendor/autoload.php';

// Create our application, connect the database.
$app = new Silex\Application();
$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
  'db.options' => array(
    'url' => 'mysql://nebula:nebula@mysql:3306/nebula',
  ),
));

// If our tables already exist, then we exit early since our work is done.
$schemaManager = $app['db']->getSchemaManager();
if ($schemaManager->tablesExist(array('prescribed_medicines', 'rx_names')) == TRUE) {
  exit(0);
}

// Build our tables.
$queryBuilder = $app['db']->createQueryBuilder();
$platform = $app['db']->getDatabasePlatform();
$schema   = new \Doctrine\DBAL\Schema\Schema();

// Create 'Prescriptions Table'.
$prescribedTable = $schema->createTable('prescribed_medicines');
// UNIQUE RX/PRESCRIBED MEDICINE IDENTIFIER.
$prescribedTable->addColumn('drugidx', 'string', array('length' => 64));
// RX Name.
$prescribedTable->addColumn('rx_name', 'string', array('length' => 256));
// Prescription Year.
$prescribedTable->addColumn('drugidx_year', 'integer');


// Create RX Name Table.
$rxNameTable = $schema->createTable('rx_names');
// RX name ID - Internal auto incriment, no relation to RX data.
$rxNameTable->addColumn('rx_nid', 'integer', array('autoincrement' => TRUE));
// RX Name.
$rxNameTable->addColumn('rx_name', 'string', array('length' => 256));
$rxNameTable->setPrimaryKey(array('rx_nid'));

// Build the query string and execute it.
$queries = $schema->toSql($platform);
foreach ($queries as $query) {
  print 'Table Created\n';
  $app['db']->executeQuery($query);
}

// Retreive and extract AHRQ data file.
$zip = new ZipArchive();
// 2012 Data.
// TODO: Consider including older data.
file_put_contents('/var/www/nebula/build/tmpARHQ.zip', fopen('http://meps.ahrq.gov/mepsweb/data_files/pufs/h152adat.zip', 'r'));
$res = $zip->open('/var/www/nebula/build/tmpARHQ.zip');
if ($res === TRUE) {
  $zip->extractTo('/var/www/nebula/build/tmpARHQ');
  $zip->close();
  echo 'AHRQ Data Extracted\n';
}
else {
  echo 'Failed, code:' . $res;
}

// Populate Our prescription Table from AHRQ file.
$file   = '/var/www/nebula/build/tmpARHQ/h152a.dat';
$handle = fopen('/var/www/nebula/build/tmpARHQ/h152a.dat', 'r');
$line   = 0;
if ($handle) {
  while (($row = fgets($handle)) !== FALSE) {
    $line++;
    // UNIQUE RX/PRESCRIBED MEDICINE IDENTIFIER.
    $drugidx     = trim(substr($row, 27, 14));
    // EDICATION NAME (IMPUTED).
    $rxname      = trim(substr($row, 65, 49));
    // Year impmorted report was for.
    $report_year = '2012';
    // Build insert query for each row.
    $queryBuilder
      ->insert('prescribed_medicines')
      ->setValue('drugidx', $drugidx)
      ->setValue('rx_name', ':rxname')
      ->setValue('drugidx_year', $report_year)
      ->setParameter('rxname', $rxname)
      ->execute();
    ($line % 50000) OR print 'line: $line\n';
  }
  fclose($handle);
}

print 'Prescriptions table has been populated, populating rx names table\n';

$queryBuilder = $app['db']->createQueryBuilder();

// Build list of prescription names.
$sql      = 'SELECT DISTINCT rx_name FROM prescribed_medicines';
$rx_names = $app['db']->fetchAll($sql);
foreach ($rx_names as $rx_name) {
  $queryBuilder->insert('rx_names')
    ->setValue('rx_name', ':rxname')
    ->setParameter('rxname', $rx_name['rx_name'])
    ->execute();
}
print 'RX names have been populated\n';
print 'Tables built and data populated.\n';

// Remove ARHQ files.
unlink('/var/www/nebula/build/tmpARHQ.zip');
echo 'tmpARHQ.zip removed\n';

/**
 * Helper function to recursively remove directories.
 *
 * @param string $path
 *   Path of directory to remove.
 */
function rrmdir($path) {
  // Open the source directory to read in files.
  $i = new DirectoryIterator($path);
  foreach ($i as $f) {
    if ($f->isFile()) {
      unlink($f->getRealPath());
    }
    elseif (!$f->isDot() && $f->isDir()) {
      rrmdir($f->getRealPath());
    }
  }
  rmdir($path);
}
rrmdir('/var/www/nebula/build/tmpARHQ');
echo 'tmpARHQ directory removed';
