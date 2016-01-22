// This file is part of jsonstat.py

// this nodejs script create a cvs file and store it to
// the fixture file
// the created file contains a to_table trasformation
// so it is possible to compare output of nodejs
// and python library

// to use this file on command line execute
// cd <thisdir>
// npm install
// nodejs oecd_canada_node_v1.js

// stdlib
var fs        = require('fs');
var path      = require('path');

// modules
var JSONstat = require('jsonstat');
// csv library http://csv.adaltas.com/csv/examples/
var csv       = require('csv');

var fixtures_dir      = path.join(__dirname, "..", "tests", "fixtures")
var json_pathname     = path.join(fixtures_dir, "collection", "oecd-canada.json");
var to_table_pathname = path.join(fixtures_dir, "output_from_nodejs", "oecd-canada-to_table.csv");

function jsonstat_to_table(json_string) {
    var json_data = JSON.parse(json_string);
    var J         = JSONstat(json_data);
    var oecd   = J.Dataset(0);
    var canada = J.Dataset(1);

    var ret = oecd.toTable();
    console.log("write oecd dataset in file '" + to_table_pathname + "'")

    csv.stringify(ret, function(err, output){
    var fd = fs.openSync(to_table_pathname, "w");
      fs.writeSync(fd, output);
      fs.closeSync(fd);
    });
}

if(! fs.existsSync(json_pathname)) {
    console.log("file not exists");
} else {
    console.log("reading file '" + json_pathname + "'")
    var json_string = fs.readFileSync(json_pathname).toString();
    jsonstat_to_table(json_string);
}

// var http     = require('http');
// conf
// var uri="http://json-stat.org/samples/oecd-canada.json";
//function http_get_callback(response) {
//    var str = '';
//
//    //another chunk of data has been received, so append it to `str`
//    response.on('data', function (chunk) {
//        str += chunk;
//    });
//
//    //the whole response has been received
//    response.on('end', function () {
//        // console.log(str);
//        jsonstat_test(str);
//    });
//}
// http.request(uri, http_get_callback).end();
