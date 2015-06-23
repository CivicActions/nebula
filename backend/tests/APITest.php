<?php

use GuzzleHttp\Client;

class APITest extends PHPUnit_Framework_TestCase
{
    public function testIbuprofenPain()
    {
        $client = new Client();
        $request = $client->get('http://web/drug/ibuprofen/pain');
        $response = $request;
        $this->assertEquals($response->getStatusCode(), 200);
    }
}
