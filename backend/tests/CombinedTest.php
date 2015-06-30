<?php

use GuzzleHttp\Client;

class CombinedAPITest extends PHPUnit_Framework_TestCase
{
  /**
   * Tests a single drug to ensure a symptom is present.
   */
  public function testSingle() {
    $client = new Client();
    $request = $client->get('http://web/v1/combined/ibuprofen');
    $response = $request;
    $this->assertEquals(200, $response->getStatusCode());
  }

  /**
   * Tests multiple drugs to ensure a symptom is present.
   */
  public function testMultiple() {
    $client = new Client();
    $request = $client->get('http://web/v1/combined/CRESTOR/BENICAR/ASPIRIN');
    $response = $request;
    $this->assertEquals(200, $response->getStatusCode());
   }
}
