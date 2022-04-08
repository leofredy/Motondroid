#include "Arduino.h"
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <ArduinoJson.h>
#include <string>
#include <WebSocketsServer_Generic.h>

using namespace std;


const char* ssid = "Motondroid";
const char* password = "12345678";

WiFiServer wifiServer(3333);
ESP8266WebServer server(80);

void restServerRouting() {
    server.on("/", HTTP_GET, []() {
        Serial.println("Request!!");
        server.send(200, "text/json", "{\"name\": \"OOI\"}");
    });

    server.on("/login", HTTP_POST, []() {
      Serial.println("POST: ");

      String message = "Body received: \n";
      message += server.arg("plain");
      message += "\n";

      DynamicJsonDocument doc(1024);
      deserializeJson(doc, server.arg("plain"));

      const String username = doc["username"];

      Serial.println(username);
      Serial.println(username == "leofreedy");
      if (username == "leofreedy") {
        digitalWrite(D0, HIGH);
      }
      Serial.println(username);
      server.send(200, "text/json", username);
    });
}

//SocketEvent

WebSocketsServer webSocket = WebSocketsServer(81);

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  Serial.println("* SOCKET EVENT *");
  (void) length;
  
  switch (type)
  {
    case WStype_DISCONNECTED:
      Serial.printf("[%u] Disconnected!\n", num);
      break;
      
    case WStype_CONNECTED:
      {
        IPAddress ip = webSocket.remoteIP(num);
        Serial.printf("[%u] Connected from %d.%d.%d.%d url: %s\n", num, ip[0], ip[1], ip[2], ip[3], payload);

        // send message to client
        webSocket.sendTXT(num, "Connected");
      }
      break;
      
    case WStype_TEXT:
      Serial.printf("[%u] get Text: %s\n", num, payload);

      // send message to client
      // webSocket.sendTXT(num, "message here");

      // send data to all connected clients
      // webSocket.broadcastTXT("message here");
      break;
      
    case WStype_BIN:
      Serial.printf("[%u] get binary length: %u\n", num, length);
      hexdump(payload, length);

      // send message to client
      // webSocket.sendBIN(num, payload, length);
      break;
  }
}

void handleBtn() {
  bool statusBtn = digitalRead(D8);

  if (statusBtn) {
    webSocket.sendTXT(0, "ligado!!");
  }
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); 
  
  WiFi.mode(WIFI_AP);// Working mode only as Acess Point 
  WiFi.softAP(ssid, password);
  wifiServer.begin();

  Serial.println("Server started"); 
  Serial.println(WiFi.softAPIP());
  Serial.println(WiFi.localIP());  //Print the local IP to access the server
  Serial.println("Connection");
  restServerRouting();
  server.begin();
  Serial.println("HTTP server started");

  webSocket.begin();
  webSocket.onEvent(webSocketEvent);

  pinMode(D8, INPUT);
  pinMode(D0, OUTPUT);
  digitalWrite(D0, LOW);
}

void loop() {
  server.handleClient();
  webSocket.loop();
  handleBtn();
}
