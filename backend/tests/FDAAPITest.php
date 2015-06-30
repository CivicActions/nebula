<?php

use GuzzleHttp\Client;

class FDAAPITest extends PHPUnit_Framework_TestCase
{
  /**
   * Tests a single drug to ensure a symptom is present.
   */
  public function testIbuprofenPain() {
    $client = new Client();
    $request = $client->get('http://web/fda/ibuprofen');
    $response = $request;
    $this->assertEquals(200, $response->getStatusCode());
    $data = json_decode((string) $response->getBody(), TRUE);
    // We can't check specific rankings, since the data may change,
    // so we check that the term exists only once in the response.
    $count = 0;
    foreach ($data['results'] as $result) {
      if ($result['term'] == 'PAIN') {
        $count++;
      }
    }
    $this->assertEquals(1, $count);
  }

  /**
   * Tests multiple drugs to ensure a symptom is present.
   */
  public function testInteractionsNausea() {
    $client = new Client();
    $request = $client->get('http://web/fda/CRESTOR+BENICAR+ASPIRIN');
    $response = $request;
    $this->assertEquals(200, $response->getStatusCode());
    $data = json_decode((string) $response->getBody(), TRUE);
    // We can't check specific rankings, since the data may change,
    // so we check that the term exists only once in the response.
    $count = 0;
    foreach ($data['results'] as $result) {
      if ($result['term'] == 'NAUSEA') {
        $count++;
      }
    }
    $this->assertEquals(1, $count);
   }

   /**
    * Tests non-existent drug to ensure http response code passed correctly. 
    */
   public function testNonExistent() {
    $client = new Client();
    $request = $client->get('http://web/fda/RAINBOWS', ['http_errors' => false]);
    $response = $request;
    $this->assertEquals(404, $response->getStatusCode());
   }
}
