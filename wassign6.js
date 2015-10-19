// --------------------------------------------
// weekly assignment 6
//
// barbara compagnoni
// fall 2015
//
// --------------------------------------------

var request = require('request'); // npm install request
var async = require('async'); // npm install async
var cheerio = require('cheerio'); // npm install cheerio

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert'); // npm mongodb

var fs = require("fs"); // no need to install it is a core module

// variables for mongodb
var url = 'mongodb://localhost:27017/aameetings';

// live link of aa page 
var aaPage = "http://www.nyintergroup.org/meetinglist/meetinglist.cfm?zone=02&borough=M"
// file link for testing
// var fileContent = fs.readFileSync('/home/ubuntu/workspace/data/aameetinglist02M.txt');
// use cheerio to load the content
var $ = cheerio.load(aaPage);
// var $ = cheerio.load(fileContent);

// Enviornment Variables
var apiKey = process.env.GMAKEY;
// var apiKey ='AIzaSyA-CKC1h7HYmCnIminO6aSpD0yaAxNTXw4';


var addresses = [];
var cleanedAddresses = [];
var geocodedAddresses = [];
var locationNames = [];
var meetingNames = [];
var meetingSpecs = [];
var meetingDays = [];
var meetingTimes = [];
var meetingTypes = [];
var handicapAccessible = [];
var specialInfo = [];
var directions = [];
var test = [];


async.waterfall([

    // check if mongo db is running
    function(callback) {
        // Use connect method to connect to the Server 
        MongoClient.connect(url, function(err, db) {
            // if there is a connection error print error
            assert.equal(null, err);
            // if we do tell us we have
            console.log("Connected correctly to server");
            db.close();
            callback(null);
        });
    },
    // load aa page data from url variabl
    function readAAPage(callback, body) {
        request(aaPage, function (error, response, body) {
            if (error) {
                //if we cant tell us why
                console.log(error);
            }
            // 200 is the code that says everything is okay
            if (!error && response.statusCode == 200) {
                console.log("page retrieved")
            }
            callback(null, body);
        });
    }, 
    // parse aa meeting data and add geo-coding
    function parseData(data, callback) {
//     getMeetingsFromPage(data, callback);
        console.log("YAY!!!");
   }
   ],
    function(err, res){
    // feed results to mongo db
        // MongoClient.connect(url, function(err, db) {
        //     // if there isn't a connection print error
        //     assert.equal(null, err);
        //     // log in console if you can connect to server
        //     console.log("Connected correctly to server");
            
        //     insertDocuments(db, function() {
    
        //     // close database connection
        //     db.close();
        //     });
        // });
    });
    
// function to insert info into documents
var insertDocuments = function(db, callback) {
    // Get the documents collection 
    var collection = db.collection('aameetings_area2');
    // Insert some documents 
    collection.insert(
        meetingInfo, function(err, result) {
        assert.equal(err, null);
        assert.equal(meetingInfo.length, result.result.n);
        assert.equal(meetingInfo.length, result.ops.length);
        console.log("Inserted " + meetingInfo.length +" documents into the document collection");
    callback(result);
    });
}


// // Get Addresses
// function getAddresses(){
//     $('table[cellpadding=5]').find('tbody').find('tr').each (function (i, elem){
  
//         addresses.push( $(elem).find('td').eq(0).html().split('<br>')[2].trim()); 
//         console.log(addresses[i]);
        
//         // cleaned addresses
//         console.log(fixAddresses(addresses[i]) );

// //   // geocoded addresses

// });


// // location names -- already cleaned
// $('table[cellpadding=5]').find('tbody').find('tr').each (function (i, elem){
//   locationNames.push( $(elem).find('h4').eq(0).text().trim()); 

// //   console.log(locationNames[i]);

//   // cleaned and none replaces all with no specific location listed
// //   console.log(bool(locationNames[i]))
// });

// // meeting names -- need to clean dashes and appostrophes
// $('table[cellpadding=5]').find('tbody').find('tr').each (function (i, elem){
//   meetingNames.push( $(elem).find('b').eq(0).text().replace(/\s+/g,' ').trim()); 
//     // console.log(meetingNames[i]);

//   // cleaned
// //   console.log(fixMeetingNames(meetingNames[i]));
// });

// // meeting specs


// $('table[cellpadding=5]').find('tbody').find('tr').each (function (i, elem){
//   meetingSpecs.push( $(elem).find('td').eq(1).html().replace(/\s\s+/g, "").split("<br><br>"));

//   var type = meetingSpecs[i].toString().match(/<b>Meeting Type<\/b>/gi);
//   var si = "<b>Special Interest</b>";

//   if (meetingSpecs[i].toString().match(type)){
//     meetingTypes.push(meetingSpecs[i].toString().replace(/.*<b>Meeting Type<\/b>([^<]*).*/, "$1"));
//   }

//   meetingDays.push(meetingSpecs[i].toSt );


//   meetingTimes.push(meetingSpecs[i].toString().match(/\d{1,2}:\d{1,2} [aApP][mM]/g) );

// //   console.log(meetingTypes[i]);

// //     test.push(meetingSpecs[i].toString().replace(/^\s+|\s+$/gm,'').trim());
// //     // meetingTimes.push(meetingSpecs[i].substring(meetingSpecs[i].indexOf("to")+8, test[i].indexOf("to")-8)));


// //     // console.log(meetingSpecs[1].toString().replace(/^\s+|\s+$/gm,'').trim());
// //     // console.log("times: " + test[i].substring(test[i].indexOf("From"), test[i].indexOf("Meeting Type")));
// //     // console.log("meeting types: " + test[i].substring(test[i].indexOf("Meeting Type")));
// //     console.log("------------------" );
// //   console.log(test[i]);
// //   console.log(meetingTimes[i]);

// //   console.log("days: "  );
// //   console.log("times: " + meetingSpecs[i].toString().substring(meetingSpecs[i].indexOf('from'), meetingSpecs[i].indexOf('Meeting Type')));
// // //   console.log("Special Interest: " + meetingSpecs[i].toString().substring(meetingSpecs[i].indexOf('Special Interest')));
// //   console.log("meeting type: " + meetingSpecs[i].toString().substring(meetingSpecs[i].indexOf('Meeting Type'), meetingSpecs[i].indexOf('meeting')));
//  });


// // times
// $('table[cellpadding=5]').find('tbody').find('tr').next('td').each (function (i, elem){
//   meetingTimes.push( $(elem).find('td').eq(1).text()); 

// //   console.log(meetingTimes[i]);
// });

// // meeting types

// // handicap accessible -- needs to be turned into a boolean
// $('table[cellpadding=5]').find('tbody').find('tr').each (function (i, elem){
//   handicapAccessible.push( $(elem).find('span').eq(0).text().trim()); 
// //   console.log(handicapAccessible[i]);

//   // returns non if there are no handi able access
// //   console.log(bool(handicapAccessible[i]));

// });

// // special info -- needs to be trimmed
// $('table[cellpadding=5]').find('tbody').find('tr').each (function (i, elem){
//   specialInfo.push( $(elem).find('.detailsBox').eq(0).text().trim()); 

//   // returns non if there is no special info
// //   console.log(bool(specialInfo[i]));
// });


// // directions -- get href link
// $('table[cellpadding=5]').find('tbody').find('tr').each (function (i, elem){
//   directions.push( $(elem).find('.GetDirections').eq(0).html()); 

//     // console.log(directions[i]);
// });

// // function to clean addresses
// function fixAddresses(oldAddress){
//     var newAddress = oldAddress.substring(0,oldAddress.indexOf(',')) + ' New York, NY';
//     return newAddress;
// }

// // function to clean meeting names
// function fixMeetingNames(wholeName){
//     // var firstHalf = wholeName.substring(0,wholeName.indexOf('-'));
//     // return firstHalf;
//     var middle = wholeName.indexOf('-');
//     var firstHalf = wholeName.toUpperCase().substring(0, middle).replace(/A.A./g, "AA").trim();
//     var secondHalf = wholeName.toUpperCase().substring(middle + 2).replace(/- |-/g, "").trim();
//     var firstHalfClean = firstHalf.replace(/\s/g,'');
//     var secondHalfClean = secondHalf.replace(/\s/g,'');

//     var compare = firstHalfClean.localeCompare(secondHalfClean);

//     console.log("--------------")
//     console.log("1 string:" + firstHalfClean + " | length: " + firstHalfClean.length );
//     console.log("2 string:" + secondHalfClean + " | length: " + secondHalfClean.length);
//     console.log(middle);
//     console.log(compare);

//     if ( middle < compare && compare >= 4 ){
//         console.log(">= 4" + wholeName.replace(/-/g, ' ').trim());
//         return wholeName.replace(/-/g, ' ').trim();
//     // this is for ones with (:II) after the name
//     }else if (compare == middle - 3 || compare == 0 || secondHalfClean.length == 0 || firstHalfClean.indexOf("(:I") != -1){
//         console.log("First return" + firstHalf.replace(/-/g, ' ').trim());
//         return firstHalf.replace(/-/g, ' ').trim();
//     // this is for ones with (:II) after the name
//     }else if (firstHalfClean == 0 || secondHalfClean.indexOf("(:I") != -1){
//         console.log("second has #" + secondHalf.replace(/-/g, ' ').trim());
//         return secondHalf.replace(/-/g, ' ').trim();
//     // this is for ones with more then (:II) after the name
//     }else if (compare < 0) {
//         console.log( "< 0" + firstHalf + ": " + secondHalf.substring(compare));
//         return  secondHalf.substring(compare);
//     // this is for ones that match
//     }
// }

// function cleanDays(value){
//     var val1 = value.replace("FromtoMeeting Type", "");
//     var val2 = val1.replace("Special Interest", "");
//     return val2;

// }

// function bool(value){
//     if (value == ""){
//         return "none";
//     }else{
//         return value;
//     }
// }

// // // eachSeries in the async module iterates over an array and operates on each item in the array in series
// // async.eachSeries(addresses, function(value, callback) {
// //     var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + fixAddresses(value).split(' ').join('+') + '&key=' + apiKey;
// //     var thisMeeting = new Object;
// //     thisMeeting.address = fixAddresses(value);
// //     thisMeeting.originalAddress = value;
// //     request(apiRequest, function(err, resp, body) {
// //         if (err) {throw err;}
// //         if (JSON.parse(body).status != "ZERO_RESULTS") {
// //             thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
// //         }
// //         else {console.log(apiRequest);}
// //         meetingsData.push(thisMeeting);
// //     });
// //     setTimeout(callback, 2000);
// // }, function() {
// //     // fs.writeFileSync('/home/ubuntu/workspace/data/geocodedMeetingsArray.txt', JSON.stringify(meetingsData));
// // });

// // // fs.writeFileSync('/home/ubuntu/workspace/data/addresses.txt', meetings);
// // fs.writeFileSync('/home/ubuntu/workspace/data/addresses.txt', JSON.stringify(meetings));
