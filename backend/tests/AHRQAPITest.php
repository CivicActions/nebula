<?php

use GuzzleHttp\Client;

class AHRQAPITest extends PHPUnit_Framework_TestCase
{
  public function testJSON() {
    $client = new Client();
    $request = $client->get('http://web/rx.json');
    $response = $request;
    $this->assertEquals($response->getStatusCode(), 200);
  }
}
