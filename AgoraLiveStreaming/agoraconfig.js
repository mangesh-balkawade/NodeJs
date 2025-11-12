//var fs = require('fs');
//var https = require('https');
var http = require('http');
var express = require('express');
var { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-access-token')

var PORT = 3000;

// Fill the appID and appCertificate key given by Agora.io
var appID = "";
var appCertificate = "";

// token expire time, hardcode to 3600 seconds = 1 hour
var expirationTimeInSeconds = 3600;
var role = RtcRole.PUBLISHER;

var app = express();
app.set('port', PORT);

var generateRtcToken = function (req, resp) {
    var currentTimestamp = Math.floor(Date.now() / 1000);
    var privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
    var channelName = req.query.channelName;
    // use 0 if uid is not specified
    var uid = req.query.uid || 0;

    var key = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate,channelName, uid, role, privilegeExpiredTs);

    resp.header("Access-Control-Allow-Origin", "*")
    //resp.header("Access-Control-Allow-Origin", "http://ip:port")
    return resp.json({ 'key': key }).send();
};

app.get('/rtcToken', generateRtcToken);

http.createServer(app).listen(app.get('port'), function () {
    console.log('AgoraSignServer starts at ' + app.get('port'));
});

