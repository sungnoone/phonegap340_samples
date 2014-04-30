/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

/* Phonegap API -- Network Information */
{
document.addEventListener('online', checkConnection, false);



function success(resultArray) {
    alert("Scanned " + resultArray[0] + " code: " + resultArray[1]);

            // NOTE: Scandit SDK Phonegap Plugin Versions 1.* for iOS report
            // the scanning result as a concatenated string.
            // Starting with version 2.0.0, the Scandit SDK Phonegap
            // Plugin for iOS reports the result as an array
            // identical to the way the Scandit SDK plugin for Android reports results.

            // If you are running the Scandit SDK Phonegap Plugin Version 1.* for iOS,
            // use the following approach to generate a result array from the string result returned:
            // resultArray = result.split("|");
}

function failure(error) {
    alert("Failed: " + error);
}

function scan() {
    // See below for all available options.
    cordova.exec(success, failure, "ScanditSDK", "scan",
                 ["DaQAqs6pEeOaAbBOn590tiW+hmLlLlTf6qAKFIKB3ao",
                  {"beep": true,
                  "1DScanning" : true,
                  "2DScanning" : true}]);
}


/* Phonegap API -- Network Information */

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}


}



/* Phonegap API -- media */
{
// Record audio
//
function recordAudio() {
    var src = "myrecording.mp3";
    var mediaRec = new Media(src,
        // success callback
        function() {
            console.log("recordAudio():Audio Success");
        },

        // error callback
        function(err) {
            console.log("recordAudio():Audio Error: "+ err.code);
        }
    );

    // Record audio
    mediaRec.startRecord();

    // Stop recording after 10 seconds
    setTimeout(function() {
        mediaRec.stopRecord();
    }, 10000);
}


// Play audio
// setVolume
function playAudio() {

    var src = "1234.mp3";
    // Play the audio file at url
    var my_media = new Media(src,
        // success callback
        function() {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function(err) {
            console.log("playAudio():Audio Error: "+err);
    });

    // Play audio
    my_media.play();

    // Mute volume after 2 seconds
    setTimeout(function() {
        console.log("2 sec...vol 0.0");
        my_media.setVolume('0.0');
    }, 2000);

    // Set volume to 1.0 after 5 seconds
    setTimeout(function() {
        console.log("5 sec...set vol 0.5");
        my_media.setVolume('0.5');
    }, 5000);

    setTimeout(function() {
        console.log("10 sec...set vol 1.0");
        my_media.setVolume('1.0');
    }, 15000);

}

// Audio player
// getCurrentPosition、getDuration
function playAudio1(){
    var src = "1234.mp3";
    var my_media = new Media(src, onSuccess, onError);
    // Play audio
    my_media.play();

    // Update media position every second
    var mediaTimer = setInterval(function () {
        // get media position
        my_media.getCurrentPosition(
            // success callback
            function (position) {
                if (position > -1) {
                    console.log((position) + " sec");
                }
            },
            // error callback
            function (e) {
                console.log("Error getting pos=" + e);
            }
        );
    }, 1000);


    function onSuccess() {
        console.log("playAudio1 onSuccess.....");
        var dur = my_media.getDuration();
        console.log("音樂總長 " + dur);
    }

    function onError(error) {
        console.log("playAudio1 onError....." + error);
    }

}

}



/* Phonegap API -- media capture */


//captureAudio
//
function captureAudio(){
    // capture callback
    var captureSuccess = function(mediaFiles) {
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            // do something interesting with the file
            console.log(path);
        }
    };

    // capture error callback
    var captureError = function(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };

    // limit capture operation to 1 media files, no longer than 10 seconds each
    var options = { limit: 1, duration: 10 };

    // start audio capture
    navigator.device.capture.captureAudio(captureSuccess, captureError, options);

}

//captureVideo
//
function captureVideo(){
    // capture callback
    var captureSuccess = function(mediaFiles) {
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            // do something interesting with the file
        }
    };

    // capture error callback
    var captureError = function(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };

    // limit capture operation to 1 media files, no longer than 10 seconds each
    var options = { limit: 1, duration: 20 };

    // start video capture
    navigator.device.capture.captureVideo(captureSuccess, captureError, options);
}



