<?php
require('temp-track.php');

$openweatherAPIKey = 'ff6f5d189dfa1eba10cc3559a7eb097d';
$openweatherAPIUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=' . $openweatherAPIKey;
$zip = '&zip=98665,us';

$weatherPage = file_get_contents($openweatherAPIUrl . $zip);
$weatherData = json_decode($weatherPage, true);
echo '<pre>';
$temp = $weatherData['main']['temp'];
$humidity = $weatherData['main']['humidity'];

trackTemp('1.1.1.1', $temp, $humidity);
