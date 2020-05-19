<?php

$offset = 1;

$jsonDir = dirname(__DIR__) . '/seeds/json/fish.json';
$json = [];

$previousFish = '';

while (true) {
    $apiEndPoint = "https://fishbase.ropensci.org/species?limit=1&offset=$offset";
    $data = file_get_contents($apiEndPoint);
    $data = json_decode($data)->data[0];

    if (empty($data->FBname) || $data->FBname == $previousFish) {
        $offset++;
        continue;
    }

    if (empty($data)) {
        break;
    }

    if (empty($data->Length)) {
        $data->Length = rand(1, 100);
    }

    if (empty($data->Vulnerability)) {
        $data->Vulnerability = rand(1, 100);
    }

    $fish = new stdClass();
    $fish->name = $data->FBname;
    $fish->rarity = $data->Vulnerability;


    $tenPerCent = $data->Length * (10 / 100);

    $fish->min_lenght = $data->Length - $tenPerCent;
    $fish->max_lenght = $data->Length + $tenPerCent;

    $json[] = $fish;
    $previousFish = $fish->name;

    print("\n---------------------------\n");
    print_r($fish);
    print("\n---------------------------\n");
    print_r("At => " . sizeof($json));
    print("\n---------------------------\n");

}

$fp = fopen($jsonDir, 'w');
fwrite($fp, json_encode($json));
fclose($fp);
