/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var wsUri = "ws://localhost:8080/WebApplication5/chate";
var webSocket = new WebSocket(wsUri);
var output = document.getElementById("output");


function connect()
{
    if (webSocket !== undefined && webSocket.readyState !== webSocket.CLOSED)
    {
        writeAnswer("already connected!");
        return;
    }
    else
        webSocket = new WebSocket(wsUri);
}
webSocket.onerror = function (evt) {
    writeAnswer("<br/>" + evt.data);
};

webSocket.onopen = function (evt) {
    writeAnswer(evt.data);
    writeAnswer("Connected to " + wsUri);
};

webSocket.onmessage = function (evt) {
    writeAnswer(evt.data);
};

webSocket.onclose = function (evt) {
    writeResponse("Connection closed");
};

function send() {
    if (webSocket === undefined || webSocket.readyState === webSocket.CLOSED)
        writeAnswer("you are not connected!");
    else {
        var message = document.getElementById("textInput").value;
        webSocket.send(message);
    }
}

function disconnect() {
    webSocket.close();
}

function writeAnswer(text) {
    output.innerHTML += text + "<br/>";
}
