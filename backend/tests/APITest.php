<?php

use GuzzleHttp\Client;

class APITest extends PHPUnit_Framework_TestCase
{
    public function testIbuprofenPain()
    {
        $client = new Client();
        $request = $client->get('http://web/rx/ibuprofen');
        $response = $request;
        $this->assertEquals($response->getStatusCode(), 200);
    }
    public function testJSON()
    {
        $client = new Client();
        $request = $client->get('http://web/rx.json');
        $response = $request;
        $this->assertEquals($response->getStatusCode(), 200);
    }
}
