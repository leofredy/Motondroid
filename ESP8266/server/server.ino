#include "Arduino.h"
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <ArduinoJson.h>
#include <string>
#include <WebSocketsServer_Generic.h>

#define inFarolBaixo         D0
#define inFarolAlto            D1
#define inSetaDireita        D2
#define inSetaEsquerda   D5
#define inSetaDesligada   D6
#define ledFarolBaixo       D3
#define ledFarolAlto          D4
#define ledSetaDireita      D7
#define ledSetaEsquerda D8

using namespace std;

//WifiAP
const char* ssid = "Motondroid";
const char* password = "12345678";
WiFiServer wifiServer(3333);

//Server
ESP8266WebServer server(80);
void restServerRouting();

//SocketEvent
WebSocketsServer webSocket = WebSocketsServer(81);
void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length);

void handleBtn();

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); 


  //Configs wifi
  WiFi.mode(WIFI_AP);// Working mode only as Acess Point 
  WiFi.softAP(ssid, password);
  wifiServer.begin();
  Serial.println("Wifi Server started"); 
  Serial.println(WiFi.softAPIP());
  Serial.println(WiFi.localIP());  //Print the local IP to access the server
  Serial.println("Wifi started");

  //Config server https;
  restServerRouting();
  server.begin();
  Serial.println("HTTP server started");

 //Config socket;
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);

  //Prototipo da moto
  digitalWrite(inFarolBaixo, LOW);
  digitalWrite(inFarolAlto, LOW);
  digitalWrite(inSetaDireita, LOW);
  digitalWrite(inSetaEsquerda, LOW);
  digitalWrite(inSetaDesligada, LOW);
  digitalWrite(ledFarolBaixo, LOW);
  digitalWrite(ledFarolAlto, LOW);
  digitalWrite(ledSetaDireita, LOW);
  digitalWrite(ledSetaEsquerda, LOW);
  
  pinMode(inFarolBaixo, INPUT);
  pinMode(inFarolAlto, INPUT);
  pinMode(inSetaDireita, INPUT);
  pinMode(inSetaEsquerda, INPUT);
  pinMode(inSetaDesligada, INPUT);
  
  pinMode(ledFarolBaixo, OUTPUT);
  pinMode(ledFarolAlto, OUTPUT);
  pinMode(ledSetaDireita, OUTPUT);
  pinMode(ledSetaEsquerda, OUTPUT);
}

void loop() {
  server.handleClient();
  webSocket.loop();
  controlesMoto();
}

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

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  Serial.println("* SOCKET EVENT *");
  Serial.println(type);
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

void controlesMoto() {
  bool statusFarolBaixo       = digitalRead(inFarolBaixo);
  bool statusFarolAlto          = digitalRead(inFarolAlto);
  bool statusSetaDireita      = digitalRead(inSetaDireita);
  bool statusSetaEsquerda = digitalRead(inSetaEsquerda);
  bool statusSetaDesligada = digitalRead(inSetaDesligada);

  if (statusFarolBaixo) {
    digitalWrite(ledFarolBaixo, HIGH);
    digitalWrite(ledFarolAlto, LOW);
  }

  if (statusFarolAlto) {
    digitalWrite(ledFarolBaixo, LOW);
    digitalWrite(ledFarolAlto, HIGH);
  }

  if (statusSetaDireita) {
    digitalWrite(ledSetaDireita, HIGH);
    digitalWrite(ledSetaEsquerda, LOW);
  }

  if (statusSetaEsquerda) {
    digitalWrite(ledSetaDireita, LOW);
    digitalWrite(ledSetaEsquerda, HIGH);
  }

  if (statusSetaDesligada) {
    digitalWrite(ledSetaDireita, LOW);
    digitalWrite(ledSetaEsquerda, LOW);
  }
}
