<?php

use GuzzleHttp\Client;

class AHRQAPITest extends PHPUnit_Framework_TestCase
{
  public function testList() {
    $client = new Client();
    $request = $client->get('http://web/v1/ahrq');
    $response = $request;
    $this->assertEquals($response->getStatusCode(), 200);
  }
  public function testQuery() {
    $client = new Client();
    $request = $client->get('http://web/v1/ahrq/ibuprofen');
    $response = $request;
    $this->assertEquals($response->getStatusCode(), 200);
  }
}
